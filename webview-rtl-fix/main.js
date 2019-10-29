define([
    'jquery',
    'base/js/namespace'
], function (
    $,
    Jupyter
) {

  function load_ipython_extension(){
    $(".CodeMirror-code").attr("dir","auto");
    $(".rendered_html").attr("dir","auto");
    
    document.addEventListener("DOMNodeInserted", function(event){
      $(".CodeMirror-code").attr("dir","auto");
      $(".rendered_html").attr("dir","auto");
    });
    
    // stackoverflow copy-pasta
    var css = '.rendered_html>p { text-align: unset !important; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  return {
      load_ipython_extension: load_ipython_extension
  };
});
