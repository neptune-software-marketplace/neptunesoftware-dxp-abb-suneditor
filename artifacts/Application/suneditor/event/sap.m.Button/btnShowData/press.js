var str = 
    "<html><body><div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p><i>Nulla facilisi.</i></p><p><u>Sed dictum dolor at sapien convallis, non dignissim nisi vestibulum.</u></p><p><strong>Praesent ultricies lectus eu nunc varius, nec malesuada erat pharetra.</strong></p></div></body></html>";

modelappData.oData.emailData = str;
modelappData.refresh();

editorDoc.rerender();
