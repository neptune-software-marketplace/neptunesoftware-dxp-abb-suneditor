RTEditor = {
    html: function (i, t) {
        i.editor = {
            data: t.data || "",
            editable: t.editable || !1,
            setData: function (e) {
                (this.data = e),
                    void 0 !== i.editor.sun &&
                        (i.editor.sun.setContents(this.data),
                        (i.editor.sun.core.history.stack = []),
                        i.editor.sun.core.history.reset());
            },
            insertHTML: function (e) {
                (this.data = e),
                    void 0 !== i.editor.sun &&
                        ((i.editor.sun.core._fileInfoPluginsCheck =
                            i.editor.sun.core._fileInfoPluginsCheck || []),
                        (i.editor.sun.core._fileInfoPluginsReset =
                            i.editor.sun.core._fileInfoPluginsReset || []),
                        i.editor.sun.setContents(),
                        i.editor.sun.insertHTML(this.data, !0, !0),
                        i.editor.sun.core.history.reset(),
                        (i.editor.sun.core.history.stack = []),
                        i.editor.sun.core.history.reset());
            },
            getData: function () {
                return this.data;
            },
            onChange: t.onChange || function () {},
            setEditable: function (e) {
                (this.editable = e),
                    void 0 !== i.editor.sun &&
                        (this.editable ? i.editor.sun.enable() : i.editor.sun.disable());
            },
            toggleCodeView: function (e, t) {
                console.log("isCodeView", e);
            },
        };
        var n = t.id || ModelData.genID(),
            n = (t.data, i.addStyleClass(n), "nepHtmlEditor-" + ModelData.genID());
        i.addStyleClass("nepHtmlEditor "),
            i.addStyleClass(n),
            i.addItem(
                new sap.ui.core.HTML(n, {}).setContent("<textarea id='" + n + "'></textarea>")
            ),
            (i.onAfterRendering = function () {
                sap.ui.Device.resize.attachHandler(function (e) {
                    var t;
                    i.getDomRef() &&
                        ((t =
                            i.getDomRef().offsetHeight -
                            $(".se-toolbar.sun-editor-common").height() -
                            32 -
                            4 -
                            2),
                        $(
                            "." + n + " .se-wrapper-inner.se-wrapper-wysiwyg.sun-editor-editable"
                        ).height(t),
                        $("." + n + " .se-wrapper-inner.se-wrapper-code").height(22 + t));
                });
                var e = i.getDomRef().offsetHeight - 250,
                    e =
                        (t.fullPage && (e += 200),
                        {
                            width: "100%",
                            height: e,
                            resizingBar: !1,
                            defaultStyle: "font-family: cursive: font-size:14px",
                            fullPage: t.fullPage || !1,
                            buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize", "formatBlock"],
                                ["bold", "underline", "italic", "fontColor", "hiliteColor"],
                                [
                                    "outdent",
                                    "indent",
                                    "align",
                                    "horizontalRule",
                                    "list",
                                    "lineHeight",
                                ],
                                ["table", "link", "image", "video", "audio"],
                                ["showBlocks", "removeFormat", "codeView"],
                            ],
                            font: [
                                "Arial",
                                "Comic Sans MS",
                                "Courier New",
                                "Impact",
                                "Georgia",
                                "Tahoma",
                                "Trebuchet MS",
                                "Verdana",
                            ],
                            attributesWhitelist: t.attributesWhitelist || {
                                all: "style",
                                img: "src|style|data-rotatey|data-rotatex|data-index",
                            },
                        }),
                    a =
                        (i.editor.data && (e.value = i.editor.data),
                        t.iframeCSSFileName && (e.iframeCSSFileName = t.iframeCSSFileName),
                        t.addTagsWhitelist && (e.addTagsWhitelist = t.addTagsWhitelist),
                        t.pasteTagsBlacklist && (e.pasteTagsBlacklist = t.pasteTagsBlacklist),
                        SUNEDITOR.create(document.getElementById(n) || n, e));
                (a.onBlur = function (e, t) {
                    (i.editor.data = a.getContents()), i.editor.onChange(i.editor.data);
                }),
                    (a.onChange = function (e, t) {
                        (i.editor.data = a.getContents()), i.editor.onChange(i.editor.data);
                    }),
                    (i.editor.sun = a),
                    setTimeout(function () {
                        var e;
                        i.getDomRef() &&
                            ((e =
                                i.getDomRef().offsetHeight -
                                $("." + n + " .se-toolbar.sun-editor-common").height() -
                                32 -
                                4 -
                                2),
                            $(
                                "." +
                                    n +
                                    " .se-wrapper-inner.se-wrapper-wysiwyg.sun-editor-editable"
                            ).height(e),
                            $("." + n + " .se-wrapper-inner.se-wrapper-code").height(22 + e)),
                            i.editor.editable ? a.enable() : a.disable();
                    }, 100);
            });
    },
};
