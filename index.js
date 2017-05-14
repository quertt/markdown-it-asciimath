"use strict";

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
};

var katex = require('katex');
var assign = require("lodash.assign");
var defaults = {
  useKeyword: false
}

function setup(md, options) {
  if (typeof options === 'undefined') {
    options = defaults;
  }
  var useKeyword = options.useKeyword;
  console.log(useKeyword);


  //var options = assign({}, defaults, options);
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

    console.log(useKeyword);

    if(!useKeyword) {
      console.log("1");
      return renderInline(token.content.trim(), false);
    } else {
      console.log("2");
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
  var arr = str.trim().split("\n");
  var result = "";

  // render each line, skipping empty lines
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
  var newstr;

  // correct index-texts
  newstr = str.replace(/_(.*?)(\s|$|=|\(|\)|\*|\/|\^)/g, '_($1)$2');

  // parse to TeX
  newstr = AMTparseAMtoTeX(newstr);

  return newstr;
}

module.exports = setup;
