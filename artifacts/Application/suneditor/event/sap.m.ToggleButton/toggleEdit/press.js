if(this.getPressed()){
    
     editorDoc.editor?.setEditable(true);
     this.setText('Display')
}else{
    
     editorDoc.editor?.setEditable(false);
     this.setText('Edit')
}