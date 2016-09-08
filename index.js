"use strict";

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
};

var katex = require('katex');

function setup(md, options) {
  var defaultRender = md.renderer.rules.fence;

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    var token = tokens[idx];

    if(token.info === "math") {
      return render(token.content, true);
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };
}

function render(str, disp) {
  // split content
  var arr = str.trim().split("\n");
  var result = "";

  // render each line
  for(var i = 0; i < arr.length; i++) {
    result += "<p>" + renderElement(preprocessMath(arr[i]), disp) + "<p>";
  }

  return result;
}

function renderElement(str, disp) {
  return katex.renderToString(str, { displayMode: disp });
}

function preprocessMath(str) {
  var newstr;

  // correct index-texts
  newstr = str.replace(/_(.*?)(\s|$|=|\(|\)|\*|\/|\^)/g, '_($1)$2');

  // parse to TeX
  newstr = AMTparseAMtoTeX(newstr);

  return newstr;
}
//
//   // expose module to global object
//   global.RenderMath = RenderMath;
// })( this );

module.exports = setup;
