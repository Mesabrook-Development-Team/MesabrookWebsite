// Markdown to HTML converter library

(function () {
  var MarkdownToHTML = {};

  MarkdownToHTML.convert = function (markdownText) {
    var md = new Remarkable();
    return md.render(markdownText);
  };

  // Export the library for use in different environments
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = MarkdownToHTML;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function () {
        return MarkdownToHTML;
      });
    } else {
      window.MarkdownToHTML = MarkdownToHTML;
    }
  }
})();
