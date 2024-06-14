sap.ui.getCore().attachInit(function (data) {
   modelappData.setData({emailData: ""})
});

editorDoc.addEventDelegate({
    onAfterRendering: function (oEvent) {
        const source = oEvent.srcControl;
        const dom = source.getDomRef();

        if (!dom) {
            return;
        }

        if (!source.editor) {
            RTEditor.html(editorDoc, {
                onChange: function (data) {
                    modelappData.oData.emailData = data;
                   // modelappData.getData().content = data;
                },
                fullPage: true,
                iframeCSSFileName: ["suneditor.min"],
                attributesWhitelist: {
                    all: "*",
                },
                addTagsWhitelist: ".*",
                pasteTagsWhitelist: ".*",
                editable: false
            });
        }

        waitForEditor(source).then(() => {
            
            insertHtml(modelappData.getData().emailData, source.editor);
        });
    },
});

function waitForEditor(source) {
    return new Promise((resolve, reject) => {
        if (source?.editor?.sun) {
            return resolve();
        }

        setTimeout(() => waitForEditor(source), 10);
    });
}

let insertHtmlTimeout;
function insertHtml(data, editor) {
    const clear = () => clearTimeout(insertHtmlTimeout);
    const toInsert = data || '';

    let count = 0;
    if (insertHtmlTimeout) {
        clear();
    }

    function insert() {
        if (count > 200) {
            clear();
            return;
        }

        const toolbar = document.getElementsByClassName('se-toolbar sun-editor-common')[0];

        const visible = toolbar && toolbar.style.visibility !== 'hidden';

        if (!visible || typeof editor.sun === "undefined") {
            count = count + 1;
            insertHtmlTimeout = setTimeout(() => { insert(); }, 10);
            return;
        }

        const { head, body } = splitHtmlString(toInsert);
        if (!body) {
            editor.setData('');
        }

        editor.sun.core.setIframeContents({ head, body });
        clear();
    }
    
    insert();
}

function splitHtmlString(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  const head = doc.head.innerHTML;
  const body = doc.body.innerHTML;
  
  return { head, body };
}
