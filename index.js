"use strict";

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
};

var katex = require('katex');
var assign = require("lodash.assign");
var defaults = {
  useKeyword: false
}
var options;

function setup(md, o) {
  // use defaults if no options set
  options = o;
  if (typeof options.useKeyword === 'undefined') {
    options.useKeyword = defaults.useKeyword;
  }

  var useKeyword = options.useKeyword;
  var defaultRender = md.renderer.rules.fence;

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    var token = tokens[idx];

    if(token.info === "math") {
      return render(token.content, true);
    }

    if(token.info === "latex") {
      return renderTeX(token.content, true);
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };

  md.renderer.rules.code_inline = function(tokens, idx, options, env, self) {
    var token = tokens[idx];

    if(!useKeyword) {
      return renderInline(token.content.trim(), false);
    } else {
      if(token.content.substr(0,4) === "math") {
        return renderInline(token.content.substr(4).trim(), false);
      } else if(token.content.substr(0,5) === "latex") {
        return renderElement(token.content.substr(5).trim(), false);
      }
    }

    return defaultRender(tokens, idx, options, env, self);
  }
}

function render(str, disp) {
  // split content
  var arr = str.trim().split("\n\n");
  var result = "";

  for(var i = 0; i < arr.length; i++) {
    if(arr[i]) {
      result += "<p>" + renderElement(preprocessMath(arr[i]), disp) + "<p>";
    }
  }

  return result;
}

function renderTeX(str, disp) {
  // split content
  var arr = str.trim().split("\n");
  var result = "";

  // render each line, skipping empty lines
  for(var i = 0; i < arr.length; i++) {
    if(arr[i]) {
      result += "<p>" + renderElement(arr[i], disp) + "<p>";
    }
  }

  return result;
}

function renderInline(str, disp) {
  return renderElement(preprocessMath(str), disp);
}

function renderElement(str, disp) {
  return katex.renderToString(str, { displayMode: disp });
}

function preprocessMath(str) {
  // parse to TeX
  var newstr = AMTparseAMtoTeX(str);

  return newstr;
}

module.exports = setup;
