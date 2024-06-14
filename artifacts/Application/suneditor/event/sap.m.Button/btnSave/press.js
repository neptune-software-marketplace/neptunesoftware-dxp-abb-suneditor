const getIsCodeView = () => {
    // there is an editorDoc.editor.sun.core._variable_isCodeView but as its tagged as private this seems
    // to be "reasonable" way of detecting it
    const codeViewButton = document.querySelector(
        `#${editorDoc.getId()} [data-command="codeView"]`
    );
    return codeViewButton?.classList.contains("active");
};

if (getIsCodeView()) {
    // changes do not get saved when in code view so we switch out
    editorDoc.editor.sun.core.toggleCodeView();
}
