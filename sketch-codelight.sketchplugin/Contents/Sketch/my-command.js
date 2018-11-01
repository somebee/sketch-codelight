var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/my-command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/timers/test-if-fiber.js":
/*!****************************************************!*\
  !*** ./node_modules/@skpm/timers/test-if-fiber.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  return typeof coscript !== 'undefined' && coscript.createFiber
}


/***/ }),

/***/ "./node_modules/@skpm/timers/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/@skpm/timers/timeout.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(/*! ./test-if-fiber */ "./node_modules/@skpm/timers/test-if-fiber.js")

var setTimeout
var clearTimeout

var fibers = []

if (fiberAvailable()) {
  var fibers = []

  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearTimeout = function (id) {
    var timeout = fibers[id]
    if (timeout) {
      timeout.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        if (fibers[id]) { // if not cleared
          func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
        }
        clearTimeout(id)
        if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
          coscript.shouldKeepAround = false
        }
      }
    )
    return id
  }

  clearTimeout = function (id) {
    fibers[id] = false
  }
}

module.exports = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/monaco/css.js":
/*!***************************!*\
  !*** ./src/monaco/css.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exports.conf = {
  wordPattern: /(#?-?\d*\.\d\w*%?)|((::|[@#.!:])?[\w-?]+%?)|::|[@#.!:]/g,
  comments: {
    blockComment: ['/*', '*/']
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')']],
  autoClosingPairs: [{
    open: '{',
    close: '}',
    notIn: ['string', 'comment']
  }, {
    open: '[',
    close: ']',
    notIn: ['string', 'comment']
  }, {
    open: '(',
    close: ')',
    notIn: ['string', 'comment']
  }, {
    open: '"',
    close: '"',
    notIn: ['string', 'comment']
  }, {
    open: '\'',
    close: '\'',
    notIn: ['string', 'comment']
  }],
  surroundingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }]
};
exports.language = {
  defaultToken: '',
  tokenPostfix: '.css',
  ws: '[ \t\n\r\f]*',
  // whitespaces (referenced in several rules)
  identifier: '-?-?([a-zA-Z]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*',
  brackets: [{
    open: '{',
    close: '}',
    token: 'delimiter.bracket'
  }, {
    open: '[',
    close: ']',
    token: 'delimiter.bracket'
  }, {
    open: '(',
    close: ')',
    token: 'delimiter.parenthesis'
  }, {
    open: '<',
    close: '>',
    token: 'delimiter.angle'
  }],
  tokenizer: {
    root: [{
      include: '@selector'
    }],
    selector: [{
      include: '@comments'
    }, {
      include: '@import'
    }, {
      include: '@strings'
    }, ['[@](keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes)', {
      token: 'keyword',
      next: '@keyframedeclaration'
    }], ['[@](page|content|font-face|-moz-document)', {
      token: 'keyword'
    }], ['[@](charset|namespace)', {
      token: 'keyword',
      next: '@declarationbody'
    }], ['(url-prefix)(\\()', ['attribute.value', {
      token: 'delimiter.parenthesis',
      next: '@urldeclaration'
    }]], ['(url)(\\()', ['attribute.value', {
      token: 'delimiter.parenthesis',
      next: '@urldeclaration'
    }]], {
      include: '@selectorname'
    }, ['[\\*]', 'tag'], // selector symbols
    ['[>\\+,]', 'delimiter'], // selector operators
    ['\\[', {
      token: 'delimiter.bracket',
      next: '@selectorattribute'
    }], ['{', {
      token: 'delimiter.bracket',
      next: '@selectorbody'
    }]],
    selectorbody: [{
      include: '@comments'
    }, ['[*_]?@identifier@ws:(?=(\\s|\\d|[^{;}]*[;}]))', 'attribute.name', '@rulevalue'], // rule definition: to distinguish from a nested selector check for whitespace, number or a semicolon
    ['}', {
      token: 'delimiter.bracket',
      next: '@pop'
    }]],
    selectorname: [['(\\.|#(?=[^{])|%|(@identifier)|:)+', 'tag']],
    selectorattribute: [{
      include: '@term'
    }, [']', {
      token: 'delimiter.bracket',
      next: '@pop'
    }]],
    term: [{
      include: '@comments'
    }, ['(url-prefix)(\\()', ['attribute.value', {
      token: 'delimiter.parenthesis',
      next: '@urldeclaration'
    }]], ['(url)(\\()', ['attribute.value', {
      token: 'delimiter.parenthesis',
      next: '@urldeclaration'
    }]], {
      include: '@functioninvocation'
    }, {
      include: '@numbers'
    }, {
      include: '@name'
    }, ['([<>=\\+\\-\\*\\/\\^\\|\\~,])', 'delimiter'], [',', 'delimiter']],
    rulevalue: [{
      include: '@comments'
    }, {
      include: '@strings'
    }, {
      include: '@term'
    }, ['!important', 'keyword'], [';', 'delimiter', '@pop'], ['(?=})', {
      token: '',
      next: '@pop'
    }] // missing semicolon
    ],
    warndebug: [['[@](warn|debug)', {
      token: 'keyword',
      next: '@declarationbody'
    }]],
    import: [['[@](import)', {
      token: 'keyword',
      next: '@declarationbody'
    }]],
    urldeclaration: [{
      include: '@strings'
    }, ['[^)\r\n]+', 'string'], ['\\)', {
      token: 'delimiter.parenthesis',
      next: '@pop'
    }]],
    parenthizedterm: [{
      include: '@term'
    }, ['\\)', {
      token: 'delimiter.parenthesis',
      next: '@pop'
    }]],
    declarationbody: [{
      include: '@term'
    }, [';', 'delimiter', '@pop'], ['(?=})', {
      token: '',
      next: '@pop'
    }] // missing semicolon
    ],
    comments: [['\\/\\*', 'comment', '@comment'], ['\\/\\/+.*', 'comment']],
    comment: [['\\*\\/', 'comment', '@pop'], [/[^*/]+/, 'comment'], [/./, 'comment']],
    name: [['@identifier', 'attribute.value']],
    numbers: [['-?(\\d*\\.)?\\d+([eE][\\-+]?\\d+)?', {
      token: 'attribute.value.number',
      next: '@units'
    }], ['#[0-9a-fA-F_]+(?!\\w)', 'attribute.value.hex']],
    units: [['(em|ex|ch|rem|vmin|vmax|vw|vh|vm|cm|mm|in|px|pt|pc|deg|grad|rad|turn|s|ms|Hz|kHz|%)?', 'attribute.value.unit', '@pop']],
    keyframedeclaration: [['@identifier', 'attribute.value'], ['{', {
      token: 'delimiter.bracket',
      switchTo: '@keyframebody'
    }]],
    keyframebody: [{
      include: '@term'
    }, ['{', {
      token: 'delimiter.bracket',
      next: '@selectorbody'
    }], ['}', {
      token: 'delimiter.bracket',
      next: '@pop'
    }]],
    functioninvocation: [['@identifier\\(', {
      token: 'attribute.value',
      next: '@functionarguments'
    }]],
    functionarguments: [['\\$@identifier@ws:', 'attribute.name'], ['[,]', 'delimiter'], {
      include: '@term'
    }, ['\\)', {
      token: 'attribute.value',
      next: '@pop'
    }]],
    strings: [['~?"', {
      token: 'string',
      next: '@stringenddoublequote'
    }], ['~?\'', {
      token: 'string',
      next: '@stringendquote'
    }]],
    stringenddoublequote: [['\\\\.', 'string'], ['"', {
      token: 'string',
      next: '@pop'
    }], [/[^\\"]+/, 'string'], ['.', 'string']],
    stringendquote: [['\\\\.', 'string'], ['\'', {
      token: 'string',
      next: '@pop'
    }], [/[^\\']+/, 'string'], ['.', 'string']]
  }
};

/***/ }),

/***/ "./src/monaco/html.js":
/*!****************************!*\
  !*** ./src/monaco/html.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var EMPTY_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
exports.conf = {
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
  comments: {
    blockComment: ['<!--', '-->']
  },
  brackets: [['<!--', '-->'], ['<', '>'], ['{', '}'], ['(', ')']],
  autoClosingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }],
  surroundingPairs: [{
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }, {
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '<',
    close: '>'
  }],
  onEnterRules: [{
    beforeText: new RegExp("<(?!(?:" + EMPTY_ELEMENTS.join('|') + "))([_:\\w][_:\\w-.\\d]*)([^/>]*(?!/)>)[^<]*$", 'i'),
    afterText: /^<\/([_:\w][_:\w-.\d]*)\s*>$/i,
    action: {
      indentAction: 2
    }
  }, {
    beforeText: new RegExp("<(?!(?:" + EMPTY_ELEMENTS.join('|') + "))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$", 'i'),
    action: {
      indentAction: 1
    }
  }]
};
exports.language = {
  defaultToken: '',
  tokenPostfix: '.html',
  ignoreCase: true,
  // The main tokenizer for our languages
  tokenizer: {
    root: [[/<!DOCTYPE/, 'metatag', '@doctype'], [/<!--/, 'comment', '@comment'], [/(<)((?:[\w\-]+:)?[\w\-]+)(\s*)(\/>)/, ['delimiter', 'tag', '', 'delimiter']], [/(<)(script)/, ['delimiter', {
      token: 'tag',
      next: '@script'
    }]], [/(<)(style)/, ['delimiter', {
      token: 'tag',
      next: '@style'
    }]], [/(<)((?:[\w\-]+:)?[\w\-]+)/, ['delimiter', {
      token: 'tag',
      next: '@otherTag'
    }]], [/(<\/)((?:[\w\-]+:)?[\w\-]+)/, ['delimiter', {
      token: 'tag',
      next: '@otherTag'
    }]], [/</, 'delimiter'], [/[^<]+/]],
    doctype: [[/[^>]+/, 'metatag.content'], [/>/, 'metatag', '@pop']],
    comment: [[/-->/, 'comment', '@pop'], [/[^-]+/, 'comment.content'], [/./, 'comment.content']],
    otherTag: [[/\/?>/, 'delimiter', '@pop'], [/"([^"]*)"/, 'attribute.value'], [/'([^']*)'/, 'attribute.value'], [/[\w\-]+/, 'attribute.name'], [/=/, 'delimiter'], [/[ \t\r\n]+/]],
    // -- BEGIN <script> tags handling
    // After <script
    script: [[/type/, 'attribute.name', '@scriptAfterType'], [/lang/, 'attribute.name', '@styleAfterType'], [/"([^"]*)"/, 'attribute.value'], [/'([^']*)'/, 'attribute.value'], [/[\w\-]+/, 'attribute.name'], [/=/, 'delimiter'], [/>/, {
      token: 'delimiter',
      next: '@scriptEmbedded',
      nextEmbedded: 'text/javascript'
    }], [/[ \t\r\n]+/], // whitespace
    [/(<\/)(script\s*)(>)/, ['delimiter', 'tag', {
      token: 'delimiter',
      next: '@pop'
    }]]],
    // After <script ... type
    scriptAfterType: [[/=/, 'delimiter', '@scriptAfterTypeEquals'], [/>/, {
      token: 'delimiter',
      next: '@scriptEmbedded',
      nextEmbedded: 'text/javascript'
    }], // cover invalid e.g. <script type>
    [/[ \t\r\n]+/], // whitespace
    [/<\/script\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    // After <script ... type =
    scriptAfterTypeEquals: [[/"([^"]*)"/, {
      token: 'attribute.value',
      switchTo: '@scriptWithCustomType.$1'
    }], [/'([^']*)'/, {
      token: 'attribute.value',
      switchTo: '@scriptWithCustomType.$1'
    }], [/>/, {
      token: 'delimiter',
      next: '@scriptEmbedded',
      nextEmbedded: 'text/javascript'
    }], // cover invalid e.g. <script type=>
    [/[ \t\r\n]+/], // whitespace
    [/<\/script\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    // After <script ... type = $S2
    scriptWithCustomType: [[/>/, {
      token: 'delimiter',
      next: '@scriptEmbedded.$S2',
      nextEmbedded: '$S2'
    }], [/"([^"]*)"/, 'attribute.value'], [/'([^']*)'/, 'attribute.value'], [/[\w\-]+/, 'attribute.name'], [/=/, 'delimiter'], [/[ \t\r\n]+/], // whitespace
    [/<\/script\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    scriptEmbedded: [[/<\/script/, {
      token: '@rematch',
      next: '@pop',
      nextEmbedded: '@pop'
    }], [/[^<]+/, '']],
    // After <style
    style: [[/type/, 'attribute.name', '@styleAfterType'], [/lang/, 'attribute.name', '@styleAfterType'], [/"([^"]*)"/, 'attribute.value'], [/'([^']*)'/, 'attribute.value'], [/[\w\-]+/, 'attribute.name'], [/=/, 'delimiter'], [/>/, {
      token: 'delimiter',
      next: '@styleEmbedded',
      nextEmbedded: 'text/css'
    }], [/[ \t\r\n]+/], // whitespace
    [/(<\/)(style\s*)(>)/, ['delimiter', 'tag', {
      token: 'delimiter',
      next: '@pop'
    }]]],
    // After <style ... type
    styleAfterType: [[/=/, 'delimiter', '@styleAfterTypeEquals'], [/>/, {
      token: 'delimiter',
      next: '@styleEmbedded',
      nextEmbedded: 'text/css'
    }], // cover invalid e.g. <style type>
    [/[ \t\r\n]+/], // whitespace
    [/<\/style\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    // After <style ... type =
    styleAfterTypeEquals: [[/"([^"]*)"/, {
      token: 'attribute.value',
      switchTo: '@styleWithCustomType.$1'
    }], [/'([^']*)'/, {
      token: 'attribute.value',
      switchTo: '@styleWithCustomType.$1'
    }], [/>/, {
      token: 'delimiter',
      next: '@styleEmbedded',
      nextEmbedded: 'text/css'
    }], // cover invalid e.g. <style type=>
    [/[ \t\r\n]+/], // whitespace
    [/<\/style\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    // After <style ... type = $S2
    styleWithCustomType: [[/>/, {
      token: 'delimiter',
      next: '@styleEmbedded.$S2',
      nextEmbedded: '$S2'
    }], [/"([^"]*)"/, 'attribute.value'], [/'([^']*)'/, 'attribute.value'], [/[\w\-]+/, 'attribute.name'], [/=/, 'delimiter'], [/[ \t\r\n]+/], // whitespace
    [/<\/style\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    styleEmbedded: [[/<\/style/, {
      token: '@rematch',
      next: '@pop',
      nextEmbedded: '@pop'
    }], [/[^<]+/, '']]
  }
};

/***/ }),

/***/ "./src/monaco/imba/index.js":
/*!**********************************!*\
  !*** ./src/monaco/imba/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var names = {
  access: 'delimiter.access',
  ivar: 'variable.instance',
  constant: 'identifier.const'
};
var conf = exports.conf = {
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#%\^\&\*\(\)\=\$\-\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  comments: {
    blockComment: ['###', '###'],
    lineComment: '#'
  },
  brackets: [['{', '}', 'delimiter.curly'], ['[', ']', 'delimiter.square'], ['(', ')', 'delimiter.parenthesis'], ['<', '>', 'delimiter.angle']],
  autoClosingPairs: [{
    open: '"',
    close: '"',
    notIn: ['string', 'comment']
  }, {
    open: '\'',
    close: '\'',
    notIn: ['string', 'comment']
  }, {
    open: '{',
    close: '}',
    notIn: ['comment']
  }, {
    open: '[',
    close: ']',
    notIn: ['string', 'comment']
  }, {
    open: '(',
    close: ')',
    notIn: ['string', 'comment']
  }, {
    open: '<',
    close: '>',
    notIn: ['string', 'comment', 'operators']
  }],
  onEnterRules: [{
    beforeText: /^\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async).*?$/,
    action: {
      indentAction: 1
    }
  }, {
    beforeText: /\s*(?:do)\s*(\|.*\|\s*)?$/,
    action: {
      indentAction: 1
    }
  }]
}; // ivar namespace.instance.identifier
// constant constructor.identifier

var language = exports.language = {
  defaultToken: 'invalid',
  ignoreCase: false,
  tokenPostfix: '.imba',
  brackets: [{
    open: '{',
    close: '}',
    token: 'delimiter.curly'
  }, {
    open: '[',
    close: ']',
    token: 'delimiter.square'
  }, {
    open: '(',
    close: ')',
    token: 'delimiter.parenthesis'
  }],
  keywords: ['def', 'and', 'or', 'is', 'isnt', 'not', 'on', 'yes', '@', 'no', 'off', 'true', 'false', 'null', 'this', 'self', 'new', 'delete', 'typeof', 'in', 'instanceof', 'return', 'throw', 'break', 'continue', 'debugger', 'if', 'elif', 'else', 'switch', 'for', 'while', 'do', 'try', 'catch', 'finally', 'class', 'extends', 'super', 'undefined', 'then', 'unless', 'until', 'loop', 'of', 'by', 'when', 'tag', 'prop', 'export', 'import', 'extend', 'var', 'let', 'const', 'require', 'isa', 'await'],
  boolean: ['true', 'false', 'yes', 'no', 'undefined'],
  contextual_keywords: ['from', 'global', 'attr'],
  operators: ['=', '!', '~', '?', ':', '!!', '&', '|', '^', '%', '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '?=', '^=', '%=', '<<=', '>>=', '>>>=', '..', '...'],
  logic: ['>', '<', '==', '<=', '>=', '!=', '&&', '||', '===', '!=='],
  ranges: ['..', '...'],
  dot: ['.'],
  math: ['+', '-', '*', '/', '++', '--'],
  // we include these common regular expressions
  symbols: /[=><!~?&%|+\-*\/\^\.,\:]+/,
  escapes: /\\(?:[abfnrtv\\"'$]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  postaccess: /(:(?=\w))?/,
  ivar: /\@[a-zA-Z_]\w*/,
  constant: /[A-Z][A-Za-z\d\-\_]*/,
  className: /[A-Z][A-Za-z\d\-\_]*|[A-Za-z\d\-\_]+/,
  methodName: /[A-Za-z\_][A-Za-z\d\-\_]*\=?/,
  identifier: /[a-z_][A-Za-z\d\-\_]*/,
  regEx: /\/(?!\/\/)(?:[^\/\\]|\\.)*\/[igm]*/,
  regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
  regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [{
      include: '@body'
    }],
    body: [[/([a-z]\w*)(\:)(?=\w)/, {
      cases: {
        'this:': ['variable.predefined.this', 'delimiter.access'],
        'self:': ['variable.predefined.self', 'delimiter.access'],
        '@default': ['identifier', 'delimiter.access']
      }
    }], [/(@ivar)(\:)(?=\w)/, [names.ivar, names.access]], [/(@constant)(\:)(?=\w)/, [names.constant, names.access]], [/(class|tag|module)(?=\s)/, {
      token: 'keyword.$1',
      next: '@declstart.$1'
    }], [/(def)(?=\s)/, {
      token: 'keyword.$1',
      next: '@defstart.$1'
    }], [/(prop|attr)(?=\s)/, {
      token: 'keyword.$1',
      next: '@propstart.$1'
    }], [/(import)(?=\s)/, {
      token: 'keyword.$1',
      next: '@importstart.$1'
    }], [/([a-z]\w*)(:?(?!\w))/, {
      cases: {
        '$2': ['key.identifier', 'delimiter'],
        'this': 'variable.predefined.this',
        'self': 'variable.predefined.self',
        '$1@boolean': {
          token: 'boolean.$0'
        },
        '$1@keywords': {
          token: 'keyword.$0'
        },
        '$1@contextual_keywords': {
          token: 'identifier.$0'
        },
        '@default': ['identifier', 'delimiter']
      }
    }], // [/([a-z]\w*)(:)(?!\w))/, { cases: {
    // 		'$2': ['key.identifier','delimiter'],
    // 		'this': 'variable.predefined.this',
    // 		'self': 'variable.predefined.self',
    // 		'$1@keywords': { token: 'keyword.$0' },
    // 		'$1@contextual_keywords': { token: 'identifier.$0' },
    // 		'@default': ['identifier','delimiter']
    // 	}
    // }],
    // identifiers and keywords
    [/\@[a-zA-Z_]\w*/, 'variable.instance'], [/\$\w+\$/, 'identifier.env'], [/\$\d+/, 'identifier.special'], [/\$[a-zA-Z_]\w*/, 'identifier.sys'], [/[A-Z][A-Za-z\d\-\_]*/, {
      token: 'identifier.const'
    }], [/[a-z_][A-Za-z\d\-\_]*/, {
      token: 'identifier'
    }], [/\(/, {
      token: 'paren.open',
      next: '@parens'
    }], // whitespace
    {
      include: '@whitespace'
    }, {
      include: '@tag'
    }, {
      include: '@tag_singleton_ref'
    }, // Comments
    [/### (javascript|compiles to)\:/, {
      token: 'comment',
      next: '@js_comment',
      nextEmbedded: 'text/javascript'
    }], {
      include: '@comments'
    }, [/(\:)([\@\w\-\_]+)/, ['symbol.start', 'symbol']], [/\$\d+/, 'entity.special.arg'], [/\&/, 'operator'], // regular expressions
    [/\/(?!\ )(?=([^\\\/]|\\.)+\/)/, {
      token: 'regexp.slash',
      bracket: '@open',
      next: '@regexp'
    }], // ['///', { token: 'regexp', next: '@hereregexp' }],
    // [/^(\s*)(@regEx)/, ['', 'regexp']],
    // [/(\()(\s*)(@regEx)/, ['@brackets', '', 'regexp']],
    // [/(\,)(\s*)(@regEx)/, ['delimiter', '', 'regexp']],
    // [/(\=)(\s*)(@regEx)/, ['delimiter', '', 'regexp']],
    // [/(\:)(\s*)(@regEx)/, ['delimiter', '', 'regexp']],
    // [/(\[)(\s*)(@regEx)/, ['@brackets', '', 'regexp']],
    // [/(\!)(\s*)(@regEx)/, ['delimiter', '', 'regexp']],
    // [/(\&)(\s*)(@regEx)/, ['delimiter', '', 'regexp']],
    // [/(\|)(\s*)(@regEx)/, ['delimiter', '', 'regexp']],
    // [/(\?)(\s*)(@regEx)/, ['delimiter', '', 'regexp']],
    // [/(\{)(\s*)(@regEx)/, ['@brackets', '', 'regexp']],
    // [/(\;)(\s*)(@regEx)/, ['', '', 'regexp']],
    // 
    [/}/, {
      cases: {
        '$S2==interpolatedstring': {
          token: 'string',
          next: '@pop'
        },
        '@default': '@brackets'
      }
    }], [/[\{\}\(\)\[\]]/, '@brackets'], {
      include: '@operators'
    }, // numbers
    {
      include: '@number'
    }, // delimiter: after number because of .\d floats
    [/[,]/, 'delimiter.comma'], [/[.]/, 'delimiter.dot'], // strings:
    [/"""/, 'string', '@herestring."""'], [/'''/, 'string', '@herestring.\'\'\''], [/"/, {
      cases: {
        '@eos': 'string',
        '@default': {
          token: 'string',
          next: '@string."'
        }
      }
    }], [/'/, {
      cases: {
        '@eos': 'string',
        '@default': {
          token: 'string',
          next: '@string.\''
        }
      }
    }]],
    js_comment: [[/###/, {
      token: 'comment',
      next: '@pop',
      nextEmbedded: '@pop'
    }]],
    string_start: [[/"""/, 'string', '@herestring."""'], [/'''/, 'string', '@herestring.\'\'\''], [/"/, {
      cases: {
        '@eos': 'string',
        '@default': {
          token: 'string',
          next: '@string."'
        }
      }
    }], [/'/, {
      cases: {
        '@eos': 'string',
        '@default': {
          token: 'string',
          next: '@string.\''
        }
      }
    }]],
    value: [{
      include: 'string_start'
    }, {
      include: '@number'
    }],
    unspaced_expr: [[/([a-z]\w*)(\:)(?=\w)/, {
      cases: {
        'this:': ['variable.predefined.this', 'delimiter.access'],
        'self:': ['variable.predefined.self', 'delimiter.access'],
        '@default': ['identifier', 'delimiter.access']
      }
    }], [/(@ivar)(\:)(?=\w)/, [names.ivar, names.access]], [/(@constant)(\:)(?=\w)/, [names.constant, names.access]]],
    number: [[/\d+[eE]([\-+]?\d+)?/, 'number.float'], [/\d+\.\d+([eE][\-+]?\d+)?/, 'number.float'], [/0[xX][0-9a-fA-F]+/, 'number.hex'], [/0[0-7]+(?!\d)/, 'number.octal'], [/\d+/, 'number']],
    operators: [[/@symbols/, {
      cases: {
        '@operators': 'operator',
        '@math': 'operator.math',
        '@logic': 'operator.logic',
        '@dot': 'operator.dot',
        '@default': 'delimiter'
      }
    }], [/\&\b/, 'operator']],
    whitespace: [[/[ \t\r\n]+/, 'white']],
    comments: [[/###/, 'comment', '@comment'], [/#(\s.*)?$/, 'comment']],
    tag: [[/\<\>/, {
      token: 'tag.empty'
    }], [/(<)([a-z][a-z\-\d]*(?:\:[A-Za-z\-\d]+)?)/, ['tag.open', {
      token: 'tag.name.tag-$2',
      next: '@tag_start'
    }]], [/(<)([A-Z][A-Za-z\-\d]*)/, ['tag.open', {
      token: 'tag.name.local',
      next: '@tag_start'
    }]], [/(<)(?=[a-z\d\#\.\{\@])/, {
      token: 'tag.open',
      next: '@tag_start'
    }]],
    tag_singleton_ref: [[/\#(-*[a-zA-Z][\w\-]*)+/, 'tag.singleton.ref']],
    tag_parts: [[/\#(-*[a-zA-Z][\w\-]*)/, 'tag.id'], [/\.(-*[a-zA-Z][\w\-]*)/, 'tag.class'], [/\@(-*[a-zA-Z][\w\-]*)/, 'tag.iref'], [/[\#\.\@]\{/, {
      token: 'tag.interpolated.open',
      next: '@tag_inter'
    }]],
    tag_start: [[/[ \t\r\n]+/, {
      token: 'white',
      switchTo: '@tag_content'
    }], {
      include: 'tag_parts'
    }, [/\[/, {
      token: 'tag.data.open',
      next: '@tag_data'
    }], [/[\=\-]?\>/, {
      token: 'tag.close',
      next: '@pop'
    }]],
    tag_inter: [['}', {
      token: 'tag.interpolated.close',
      next: '@pop'
    }], {
      include: 'body'
    }],
    tag_data: [[']', {
      token: 'tag.data.close',
      next: '@pop'
    }], {
      include: 'body'
    }],
    tag_content: [// [/(\:[a-zA-Z][\w\-]*)((?:\.[a-zA-Z][\w\-]*)+|)\s*(\=)\s*/, ['tag.attribute.listener','tag.attribute.modifier','tag.attribute'], '@tag_attr_value'],
    [/(\:[a-zA-Z][\w\-]*)((?:\.[a-zA-Z][\w\-]*)+)/, ['tag.attribute.listener', 'tag.attribute.modifier']], [/(\:[a-zA-Z][\w\-]*)/, {
      token: 'tag.attribute.listener'
    }], // [/(\.[a-zA-Z\-][\w\-]*)/, { token: 'tag.class.conditional'}],
    [/([a-zA-Z\-][\w\-]*(\:[a-zA-Z][\w\-]*)?)/, {
      token: 'tag.attribute.name'
    }], // [/([\:][a-zA-Z][\w\-]*([\:\.][a-zA-Z][\w\-]*)*)\s*(\=)\s*/, { token: 'tag.attribute.listener', next: '@tag_attr_value' }],
    // [/([@\.]?[a-zA-Z][\w\-]*([\:\.][a-zA-Z][\w\-]*)*)\s*(\=)\s*/, { token: 'tag.attribute', next: '@tag_attr_value' }],
    {
      include: 'tag_parts'
    }, {
      include: '@whitespace'
    }, // ['>', { token: 'tag.close', next: '@pop' }],
    [/[\=\-]?\>/, {
      token: 'tag.close',
      next: '@pop'
    }], // [/\s*\=\s*(?!\>)/, { token: 'tag.attribute.operator', next: '@tag_attr_value' }],
    [/(\=)\s*/, {
      token: 'delimiter.eq.tag',
      next: '@tag_attr_value'
    }], // switch to rather?
    [/\(/, {
      token: 'paren.open.tag',
      next: '@tag_parens'
    }]],
    tag_attr_value: [[/(?=(\:?[\w]+\=))/, {
      token: '',
      next: '@pop'
    }], [/(?=(\>|\s))/, {
      token: '',
      next: '@pop'
    }], [/\(/, {
      token: 'paren.open',
      next: '@parens'
    }], [/\{/, {
      token: 'brace.open',
      next: '@braces'
    }], [/\[/, {
      token: 'bracket.open',
      next: '@brackets'
    }], {
      include: 'body' // { include: 'unspaced_expr'},
      // [/\(/, { token: 'paren.open', next: '@parens' }],
      // [/\{/, { token: 'brace.open', next: '@braces' }]

    }],
    tag_parens: [[/\)/, {
      token: 'paren.close.tag',
      next: '@pop'
    }], [/(\))(\:?)/, ['paren.close.tag', 'delimiter.colon'], '@pop'], {
      include: 'body'
    }],
    importstart: [[/^./, {
      token: '@rematch',
      next: '@pop'
    }], [/(from|as)/, {
      token: 'keyword.$1'
    }], [/[\{\}\,]/, {
      token: 'keyword'
    }], [/"""/, 'string', '@herestring."""'], [/'''/, 'string', '@herestring.\'\'\''], [/"/, {
      cases: {
        '@eos': 'string',
        '@default': {
          token: 'string',
          next: '@string."'
        }
      }
    }], [/'/, {
      cases: {
        '@eos': 'string',
        '@default': {
          token: 'string',
          next: '@string.\''
        }
      }
    }], [/[a-z_A-Z][A-Za-z\d\-\_]*/, {
      token: 'identifier.import'
    }]],
    parens: [[/\)/, {
      token: 'paren.close',
      next: '@pop'
    }], [/(\))(\:?)/, ['paren.close', 'delimiter.colon'], '@pop'], {
      include: 'body'
    }],
    braces: [['}', {
      token: 'brace.close',
      next: '@pop'
    }], {
      include: 'body'
    }],
    brackets: [[']', {
      token: 'bracket.close',
      next: '@pop'
    }], {
      include: 'body'
    }],
    declstart: [[/^./, {
      token: '@rematch',
      next: '@pop'
    }], [/[A-Z][A-Za-z\d\-\_]*/, {
      token: 'identifier.decl.$S2'
    }], [/\./, {
      token: 'delimiter.dot'
    }], [/[a-z_][A-Za-z\d\-\_]*/, {
      token: 'identifier.decl.$S2'
    }], [/[ \t\<\>]+/, 'operator.inherits string']],
    defstart: [[/(self)\./, {
      token: 'identifier.decl.def.self'
    }], [/@methodName/, {
      token: 'identifier.decl.def',
      next: '@pop'
    }], [/^./, {
      token: '@rematch',
      next: '@pop'
    }]],
    propstart: [[/@identifier/, {
      token: 'identifier.decl.$S2',
      next: '@pop'
    }], [/^./, {
      token: '@rematch',
      next: '@pop'
    }]],
    string: [[/[^"'\{\\]+/, 'string'], [/@escapes/, 'string.escape'], [/\./, 'string.escape.invalid'], [/\./, 'string.escape.invalid'], [/\{/, {
      cases: {
        '$S2=="': {
          token: 'string',
          next: 'root.interpolatedstring'
        },
        '@default': 'string'
      }
    }], [/["']/, {
      cases: {
        '$#==$S2': {
          token: 'string',
          next: '@pop'
        },
        '@default': 'string'
      }
    }], [/#/, 'string']],
    herestring: [[/("""|''')/, {
      cases: {
        '$1==$S2': {
          token: 'string',
          next: '@pop'
        },
        '@default': 'string'
      }
    }], [/[^#\\'"\{]+/, 'string'], [/['"]+/, 'string'], [/@escapes/, 'string.escape'], [/\./, 'string.escape.invalid'], [/\{/, {
      cases: {
        '$S2=="""': {
          token: 'string',
          next: 'root.interpolatedstring'
        },
        '@default': 'string'
      }
    }], [/#/, 'string']],
    comment: [[/[^#]+/, 'comment'], [/###/, 'comment', '@pop'], [/#/, 'comment']],
    hereregexp: [[/[^\\\/#]/, 'regexp'], [/\\./, 'regexp'], [/#.*$/, 'comment'], ['///[igm]*', {
      token: 'regexp',
      next: '@pop'
    }], [/\//, 'regexp']],
    regexp: [[/(\{)(\d+(?:,\d*)?)(\})/, ['regexp.escape.control', 'regexp.escape.control', 'regexp.escape.control']], [/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ['regexp.escape.control', {
      token: 'regexp.escape.control',
      next: '@regexrange'
    }]], [/(\()(\?:|\?=|\?!)/, ['regexp.escape.control', 'regexp.escape.control']], [/[()]/, 'regexp.escape.control'], [/@regexpctl/, 'regexp.escape.control'], [/[^\\\/]/, 'regexp'], [/@regexpesc/, 'regexp.escape'], [/\\\./, 'regexp.invalid'], ['/', {
      token: 'regexp.slash',
      bracket: '@close'
    }, '@pop']],
    regexrange: [[/-/, 'regexp.escape.control'], [/\^/, 'regexp.invalid'], [/@regexpesc/, 'regexp.escape'], [/[^\]]/, 'regexp'], [/\]/, 'regexp.escape.control', '@pop']]
  }
};

/***/ }),

/***/ "./src/monaco/java.js":
/*!****************************!*\
  !*** ./src/monaco/java.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exports.conf = {
  // the default separators except `@$`
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/']
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')']],
  autoClosingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }],
  surroundingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }, {
    open: '<',
    close: '>'
  }]
};
exports.language = {
  defaultToken: '',
  tokenPostfix: '.java',
  keywords: ['abstract', 'continue', 'for', 'new', 'switch', 'assert', 'default', 'goto', 'package', 'synchronized', 'boolean', 'do', 'if', 'private', 'this', 'break', 'double', 'implements', 'protected', 'throw', 'byte', 'else', 'import', 'public', 'throws', 'case', 'enum', 'instanceof', 'return', 'transient', 'catch', 'extends', 'int', 'short', 'try', 'char', 'final', 'interface', 'static', 'void', 'class', 'finally', 'long', 'strictfp', 'volatile', 'const', 'float', 'native', 'super', 'while', 'true', 'false'],
  operators: ['=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=', '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%', '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>='],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [// identifiers and keywords
    [/[a-zA-Z_$][\w$]*/, {
      cases: {
        '@keywords': {
          token: 'keyword.$0'
        },
        '@default': 'identifier'
      }
    }], // whitespace
    {
      include: '@whitespace'
    }, // delimiters and operators
    [/[{}()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/@symbols/, {
      cases: {
        '@operators': 'delimiter',
        '@default': ''
      }
    }], // @ annotations.
    [/@\s*[a-zA-Z_\$][\w\$]*/, 'annotation'], // numbers
    [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, 'number.float'], [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, 'number.float'], [/0[xX](@hexdigits)[Ll]?/, 'number.hex'], [/0(@octaldigits)[Ll]?/, 'number.octal'], [/0[bB](@binarydigits)[Ll]?/, 'number.binary'], [/(@digits)[fFdD]/, 'number.float'], [/(@digits)[lL]?/, 'number'], // delimiter: after number because of .\d floats
    [/[;,.]/, 'delimiter'], // strings
    [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
    [/"/, 'string', '@string'], // characters
    [/'[^\\']'/, 'string'], [/(')(@escapes)(')/, ['string', 'string.escape', 'string']], [/'/, 'string.invalid']],
    whitespace: [[/[ \t\r\n]+/, ''], [/\/\*\*(?!\/)/, 'comment.doc', '@javadoc'], [/\/\*/, 'comment', '@comment'], [/\/\/.*$/, 'comment']],
    comment: [[/[^\/*]+/, 'comment'], // [/\/\*/, 'comment', '@push' ],    // nested comment not allowed :-(
    // [/\/\*/,    'comment.invalid' ],    // this breaks block comments in the shape of /* //*/
    [/\*\//, 'comment', '@pop'], [/[\/*]/, 'comment']],
    //Identical copy of comment above, except for the addition of .doc
    javadoc: [[/[^\/*]+/, 'comment.doc'], // [/\/\*/, 'comment.doc', '@push' ],    // nested comment not allowed :-(
    [/\/\*/, 'comment.doc.invalid'], [/\*\//, 'comment.doc', '@pop'], [/[\/*]/, 'comment.doc']],
    string: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"/, 'string', '@pop']]
  }
};

/***/ }),

/***/ "./src/monaco/javascript.js":
/*!**********************************!*\
  !*** ./src/monaco/javascript.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var language = exports.language = {
  tokenPostfix: '.js',
  keywords: ['boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'in', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'let', 'await', 'async'],
  builtins: ['define', 'require', 'window', 'document', 'undefined'],
  operators: ['=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=', '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%', '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>='],
  // define our own brackets as '<' and '>' do not match in javascript
  brackets: [{
    open: '(',
    close: ')',
    token: 'bracket.parenthesis'
  }, {
    open: '{',
    close: '}',
    token: 'bracket.curly'
  }, {
    open: '[',
    close: ']',
    token: 'bracket.square'
  }],
  // common regular expressions
  symbols: /[~!@#%\^&*-+=|\\:`<>.?\/]+/,
  escapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
  exponent: /[eE][\-+]?[0-9]+/,
  regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
  regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,
  tokenizer: {
    root: [// identifiers and keywords
    [/([a-zA-Z_\$][\w\$]*)(\s*)(:?)/, {
      cases: {
        '$1==import': {
          token: 'keyword',
          next: '@import'
        },
        // ['keyword','white','delimiter', '@import'],
        '$1@keywords': ['keyword', 'white', 'delimiter'],
        '$3': ['key.identifier', 'white', 'delimiter'],
        // followed by :
        '$1@builtins': ['predefined.identifier', 'white', 'delimiter'],
        '@default': ['identifier', 'white', 'delimiter']
      }
    }], // whitespace
    {
      include: '@whitespace'
    }, // regular expression: ensure it is terminated before beginning (otherwise it is an opeator)
    [/\/(?=([^\\\/]|\\.)+\/(?!\/))/, {
      token: 'regexp.slash',
      bracket: '@open',
      next: '@regexp'
    }], [/(<)([:\w]+)/, ['start.delimiter.tag', {
      token: 'tag',
      next: '@tagContent'
    }]], // delimiters and operators
    [/[{}()\[\]]/, '@brackets'], [/[;,.]/, 'delimiter'], [/@symbols/, {
      cases: {
        '@operators': 'operator',
        '@default': ''
      }
    }], // numbers
    [/\d+\.\d*(@exponent)?/, 'number.float'], [/\.\d+(@exponent)?/, 'number.float'], [/\d+@exponent/, 'number.float'], [/0[xX][\da-fA-F]+/, 'number.hex'], [/0[0-7]+/, 'number.octal'], [/\d+/, 'number'], {
      include: '@strings'
    }],
    strings: [// strings: recover on non-terminated strings
    [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
    [/'([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
    [/"/, 'string', '@string."'], [/'/, 'string', '@string.\'']],
    rootInBrace: [[/\}/, 'delimiter', '@pop'], {
      include: '@root'
    }],
    tagContent: [[/\/\s*>/, 'delimiter', '@pop'], [/>/, {
      token: 'end.delimiter.tag',
      switchTo: '@tagBody'
    }], [/"([^"]*)"/, 'attribute.value'], [/'([^']*)'/, 'attribute.value'], [/[\w\-]+/, 'attribute.name'], [/\=/, 'delimiter'], [/\{/, 'delimiter', '@rootInBrace'], {
      include: '@whitespace'
    }],
    tagBody: [[/\{/, 'delimiter', '@rootInBrace'], [/(<)([:\w]+)/, ['start.delimiter.tag', {
      token: 'tag',
      next: '@tagContent'
    }]], [/(<\/)(\w+)(>)/, ['delimiter', 'tag', {
      token: 'delimiter',
      next: '@pop'
    }]]],
    import: [[/;/, 'delimiter', '@pop'], [/^/, 'white', '@pop'], [/\b(from|as)\b/, 'keyword'], {
      include: '@whitespace'
    }, {
      include: '@strings'
    }],
    whitespace: [[/[ \t\r\n]+/, 'white'], [/\/\*/, 'comment', '@comment'], [/\/\/.*$/, 'comment']],
    comment: [[/[^\/*]+/, 'comment'], // [/\/\*/, 'comment', '@push' ],    # nested comment not allowed :-(
    [/\/\*/, 'comment.invalid'], ["\\*/", 'comment', '@pop'], [/[\/*]/, 'comment']],
    string: [[/[^\\"']+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/["']/, {
      cases: {
        '$#==$S2': {
          token: 'string',
          next: '@pop'
        },
        '@default': 'string'
      }
    }]],
    // We match regular expression quite precisely
    regexp: [[/(\{)(\d+(?:,\d*)?)(\})/, ['@brackets.regexp.escape.control', 'regexp.escape.control', '@brackets.regexp.escape.control']], [/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ['@brackets.regexp.escape.control', {
      token: 'regexp.escape.control',
      next: '@regexrange'
    }]], [/(\()(\?:|\?=|\?!)/, ['@brackets.regexp.escape.control', 'regexp.escape.control']], [/[()]/, '@brackets.regexp.escape.control'], [/@regexpctl/, 'regexp.escape.control'], [/[^\\\/]/, 'regexp'], [/@regexpesc/, 'regexp.escape'], [/\\\./, 'regexp.invalid'], ['/', {
      token: 'regexp.slash',
      bracket: '@close'
    }, '@pop']],
    regexrange: [[/-/, 'regexp.escape.control'], [/\^/, 'regexp.invalid'], [/@regexpesc/, 'regexp.escape'], [/[^\]]/, 'regexp'], [/\]/, '@brackets.regexp.escape.control', '@pop']]
  }
};

/***/ }),

/***/ "./src/monaco/languages.js":
/*!*********************************!*\
  !*** ./src/monaco/languages.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// add javascript as well
var imba = exports.imba = {
  id: 'imba',
  extensions: ['.imba'],
  aliases: ['Imba', 'imba'],
  mimetypes: ['application/imba'],
  language: __webpack_require__(/*! ./imba */ "./src/monaco/imba/index.js")
};
var ruby = exports.ruby = {
  id: 'ruby',
  extensions: ['.rb', '.rbx', '.rjs', '.gemspec', '.pp'],
  filenames: ['rakefile'],
  aliases: ['Ruby', 'rb'],
  language: __webpack_require__(/*! ./ruby */ "./src/monaco/ruby.js")
};
var javascript = exports.javascript = {
  id: 'javascript',
  extensions: ['.js', '.jsx', '.json'],
  aliases: ['JavaScript', 'js'],
  language: __webpack_require__(/*! ./javascript */ "./src/monaco/javascript.js")
};
var css = exports.css = {
  id: 'css',
  extensions: ['.css', '.scss'],
  aliases: ['CSS', 'css'],
  mimetypes: ['text/css'],
  language: __webpack_require__(/*! ./css */ "./src/monaco/css.js")
};
var python = exports.python = {
  id: 'python',
  extensions: ['.py', '.rpy', '.pyw', '.cpy', '.gyp', '.gypi'],
  aliases: ['Python', 'py'],
  firstLine: '^#!/.*\\bpython[0-9.-]*\\b',
  language: __webpack_require__(/*! ./python */ "./src/monaco/python.js")
};
var html = exports.html = {
  id: 'html',
  extensions: ['.html', '.htm', '.shtml', '.xhtml', '.mdoc', '.jsp', '.asp', '.aspx', '.jshtm'],
  aliases: ['HTML', 'htm', 'html', 'xhtml'],
  mimetypes: ['text/html', 'text/x-jshtm', 'text/template', 'text/ng-template'],
  language: __webpack_require__(/*! ./html */ "./src/monaco/html.js")
};
var less = exports.less = {
  id: 'less',
  extensions: ['.less'],
  aliases: ['Less', 'less'],
  mimetypes: ['text/x-less', 'text/less'],
  language: __webpack_require__(/*! ./less */ "./src/monaco/less.js")
};
var markdown = exports.markdown = {
  id: 'markdown',
  extensions: ['.md'],
  aliases: ['Markdown', 'md'],
  mimetypes: ['text/markdown', 'text/md'],
  language: __webpack_require__(/*! ./markdown */ "./src/monaco/markdown.js")
};
var xml = exports.xml = {
  id: 'xml',
  extensions: ['.xml', '.dtd', '.ascx', '.csproj', '.config', '.wxi', '.wxl', '.wxs', '.xaml', '.svg', '.svgz'],
  firstLine: '(\\<\\?xml.*)|(\\<svg)|(\\<\\!doctype\\s+svg)',
  aliases: ['XML', 'xml'],
  mimetypes: ['text/xml', 'application/xml', 'application/xaml+xml', 'application/xml-dtd'],
  language: __webpack_require__(/*! ./xml */ "./src/monaco/xml.js")
};
var java = exports.java = {
  id: 'java',
  extensions: ['.java', '.jav'],
  aliases: ['Java', 'java'],
  mimetypes: ['text/x-java-source', 'text/x-java'],
  language: __webpack_require__(/*! ./java */ "./src/monaco/java.js")
};

/***/ }),

/***/ "./src/monaco/less.js":
/*!****************************!*\
  !*** ./src/monaco/less.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exports.conf = {
  wordPattern: /(#?-?\d*\.\d\w*%?)|([@#!.:]?[\w-?]+%?)|[@#!.]/g,
  comments: {
    blockComment: ['/*', '*/'],
    lineComment: '//'
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')']],
  autoClosingPairs: [{
    open: '{',
    close: '}',
    notIn: ['string', 'comment']
  }, {
    open: '[',
    close: ']',
    notIn: ['string', 'comment']
  }, {
    open: '(',
    close: ')',
    notIn: ['string', 'comment']
  }, {
    open: '"',
    close: '"',
    notIn: ['string', 'comment']
  }, {
    open: '\'',
    close: '\'',
    notIn: ['string', 'comment']
  }],
  surroundingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }]
};
exports.language = {
  defaultToken: '',
  tokenPostfix: '.less',
  identifier: '-?-?([a-zA-Z]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*',
  identifierPlus: '-?-?([a-zA-Z:.]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-:.]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*',
  brackets: [{
    open: '{',
    close: '}',
    token: 'delimiter.curly'
  }, {
    open: '[',
    close: ']',
    token: 'delimiter.bracket'
  }, {
    open: '(',
    close: ')',
    token: 'delimiter.parenthesis'
  }, {
    open: '<',
    close: '>',
    token: 'delimiter.angle'
  }],
  tokenizer: {
    root: [{
      include: '@nestedJSBegin'
    }, ['[ \\t\\r\\n]+', ''], {
      include: '@comments'
    }, {
      include: '@keyword'
    }, {
      include: '@strings'
    }, {
      include: '@numbers'
    }, ['[*_]?[a-zA-Z\\-\\s]+(?=:.*(;|(\\\\$)))', 'attribute.name', '@attribute'], ['url(\\-prefix)?\\(', {
      token: 'tag',
      next: '@urldeclaration'
    }], ['[{}()\\[\\]]', '@brackets'], ['[,:;]', 'delimiter'], ['#@identifierPlus', 'tag.id'], ['&', 'tag'], ['\\.@identifierPlus(?=\\()', 'tag.class', '@attribute'], ['\\.@identifierPlus', 'tag.class'], ['@identifierPlus', 'tag'], {
      include: '@operators'
    }, ['@(@identifier(?=[:,\\)]))', 'variable', '@attribute'], ['@(@identifier)', 'variable'], ['@', 'key', '@atRules']],
    nestedJSBegin: [['``', 'delimiter.backtick'], ['`', {
      token: 'delimiter.backtick',
      next: '@nestedJSEnd',
      nextEmbedded: 'text/javascript'
    }]],
    nestedJSEnd: [['`', {
      token: 'delimiter.backtick',
      next: '@pop',
      nextEmbedded: '@pop'
    }]],
    operators: [['[<>=\\+\\-\\*\\/\\^\\|\\~]', 'operator']],
    keyword: [['(@[\\s]*import|![\\s]*important|true|false|when|iscolor|isnumber|isstring|iskeyword|isurl|ispixel|ispercentage|isem|hue|saturation|lightness|alpha|lighten|darken|saturate|desaturate|fadein|fadeout|fade|spin|mix|round|ceil|floor|percentage)\\b', 'keyword']],
    urldeclaration: [{
      include: '@strings'
    }, ['[^)\r\n]+', 'string'], ['\\)', {
      token: 'tag',
      next: '@pop'
    }]],
    attribute: [{
      include: '@nestedJSBegin'
    }, {
      include: '@comments'
    }, {
      include: '@strings'
    }, {
      include: '@numbers'
    }, {
      include: '@keyword'
    }, ['[a-zA-Z\\-]+(?=\\()', 'attribute.value', '@attribute'], ['>', 'operator', '@pop'], ['@identifier', 'attribute.value'], {
      include: '@operators'
    }, ['@(@identifier)', 'variable'], ['[)\\}]', '@brackets', '@pop'], ['[{}()\\[\\]>]', '@brackets'], ['[;]', 'delimiter', '@pop'], ['[,=:]', 'delimiter'], ['\\s', ''], ['.', 'attribute.value']],
    comments: [['\\/\\*', 'comment', '@comment'], ['\\/\\/+.*', 'comment']],
    comment: [['\\*\\/', 'comment', '@pop'], ['.', 'comment']],
    numbers: [['(\\d*\\.)?\\d+([eE][\\-+]?\\d+)?', {
      token: 'attribute.value.number',
      next: '@units'
    }], ['#[0-9a-fA-F_]+(?!\\w)', 'attribute.value.hex']],
    units: [['(em|ex|ch|rem|vmin|vmax|vw|vh|vm|cm|mm|in|px|pt|pc|deg|grad|rad|turn|s|ms|Hz|kHz|%)?', 'attribute.value.unit', '@pop']],
    strings: [['~?"', {
      token: 'string.delimiter',
      next: '@stringsEndDoubleQuote'
    }], ['~?\'', {
      token: 'string.delimiter',
      next: '@stringsEndQuote'
    }]],
    stringsEndDoubleQuote: [['\\\\"', 'string'], ['"', {
      token: 'string.delimiter',
      next: '@popall'
    }], ['.', 'string']],
    stringsEndQuote: [['\\\\\'', 'string'], ['\'', {
      token: 'string.delimiter',
      next: '@popall'
    }], ['.', 'string']],
    atRules: [{
      include: '@comments'
    }, {
      include: '@strings'
    }, ['[()]', 'delimiter'], ['[\\{;]', 'delimiter', '@pop'], ['.', 'key']]
  }
};

/***/ }),

/***/ "./src/monaco/markdown.js":
/*!********************************!*\
  !*** ./src/monaco/markdown.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Difficulty: "Ultra-Violence"
// Language definition for Markdown
// Quite complex definition mostly due to almost full inclusion
// of the HTML mode (so we can properly match nested HTML tag definitions)
exports.language = {
  // escape codes
  control: /[\\`*_\[\]{}()#+\-\.!]/,
  noncontrol: /[^\\`*_\[\]{}()#+\-\.!]/,
  escapes: /\\(?:@control)/,
  // escape codes for javascript/CSS strings
  jsescapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
  // non matched elements
  empty: ['area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param'],
  tokenizer: {
    root: [// headers
    [/^(\s*)(#+)((?:[^\\#]|@escapes)+)((?:#+)?)/, ['white', 'keyword.$1', 'keyword.$1', 'keyword.$1']], [/^\s*(=+|\-+)\s*$/, 'keyword.header'], [/^\s*((\*[ ]?)+)\s*$/, 'keyword.header'], // code & quote
    [/^\s*>+/, 'string.quote'], [/^(\t|[ ]{4}).*$/, 'namespace.code'], // code line
    [/^\s*~+\s*$/, {
      token: 'namespace.code',
      bracket: '@open',
      next: '@codeblock'
    }], // github style code blocks
    [/^\s*````\s*(\w+)\s*$/, {
      token: 'namespace.code',
      bracket: '@open',
      next: '@codeblockgh',
      nextEmbedded: 'text/x-$1'
    }], [/^\s*````\s*((?:\w|[\/\-])+)\s*$/, {
      token: 'namespace.code',
      bracket: '@open',
      next: '@codeblockgh',
      nextEmbedded: '$1'
    }], // list
    [/^\s*([\*\-+:]|\d\.)/, 'string.list'], // markup within lines
    {
      include: '@linecontent'
    }],
    codeblock: [[/^\s*~+\s*$/, {
      token: 'namespace.code',
      bracket: '@close',
      next: '@pop'
    }], [/.*$/, 'namespace.code']],
    // github style code blocks
    codeblockgh: [[/````\s*$/, {
      token: '@rematch',
      bracket: '@close',
      switchTo: '@codeblockghend',
      nextEmbedded: '@pop'
    }], [/[^`]*$/, 'namespace.code']],
    codeblockghend: [[/\s*````/, {
      token: 'namespace.code',
      bracket: '@close',
      next: '@pop'
    }], [/./, '@rematch', '@pop']],
    linecontent: [// [/\s(?=<(\w+)[^>]*>)/, {token: 'html', next: 'html.$1', nextEmbedded: 'text/html' } ],
    // [/<(\w+)[^>]*>/, {token: '@rematch', next: 'html.$1', nextEmbedded: 'text/html' } ],
    // escapes
    [/&\w+;/, 'string.escape'], [/@escapes/, 'escape'], // various markup
    [/\b__([^\\_]|@escapes|_(?!_))+__\b/, 'strong'], [/\*\*([^\\*]|@escapes|\*(?!\*))+\*\*/, 'strong'], [/\b_[^_]+_\b/, 'emphasis'], [/\*([^\\*]|@escapes)+\*/, 'emphasis'], [/`([^\\`]|@escapes)+`/, 'namespace.code'], // links
    [/\{[^}]+\}/, 'string.target'], [/(!?\[)((?:[^\]\\]|@escapes)+)(\]\([^\)]+\))/, ['string.link', '', 'string.link']], [/(!?\[)((?:[^\]\\]|@escapes)+)(\])/, 'string.link'], // or html
    {
      include: 'html'
    }],
    html: [// html tags
    [/<(\w+)\/>/, 'tag.tag-$1'], [/<(\w+)/, {
      cases: {
        '@empty': {
          token: 'tag.tag-$1',
          next: '@tag.$1'
        },
        '@default': {
          token: 'tag.tag-$1',
          bracket: '@open',
          next: '@tag.$1'
        }
      }
    }], [/<\/(\w+)\s*>/, {
      token: 'tag.tag-$1',
      bracket: '@close',
      next: '@pop'
    }], // whitespace
    {
      include: '@whitespace'
    }],
    // whitespace and (html style) comments
    whitespace: [[/[ ]{2}$/, 'invalid'], [/[ \t\r\n]+/, 'white'], [/<!--/, 'comment', '@comment']],
    comment: [[/[^<\-]+/, 'comment.content'], [/-->/, 'comment', '@pop'], [/<!--/, 'comment.content.invalid'], [/[<\-]/, 'comment.content']],
    // Almost full HTML tag matching, complete with embedded scripts & styles
    tag: [[/[ \t\r\n]+/, 'white'], [/(type)(\s*=\s*)(")([^"]+)(")/, ['attribute.name', 'delimiter', 'attribute.value', {
      token: 'attribute.value',
      switchTo: '@tag.$S2.$4'
    }, 'attribute.value']], [/(type)(\s*=\s*)(')([^']+)(')/, ['attribute.name', 'delimiter', 'attribute.value', {
      token: 'attribute.value',
      switchTo: '@tag.$S2.$4'
    }, 'attribute.value']], [/(\w+)(\s*=\s*)("[^"]*"|'[^']*')/, ['attribute.name', 'delimiter', 'attribute.value']], [/\w+/, 'attribute.name'], [/\/>/, 'tag.tag-$S2', '@pop'], [/>/, {
      cases: {
        '$S2==style': {
          token: 'tag.tag-$S2',
          switchTo: '@embedded.$S2',
          nextEmbedded: 'text/css'
        },
        '$S2==script': {
          cases: {
            '$S3': {
              token: 'tag.tag-$S2',
              switchTo: '@embedded.$S2',
              nextEmbedded: '$S3'
            },
            '@default': {
              token: 'tag.tag-$S2',
              switchTo: '@embedded.$S2',
              nextEmbedded: 'mjavascript'
            }
          }
        },
        '@default': {
          token: 'tag.tag-$S2',
          switchTo: 'html'
        }
      }
    }]],
    embedded: [[/[^"'<]+/, ''], [/<\/(\w+)\s*>/, {
      cases: {
        '$1==$S2': {
          token: '@rematch',
          switchTo: '@html',
          nextEmbedded: '@pop'
        },
        '@default': ''
      }
    }], [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
    [/'([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
    [/"/, 'string', '@string."'], [/'/, 'string', '@string.\''], [/</, '']],
    // scan embedded strings in javascript or css
    string: [[/[^\\"']+/, 'string'], [/@jsescapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/["']/, {
      cases: {
        '$#==$S2': {
          token: 'string',
          next: '@pop'
        },
        '@default': 'string'
      }
    }]]
  }
};

/***/ }),

/***/ "./src/monaco/python.js":
/*!******************************!*\
  !*** ./src/monaco/python.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exports.conf = {
  comments: {
    lineComment: '#',
    blockComment: ['\'\'\'', '\'\'\'']
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')']],
  autoClosingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"',
    notIn: ['string']
  }, {
    open: '\'',
    close: '\'',
    notIn: ['string', 'comment']
  }],
  surroundingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }]
};
exports.language = {
  defaultToken: '',
  tokenPostfix: '.python',
  keywords: ['and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'None', 'not', 'or', 'pass', 'print', 'raise', 'return', 'self', 'try', 'while', 'with', 'yield', 'int', 'float', 'long', 'complex', 'hex', 'abs', 'all', 'any', 'apply', 'basestring', 'bin', 'bool', 'buffer', 'bytearray', 'callable', 'chr', 'classmethod', 'cmp', 'coerce', 'compile', 'complex', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'execfile', 'file', 'filter', 'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'id', 'input', 'intern', 'isinstance', 'issubclass', 'iter', 'len', 'locals', 'list', 'map', 'max', 'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print', 'property', 'reversed', 'range', 'raw_input', 'reduce', 'reload', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'unichr', 'unicode', 'vars', 'xrange', 'zip', 'True', 'False', '__dict__', '__methods__', '__members__', '__class__', '__bases__', '__name__', '__mro__', '__subclasses__', '__init__', '__import__'],
  brackets: [{
    open: '{',
    close: '}',
    token: 'delimiter.curly'
  }, {
    open: '[',
    close: ']',
    token: 'delimiter.bracket'
  }, {
    open: '(',
    close: ')',
    token: 'delimiter.parenthesis'
  }],
  tokenizer: {
    root: [{
      include: '@whitespace'
    }, {
      include: '@numbers'
    }, {
      include: '@strings'
    }, [/[,:;]/, 'delimiter'], [/[{}\[\]()]/, '@brackets'], [/@[a-zA-Z]\w*/, 'tag'], [/[a-zA-Z]\w*/, {
      cases: {
        '@keywords': 'keyword',
        '@default': 'identifier'
      }
    }]],
    // Deal with white space, including single and multi-line comments
    whitespace: [[/\s+/, 'white'], [/(^#.*$)/, 'comment'], [/('''.*''')|(""".*""")/, 'string'], [/'''.*$/, 'string', '@endDocString'], [/""".*$/, 'string', '@endDblDocString']],
    endDocString: [[/\\'/, 'string'], [/.*'''/, 'string', '@popall'], [/.*$/, 'string']],
    endDblDocString: [[/\\"/, 'string'], [/.*"""/, 'string', '@popall'], [/.*$/, 'string']],
    // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
    numbers: [[/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'], [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, 'number']],
    // Recognize strings, including those broken across lines with \ (but not without)
    strings: [[/'$/, 'string.escape', '@popall'], [/'/, 'string.escape', '@stringBody'], [/"$/, 'string.escape', '@popall'], [/"/, 'string.escape', '@dblStringBody']],
    stringBody: [[/\\./, 'string'], [/'/, 'string.escape', '@popall'], [/.(?=.*')/, 'string'], [/.*\\$/, 'string'], [/.*$/, 'string', '@popall']],
    dblStringBody: [[/\\./, 'string'], [/"/, 'string.escape', '@popall'], [/.(?=.*")/, 'string'], [/.*\\$/, 'string'], [/.*$/, 'string', '@popall']]
  }
};

/***/ }),

/***/ "./src/monaco/ruby.js":
/*!****************************!*\
  !*** ./src/monaco/ruby.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exports.conf = {
  comments: {
    lineComment: '#',
    blockComment: ['=begin', '=end']
  },
  brackets: [['(', ')'], ['{', '}'], ['[', ']']],
  autoClosingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }],
  surroundingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }]
};
/*
 * Ruby language definition
 *
 * Quite a complex language due to elaborate escape sequences
 * and quoting of literate strings/regular expressions, and
 * an 'end' keyword that does not always apply to modifiers like until and while,
 * and a 'do' keyword that sometimes starts a block, but sometimes is part of
 * another statement (like 'while').
 *
 * (1) end blocks:
 * 'end' may end declarations like if or until, but sometimes 'if' or 'until'
 * are modifiers where there is no 'end'. Also, 'do' sometimes starts a block
 * that is ended by 'end', but sometimes it is part of a 'while', 'for', or 'until'
 * To do proper brace matching we do some elaborate state manipulation.
 * some examples:
 *
 *   until bla do
 *     work until tired
 *     list.each do
 *       something if test
 *     end
 *   end
 *
 * or
 *
 * if test
 *  something (if test then x end)
 *  bar if bla
 * end
 *
 * or, how about using class as a property..
 *
 * class Test
 *   def endpoint
 *     self.class.endpoint || routes
 *   end
 * end
 *
 * (2) quoting:
 * there are many kinds of strings and escape sequences. But also, one can
 * start many string-like things as '%qx' where q specifies the kind of string
 * (like a command, escape expanded, regular expression, symbol etc.), and x is
 * some character and only another 'x' ends the sequence. Except for brackets
 * where the closing bracket ends the sequence.. and except for a nested bracket
 * inside the string like entity. Also, such strings can contain interpolated
 * ruby expressions again (and span multiple lines). Moreover, expanded
 * regular expression can also contain comments.
 */

exports.language = {
  tokenPostfix: '.ruby',
  keywords: ['__LINE__', '__ENCODING__', '__FILE__', 'BEGIN', 'END', 'alias', 'and', 'begin', 'break', 'case', 'class', 'def', 'defined?', 'do', 'else', 'elsif', 'end', 'ensure', 'for', 'false', 'if', 'in', 'module', 'next', 'nil', 'not', 'or', 'redo', 'rescue', 'retry', 'return', 'self', 'super', 'then', 'true', 'undef', 'unless', 'until', 'when', 'while', 'yield'],
  keywordops: ['::', '..', '...', '?', ':', '=>'],
  builtins: ['require', 'public', 'private', 'include', 'extend', 'attr_reader', 'protected', 'private_class_method', 'protected_class_method', 'new'],
  // these are closed by 'end' (if, while and until are handled separately)
  declarations: ['module', 'class', 'def', 'case', 'do', 'begin', 'for', 'if', 'while', 'until', 'unless'],
  linedecls: ['def', 'case', 'do', 'begin', 'for', 'if', 'while', 'until', 'unless'],
  operators: ['^', '&', '|', '<=>', '==', '===', '!~', '=~', '>', '>=', '<', '<=', '<<', '>>', '+', '-', '*', '/', '%', '**', '~', '+@', '-@', '[]', '[]=', '`', '+=', '-=', '*=', '**=', '/=', '^=', '%=', '<<=', '>>=', '&=', '&&=', '||=', '|='],
  brackets: [{
    open: '(',
    close: ')',
    token: 'delimiter.parenthesis'
  }, {
    open: '{',
    close: '}',
    token: 'delimiter.curly'
  }, {
    open: '[',
    close: ']',
    token: 'delimiter.square'
  }],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%\.]+/,
  // escape sequences
  escape: /(?:[abefnrstv\\"'\n\r]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2}|u[0-9A-Fa-f]{4})/,
  escapes: /\\(?:C\-(@escape|.)|c(@escape|.)|@escape)/,
  decpart: /\d(_?\d)*/,
  decimal: /0|@decpart/,
  delim: /[^a-zA-Z0-9\s\n\r]/,
  heredelim: /(?:\w+|'[^']*'|"[^"]*"|`[^`]*`)/,
  regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
  regexpesc: /\\(?:[AzZbBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})?/,
  // The main tokenizer for our languages
  tokenizer: {
    // Main entry.
    // root.<decl> where decl is the current opening declaration (like 'class')
    root: [// identifiers and keywords
    // most complexity here is due to matching 'end' correctly with declarations.
    // We distinguish a declaration that comes first on a line, versus declarations further on a line (which are most likey modifiers)
    [/^(\s*)([a-z_]\w*[!?=]?)/, ['white', {
      cases: {
        'for|until|while': {
          token: 'keyword.$2',
          next: '@dodecl.$2'
        },
        '@declarations': {
          token: 'keyword.$2',
          next: '@root.$2'
        },
        'end': {
          token: 'keyword.$S2',
          next: '@pop'
        },
        '@keywords': 'keyword',
        '@builtins': 'predefined',
        '@default': 'identifier'
      }
    }]], [/[a-z_]\w*[!?=]?/, {
      cases: {
        'if|unless|while|until': {
          token: 'keyword.$0x',
          next: '@modifier.$0x'
        },
        'for': {
          token: 'keyword.$2',
          next: '@dodecl.$2'
        },
        '@linedecls': {
          token: 'keyword.$0',
          next: '@root.$0'
        },
        'end': {
          token: 'keyword.$S2',
          next: '@pop'
        },
        '@keywords': 'keyword',
        '@builtins': 'predefined',
        '@default': 'identifier'
      }
    }], [/[A-Z][\w]*[!?=]?/, 'constructor.identifier'], // constant
    [/\$[\w]*/, 'global.constant'], // global
    [/@[\w]*/, 'namespace.instance.identifier'], // instance
    [/@@[\w]*/, 'namespace.class.identifier'], // class
    // here document
    [/<<-(@heredelim).*/, {
      token: 'string.heredoc.delimiter',
      next: '@heredoc.$1'
    }], [/[ \t\r\n]+<<(@heredelim).*/, {
      token: 'string.heredoc.delimiter',
      next: '@heredoc.$1'
    }], [/^<<(@heredelim).*/, {
      token: 'string.heredoc.delimiter',
      next: '@heredoc.$1'
    }], // whitespace
    {
      include: '@whitespace'
    }, // strings
    [/"/, {
      token: 'string.d.delim',
      next: '@dstring.d."'
    }], [/'/, {
      token: 'string.sq.delim',
      next: '@sstring.sq'
    }], // % literals. For efficiency, rematch in the 'pstring' state
    [/%([rsqxwW]|Q?)/, {
      token: '@rematch',
      next: 'pstring'
    }], // commands and symbols
    [/`/, {
      token: 'string.x.delim',
      next: '@dstring.x.`'
    }], [/:(\w|[$@])\w*[!?=]?/, 'string.s'], [/:"/, {
      token: 'string.s.delim',
      next: '@dstring.s."'
    }], [/:'/, {
      token: 'string.s.delim',
      next: '@sstring.s'
    }], // regular expressions. Lookahead for a (not escaped) closing forwardslash on the same line
    [/\/(?=(\\\/|[^\/\n])+\/)/, {
      token: 'regexp.delim',
      next: '@regexp'
    }], // delimiters and operators
    [/[{}()\[\]]/, '@brackets'], [/@symbols/, {
      cases: {
        '@keywordops': 'keyword',
        '@operators': 'operator',
        '@default': ''
      }
    }], [/[;,]/, 'delimiter'], // numbers
    [/0[xX][0-9a-fA-F](_?[0-9a-fA-F])*/, 'number.hex'], [/0[_oO][0-7](_?[0-7])*/, 'number.octal'], [/0[bB][01](_?[01])*/, 'number.binary'], [/0[dD]@decpart/, 'number'], [/@decimal((\.@decpart)?([eE][\-+]?@decpart)?)/, {
      cases: {
        '$1': 'number.float',
        '@default': 'number'
      }
    }]],
    // used to not treat a 'do' as a block opener if it occurs on the same
    // line as a 'do' statement: 'while|until|for'
    // dodecl.<decl> where decl is the declarations started, like 'while'
    dodecl: [[/^/, {
      token: '',
      switchTo: '@root.$S2'
    }], // get out of do-skipping mode on a new line
    [/[a-z_]\w*[!?=]?/, {
      cases: {
        'end': {
          token: 'keyword.$S2',
          next: '@pop'
        },
        // end on same line
        'do': {
          token: 'keyword',
          switchTo: '@root.$S2'
        },
        // do on same line: not an open bracket here
        '@linedecls': {
          token: '@rematch',
          switchTo: '@root.$S2'
        },
        // other declaration on same line: rematch
        '@keywords': 'keyword',
        '@builtins': 'predefined',
        '@default': 'identifier'
      }
    }], {
      include: '@root'
    }],
    // used to prevent potential modifiers ('if|until|while|unless') to match
    // with 'end' keywords.
    // modifier.<decl>x where decl is the declaration starter, like 'if'
    modifier: [[/^/, '', '@pop'], // it was a modifier: get out of modifier mode on a new line
    [/[a-z_]\w*[!?=]?/, {
      cases: {
        'end': {
          token: 'keyword.$S2',
          next: '@pop'
        },
        // end on same line
        'then|else|elsif|do': {
          token: 'keyword',
          switchTo: '@root.$S2'
        },
        // real declaration and not a modifier
        '@linedecls': {
          token: '@rematch',
          switchTo: '@root.$S2'
        },
        // other declaration => not a modifier
        '@keywords': 'keyword',
        '@builtins': 'predefined',
        '@default': 'identifier'
      }
    }], {
      include: '@root'
    }],
    // single quote strings (also used for symbols)
    // sstring.<kind>  where kind is 'sq' (single quote) or 's' (symbol)
    sstring: [[/[^\\']+/, 'string.$S2'], [/\\\\|\\'|\\$/, 'string.$S2.escape'], [/\\./, 'string.$S2.invalid'], [/'/, {
      token: 'string.$S2.delim',
      next: '@pop'
    }]],
    // double quoted "string".
    // dstring.<kind>.<delim> where kind is 'd' (double quoted), 'x' (command), or 's' (symbol)
    // and delim is the ending delimiter (" or `)
    dstring: [[/[^\\`"#]+/, 'string.$S2'], [/#/, 'string.$S2.escape', '@interpolated'], [/\\$/, 'string.$S2.escape'], [/@escapes/, 'string.$S2.escape'], [/\\./, 'string.$S2.escape.invalid'], [/[`"]/, {
      cases: {
        '$#==$S3': {
          token: 'string.$S2.delim',
          next: '@pop'
        },
        '@default': 'string.$S2'
      }
    }]],
    // literal documents
    // heredoc.<close> where close is the closing delimiter
    heredoc: [[/^(\s*)(@heredelim)$/, {
      cases: {
        '$2==$S2': ['string.heredoc', {
          token: 'string.heredoc.delimiter',
          next: '@pop'
        }],
        '@default': ['string.heredoc', 'string.heredoc']
      }
    }], [/.*/, 'string.heredoc']],
    // interpolated sequence
    interpolated: [[/\$\w*/, 'global.constant', '@pop'], [/@\w*/, 'namespace.class.identifier', '@pop'], [/@@\w*/, 'namespace.instance.identifier', '@pop'], [/[{]/, {
      token: 'string.escape.curly',
      switchTo: '@interpolated_compound'
    }], ['', '', '@pop']],
    // any code
    interpolated_compound: [[/[}]/, {
      token: 'string.escape.curly',
      next: '@pop'
    }], {
      include: '@root'
    }],
    // %r quoted regexp
    // pregexp.<open>.<close> where open/close are the open/close delimiter
    pregexp: [{
      include: '@whitespace'
    }, // turns out that you can quote using regex control characters, aargh!
    // for example; %r|kgjgaj| is ok (even though | is used for alternation)
    // so, we need to match those first
    [/[^\(\{\[\\]/, {
      cases: {
        '$#==$S3': {
          token: 'regexp.delim',
          next: '@pop'
        },
        '$#==$S2': {
          token: 'regexp.delim',
          next: '@push'
        },
        // nested delimiters are allowed..
        '~[)}\\]]': '@brackets.regexp.escape.control',
        '~@regexpctl': 'regexp.escape.control',
        '@default': 'regexp'
      }
    }], {
      include: '@regexcontrol'
    }],
    // We match regular expression quite precisely
    regexp: [{
      include: '@regexcontrol'
    }, [/[^\\\/]/, 'regexp'], ['/[ixmp]*', {
      token: 'regexp.delim'
    }, '@pop']],
    regexcontrol: [[/(\{)(\d+(?:,\d*)?)(\})/, ['@brackets.regexp.escape.control', 'regexp.escape.control', '@brackets.regexp.escape.control']], [/(\[)(\^?)/, ['@brackets.regexp.escape.control', {
      token: 'regexp.escape.control',
      next: '@regexrange'
    }]], [/(\()(\?[:=!])/, ['@brackets.regexp.escape.control', 'regexp.escape.control']], [/\(\?#/, {
      token: 'regexp.escape.control',
      next: '@regexpcomment'
    }], [/[()]/, '@brackets.regexp.escape.control'], [/@regexpctl/, 'regexp.escape.control'], [/\\$/, 'regexp.escape'], [/@regexpesc/, 'regexp.escape'], [/\\\./, 'regexp.invalid'], [/#/, 'regexp.escape', '@interpolated']],
    regexrange: [[/-/, 'regexp.escape.control'], [/\^/, 'regexp.invalid'], [/\\$/, 'regexp.escape'], [/@regexpesc/, 'regexp.escape'], [/[^\]]/, 'regexp'], [/\]/, '@brackets.regexp.escape.control', '@pop']],
    regexpcomment: [[/[^)]+/, 'comment'], [/\)/, {
      token: 'regexp.escape.control',
      next: '@pop'
    }]],
    // % quoted strings
    // A bit repetitive since we need to often special case the kind of ending delimiter
    pstring: [[/%([qws])\(/, {
      token: 'string.$1.delim',
      switchTo: '@qstring.$1.(.)'
    }], [/%([qws])\[/, {
      token: 'string.$1.delim',
      switchTo: '@qstring.$1.[.]'
    }], [/%([qws])\{/, {
      token: 'string.$1.delim',
      switchTo: '@qstring.$1.{.}'
    }], [/%([qws])</, {
      token: 'string.$1.delim',
      switchTo: '@qstring.$1.<.>'
    }], [/%([qws])(@delim)/, {
      token: 'string.$1.delim',
      switchTo: '@qstring.$1.$2.$2'
    }], [/%r\(/, {
      token: 'regexp.delim',
      switchTo: '@pregexp.(.)'
    }], [/%r\[/, {
      token: 'regexp.delim',
      switchTo: '@pregexp.[.]'
    }], [/%r\{/, {
      token: 'regexp.delim',
      switchTo: '@pregexp.{.}'
    }], [/%r</, {
      token: 'regexp.delim',
      switchTo: '@pregexp.<.>'
    }], [/%r(@delim)/, {
      token: 'regexp.delim',
      switchTo: '@pregexp.$1.$1'
    }], [/%(x|W|Q?)\(/, {
      token: 'string.$1.delim',
      switchTo: '@qqstring.$1.(.)'
    }], [/%(x|W|Q?)\[/, {
      token: 'string.$1.delim',
      switchTo: '@qqstring.$1.[.]'
    }], [/%(x|W|Q?)\{/, {
      token: 'string.$1.delim',
      switchTo: '@qqstring.$1.{.}'
    }], [/%(x|W|Q?)</, {
      token: 'string.$1.delim',
      switchTo: '@qqstring.$1.<.>'
    }], [/%(x|W|Q?)(@delim)/, {
      token: 'string.$1.delim',
      switchTo: '@qqstring.$1.$2.$2'
    }], [/%([rqwsxW]|Q?)./, {
      token: 'invalid',
      next: '@pop'
    }], // recover
    [/./, {
      token: 'invalid',
      next: '@pop'
    }]],
    // non-expanded quoted string.
    // qstring.<kind>.<open>.<close>
    //  kind = q|w|s  (single quote, array, symbol)
    //  open = open delimiter
    //  close = close delimiter
    qstring: [[/\\$/, 'string.$S2.escape'], [/\\./, 'string.$S2.escape'], [/./, {
      cases: {
        '$#==$S4': {
          token: 'string.$S2.delim',
          next: '@pop'
        },
        '$#==$S3': {
          token: 'string.$S2.delim',
          next: '@push'
        },
        // nested delimiters are allowed..
        '@default': 'string.$S2'
      }
    }]],
    // expanded quoted string.
    // qqstring.<kind>.<open>.<close>
    //  kind = Q|W|x  (double quote, array, command)
    //  open = open delimiter
    //  close = close delimiter
    qqstring: [[/#/, 'string.$S2.escape', '@interpolated'], {
      include: '@qstring'
    }],
    // whitespace & comments
    whitespace: [[/[ \t\r\n]+/, ''], [/^\s*=begin\b/, 'comment', '@comment'], [/#.*$/, 'comment']],
    comment: [[/[^=]+/, 'comment'], [/^\s*=begin\b/, 'comment.invalid'], // nested comment
    [/^\s*=end\b.*/, 'comment', '@pop'], [/[=]/, 'comment']]
  }
};

/***/ }),

/***/ "./src/monaco/xml.js":
/*!***************************!*\
  !*** ./src/monaco/xml.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exportsconf = {
  comments: {
    blockComment: ['<!--', '-->']
  },
  brackets: [['<', '>']],
  autoClosingPairs: [{
    open: '<',
    close: '>'
  }, {
    open: '\'',
    close: '\''
  }, {
    open: '"',
    close: '"'
  }],
  surroundingPairs: [{
    open: '<',
    close: '>'
  }, {
    open: '\'',
    close: '\''
  }, {
    open: '"',
    close: '"'
  }]
};
exports.language = {
  defaultToken: '',
  tokenPostfix: '.xml',
  ignoreCase: true,
  // Useful regular expressions
  qualifiedName: /(?:[\w\.\-]+:)?[\w\.\-]+/,
  tokenizer: {
    root: [[/[^<&]+/, ''], {
      include: '@whitespace'
    }, // Standard opening tag
    [/(<)(@qualifiedName)/, [{
      token: 'delimiter'
    }, {
      token: 'tag',
      next: '@tag'
    }]], // Standard closing tag
    [/(<\/)(@qualifiedName)(\s*)(>)/, [{
      token: 'delimiter'
    }, {
      token: 'tag'
    }, '', {
      token: 'delimiter'
    }]], // Meta tags - instruction
    [/(<\?)(@qualifiedName)/, [{
      token: 'delimiter'
    }, {
      token: 'metatag',
      next: '@tag'
    }]], // Meta tags - declaration
    [/(<\!)(@qualifiedName)/, [{
      token: 'delimiter'
    }, {
      token: 'metatag',
      next: '@tag'
    }]], // CDATA
    [/<\!\[CDATA\[/, {
      token: 'delimiter.cdata',
      next: '@cdata'
    }], [/&\w+;/, 'string.escape']],
    cdata: [[/[^\]]+/, ''], [/\]\]>/, {
      token: 'delimiter.cdata',
      next: '@pop'
    }], [/\]/, '']],
    tag: [[/[ \t\r\n]+/, ''], [/(@qualifiedName)(\s*=\s*)("[^"]*"|'[^']*')/, ['attribute.name', '', 'attribute.value']], [/(@qualifiedName)(\s*=\s*)("[^">?\/]*|'[^'>?\/]*)(?=[\?\/]\>)/, ['attribute.name', '', 'attribute.value']], [/(@qualifiedName)(\s*=\s*)("[^">]*|'[^'>]*)/, ['attribute.name', '', 'attribute.value']], [/@qualifiedName/, 'attribute.name'], [/\?>/, {
      token: 'delimiter',
      next: '@pop'
    }], [/(\/)(>)/, [{
      token: 'tag'
    }, {
      token: 'delimiter',
      next: '@pop'
    }]], [/>/, {
      token: 'delimiter',
      next: '@pop'
    }]],
    whitespace: [[/[ \t\r\n]+/, ''], [/<!--/, {
      token: 'comment',
      next: '@comment'
    }]],
    comment: [[/[^<\-]+/, 'comment.content'], [/-->/, {
      token: 'comment',
      next: '@pop'
    }], [/<!--/, 'comment.content.invalid'], [/[<\-]/, 'comment.content']]
  }
};

/***/ }),

/***/ "./src/monarch.js":
/*!************************!*\
  !*** ./src/monarch.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setTimeout) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, '__esModule', {
  value: true
});

function arrayToHash(array) {
  var result = {};

  for (var i = 0; i < array.length; ++i) {
    result[array[i]] = true;
  }

  return result;
}

function createKeywordMatcher(arr) {
  var caseInsensitive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (caseInsensitive) {
    arr = arr.map(function (x) {
      return x.toLowerCase();
    });
  }

  var hash = arrayToHash(arr);

  if (caseInsensitive) {
    return function (word) {
      return hash[word.toLowerCase()] !== undefined && hash.hasOwnProperty(word.toLowerCase());
    };
  } else {
    return function (word) {
      return hash[word] !== undefined && hash.hasOwnProperty(word);
    };
  }
}

function isFuzzyActionArr(what) {
  return Array.isArray(what);
}

function isFuzzyAction(what) {
  return !isFuzzyActionArr(what);
}

function isString$1(what) {
  return typeof what === 'string';
}

function isIAction(what) {
  return !isString$1(what);
}

function empty(s) {
  return s ? false : true;
}

function fixCase(lexer, str) {
  return lexer.ignoreCase && str ? str.toLowerCase() : str;
}

function sanitize(s) {
  return s.replace(/[&<>'"_]/g, '-');
}

function log(lexer, msg) {
  console.log("".concat(lexer.languageId, ": ").concat(msg));
}

function throwError(lexer, msg) {
  throw new Error("".concat(lexer.languageId, ": ").concat(msg));
}

function substituteMatches(lexer, str, id, matches, state) {
  var re = /\$((\$)|(#)|(\d\d?)|[sS](\d\d?)|@(\w+))/g;
  var stateMatches = null;
  return str.replace(re, function (full, sub, dollar, hash, n, s, attr, ofs, total) {
    if (!empty(dollar)) {
      return '$';
    }

    if (!empty(hash)) {
      return fixCase(lexer, id);
    }

    if (!empty(n) && n < matches.length) {
      return fixCase(lexer, matches[n]);
    }

    if (!empty(attr) && lexer && typeof lexer[attr] === 'string') {
      return lexer[attr];
    }

    if (stateMatches === null) {
      stateMatches = state.split('.');
      stateMatches.unshift(state);
    }

    if (!empty(s) && s < stateMatches.length) {
      return fixCase(lexer, stateMatches[s]);
    }

    return '';
  });
}

function findRules(lexer, state) {
  while (state && state.length > 0) {
    var rules = lexer.tokenizer[state];

    if (rules) {
      return rules;
    }

    var idx = state.lastIndexOf('.');

    if (idx < 0) {
      state = null;
    } else {
      state = state.substr(0, idx);
    }
  }

  return null;
}

function stateExists(lexer, state) {
  while (state && state.length > 0) {
    var exist = lexer.stateNames[state];

    if (exist) {
      return true;
    }

    var idx = state.lastIndexOf('.');

    if (idx < 0) {
      state = null;
    } else {
      state = state.substr(0, idx);
    }
  }

  return false;
}

function isArrayOf(elemType, obj) {
  if (!obj) {
    return false;
  }

  if (!Array.isArray(obj)) {
    return false;
  }

  var idx;

  for (idx in obj) {
    if (obj.hasOwnProperty(idx)) {
      if (!elemType(obj[idx])) {
        return false;
      }
    }
  }

  return true;
}

function bool(prop, def, onerr) {
  if (typeof prop === 'boolean') {
    return prop;
  }

  if (onerr && (prop || def === undefined)) {
    onerr();
  }

  return def === undefined ? null : def;
}

function string(prop, def, onerr) {
  if (typeof prop === 'string') {
    return prop;
  }

  if (onerr && (prop || def === undefined)) {
    onerr();
  }

  return def === undefined ? null : def;
}

function compileRegExp(lexer, str) {
  if (typeof str !== 'string') {
    return null;
  }

  var n = 0;

  while (str.indexOf('@') >= 0 && n < 5) {
    n++;
    str = str.replace(/@(\w+)/g, function (s, attr) {
      var sub = '';

      if (typeof lexer[attr] === 'string') {
        sub = lexer[attr];
      } else if (lexer[attr] && lexer[attr] instanceof RegExp) {
        sub = lexer[attr].source;
      } else {
        if (lexer[attr] === undefined) {
          throwError(lexer, 'language definition does not contain attribute \'' + attr + '\', used at: ' + str);
        } else {
          throwError(lexer, 'attribute reference \'' + attr + '\' must be a string, used at: ' + str);
        }
      }

      return empty(sub) ? '' : '(?:' + sub + ')';
    });
  }

  return new RegExp(str, lexer.ignoreCase ? 'i' : '');
}

function selectScrutinee(id, matches, state, num) {
  if (num < 0) {
    return id;
  }

  if (num < matches.length) {
    return matches[num];
  }

  if (num >= 100) {
    num = num - 100;
    var parts = state.split('.');
    parts.unshift(state);

    if (num < parts.length) {
      return parts[num];
    }
  }

  return null;
}

function createGuard(lexer, ruleName, tkey, val) {
  var scrut = -1;
  var oppat = tkey;
  var matches = tkey.match(/^\$(([sS]?)(\d\d?)|#)(.*)$/);

  if (matches) {
    if (matches[3]) {
      scrut = parseInt(matches[3]);

      if (matches[2]) {
        scrut = scrut + 100;
      }
    }

    oppat = matches[4];
  }

  var op = '~';
  var pat = oppat;

  if (!oppat || oppat.length === 0) {
    op = '!=';
    pat = '';
  } else if (/^\w*$/.test(pat)) {
    op = '==';
  } else {
    matches = oppat.match(/^(@|!@|~|!~|==|!=)(.*)$/);

    if (matches) {
      op = matches[1];
      pat = matches[2];
    }
  }

  var tester;

  if ((op === '~' || op === '!~') && /^(\w|\|)*$/.test(pat)) {
    var inWords = createKeywordMatcher(pat.split('|'), lexer.ignoreCase);

    tester = function tester(s) {
      return op === '~' ? inWords(s) : !inWords(s);
    };
  } else if (op === '@' || op === '!@') {
    var words = lexer[pat];

    if (!words) {
      throwError(lexer, 'the @ match target \'' + pat + '\' is not defined, in rule: ' + ruleName);
    }

    if (!isArrayOf(function (elem) {
      return typeof elem === 'string';
    }, words)) {
      throwError(lexer, 'the @ match target \'' + pat + '\' must be an array of strings, in rule: ' + ruleName);
    }

    var inWords = createKeywordMatcher(words, lexer.ignoreCase);

    tester = function tester(s) {
      return op === '@' ? inWords(s) : !inWords(s);
    };
  } else if (op === '~' || op === '!~') {
    if (pat.indexOf('$') < 0) {
      var re = compileRegExp(lexer, '^' + pat + '$');

      tester = function tester(s) {
        return op === '~' ? re.test(s) : !re.test(s);
      };
    } else {
      tester = function tester(s, id, matches, state) {
        var re = compileRegExp(lexer, '^' + substituteMatches(lexer, pat, id, matches, state) + '$');
        return re.test(s);
      };
    }
  } else {
    if (pat.indexOf('$') < 0) {
      var patx = fixCase(lexer, pat);

      tester = function tester(s) {
        return op === '==' ? s === patx : s !== patx;
      };
    } else {
      var patx = fixCase(lexer, pat);

      tester = function tester(s, id, matches, state, eos) {
        var patexp = substituteMatches(lexer, patx, id, matches, state);
        return op === '==' ? s === patexp : s !== patexp;
      };
    }
  }

  if (scrut === -1) {
    return {
      name: tkey,
      value: val,
      test: function test(id, matches, state, eos) {
        return tester(id, id, matches, state, eos);
      }
    };
  } else {
    return {
      name: tkey,
      value: val,
      test: function test(id, matches, state, eos) {
        var scrutinee = selectScrutinee(id, matches, state, scrut);
        return tester(!scrutinee ? '' : scrutinee, id, matches, state, eos);
      }
    };
  }
}

function compileAction(lexer, ruleName, action) {
  if (!action) {
    return {
      token: ''
    };
  } else if (typeof action === 'string') {
    return action;
  } else if (action.token || action.token === '') {
    if (typeof action.token !== 'string') {
      throwError(lexer, 'a \'token\' attribute must be of type string, in rule: ' + ruleName);
      return {
        token: ''
      };
    } else {
      var newAction = {
        token: action.token
      };

      if (action.token.indexOf('$') >= 0) {
        newAction.tokenSubst = true;
      }

      if (typeof action.bracket === 'string') {
        if (action.bracket === '@open') {
          newAction.bracket = 1;
        } else if (action.bracket === '@close') {
          newAction.bracket = -1;
        } else {
          throwError(lexer, 'a \'bracket\' attribute must be either \'@open\' or \'@close\', in rule: ' + ruleName);
        }
      }

      if (action.next) {
        if (typeof action.next !== 'string') {
          throwError(lexer, 'the next state must be a string value in rule: ' + ruleName);
        } else {
          var next = action.next;

          if (!/^(@pop|@push|@popall)$/.test(next)) {
            if (next[0] === '@') {
              next = next.substr(1);
            }

            if (next.indexOf('$') < 0) {
              if (!stateExists(lexer, substituteMatches(lexer, next, '', [], ''))) {
                throwError(lexer, 'the next state \'' + action.next + '\' is not defined in rule: ' + ruleName);
              }
            }
          }

          newAction.next = next;
        }
      }

      if (typeof action.goBack === 'number') {
        newAction.goBack = action.goBack;
      }

      if (typeof action.switchTo === 'string') {
        newAction.switchTo = action.switchTo;
      }

      if (typeof action.log === 'string') {
        newAction.log = action.log;
      }

      if (typeof action.nextEmbedded === 'string') {
        newAction.nextEmbedded = action.nextEmbedded;
        lexer.usesEmbedded = true;
      }

      return newAction;
    }
  } else if (Array.isArray(action)) {
    var results = [];
    var idx;

    for (idx in action) {
      if (action.hasOwnProperty(idx)) {
        results[idx] = compileAction(lexer, ruleName, action[idx]);
      }
    }

    return {
      group: results
    };
  } else if (action.cases) {
    var cases = [];
    var tkey;

    for (tkey in action.cases) {
      if (action.cases.hasOwnProperty(tkey)) {
        var val = compileAction(lexer, ruleName, action.cases[tkey]);

        if (tkey === '@default' || tkey === '@' || tkey === '') {
          cases.push({
            test: null,
            value: val,
            name: tkey
          });
        } else if (tkey === '@eos') {
          cases.push({
            test: function test(id, matches, state, eos) {
              return eos;
            },
            value: val,
            name: tkey
          });
        } else {
          cases.push(createGuard(lexer, ruleName, tkey, val));
        }
      }
    }

    var def = lexer.defaultToken;
    return {
      test: function test(id, matches, state, eos) {
        var idx;

        for (idx in cases) {
          if (cases.hasOwnProperty(idx)) {
            var didmatch = !cases[idx].test || cases[idx].test(id, matches, state, eos);

            if (didmatch) {
              return cases[idx].value;
            }
          }
        }

        return def;
      }
    };
  } else {
    throwError(lexer, 'an action must be a string, an object with a \'token\' or \'cases\' attribute, or an array of actions; in rule: ' + ruleName);
    return '';
  }
}

var Rule =
/*#__PURE__*/
function () {
  function Rule(name) {
    _classCallCheck(this, Rule);

    this.regex = new RegExp('');
    this.action = {
      token: ''
    };
    this.matchOnlyAtLineStart = false;
    this.name = '';
    this.name = name;
  }

  _createClass(Rule, [{
    key: "setRegex",
    value: function setRegex(lexer, re) {
      var sregex;

      if (typeof re === 'string') {
        sregex = re;
      } else if (re instanceof RegExp) {
        sregex = re.source;
      } else {
        throwError(lexer, 'rules must start with a match string or regular expression: ' + this.name);
      }

      this.matchOnlyAtLineStart = sregex.length > 0 && sregex[0] === '^';
      this.name = this.name + ': ' + sregex;
      this.regex = compileRegExp(lexer, '^(?:' + (this.matchOnlyAtLineStart ? sregex.substr(1) : sregex) + ')');
    }
  }, {
    key: "setAction",
    value: function setAction(lexer, act) {
      this.action = compileAction(lexer, this.name, act);
    }
  }]);

  return Rule;
}();

function compile(languageId, json) {
  if (!json || _typeof(json) !== 'object') {
    throw new Error('Monarch: expecting a language definition object');
  }

  var lexer = {};
  lexer.languageId = languageId;
  lexer.noThrow = false;
  lexer.maxStack = 100;
  lexer.start = string(json.start);
  lexer.ignoreCase = bool(json.ignoreCase, false);
  lexer.tokenPostfix = string(json.tokenPostfix, '.' + lexer.languageId);
  lexer.defaultToken = string(json.defaultToken, 'source', function () {
    throwError(lexer, 'the \'defaultToken\' must be a string');
  });
  lexer.usesEmbedded = false;
  var lexerMin = json;
  lexerMin.languageId = languageId;
  lexerMin.ignoreCase = lexer.ignoreCase;
  lexerMin.noThrow = lexer.noThrow;
  lexerMin.usesEmbedded = lexer.usesEmbedded;
  lexerMin.stateNames = json.tokenizer;
  lexerMin.defaultToken = lexer.defaultToken;

  function addRules(state, newrules, rules) {
    var idx;

    for (idx in rules) {
      if (rules.hasOwnProperty(idx)) {
        var rule = rules[idx];
        var include = rule.include;

        if (include) {
          if (typeof include !== 'string') {
            throwError(lexer, 'an \'include\' attribute must be a string at: ' + state);
          }

          if (include[0] === '@') {
            include = include.substr(1);
          }

          if (!json.tokenizer[include]) {
            throwError(lexer, 'include target \'' + include + '\' is not defined at: ' + state);
          }

          addRules(state + '.' + include, newrules, json.tokenizer[include]);
        } else {
          var newrule = new Rule(state);

          if (Array.isArray(rule) && rule.length >= 1 && rule.length <= 3) {
            newrule.setRegex(lexerMin, rule[0]);

            if (rule.length >= 3) {
              if (typeof rule[1] === 'string') {
                newrule.setAction(lexerMin, {
                  token: rule[1],
                  next: rule[2]
                });
              } else if (_typeof(rule[1]) === 'object') {
                var rule1 = rule[1];
                rule1.next = rule[2];
                newrule.setAction(lexerMin, rule1);
              } else {
                throwError(lexer, 'a next state as the last element of a rule can only be given if the action is either an object or a string, at: ' + state);
              }
            } else {
              newrule.setAction(lexerMin, rule[1]);
            }
          } else {
            if (!rule.regex) {
              throwError(lexer, 'a rule must either be an array, or an object with a \'regex\' or \'include\' field at: ' + state);
            }

            if (rule.name) {
              newrule.name = string(rule.name);
            }

            if (rule.matchOnlyAtStart) {
              newrule.matchOnlyAtLineStart = bool(rule.matchOnlyAtLineStart);
            }

            newrule.setRegex(lexerMin, rule.regex);
            newrule.setAction(lexerMin, rule.action);
          }

          newrules.push(newrule);
        }
      }
    }
  }

  if (!json.tokenizer || _typeof(json.tokenizer) !== 'object') {
    throwError(lexer, 'a language definition must define the \'tokenizer\' attribute as an object');
  }

  lexer.tokenizer = [];
  var key;

  for (key in json.tokenizer) {
    if (json.tokenizer.hasOwnProperty(key)) {
      if (!lexer.start) {
        lexer.start = key;
      }

      var rules = json.tokenizer[key];
      lexer.tokenizer[key] = new Array();
      addRules('tokenizer.' + key, lexer.tokenizer[key], rules);
    }
  }

  lexer.usesEmbedded = lexerMin.usesEmbedded;

  if (json.brackets) {
    if (!Array.isArray(json.brackets)) {
      throwError(lexer, 'the \'brackets\' attribute must be defined as an array');
    }
  } else {
    json.brackets = [{
      open: '{',
      close: '}',
      token: 'delimiter.curly'
    }, {
      open: '[',
      close: ']',
      token: 'delimiter.square'
    }, {
      open: '(',
      close: ')',
      token: 'delimiter.parenthesis'
    }, {
      open: '<',
      close: '>',
      token: 'delimiter.angle'
    }];
  }

  var brackets = [];

  for (var bracketIdx in json.brackets) {
    if (json.brackets.hasOwnProperty(bracketIdx)) {
      var desc = json.brackets[bracketIdx];

      if (desc && Array.isArray(desc) && desc.length === 3) {
        desc = {
          token: desc[2],
          open: desc[0],
          close: desc[1]
        };
      }

      if (desc.open === desc.close) {
        throwError(lexer, 'open and close brackets in a \'brackets\' attribute must be different: ' + desc.open + '\n hint: use the \'bracket\' attribute if matching on equal brackets is required.');
      }

      if (typeof desc.open === 'string' && typeof desc.token === 'string') {
        brackets.push({
          token: string(desc.token) + lexer.tokenPostfix,
          open: fixCase(lexer, string(desc.open)),
          close: fixCase(lexer, string(desc.close))
        });
      } else {
        throwError(lexer, 'every element in the \'brackets\' array must be a \'{open,close,token}\' object or array');
      }
    }
  }

  lexer.brackets = brackets;
  lexer.noThrow = true;
  return lexer;
}

var empty$1 = Object.freeze({
  dispose: function dispose() {}
});
var _isWindows = false;
var _isMacintosh = false;
var _isLinux = false;
var _isRootUser = false;
var _isNative = false;
var _locale = undefined;

if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object') {
  var userAgent = navigator.userAgent;
  _isWindows = userAgent.indexOf('Windows') >= 0;
  _isMacintosh = userAgent.indexOf('Macintosh') >= 0;
  _isLinux = userAgent.indexOf('Linux') >= 0;
  _locale = navigator.language;
}

var Platform;

(function (Platform) {
  Platform[Platform["Web"] = 0] = "Web";
  Platform[Platform["Mac"] = 1] = "Mac";
  Platform[Platform["Linux"] = 2] = "Linux";
  Platform[Platform["Windows"] = 3] = "Windows";
})(Platform || (Platform = {}));

var _platform = Platform.Web;

if (_isNative) {
  if (_isMacintosh) {
    _platform = Platform.Mac;
  } else if (_isWindows) {
    _platform = Platform.Windows;
  } else if (_isLinux) {
    _platform = Platform.Linux;
  }
}

var _globals = (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : global;

var setTimeout$1 = function setTimeout$1() {}; // _globals.setTimeout.bind(_globals);


var clearTimeout$1 = function clearTimeout$1() {}; // _globals.clearTimeout.bind(_globals);


var setInterval = function setInterval() {}; // _globals.setInterval.bind(_globals);


var clearInterval = function clearInterval() {}; // _globals.clearInterval.bind(_globals);

/**
 * Extracted from https://github.com/winjs/winjs
 * Version: 4.4.0(ec3258a9f3a36805a187848984e3bb938044178d)
 * Copyright (c) Microsoft Corporation.
 * All Rights Reserved.
 * Licensed under the MIT License.
 */


var win = function () {
  var _modules = {};
  _modules["WinJS/Core/_WinJS"] = {};

  var _winjs = function _winjs(moduleId, deps, factory) {
    var exports = {};
    var exportsPassedIn = false;
    var depsValues = deps.map(function (dep) {
      if (dep === 'exports') {
        exportsPassedIn = true;
        return exports;
      }

      return _modules[dep];
    });
    var result = factory.apply({}, depsValues);
    _modules[moduleId] = exportsPassedIn ? exports : result;
  };

  _winjs("WinJS/Core/_Global", [], function () {
    var globalObject = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : {};
    return globalObject;
  });

  _winjs("WinJS/Core/_BaseCoreUtils", ["WinJS/Core/_Global"], function baseCoreUtilsInit(_Global) {
    var hasWinRT = !!_Global.Windows;

    function markSupportedForProcessing(func) {
      /// <signature helpKeyword="WinJS.Utilities.markSupportedForProcessing">
      /// <summary locid="WinJS.Utilities.markSupportedForProcessing">
      /// Marks a function as being compatible with declarative processing, such as WinJS.UI.processAll
      /// or WinJS.Binding.processAll.
      /// </summary>
      /// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
      /// The function to be marked as compatible with declarative processing.
      /// </param>
      /// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
      /// The input function.
      /// </returns>
      /// </signature>
      func.supportedForProcessing = true;
      return func;
    }

    return {
      hasWinRT: hasWinRT,
      markSupportedForProcessing: markSupportedForProcessing,
      _setImmediate: _Global.setImmediate ? _Global.setImmediate.bind(_Global) : function (handler) {
        _Global.setTimeout(handler, 0);
      }
    };
  });

  _winjs("WinJS/Core/_WriteProfilerMark", ["WinJS/Core/_Global"], function profilerInit(_Global) {
    return _Global.msWriteProfilerMark || function () {};
  });

  _winjs("WinJS/Core/_Base", ["WinJS/Core/_WinJS", "WinJS/Core/_Global", "WinJS/Core/_BaseCoreUtils", "WinJS/Core/_WriteProfilerMark"], function baseInit(_WinJS, _Global, _BaseCoreUtils, _WriteProfilerMark) {
    function initializeProperties(target, members, prefix) {
      var keys = Object.keys(members);
      var isArray = Array.isArray(target);
      var properties;
      var i, len;

      for (i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        var enumerable = key.charCodeAt(0) !==
        /*_*/
        95;
        var member = members[key];

        if (member && _typeof(member) === 'object') {
          if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {
            if (member.enumerable === undefined) {
              member.enumerable = enumerable;
            }

            if (prefix && member.setName && typeof member.setName === 'function') {
              member.setName(prefix + "." + key);
            }

            properties = properties || {};
            properties[key] = member;
            continue;
          }
        }

        if (!enumerable) {
          properties = properties || {};
          properties[key] = {
            value: member,
            enumerable: enumerable,
            configurable: true,
            writable: true
          };
          continue;
        }

        if (isArray) {
          target.forEach(function (target) {
            target[key] = member;
          });
        } else {
          target[key] = member;
        }
      }

      if (properties) {
        if (isArray) {
          target.forEach(function (target) {
            Object.defineProperties(target, properties);
          });
        } else {
          Object.defineProperties(target, properties);
        }
      }
    }

    (function () {
      var _rootNamespace = _WinJS;

      if (!_rootNamespace.Namespace) {
        _rootNamespace.Namespace = Object.create(Object.prototype);
      }

      function createNamespace(parentNamespace, name) {
        var currentNamespace = parentNamespace || {};

        if (name) {
          var namespaceFragments = name.split(".");

          if (currentNamespace === _Global && namespaceFragments[0] === "WinJS") {
            currentNamespace = _WinJS;
            namespaceFragments.splice(0, 1);
          }

          for (var i = 0, len = namespaceFragments.length; i < len; i++) {
            var namespaceName = namespaceFragments[i];

            if (!currentNamespace[namespaceName]) {
              Object.defineProperty(currentNamespace, namespaceName, {
                value: {},
                writable: false,
                enumerable: true,
                configurable: true
              });
            }

            currentNamespace = currentNamespace[namespaceName];
          }
        }

        return currentNamespace;
      }

      function defineWithParent(parentNamespace, name, members) {
        /// <signature helpKeyword="WinJS.Namespace.defineWithParent">
        /// <summary locid="WinJS.Namespace.defineWithParent">
        /// Defines a new namespace with the specified name under the specified parent namespace.
        /// </summary>
        /// <param name="parentNamespace" type="Object" locid="WinJS.Namespace.defineWithParent_p:parentNamespace">
        /// The parent namespace.
        /// </param>
        /// <param name="name" type="String" locid="WinJS.Namespace.defineWithParent_p:name">
        /// The name of the new namespace.
        /// </param>
        /// <param name="members" type="Object" locid="WinJS.Namespace.defineWithParent_p:members">
        /// The members of the new namespace.
        /// </param>
        /// <returns type="Object" locid="WinJS.Namespace.defineWithParent_returnValue">
        /// The newly-defined namespace.
        /// </returns>
        /// </signature>
        var currentNamespace = createNamespace(parentNamespace, name);

        if (members) {
          initializeProperties(currentNamespace, members, name || "<ANONYMOUS>");
        }

        return currentNamespace;
      }

      function define(name, members) {
        /// <signature helpKeyword="WinJS.Namespace.define">
        /// <summary locid="WinJS.Namespace.define">
        /// Defines a new namespace with the specified name.
        /// </summary>
        /// <param name="name" type="String" locid="WinJS.Namespace.define_p:name">
        /// The name of the namespace. This could be a dot-separated name for nested namespaces.
        /// </param>
        /// <param name="members" type="Object" locid="WinJS.Namespace.define_p:members">
        /// The members of the new namespace.
        /// </param>
        /// <returns type="Object" locid="WinJS.Namespace.define_returnValue">
        /// The newly-defined namespace.
        /// </returns>
        /// </signature>
        return defineWithParent(_Global, name, members);
      }

      var LazyStates = {
        uninitialized: 1,
        working: 2,
        initialized: 3
      };

      function lazy(f) {
        var name;
        var state = LazyStates.uninitialized;
        var result;
        return {
          setName: function setName(value) {
            name = value;
          },
          get: function get() {
            switch (state) {
              case LazyStates.initialized:
                return result;

              case LazyStates.uninitialized:
                state = LazyStates.working;

                try {
                  _WriteProfilerMark("WinJS.Namespace._lazy:" + name + ",StartTM");

                  result = f();
                } finally {
                  _WriteProfilerMark("WinJS.Namespace._lazy:" + name + ",StopTM");

                  state = LazyStates.uninitialized;
                }

                f = null;
                state = LazyStates.initialized;
                return result;

              case LazyStates.working:
                throw "Illegal: reentrancy on initialization";

              default:
                throw "Illegal";
            }
          },
          set: function set(value) {
            switch (state) {
              case LazyStates.working:
                throw "Illegal: reentrancy on initialization";

              default:
                state = LazyStates.initialized;
                result = value;
                break;
            }
          },
          enumerable: true,
          configurable: true
        };
      } // helper for defining AMD module members


      function moduleDefine(exports, name, members) {
        var target = [exports];
        var publicNS = null;

        if (name) {
          publicNS = createNamespace(_Global, name);
          target.push(publicNS);
        }

        initializeProperties(target, members, name || "<ANONYMOUS>");
        return publicNS;
      } // Establish members of the "WinJS.Namespace" namespace


      Object.defineProperties(_rootNamespace.Namespace, {
        defineWithParent: {
          value: defineWithParent,
          writable: true,
          enumerable: true,
          configurable: true
        },
        define: {
          value: define,
          writable: true,
          enumerable: true,
          configurable: true
        },
        _lazy: {
          value: lazy,
          writable: true,
          enumerable: true,
          configurable: true
        },
        _moduleDefine: {
          value: moduleDefine,
          writable: true,
          enumerable: true,
          configurable: true
        }
      });
    })();

    (function () {
      function define(constructor, instanceMembers, staticMembers) {
        /// <signature helpKeyword="WinJS.Class.define">
        /// <summary locid="WinJS.Class.define">
        /// Defines a class using the given constructor and the specified instance members.
        /// </summary>
        /// <param name="constructor" type="Function" locid="WinJS.Class.define_p:constructor">
        /// A constructor function that is used to instantiate this class.
        /// </param>
        /// <param name="instanceMembers" type="Object" locid="WinJS.Class.define_p:instanceMembers">
        /// The set of instance fields, properties, and methods made available on the class.
        /// </param>
        /// <param name="staticMembers" type="Object" locid="WinJS.Class.define_p:staticMembers">
        /// The set of static fields, properties, and methods made available on the class.
        /// </param>
        /// <returns type="Function" locid="WinJS.Class.define_returnValue">
        /// The newly-defined class.
        /// </returns>
        /// </signature>
        constructor = constructor || function () {};

        _BaseCoreUtils.markSupportedForProcessing(constructor);

        if (instanceMembers) {
          initializeProperties(constructor.prototype, instanceMembers);
        }

        if (staticMembers) {
          initializeProperties(constructor, staticMembers);
        }

        return constructor;
      }

      function derive(baseClass, constructor, instanceMembers, staticMembers) {
        /// <signature helpKeyword="WinJS.Class.derive">
        /// <summary locid="WinJS.Class.derive">
        /// Creates a sub-class based on the supplied baseClass parameter, using prototypal inheritance.
        /// </summary>
        /// <param name="baseClass" type="Function" locid="WinJS.Class.derive_p:baseClass">
        /// The class to inherit from.
        /// </param>
        /// <param name="constructor" type="Function" locid="WinJS.Class.derive_p:constructor">
        /// A constructor function that is used to instantiate this class.
        /// </param>
        /// <param name="instanceMembers" type="Object" locid="WinJS.Class.derive_p:instanceMembers">
        /// The set of instance fields, properties, and methods to be made available on the class.
        /// </param>
        /// <param name="staticMembers" type="Object" locid="WinJS.Class.derive_p:staticMembers">
        /// The set of static fields, properties, and methods to be made available on the class.
        /// </param>
        /// <returns type="Function" locid="WinJS.Class.derive_returnValue">
        /// The newly-defined class.
        /// </returns>
        /// </signature>
        if (baseClass) {
          constructor = constructor || function () {};

          var basePrototype = baseClass.prototype;
          constructor.prototype = Object.create(basePrototype);

          _BaseCoreUtils.markSupportedForProcessing(constructor);

          Object.defineProperty(constructor.prototype, "constructor", {
            value: constructor,
            writable: true,
            configurable: true,
            enumerable: true
          });

          if (instanceMembers) {
            initializeProperties(constructor.prototype, instanceMembers);
          }

          if (staticMembers) {
            initializeProperties(constructor, staticMembers);
          }

          return constructor;
        } else {
          return define(constructor, instanceMembers, staticMembers);
        }
      }

      function mix(constructor) {
        /// <signature helpKeyword="WinJS.Class.mix">
        /// <summary locid="WinJS.Class.mix">
        /// Defines a class using the given constructor and the union of the set of instance members
        /// specified by all the mixin objects. The mixin parameter list is of variable length.
        /// </summary>
        /// <param name="constructor" locid="WinJS.Class.mix_p:constructor">
        /// A constructor function that is used to instantiate this class.
        /// </param>
        /// <returns type="Function" locid="WinJS.Class.mix_returnValue">
        /// The newly-defined class.
        /// </returns>
        /// </signature>
        constructor = constructor || function () {};

        var i, len;

        for (i = 1, len = arguments.length; i < len; i++) {
          initializeProperties(constructor.prototype, arguments[i]);
        }

        return constructor;
      } // Establish members of "WinJS.Class" namespace


      _WinJS.Namespace.define("WinJS.Class", {
        define: define,
        derive: derive,
        mix: mix
      });
    })();

    return {
      Namespace: _WinJS.Namespace,
      Class: _WinJS.Class
    };
  });

  _winjs("WinJS/Core/_ErrorFromName", ["WinJS/Core/_Base"], function errorsInit(_Base) {
    var ErrorFromName = _Base.Class.derive(Error, function (name, message) {
      /// <signature helpKeyword="WinJS.ErrorFromName">
      /// <summary locid="WinJS.ErrorFromName">
      /// Creates an Error object with the specified name and message properties.
      /// </summary>
      /// <param name="name" type="String" locid="WinJS.ErrorFromName_p:name">The name of this error. The name is meant to be consumed programmatically and should not be localized.</param>
      /// <param name="message" type="String" optional="true" locid="WinJS.ErrorFromName_p:message">The message for this error. The message is meant to be consumed by humans and should be localized.</param>
      /// <returns type="Error" locid="WinJS.ErrorFromName_returnValue">Error instance with .name and .message properties populated</returns>
      /// </signature>
      this.name = name;
      this.message = message || name;
    }, {
      /* empty */
    }, {
      supportedForProcessing: false
    });

    _Base.Namespace.define("WinJS", {
      // ErrorFromName establishes a simple pattern for returning error codes.
      //
      ErrorFromName: ErrorFromName
    });

    return ErrorFromName;
  });

  _winjs("WinJS/Core/_Events", ["exports", "WinJS/Core/_Base"], function eventsInit(exports, _Base) {
    function createEventProperty(name) {
      var eventPropStateName = "_on" + name + "state";
      return {
        get: function get() {
          var state = this[eventPropStateName];
          return state && state.userHandler;
        },
        set: function set(handler) {
          var state = this[eventPropStateName];

          if (handler) {
            if (!state) {
              state = {
                wrapper: function wrapper(evt) {
                  return state.userHandler(evt);
                },
                userHandler: handler
              };
              Object.defineProperty(this, eventPropStateName, {
                value: state,
                enumerable: false,
                writable: true,
                configurable: true
              });
              this.addEventListener(name, state.wrapper, false);
            }

            state.userHandler = handler;
          } else if (state) {
            this.removeEventListener(name, state.wrapper, false);
            this[eventPropStateName] = null;
          }
        },
        enumerable: true
      };
    }

    function createEventProperties() {
      /// <signature helpKeyword="WinJS.Utilities.createEventProperties">
      /// <summary locid="WinJS.Utilities.createEventProperties">
      /// Creates an object that has one property for each name passed to the function.
      /// </summary>
      /// <param name="events" locid="WinJS.Utilities.createEventProperties_p:events">
      /// A variable list of property names.
      /// </param>
      /// <returns type="Object" locid="WinJS.Utilities.createEventProperties_returnValue">
      /// The object with the specified properties. The names of the properties are prefixed with 'on'.
      /// </returns>
      /// </signature>
      var props = {};

      for (var i = 0, len = arguments.length; i < len; i++) {
        var name = arguments[i];
        props["on" + name] = createEventProperty(name);
      }

      return props;
    }

    var EventMixinEvent = _Base.Class.define(function EventMixinEvent_ctor(type, detail, target) {
      this.detail = detail;
      this.target = target;
      this.timeStamp = Date.now();
      this.type = type;
    }, {
      bubbles: {
        value: false,
        writable: false
      },
      cancelable: {
        value: false,
        writable: false
      },
      currentTarget: {
        get: function get() {
          return this.target;
        }
      },
      defaultPrevented: {
        get: function get() {
          return this._preventDefaultCalled;
        }
      },
      trusted: {
        value: false,
        writable: false
      },
      eventPhase: {
        value: 0,
        writable: false
      },
      target: null,
      timeStamp: null,
      type: null,
      preventDefault: function preventDefault() {
        this._preventDefaultCalled = true;
      },
      stopImmediatePropagation: function stopImmediatePropagation() {
        this._stopImmediatePropagationCalled = true;
      },
      stopPropagation: function stopPropagation() {}
    }, {
      supportedForProcessing: false
    });

    var eventMixin = {
      _listeners: null,
      addEventListener: function addEventListener(type, listener, useCapture) {
        /// <signature helpKeyword="WinJS.Utilities.eventMixin.addEventListener">
        /// <summary locid="WinJS.Utilities.eventMixin.addEventListener">
        /// Adds an event listener to the control.
        /// </summary>
        /// <param name="type" locid="WinJS.Utilities.eventMixin.addEventListener_p:type">
        /// The type (name) of the event.
        /// </param>
        /// <param name="listener" locid="WinJS.Utilities.eventMixin.addEventListener_p:listener">
        /// The listener to invoke when the event is raised.
        /// </param>
        /// <param name="useCapture" locid="WinJS.Utilities.eventMixin.addEventListener_p:useCapture">
        /// if true initiates capture, otherwise false.
        /// </param>
        /// </signature>
        useCapture = useCapture || false;
        this._listeners = this._listeners || {};
        var eventListeners = this._listeners[type] = this._listeners[type] || [];

        for (var i = 0, len = eventListeners.length; i < len; i++) {
          var l = eventListeners[i];

          if (l.useCapture === useCapture && l.listener === listener) {
            return;
          }
        }

        eventListeners.push({
          listener: listener,
          useCapture: useCapture
        });
      },
      dispatchEvent: function dispatchEvent(type, details) {
        /// <signature helpKeyword="WinJS.Utilities.eventMixin.dispatchEvent">
        /// <summary locid="WinJS.Utilities.eventMixin.dispatchEvent">
        /// Raises an event of the specified type and with the specified additional properties.
        /// </summary>
        /// <param name="type" locid="WinJS.Utilities.eventMixin.dispatchEvent_p:type">
        /// The type (name) of the event.
        /// </param>
        /// <param name="details" locid="WinJS.Utilities.eventMixin.dispatchEvent_p:details">
        /// The set of additional properties to be attached to the event object when the event is raised.
        /// </param>
        /// <returns type="Boolean" locid="WinJS.Utilities.eventMixin.dispatchEvent_returnValue">
        /// true if preventDefault was called on the event.
        /// </returns>
        /// </signature>
        var listeners = this._listeners && this._listeners[type];

        if (listeners) {
          var eventValue = new EventMixinEvent(type, details, this); // Need to copy the array to protect against people unregistering while we are dispatching

          listeners = listeners.slice(0, listeners.length);

          for (var i = 0, len = listeners.length; i < len && !eventValue._stopImmediatePropagationCalled; i++) {
            listeners[i].listener(eventValue);
          }

          return eventValue.defaultPrevented || false;
        }

        return false;
      },
      removeEventListener: function removeEventListener(type, listener, useCapture) {
        /// <signature helpKeyword="WinJS.Utilities.eventMixin.removeEventListener">
        /// <summary locid="WinJS.Utilities.eventMixin.removeEventListener">
        /// Removes an event listener from the control.
        /// </summary>
        /// <param name="type" locid="WinJS.Utilities.eventMixin.removeEventListener_p:type">
        /// The type (name) of the event.
        /// </param>
        /// <param name="listener" locid="WinJS.Utilities.eventMixin.removeEventListener_p:listener">
        /// The listener to remove.
        /// </param>
        /// <param name="useCapture" locid="WinJS.Utilities.eventMixin.removeEventListener_p:useCapture">
        /// Specifies whether to initiate capture.
        /// </param>
        /// </signature>
        useCapture = useCapture || false;
        var listeners = this._listeners && this._listeners[type];

        if (listeners) {
          for (var i = 0, len = listeners.length; i < len; i++) {
            var l = listeners[i];

            if (l.listener === listener && l.useCapture === useCapture) {
              listeners.splice(i, 1);

              if (listeners.length === 0) {
                delete this._listeners[type];
              } // Only want to remove one element for each call to removeEventListener


              break;
            }
          }
        }
      }
    };

    _Base.Namespace._moduleDefine(exports, "WinJS.Utilities", {
      _createEventProperty: createEventProperty,
      createEventProperties: createEventProperties,
      eventMixin: eventMixin
    });
  });

  _winjs("WinJS/Core/_Trace", ["WinJS/Core/_Global"], function traceInit(_Global) {
    function nop(v) {
      return v;
    }

    return {
      _traceAsyncOperationStarting: _Global.Debug && _Global.Debug.msTraceAsyncOperationStarting && _Global.Debug.msTraceAsyncOperationStarting.bind(_Global.Debug) || nop,
      _traceAsyncOperationCompleted: _Global.Debug && _Global.Debug.msTraceAsyncOperationCompleted && _Global.Debug.msTraceAsyncOperationCompleted.bind(_Global.Debug) || nop,
      _traceAsyncCallbackStarting: _Global.Debug && _Global.Debug.msTraceAsyncCallbackStarting && _Global.Debug.msTraceAsyncCallbackStarting.bind(_Global.Debug) || nop,
      _traceAsyncCallbackCompleted: _Global.Debug && _Global.Debug.msTraceAsyncCallbackCompleted && _Global.Debug.msTraceAsyncCallbackCompleted.bind(_Global.Debug) || nop
    };
  });

  _winjs("WinJS/Promise/_StateMachine", ["WinJS/Core/_Global", "WinJS/Core/_BaseCoreUtils", "WinJS/Core/_Base", "WinJS/Core/_ErrorFromName", "WinJS/Core/_Events", "WinJS/Core/_Trace"], function promiseStateMachineInit(_Global, _BaseCoreUtils, _Base, _ErrorFromName, _Events, _Trace) {
    _Global.Debug && (_Global.Debug.setNonUserCodeExceptions = true);

    var ListenerType = _Base.Class.mix(_Base.Class.define(null, {
      /*empty*/
    }, {
      supportedForProcessing: false
    }), _Events.eventMixin);

    var promiseEventListeners = new ListenerType(); // make sure there is a listeners collection so that we can do a more trivial check below

    promiseEventListeners._listeners = {};
    var errorET = "error";
    var canceledName = "Canceled";
    var tagWithStack = false;
    var tag = {
      promise: 0x01,
      thenPromise: 0x02,
      errorPromise: 0x04,
      exceptionPromise: 0x08,
      completePromise: 0x10
    };
    tag.all = tag.promise | tag.thenPromise | tag.errorPromise | tag.exceptionPromise | tag.completePromise; //
    // Global error counter, for each error which enters the system we increment this once and then
    // the error number travels with the error as it traverses the tree of potential handlers.
    //
    // When someone has registered to be told about errors (WinJS.Promise.callonerror) promises
    // which are in error will get tagged with a ._errorId field. This tagged field is the
    // contract by which nested promises with errors will be identified as chaining for the
    // purposes of the callonerror semantics. If a nested promise in error is encountered without
    // a ._errorId it will be assumed to be foreign and treated as an interop boundary and
    // a new error id will be minted.
    //

    var error_number = 1; //
    // The state machine has a interesting hiccup in it with regards to notification, in order
    // to flatten out notification and avoid recursion for synchronous completion we have an
    // explicit set of *_notify states which are responsible for notifying their entire tree
    // of children. They can do this because they know that immediate children are always
    // ThenPromise instances and we can therefore reach into their state to access the
    // _listeners collection.
    //
    // So, what happens is that a Promise will be fulfilled through the _completed or _error
    // messages at which point it will enter a *_notify state and be responsible for to move
    // its children into an (as appropriate) success or error state and also notify that child's
    // listeners of the state transition, until leaf notes are reached.
    //

    var state_created, // -> working
    state_working, // -> error | error_notify | success | success_notify | canceled | waiting
    state_waiting, // -> error | error_notify | success | success_notify | waiting_canceled
    state_waiting_canceled, // -> error | error_notify | success | success_notify | canceling
    state_canceled, // -> error | error_notify | success | success_notify | canceling
    state_canceling, // -> error_notify
    state_success_notify, // -> success
    state_success, // -> .
    state_error_notify, // -> error
    state_error; // -> .
    // Noop function, used in the various states to indicate that they don't support a given
    // message. Named with the somewhat cute name '_' because it reads really well in the states.

    function _() {} // Initial state
    //


    state_created = {
      name: "created",
      enter: function enter(promise) {
        promise._setState(state_working);
      },
      cancel: _,
      done: _,
      then: _,
      _completed: _,
      _error: _,
      _notify: _,
      _progress: _,
      _setCompleteValue: _,
      _setErrorValue: _
    }; // Ready state, waiting for a message (completed/error/progress), able to be canceled
    //

    state_working = {
      name: "working",
      enter: _,
      cancel: function cancel(promise) {
        promise._setState(state_canceled);
      },
      done: done,
      then: then,
      _completed: completed,
      _error: error,
      _notify: _,
      _progress: progress,
      _setCompleteValue: setCompleteValue,
      _setErrorValue: setErrorValue
    }; // Waiting state, if a promise is completed with a value which is itself a promise
    // (has a then() method) it signs up to be informed when that child promise is
    // fulfilled at which point it will be fulfilled with that value.
    //

    state_waiting = {
      name: "waiting",
      enter: function enter(promise) {
        var waitedUpon = promise._value; // We can special case our own intermediate promises which are not in a
        //  terminal state by just pushing this promise as a listener without
        //  having to create new indirection functions

        if (waitedUpon instanceof ThenPromise && waitedUpon._state !== state_error && waitedUpon._state !== state_success) {
          pushListener(waitedUpon, {
            promise: promise
          });
        } else {
          var error = function error(value) {
            if (waitedUpon._errorId) {
              promise._chainedError(value, waitedUpon);
            } else {
              // Because this is an interop boundary we want to indicate that this
              //  error has been handled by the promise infrastructure before we
              //  begin a new handling chain.
              //
              callonerror(promise, value, detailsForHandledError, waitedUpon, error);

              promise._error(value);
            }
          };

          error.handlesOnError = true;
          waitedUpon.then(promise._completed.bind(promise), error, promise._progress.bind(promise));
        }
      },
      cancel: function cancel(promise) {
        promise._setState(state_waiting_canceled);
      },
      done: done,
      then: then,
      _completed: completed,
      _error: error,
      _notify: _,
      _progress: progress,
      _setCompleteValue: setCompleteValue,
      _setErrorValue: setErrorValue
    }; // Waiting canceled state, when a promise has been in a waiting state and receives a
    // request to cancel its pending work it will forward that request to the child promise
    // and then waits to be informed of the result. This promise moves itself into the
    // canceling state but understands that the child promise may instead push it to a
    // different state.
    //

    state_waiting_canceled = {
      name: "waiting_canceled",
      enter: function enter(promise) {
        // Initiate a transition to canceling. Triggering a cancel on the promise
        // that we are waiting upon may result in a different state transition
        // before the state machine pump runs again.
        promise._setState(state_canceling);

        var waitedUpon = promise._value;

        if (waitedUpon.cancel) {
          waitedUpon.cancel();
        }
      },
      cancel: _,
      done: done,
      then: then,
      _completed: completed,
      _error: error,
      _notify: _,
      _progress: progress,
      _setCompleteValue: setCompleteValue,
      _setErrorValue: setErrorValue
    }; // Canceled state, moves to the canceling state and then tells the promise to do
    // whatever it might need to do on cancelation.
    //

    state_canceled = {
      name: "canceled",
      enter: function enter(promise) {
        // Initiate a transition to canceling. The _cancelAction may change the state
        // before the state machine pump runs again.
        promise._setState(state_canceling);

        promise._cancelAction();
      },
      cancel: _,
      done: done,
      then: then,
      _completed: completed,
      _error: error,
      _notify: _,
      _progress: progress,
      _setCompleteValue: setCompleteValue,
      _setErrorValue: setErrorValue
    }; // Canceling state, commits to the promise moving to an error state with an error
    // object whose 'name' and 'message' properties contain the string "Canceled"
    //

    state_canceling = {
      name: "canceling",
      enter: function enter(promise) {
        var error = new Error(canceledName);
        error.name = error.message;
        promise._value = error;

        promise._setState(state_error_notify);
      },
      cancel: _,
      done: _,
      then: _,
      _completed: _,
      _error: _,
      _notify: _,
      _progress: _,
      _setCompleteValue: _,
      _setErrorValue: _
    }; // Success notify state, moves a promise to the success state and notifies all children
    //

    state_success_notify = {
      name: "complete_notify",
      enter: function enter(promise) {
        promise.done = CompletePromise.prototype.done;
        promise.then = CompletePromise.prototype.then;

        if (promise._listeners) {
          var queue = [promise];
          var p;

          while (queue.length) {
            p = queue.shift();

            p._state._notify(p, queue);
          }
        }

        promise._setState(state_success);
      },
      cancel: _,
      done: null,

      /*error to get here */
      then: null,

      /*error to get here */
      _completed: _,
      _error: _,
      _notify: notifySuccess,
      _progress: _,
      _setCompleteValue: _,
      _setErrorValue: _
    }; // Success state, moves a promise to the success state and does NOT notify any children.
    // Some upstream promise is owning the notification pass.
    //

    state_success = {
      name: "success",
      enter: function enter(promise) {
        promise.done = CompletePromise.prototype.done;
        promise.then = CompletePromise.prototype.then;

        promise._cleanupAction();
      },
      cancel: _,
      done: null,

      /*error to get here */
      then: null,

      /*error to get here */
      _completed: _,
      _error: _,
      _notify: notifySuccess,
      _progress: _,
      _setCompleteValue: _,
      _setErrorValue: _
    }; // Error notify state, moves a promise to the error state and notifies all children
    //

    state_error_notify = {
      name: "error_notify",
      enter: function enter(promise) {
        promise.done = ErrorPromise.prototype.done;
        promise.then = ErrorPromise.prototype.then;

        if (promise._listeners) {
          var queue = [promise];
          var p;

          while (queue.length) {
            p = queue.shift();

            p._state._notify(p, queue);
          }
        }

        promise._setState(state_error);
      },
      cancel: _,
      done: null,

      /*error to get here*/
      then: null,

      /*error to get here*/
      _completed: _,
      _error: _,
      _notify: notifyError,
      _progress: _,
      _setCompleteValue: _,
      _setErrorValue: _
    }; // Error state, moves a promise to the error state and does NOT notify any children.
    // Some upstream promise is owning the notification pass.
    //

    state_error = {
      name: "error",
      enter: function enter(promise) {
        promise.done = ErrorPromise.prototype.done;
        promise.then = ErrorPromise.prototype.then;

        promise._cleanupAction();
      },
      cancel: _,
      done: null,

      /*error to get here*/
      then: null,

      /*error to get here*/
      _completed: _,
      _error: _,
      _notify: notifyError,
      _progress: _,
      _setCompleteValue: _,
      _setErrorValue: _
    }; //
    // The statemachine implementation follows a very particular pattern, the states are specified
    // as static stateless bags of functions which are then indirected through the state machine
    // instance (a Promise). As such all of the functions on each state have the promise instance
    // passed to them explicitly as a parameter and the Promise instance members do a little
    // dance where they indirect through the state and insert themselves in the argument list.
    //
    // We could instead call directly through the promise states however then every caller
    // would have to remember to do things like pumping the state machine to catch state transitions.
    //

    var PromiseStateMachine = _Base.Class.define(null, {
      _listeners: null,
      _nextState: null,
      _state: null,
      _value: null,
      cancel: function cancel() {
        /// <signature helpKeyword="WinJS.PromiseStateMachine.cancel">
        /// <summary locid="WinJS.PromiseStateMachine.cancel">
        /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
        /// already been fulfilled and cancellation is supported, the promise enters
        /// the error state with a value of Error("Canceled").
        /// </summary>
        /// </signature>
        this._state.cancel(this);

        this._run();
      },
      done: function Promise_done(onComplete, onError, onProgress) {
        /// <signature helpKeyword="WinJS.PromiseStateMachine.done">
        /// <summary locid="WinJS.PromiseStateMachine.done">
        /// Allows you to specify the work to be done on the fulfillment of the promised value,
        /// the error handling to be performed if the promise fails to fulfill
        /// a value, and the handling of progress notifications along the way.
        ///
        /// After the handlers have finished executing, this function throws any error that would have been returned
        /// from then() as a promise in the error state.
        /// </summary>
        /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.done_p:onComplete">
        /// The function to be called if the promise is fulfilled successfully with a value.
        /// The fulfilled value is passed as the single argument. If the value is null,
        /// the fulfilled value is returned. The value returned
        /// from the function becomes the fulfilled value of the promise returned by
        /// then(). If an exception is thrown while executing the function, the promise returned
        /// by then() moves into the error state.
        /// </param>
        /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onError">
        /// The function to be called if the promise is fulfilled with an error. The error
        /// is passed as the single argument. If it is null, the error is forwarded.
        /// The value returned from the function is the fulfilled value of the promise returned by then().
        /// </param>
        /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onProgress">
        /// the function to be called if the promise reports progress. Data about the progress
        /// is passed as the single argument. Promises are not required to support
        /// progress.
        /// </param>
        /// </signature>
        this._state.done(this, onComplete, onError, onProgress);
      },
      then: function Promise_then(onComplete, onError, onProgress) {
        /// <signature helpKeyword="WinJS.PromiseStateMachine.then">
        /// <summary locid="WinJS.PromiseStateMachine.then">
        /// Allows you to specify the work to be done on the fulfillment of the promised value,
        /// the error handling to be performed if the promise fails to fulfill
        /// a value, and the handling of progress notifications along the way.
        /// </summary>
        /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.then_p:onComplete">
        /// The function to be called if the promise is fulfilled successfully with a value.
        /// The value is passed as the single argument. If the value is null, the value is returned.
        /// The value returned from the function becomes the fulfilled value of the promise returned by
        /// then(). If an exception is thrown while this function is being executed, the promise returned
        /// by then() moves into the error state.
        /// </param>
        /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onError">
        /// The function to be called if the promise is fulfilled with an error. The error
        /// is passed as the single argument. If it is null, the error is forwarded.
        /// The value returned from the function becomes the fulfilled value of the promise returned by then().
        /// </param>
        /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onProgress">
        /// The function to be called if the promise reports progress. Data about the progress
        /// is passed as the single argument. Promises are not required to support
        /// progress.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.PromiseStateMachine.then_returnValue">
        /// The promise whose value is the result of executing the complete or
        /// error function.
        /// </returns>
        /// </signature>
        return this._state.then(this, onComplete, onError, onProgress);
      },
      _chainedError: function _chainedError(value, context) {
        var result = this._state._error(this, value, detailsForChainedError, context);

        this._run();

        return result;
      },
      _completed: function _completed(value) {
        var result = this._state._completed(this, value);

        this._run();

        return result;
      },
      _error: function _error(value) {
        var result = this._state._error(this, value, detailsForError);

        this._run();

        return result;
      },
      _progress: function _progress(value) {
        this._state._progress(this, value);
      },
      _setState: function _setState(state) {
        this._nextState = state;
      },
      _setCompleteValue: function _setCompleteValue(value) {
        this._state._setCompleteValue(this, value);

        this._run();
      },
      _setChainedErrorValue: function _setChainedErrorValue(value, context) {
        var result = this._state._setErrorValue(this, value, detailsForChainedError, context);

        this._run();

        return result;
      },
      _setExceptionValue: function _setExceptionValue(value) {
        var result = this._state._setErrorValue(this, value, detailsForException);

        this._run();

        return result;
      },
      _run: function _run() {
        while (this._nextState) {
          this._state = this._nextState;
          this._nextState = null;

          this._state.enter(this);
        }
      }
    }, {
      supportedForProcessing: false
    }); //
    // Implementations of shared state machine code.
    //


    function completed(promise, value) {
      var targetState;

      if (value && _typeof(value) === "object" && typeof value.then === "function") {
        targetState = state_waiting;
      } else {
        targetState = state_success_notify;
      }

      promise._value = value;

      promise._setState(targetState);
    }

    function createErrorDetails(exception, error, promise, id, parent, handler) {
      return {
        exception: exception,
        error: error,
        promise: promise,
        handler: handler,
        id: id,
        parent: parent
      };
    }

    function detailsForHandledError(promise, errorValue, context, handler) {
      var exception = context._isException;
      var errorId = context._errorId;
      return createErrorDetails(exception ? errorValue : null, exception ? null : errorValue, promise, errorId, context, handler);
    }

    function detailsForChainedError(promise, errorValue, context) {
      var exception = context._isException;
      var errorId = context._errorId;
      setErrorInfo(promise, errorId, exception);
      return createErrorDetails(exception ? errorValue : null, exception ? null : errorValue, promise, errorId, context);
    }

    function detailsForError(promise, errorValue) {
      var errorId = ++error_number;
      setErrorInfo(promise, errorId);
      return createErrorDetails(null, errorValue, promise, errorId);
    }

    function detailsForException(promise, exceptionValue) {
      var errorId = ++error_number;
      setErrorInfo(promise, errorId, true);
      return createErrorDetails(exceptionValue, null, promise, errorId);
    }

    function done(promise, onComplete, onError, onProgress) {
      var asyncOpID = _Trace._traceAsyncOperationStarting("WinJS.Promise.done");

      pushListener(promise, {
        c: onComplete,
        e: onError,
        p: onProgress,
        asyncOpID: asyncOpID
      });
    }

    function error(promise, value, onerrorDetails, context) {
      promise._value = value;
      callonerror(promise, value, onerrorDetails, context);

      promise._setState(state_error_notify);
    }

    function notifySuccess(promise, queue) {
      var value = promise._value;
      var listeners = promise._listeners;

      if (!listeners) {
        return;
      }

      promise._listeners = null;
      var i, len;

      for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
        var listener = len === 1 ? listeners : listeners[i];
        var onComplete = listener.c;
        var target = listener.promise;

        _Trace._traceAsyncOperationCompleted(listener.asyncOpID, _Global.Debug && _Global.Debug.MS_ASYNC_OP_STATUS_SUCCESS);

        if (target) {
          _Trace._traceAsyncCallbackStarting(listener.asyncOpID);

          try {
            target._setCompleteValue(onComplete ? onComplete(value) : value);
          } catch (ex) {
            target._setExceptionValue(ex);
          } finally {
            _Trace._traceAsyncCallbackCompleted();
          }

          if (target._state !== state_waiting && target._listeners) {
            queue.push(target);
          }
        } else {
          CompletePromise.prototype.done.call(promise, onComplete);
        }
      }
    }

    function notifyError(promise, queue) {
      var value = promise._value;
      var listeners = promise._listeners;

      if (!listeners) {
        return;
      }

      promise._listeners = null;
      var i, len;

      for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
        var listener = len === 1 ? listeners : listeners[i];
        var onError = listener.e;
        var target = listener.promise;
        var errorID = _Global.Debug && (value && value.name === canceledName ? _Global.Debug.MS_ASYNC_OP_STATUS_CANCELED : _Global.Debug.MS_ASYNC_OP_STATUS_ERROR);

        _Trace._traceAsyncOperationCompleted(listener.asyncOpID, errorID);

        if (target) {
          var asyncCallbackStarted = false;

          try {
            if (onError) {
              _Trace._traceAsyncCallbackStarting(listener.asyncOpID);

              asyncCallbackStarted = true;

              if (!onError.handlesOnError) {
                callonerror(target, value, detailsForHandledError, promise, onError);
              }

              target._setCompleteValue(onError(value));
            } else {
              target._setChainedErrorValue(value, promise);
            }
          } catch (ex) {
            target._setExceptionValue(ex);
          } finally {
            if (asyncCallbackStarted) {
              _Trace._traceAsyncCallbackCompleted();
            }
          }

          if (target._state !== state_waiting && target._listeners) {
            queue.push(target);
          }
        } else {
          ErrorPromise.prototype.done.call(promise, null, onError);
        }
      }
    }

    function callonerror(promise, value, onerrorDetailsGenerator, context, handler) {
      if (promiseEventListeners._listeners[errorET]) {
        if (value instanceof Error && value.message === canceledName) {
          return;
        }

        promiseEventListeners.dispatchEvent(errorET, onerrorDetailsGenerator(promise, value, context, handler));
      }
    }

    function progress(promise, value) {
      var listeners = promise._listeners;

      if (listeners) {
        var i, len;

        for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
          var listener = len === 1 ? listeners : listeners[i];
          var onProgress = listener.p;

          if (onProgress) {
            try {
              onProgress(value);
            } catch (ex) {}
          }

          if (!(listener.c || listener.e) && listener.promise) {
            listener.promise._progress(value);
          }
        }
      }
    }

    function pushListener(promise, listener) {
      var listeners = promise._listeners;

      if (listeners) {
        // We may have either a single listener (which will never be wrapped in an array)
        // or 2+ listeners (which will be wrapped). Since we are now adding one more listener
        // we may have to wrap the single listener before adding the second.
        listeners = Array.isArray(listeners) ? listeners : [listeners];
        listeners.push(listener);
      } else {
        listeners = listener;
      }

      promise._listeners = listeners;
    } // The difference beween setCompleteValue()/setErrorValue() and complete()/error() is that setXXXValue() moves
    // a promise directly to the success/error state without starting another notification pass (because one
    // is already ongoing).


    function setErrorInfo(promise, errorId, isException) {
      promise._isException = isException || false;
      promise._errorId = errorId;
    }

    function setErrorValue(promise, value, onerrorDetails, context) {
      promise._value = value;
      callonerror(promise, value, onerrorDetails, context);

      promise._setState(state_error);
    }

    function setCompleteValue(promise, value) {
      var targetState;

      if (value && _typeof(value) === "object" && typeof value.then === "function") {
        targetState = state_waiting;
      } else {
        targetState = state_success;
      }

      promise._value = value;

      promise._setState(targetState);
    }

    function then(promise, onComplete, onError, onProgress) {
      var result = new ThenPromise(promise);

      var asyncOpID = _Trace._traceAsyncOperationStarting("WinJS.Promise.then");

      pushListener(promise, {
        promise: result,
        c: onComplete,
        e: onError,
        p: onProgress,
        asyncOpID: asyncOpID
      });
      return result;
    } //
    // Internal implementation detail promise, ThenPromise is created when a promise needs
    // to be returned from a then() method.
    //


    var ThenPromise = _Base.Class.derive(PromiseStateMachine, function (creator) {
      if (tagWithStack && (tagWithStack === true || tagWithStack & tag.thenPromise)) {
        this._stack = Promise._getStack();
      }

      this._creator = creator;

      this._setState(state_created);

      this._run();
    }, {
      _creator: null,
      _cancelAction: function _cancelAction() {
        if (this._creator) {
          this._creator.cancel();
        }
      },
      _cleanupAction: function _cleanupAction() {
        this._creator = null;
      }
    }, {
      supportedForProcessing: false
    }); //
    // Slim promise implementations for already completed promises, these are created
    // under the hood on synchronous completion paths as well as by WinJS.Promise.wrap
    // and WinJS.Promise.wrapError.
    //


    var ErrorPromise = _Base.Class.define(function ErrorPromise_ctor(value) {
      if (tagWithStack && (tagWithStack === true || tagWithStack & tag.errorPromise)) {
        this._stack = Promise._getStack();
      }

      this._value = value;
      callonerror(this, value, detailsForError);
    }, {
      cancel: function cancel() {/// <signature helpKeyword="WinJS.PromiseStateMachine.cancel">
        /// <summary locid="WinJS.PromiseStateMachine.cancel">
        /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
        /// already been fulfilled and cancellation is supported, the promise enters
        /// the error state with a value of Error("Canceled").
        /// </summary>
        /// </signature>
      },
      done: function ErrorPromise_done(unused, onError) {
        /// <signature helpKeyword="WinJS.PromiseStateMachine.done">
        /// <summary locid="WinJS.PromiseStateMachine.done">
        /// Allows you to specify the work to be done on the fulfillment of the promised value,
        /// the error handling to be performed if the promise fails to fulfill
        /// a value, and the handling of progress notifications along the way.
        ///
        /// After the handlers have finished executing, this function throws any error that would have been returned
        /// from then() as a promise in the error state.
        /// </summary>
        /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.done_p:onComplete">
        /// The function to be called if the promise is fulfilled successfully with a value.
        /// The fulfilled value is passed as the single argument. If the value is null,
        /// the fulfilled value is returned. The value returned
        /// from the function becomes the fulfilled value of the promise returned by
        /// then(). If an exception is thrown while executing the function, the promise returned
        /// by then() moves into the error state.
        /// </param>
        /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onError">
        /// The function to be called if the promise is fulfilled with an error. The error
        /// is passed as the single argument. If it is null, the error is forwarded.
        /// The value returned from the function is the fulfilled value of the promise returned by then().
        /// </param>
        /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onProgress">
        /// the function to be called if the promise reports progress. Data about the progress
        /// is passed as the single argument. Promises are not required to support
        /// progress.
        /// </param>
        /// </signature>
        var value = this._value;

        if (onError) {
          try {
            if (!onError.handlesOnError) {
              callonerror(null, value, detailsForHandledError, this, onError);
            }

            var result = onError(value);

            if (result && _typeof(result) === "object" && typeof result.done === "function") {
              // If a promise is returned we need to wait on it.
              result.done();
            }

            return;
          } catch (ex) {
            value = ex;
          }
        }

        if (value instanceof Error && value.message === canceledName) {
          // suppress cancel
          return;
        } // force the exception to be thrown asyncronously to avoid any try/catch blocks
        //


        Promise._doneHandler(value);
      },
      then: function ErrorPromise_then(unused, onError) {
        /// <signature helpKeyword="WinJS.PromiseStateMachine.then">
        /// <summary locid="WinJS.PromiseStateMachine.then">
        /// Allows you to specify the work to be done on the fulfillment of the promised value,
        /// the error handling to be performed if the promise fails to fulfill
        /// a value, and the handling of progress notifications along the way.
        /// </summary>
        /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.then_p:onComplete">
        /// The function to be called if the promise is fulfilled successfully with a value.
        /// The value is passed as the single argument. If the value is null, the value is returned.
        /// The value returned from the function becomes the fulfilled value of the promise returned by
        /// then(). If an exception is thrown while this function is being executed, the promise returned
        /// by then() moves into the error state.
        /// </param>
        /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onError">
        /// The function to be called if the promise is fulfilled with an error. The error
        /// is passed as the single argument. If it is null, the error is forwarded.
        /// The value returned from the function becomes the fulfilled value of the promise returned by then().
        /// </param>
        /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onProgress">
        /// The function to be called if the promise reports progress. Data about the progress
        /// is passed as the single argument. Promises are not required to support
        /// progress.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.PromiseStateMachine.then_returnValue">
        /// The promise whose value is the result of executing the complete or
        /// error function.
        /// </returns>
        /// </signature>
        // If the promise is already in a error state and no error handler is provided
        // we optimize by simply returning the promise instead of creating a new one.
        //
        if (!onError) {
          return this;
        }

        var result;
        var value = this._value;

        try {
          if (!onError.handlesOnError) {
            callonerror(null, value, detailsForHandledError, this, onError);
          }

          result = new CompletePromise(onError(value));
        } catch (ex) {
          // If the value throw from the error handler is the same as the value
          // provided to the error handler then there is no need for a new promise.
          //
          if (ex === value) {
            result = this;
          } else {
            result = new ExceptionPromise(ex);
          }
        }

        return result;
      }
    }, {
      supportedForProcessing: false
    });

    var ExceptionPromise = _Base.Class.derive(ErrorPromise, function ExceptionPromise_ctor(value) {
      if (tagWithStack && (tagWithStack === true || tagWithStack & tag.exceptionPromise)) {
        this._stack = Promise._getStack();
      }

      this._value = value;
      callonerror(this, value, detailsForException);
    }, {
      /* empty */
    }, {
      supportedForProcessing: false
    });

    var CompletePromise = _Base.Class.define(function CompletePromise_ctor(value) {
      if (tagWithStack && (tagWithStack === true || tagWithStack & tag.completePromise)) {
        this._stack = Promise._getStack();
      }

      if (value && _typeof(value) === "object" && typeof value.then === "function") {
        var result = new ThenPromise(null);

        result._setCompleteValue(value);

        return result;
      }

      this._value = value;
    }, {
      cancel: function cancel() {/// <signature helpKeyword="WinJS.PromiseStateMachine.cancel">
        /// <summary locid="WinJS.PromiseStateMachine.cancel">
        /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
        /// already been fulfilled and cancellation is supported, the promise enters
        /// the error state with a value of Error("Canceled").
        /// </summary>
        /// </signature>
      },
      done: function CompletePromise_done(onComplete) {
        /// <signature helpKeyword="WinJS.PromiseStateMachine.done">
        /// <summary locid="WinJS.PromiseStateMachine.done">
        /// Allows you to specify the work to be done on the fulfillment of the promised value,
        /// the error handling to be performed if the promise fails to fulfill
        /// a value, and the handling of progress notifications along the way.
        ///
        /// After the handlers have finished executing, this function throws any error that would have been returned
        /// from then() as a promise in the error state.
        /// </summary>
        /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.done_p:onComplete">
        /// The function to be called if the promise is fulfilled successfully with a value.
        /// The fulfilled value is passed as the single argument. If the value is null,
        /// the fulfilled value is returned. The value returned
        /// from the function becomes the fulfilled value of the promise returned by
        /// then(). If an exception is thrown while executing the function, the promise returned
        /// by then() moves into the error state.
        /// </param>
        /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onError">
        /// The function to be called if the promise is fulfilled with an error. The error
        /// is passed as the single argument. If it is null, the error is forwarded.
        /// The value returned from the function is the fulfilled value of the promise returned by then().
        /// </param>
        /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onProgress">
        /// the function to be called if the promise reports progress. Data about the progress
        /// is passed as the single argument. Promises are not required to support
        /// progress.
        /// </param>
        /// </signature>
        if (!onComplete) {
          return;
        }

        try {
          var result = onComplete(this._value);

          if (result && _typeof(result) === "object" && typeof result.done === "function") {
            result.done();
          }
        } catch (ex) {
          // force the exception to be thrown asynchronously to avoid any try/catch blocks
          Promise._doneHandler(ex);
        }
      },
      then: function CompletePromise_then(onComplete) {
        /// <signature helpKeyword="WinJS.PromiseStateMachine.then">
        /// <summary locid="WinJS.PromiseStateMachine.then">
        /// Allows you to specify the work to be done on the fulfillment of the promised value,
        /// the error handling to be performed if the promise fails to fulfill
        /// a value, and the handling of progress notifications along the way.
        /// </summary>
        /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.then_p:onComplete">
        /// The function to be called if the promise is fulfilled successfully with a value.
        /// The value is passed as the single argument. If the value is null, the value is returned.
        /// The value returned from the function becomes the fulfilled value of the promise returned by
        /// then(). If an exception is thrown while this function is being executed, the promise returned
        /// by then() moves into the error state.
        /// </param>
        /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onError">
        /// The function to be called if the promise is fulfilled with an error. The error
        /// is passed as the single argument. If it is null, the error is forwarded.
        /// The value returned from the function becomes the fulfilled value of the promise returned by then().
        /// </param>
        /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onProgress">
        /// The function to be called if the promise reports progress. Data about the progress
        /// is passed as the single argument. Promises are not required to support
        /// progress.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.PromiseStateMachine.then_returnValue">
        /// The promise whose value is the result of executing the complete or
        /// error function.
        /// </returns>
        /// </signature>
        try {
          // If the value returned from the completion handler is the same as the value
          // provided to the completion handler then there is no need for a new promise.
          //
          var newValue = onComplete ? onComplete(this._value) : this._value;
          return newValue === this._value ? this : new CompletePromise(newValue);
        } catch (ex) {
          return new ExceptionPromise(ex);
        }
      }
    }, {
      supportedForProcessing: false
    }); //
    // Promise is the user-creatable WinJS.Promise object.
    //


    function timeout(timeoutMS) {
      var id;
      return new Promise(function (c) {
        if (timeoutMS) {
          id = _Global.setTimeout(c, timeoutMS);
        } else {
          _BaseCoreUtils._setImmediate(c);
        }
      }, function () {
        if (id) {
          _Global.clearTimeout(id);
        }
      });
    }

    function timeoutWithPromise(timeout, promise) {
      var cancelPromise = function cancelPromise() {
        promise.cancel();
      };

      var cancelTimeout = function cancelTimeout() {
        timeout.cancel();
      };

      timeout.then(cancelPromise);
      promise.then(cancelTimeout, cancelTimeout);
      return promise;
    }

    var staticCanceledPromise;

    var Promise = _Base.Class.derive(PromiseStateMachine, function Promise_ctor(init, oncancel) {
      /// <signature helpKeyword="WinJS.Promise">
      /// <summary locid="WinJS.Promise">
      /// A promise provides a mechanism to schedule work to be done on a value that
      /// has not yet been computed. It is a convenient abstraction for managing
      /// interactions with asynchronous APIs.
      /// </summary>
      /// <param name="init" type="Function" locid="WinJS.Promise_p:init">
      /// The function that is called during construction of the  promise. The function
      /// is given three arguments (complete, error, progress). Inside this function
      /// you should add event listeners for the notifications supported by this value.
      /// </param>
      /// <param name="oncancel" optional="true" locid="WinJS.Promise_p:oncancel">
      /// The function to call if a consumer of this promise wants
      /// to cancel its undone work. Promises are not required to
      /// support cancellation.
      /// </param>
      /// </signature>
      if (tagWithStack && (tagWithStack === true || tagWithStack & tag.promise)) {
        this._stack = Promise._getStack();
      }

      this._oncancel = oncancel;

      this._setState(state_created);

      this._run();

      try {
        var complete = this._completed.bind(this);

        var error = this._error.bind(this);

        var progress = this._progress.bind(this);

        init(complete, error, progress);
      } catch (ex) {
        this._setExceptionValue(ex);
      }
    }, {
      _oncancel: null,
      _cancelAction: function _cancelAction() {
        // BEGIN monaco change
        try {
          if (this._oncancel) {
            this._oncancel();
          } else {
            throw new Error('Promise did not implement oncancel');
          }
        } catch (ex) {
          // Access fields to get them created
          var msg = ex.message;
          var stack = ex.stack;
          promiseEventListeners.dispatchEvent('error', ex);
        } // END monaco change

      },
      _cleanupAction: function _cleanupAction() {
        this._oncancel = null;
      }
    }, {
      addEventListener: function Promise_addEventListener(eventType, listener, capture) {
        /// <signature helpKeyword="WinJS.Promise.addEventListener">
        /// <summary locid="WinJS.Promise.addEventListener">
        /// Adds an event listener to the control.
        /// </summary>
        /// <param name="eventType" locid="WinJS.Promise.addEventListener_p:eventType">
        /// The type (name) of the event.
        /// </param>
        /// <param name="listener" locid="WinJS.Promise.addEventListener_p:listener">
        /// The listener to invoke when the event is raised.
        /// </param>
        /// <param name="capture" locid="WinJS.Promise.addEventListener_p:capture">
        /// Specifies whether or not to initiate capture.
        /// </param>
        /// </signature>
        promiseEventListeners.addEventListener(eventType, listener, capture);
      },
      any: function Promise_any(values) {
        /// <signature helpKeyword="WinJS.Promise.any">
        /// <summary locid="WinJS.Promise.any">
        /// Returns a promise that is fulfilled when one of the input promises
        /// has been fulfilled.
        /// </summary>
        /// <param name="values" type="Array" locid="WinJS.Promise.any_p:values">
        /// An array that contains promise objects or objects whose property
        /// values include promise objects.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.Promise.any_returnValue">
        /// A promise that on fulfillment yields the value of the input (complete or error).
        /// </returns>
        /// </signature>
        return new Promise(function (complete, error) {
          var keys = Object.keys(values);

          if (keys.length === 0) {
            complete();
          }

          var canceled = 0;
          keys.forEach(function (key) {
            Promise.as(values[key]).then(function () {
              complete({
                key: key,
                value: values[key]
              });
            }, function (e) {
              if (e instanceof Error && e.name === canceledName) {
                if (++canceled === keys.length) {
                  complete(Promise.cancel);
                }

                return;
              }

              error({
                key: key,
                value: values[key]
              });
            });
          });
        }, function () {
          var keys = Object.keys(values);
          keys.forEach(function (key) {
            var promise = Promise.as(values[key]);

            if (typeof promise.cancel === "function") {
              promise.cancel();
            }
          });
        });
      },
      as: function Promise_as(value) {
        /// <signature helpKeyword="WinJS.Promise.as">
        /// <summary locid="WinJS.Promise.as">
        /// Returns a promise. If the object is already a promise it is returned;
        /// otherwise the object is wrapped in a promise.
        /// </summary>
        /// <param name="value" locid="WinJS.Promise.as_p:value">
        /// The value to be treated as a promise.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.Promise.as_returnValue">
        /// A promise.
        /// </returns>
        /// </signature>
        if (value && _typeof(value) === "object" && typeof value.then === "function") {
          return value;
        }

        return new CompletePromise(value);
      },
      /// <field type="WinJS.Promise" helpKeyword="WinJS.Promise.cancel" locid="WinJS.Promise.cancel">
      /// Canceled promise value, can be returned from a promise completion handler
      /// to indicate cancelation of the promise chain.
      /// </field>
      cancel: {
        get: function get() {
          return staticCanceledPromise = staticCanceledPromise || new ErrorPromise(new _ErrorFromName(canceledName));
        }
      },
      dispatchEvent: function Promise_dispatchEvent(eventType, details) {
        /// <signature helpKeyword="WinJS.Promise.dispatchEvent">
        /// <summary locid="WinJS.Promise.dispatchEvent">
        /// Raises an event of the specified type and properties.
        /// </summary>
        /// <param name="eventType" locid="WinJS.Promise.dispatchEvent_p:eventType">
        /// The type (name) of the event.
        /// </param>
        /// <param name="details" locid="WinJS.Promise.dispatchEvent_p:details">
        /// The set of additional properties to be attached to the event object.
        /// </param>
        /// <returns type="Boolean" locid="WinJS.Promise.dispatchEvent_returnValue">
        /// Specifies whether preventDefault was called on the event.
        /// </returns>
        /// </signature>
        return promiseEventListeners.dispatchEvent(eventType, details);
      },
      is: function Promise_is(value) {
        /// <signature helpKeyword="WinJS.Promise.is">
        /// <summary locid="WinJS.Promise.is">
        /// Determines whether a value fulfills the promise contract.
        /// </summary>
        /// <param name="value" locid="WinJS.Promise.is_p:value">
        /// A value that may be a promise.
        /// </param>
        /// <returns type="Boolean" locid="WinJS.Promise.is_returnValue">
        /// true if the specified value is a promise, otherwise false.
        /// </returns>
        /// </signature>
        return value && _typeof(value) === "object" && typeof value.then === "function";
      },
      join: function Promise_join(values) {
        /// <signature helpKeyword="WinJS.Promise.join">
        /// <summary locid="WinJS.Promise.join">
        /// Creates a promise that is fulfilled when all the values are fulfilled.
        /// </summary>
        /// <param name="values" type="Object" locid="WinJS.Promise.join_p:values">
        /// An object whose fields contain values, some of which may be promises.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.Promise.join_returnValue">
        /// A promise whose value is an object with the same field names as those of the object in the values parameter, where
        /// each field value is the fulfilled value of a promise.
        /// </returns>
        /// </signature>
        return new Promise(function (complete, error, progress) {
          var keys = Object.keys(values);
          var errors = Array.isArray(values) ? [] : {};
          var results = Array.isArray(values) ? [] : {};
          var undefineds = 0;
          var pending = keys.length;

          var argDone = function argDone(key) {
            if (--pending === 0) {
              var errorCount = Object.keys(errors).length;

              if (errorCount === 0) {
                complete(results);
              } else {
                var canceledCount = 0;
                keys.forEach(function (key) {
                  var e = errors[key];

                  if (e instanceof Error && e.name === canceledName) {
                    canceledCount++;
                  }
                });

                if (canceledCount === errorCount) {
                  complete(Promise.cancel);
                } else {
                  error(errors);
                }
              }
            } else {
              progress({
                Key: key,
                Done: true
              });
            }
          };

          keys.forEach(function (key) {
            var value = values[key];

            if (value === undefined) {
              undefineds++;
            } else {
              Promise.then(value, function (value) {
                results[key] = value;
                argDone(key);
              }, function (value) {
                errors[key] = value;
                argDone(key);
              });
            }
          });
          pending -= undefineds;

          if (pending === 0) {
            complete(results);
            return;
          }
        }, function () {
          Object.keys(values).forEach(function (key) {
            var promise = Promise.as(values[key]);

            if (typeof promise.cancel === "function") {
              promise.cancel();
            }
          });
        });
      },
      removeEventListener: function Promise_removeEventListener(eventType, listener, capture) {
        /// <signature helpKeyword="WinJS.Promise.removeEventListener">
        /// <summary locid="WinJS.Promise.removeEventListener">
        /// Removes an event listener from the control.
        /// </summary>
        /// <param name='eventType' locid="WinJS.Promise.removeEventListener_eventType">
        /// The type (name) of the event.
        /// </param>
        /// <param name='listener' locid="WinJS.Promise.removeEventListener_listener">
        /// The listener to remove.
        /// </param>
        /// <param name='capture' locid="WinJS.Promise.removeEventListener_capture">
        /// Specifies whether or not to initiate capture.
        /// </param>
        /// </signature>
        promiseEventListeners.removeEventListener(eventType, listener, capture);
      },
      supportedForProcessing: false,
      then: function Promise_then(value, onComplete, onError, onProgress) {
        /// <signature helpKeyword="WinJS.Promise.then">
        /// <summary locid="WinJS.Promise.then">
        /// A static version of the promise instance method then().
        /// </summary>
        /// <param name="value" locid="WinJS.Promise.then_p:value">
        /// the value to be treated as a promise.
        /// </param>
        /// <param name="onComplete" type="Function" locid="WinJS.Promise.then_p:complete">
        /// The function to be called if the promise is fulfilled with a value.
        /// If it is null, the promise simply
        /// returns the value. The value is passed as the single argument.
        /// </param>
        /// <param name="onError" type="Function" optional="true" locid="WinJS.Promise.then_p:error">
        /// The function to be called if the promise is fulfilled with an error. The error
        /// is passed as the single argument.
        /// </param>
        /// <param name="onProgress" type="Function" optional="true" locid="WinJS.Promise.then_p:progress">
        /// The function to be called if the promise reports progress. Data about the progress
        /// is passed as the single argument. Promises are not required to support
        /// progress.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.Promise.then_returnValue">
        /// A promise whose value is the result of executing the provided complete function.
        /// </returns>
        /// </signature>
        return Promise.as(value).then(onComplete, onError, onProgress);
      },
      thenEach: function Promise_thenEach(values, onComplete, onError, onProgress) {
        /// <signature helpKeyword="WinJS.Promise.thenEach">
        /// <summary locid="WinJS.Promise.thenEach">
        /// Performs an operation on all the input promises and returns a promise
        /// that has the shape of the input and contains the result of the operation
        /// that has been performed on each input.
        /// </summary>
        /// <param name="values" locid="WinJS.Promise.thenEach_p:values">
        /// A set of values (which could be either an array or an object) of which some or all are promises.
        /// </param>
        /// <param name="onComplete" type="Function" locid="WinJS.Promise.thenEach_p:complete">
        /// The function to be called if the promise is fulfilled with a value.
        /// If the value is null, the promise returns the value.
        /// The value is passed as the single argument.
        /// </param>
        /// <param name="onError" type="Function" optional="true" locid="WinJS.Promise.thenEach_p:error">
        /// The function to be called if the promise is fulfilled with an error. The error
        /// is passed as the single argument.
        /// </param>
        /// <param name="onProgress" type="Function" optional="true" locid="WinJS.Promise.thenEach_p:progress">
        /// The function to be called if the promise reports progress. Data about the progress
        /// is passed as the single argument. Promises are not required to support
        /// progress.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.Promise.thenEach_returnValue">
        /// A promise that is the result of calling Promise.join on the values parameter.
        /// </returns>
        /// </signature>
        var result = Array.isArray(values) ? [] : {};
        Object.keys(values).forEach(function (key) {
          result[key] = Promise.as(values[key]).then(onComplete, onError, onProgress);
        });
        return Promise.join(result);
      },
      timeout: function Promise_timeout(time, promise) {
        /// <signature helpKeyword="WinJS.Promise.timeout">
        /// <summary locid="WinJS.Promise.timeout">
        /// Creates a promise that is fulfilled after a timeout.
        /// </summary>
        /// <param name="timeout" type="Number" optional="true" locid="WinJS.Promise.timeout_p:timeout">
        /// The timeout period in milliseconds. If this value is zero or not specified
        /// setImmediate is called, otherwise setTimeout is called.
        /// </param>
        /// <param name="promise" type="Promise" optional="true" locid="WinJS.Promise.timeout_p:promise">
        /// A promise that will be canceled if it doesn't complete before the
        /// timeout has expired.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.Promise.timeout_returnValue">
        /// A promise that is completed asynchronously after the specified timeout.
        /// </returns>
        /// </signature>
        var to = timeout(time);
        return promise ? timeoutWithPromise(to, promise) : to;
      },
      wrap: function Promise_wrap(value) {
        /// <signature helpKeyword="WinJS.Promise.wrap">
        /// <summary locid="WinJS.Promise.wrap">
        /// Wraps a non-promise value in a promise. You can use this function if you need
        /// to pass a value to a function that requires a promise.
        /// </summary>
        /// <param name="value" locid="WinJS.Promise.wrap_p:value">
        /// Some non-promise value to be wrapped in a promise.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.Promise.wrap_returnValue">
        /// A promise that is successfully fulfilled with the specified value
        /// </returns>
        /// </signature>
        return new CompletePromise(value);
      },
      wrapError: function Promise_wrapError(error) {
        /// <signature helpKeyword="WinJS.Promise.wrapError">
        /// <summary locid="WinJS.Promise.wrapError">
        /// Wraps a non-promise error value in a promise. You can use this function if you need
        /// to pass an error to a function that requires a promise.
        /// </summary>
        /// <param name="error" locid="WinJS.Promise.wrapError_p:error">
        /// A non-promise error value to be wrapped in a promise.
        /// </param>
        /// <returns type="WinJS.Promise" locid="WinJS.Promise.wrapError_returnValue">
        /// A promise that is in an error state with the specified value.
        /// </returns>
        /// </signature>
        return new ErrorPromise(error);
      },
      _veryExpensiveTagWithStack: {
        get: function get() {
          return tagWithStack;
        },
        set: function set(value) {
          tagWithStack = value;
        }
      },
      _veryExpensiveTagWithStack_tag: tag,
      _getStack: function _getStack() {
        if (_Global.Debug && _Global.Debug.debuggerEnabled) {
          try {
            throw new Error();
          } catch (e) {
            return e.stack;
          }
        }
      },
      _cancelBlocker: function Promise__cancelBlocker(input, oncancel) {
        //
        // Returns a promise which on cancelation will still result in downstream cancelation while
        //  protecting the promise 'input' from being  canceled which has the effect of allowing
        //  'input' to be shared amoung various consumers.
        //
        if (!Promise.is(input)) {
          return Promise.wrap(input);
        }

        var complete;
        var error;
        var output = new Promise(function (c, e) {
          complete = c;
          error = e;
        }, function () {
          complete = null;
          error = null;
          oncancel && oncancel();
        });
        input.then(function (v) {
          complete && complete(v);
        }, function (e) {
          error && error(e);
        });
        return output;
      }
    });

    Object.defineProperties(Promise, _Events.createEventProperties(errorET));

    Promise._doneHandler = function (value) {
      _BaseCoreUtils._setImmediate(function Promise_done_rethrow() {
        throw value;
      });
    };

    return {
      PromiseStateMachine: PromiseStateMachine,
      Promise: Promise,
      state_created: state_created
    };
  });

  _winjs("WinJS/Promise", ["WinJS/Core/_Base", "WinJS/Promise/_StateMachine"], function promiseInit(_Base, _StateMachine) {
    _Base.Namespace.define("WinJS", {
      Promise: _StateMachine.Promise
    });

    return _StateMachine.Promise;
  });

  var exported = _modules["WinJS/Core/_WinJS"];
  return exported;
}();

var Promise$1 = win.Promise;
var TPromise = win.Promise;
var PPromise = win.Promise;
var outstandingPromiseErrors = {};

function promiseErrorHandler(e) {
  var details = e.detail;
  var id = details.id;

  if (details.parent) {
    if (details.handler && outstandingPromiseErrors) {
      delete outstandingPromiseErrors[id];
    }

    return;
  }

  outstandingPromiseErrors[id] = details;

  if (Object.keys(outstandingPromiseErrors).length === 1) {
    setTimeout(function () {
      var errors = outstandingPromiseErrors;
      outstandingPromiseErrors = {};
      Object.keys(errors).forEach(function (errorId) {
        var error = errors[errorId];

        if (error.exception) {
          onUnexpectedError(error.exception);
        } else if (error.error) {
          onUnexpectedError(error.error);
        }

        console.log('WARNING: Promise with no error callback:' + error.id);
        console.log(error);

        if (error.exception) {
          console.log(error.exception.stack);
        }
      });
    }, 0);
  }
}

TPromise.addEventListener('error', promiseErrorHandler);

var ErrorHandler =
/*#__PURE__*/
function () {
  function ErrorHandler() {
    _classCallCheck(this, ErrorHandler);

    this.listeners = [];

    this.unexpectedErrorHandler = function (e) {
      setTimeout$1(function () {
        if (e.stack) {
          throw new Error(e.message + '\n\n' + e.stack);
        }

        throw e;
      }, 0);
    };
  }

  _createClass(ErrorHandler, [{
    key: "addListener",
    value: function addListener(listener) {
      var _this = this;

      this.listeners.push(listener);
      return function () {
        _this._removeListener(listener);
      };
    }
  }, {
    key: "emit",
    value: function emit(e) {
      this.listeners.forEach(function (listener) {
        listener(e);
      });
    }
  }, {
    key: "_removeListener",
    value: function _removeListener(listener) {
      this.listeners.splice(this.listeners.indexOf(listener), 1);
    }
  }, {
    key: "setUnexpectedErrorHandler",
    value: function setUnexpectedErrorHandler(newUnexpectedErrorHandler) {
      this.unexpectedErrorHandler = newUnexpectedErrorHandler;
    }
  }, {
    key: "getUnexpectedErrorHandler",
    value: function getUnexpectedErrorHandler() {
      return this.unexpectedErrorHandler;
    }
  }, {
    key: "onUnexpectedError",
    value: function onUnexpectedError(e) {
      this.unexpectedErrorHandler(e);
      this.emit(e);
    }
  }, {
    key: "onUnexpectedExternalError",
    value: function onUnexpectedExternalError(e) {
      this.unexpectedErrorHandler(e);
    }
  }]);

  return ErrorHandler;
}();

var errorHandler = new ErrorHandler();

function onUnexpectedError(e) {
  if (!isPromiseCanceledError(e)) {
    errorHandler.onUnexpectedError(e);
  }

  return undefined;
}

var canceledName = 'Canceled';

function isPromiseCanceledError(error) {
  return error instanceof Error && error.name === canceledName && error.message === canceledName;
}

var Node = function Node(element) {
  _classCallCheck(this, Node);

  this.element = element;
};

var LinkedList =
/*#__PURE__*/
function () {
  function LinkedList() {
    _classCallCheck(this, LinkedList);
  }

  _createClass(LinkedList, [{
    key: "isEmpty",
    value: function isEmpty() {
      return !this._first;
    }
  }, {
    key: "unshift",
    value: function unshift(element) {
      return this.insert(element, false);
    }
  }, {
    key: "push",
    value: function push(element) {
      return this.insert(element, true);
    }
  }, {
    key: "insert",
    value: function insert(element, atTheEnd) {
      var _this2 = this;

      var newNode = new Node(element);

      if (!this._first) {
        this._first = newNode;
        this._last = newNode;
      } else if (atTheEnd) {
        var oldLast = this._last;
        this._last = newNode;
        newNode.prev = oldLast;
        oldLast.next = newNode;
      } else {
        var oldFirst = this._first;
        this._first = newNode;
        newNode.next = oldFirst;
        oldFirst.prev = newNode;
      }

      return function () {
        for (var candidate = _this2._first; candidate instanceof Node; candidate = candidate.next) {
          if (candidate !== newNode) {
            continue;
          }

          if (candidate.prev && candidate.next) {
            var anchor = candidate.prev;
            anchor.next = candidate.next;
            candidate.next.prev = anchor;
          } else if (!candidate.prev && !candidate.next) {
            _this2._first = undefined;
            _this2._last = undefined;
          } else if (!candidate.next) {
            _this2._last = _this2._last.prev;
            _this2._last.next = undefined;
          } else if (!candidate.prev) {
            _this2._first = _this2._first.next;
            _this2._first.prev = undefined;
          }

          break;
        }
      };
    }
  }, {
    key: "iterator",
    value: function iterator() {
      var _done;

      var _value;

      var element = {
        get done() {
          return _done;
        },

        get value() {
          return _value;
        }

      };
      var node = this._first;
      return {
        next: function next() {
          if (!node) {
            _done = true;
            _value = undefined;
          } else {
            _done = false;
            _value = node.element;
            node = node.next;
          }

          return element;
        }
      };
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var result = [];

      for (var node = this._first; node instanceof Node; node = node.next) {
        result.push(node.element);
      }

      return result;
    }
  }]);

  return LinkedList;
}();

var CallbackList =
/*#__PURE__*/
function () {
  function CallbackList() {
    _classCallCheck(this, CallbackList);
  }

  _createClass(CallbackList, [{
    key: "add",
    value: function add(callback) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var bucket = arguments.length > 2 ? arguments[2] : undefined;

      if (!this._callbacks) {
        this._callbacks = new LinkedList();
      }

      var remove = this._callbacks.push([callback, context]);

      if (Array.isArray(bucket)) {
        bucket.push({
          dispose: remove
        });
      }

      return remove;
    }
  }, {
    key: "invoke",
    value: function invoke() {
      if (!this._callbacks) {
        return undefined;
      }

      var ret = [];

      var elements = this._callbacks.toArray();

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              callback = _step$value[0],
              context = _step$value[1];

          try {
            ret.push(callback.apply(context, args));
          } catch (e) {
            onUnexpectedError(e);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return ret;
    }
  }, {
    key: "entries",
    value: function entries() {
      if (!this._callbacks) {
        return [];
      }

      return this._callbacks ? this._callbacks.toArray() : [];
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return !this._callbacks || this._callbacks.isEmpty();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._callbacks = undefined;
    }
  }]);

  return CallbackList;
}();

var Event;

(function (Event) {
  var _disposable = {
    dispose: function dispose() {}
  };

  Event.None = function () {
    return _disposable;
  };
})(Event || (Event = {}));

var Emitter =
/*#__PURE__*/
function () {
  function Emitter(_options) {
    _classCallCheck(this, Emitter);

    this._options = _options;
  }

  _createClass(Emitter, [{
    key: "fire",
    value: function fire(event) {
      if (this._callbacks) {
        this._callbacks.invoke.call(this._callbacks, event);
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this._callbacks) {
        this._callbacks.dispose();

        this._callbacks = undefined;
        this._disposed = true;
      }
    }
  }, {
    key: "event",
    get: function get() {
      var _this3 = this;

      if (!this._event) {
        this._event = function (listener, thisArgs, disposables) {
          if (!_this3._callbacks) {
            _this3._callbacks = new CallbackList();
          }

          var firstListener = _this3._callbacks.isEmpty();

          if (firstListener && _this3._options && _this3._options.onFirstListenerAdd) {
            _this3._options.onFirstListenerAdd(_this3);
          }

          var remove = _this3._callbacks.add(listener, thisArgs);

          if (firstListener && _this3._options && _this3._options.onFirstListenerDidAdd) {
            _this3._options.onFirstListenerDidAdd(_this3);
          }

          if (_this3._options && _this3._options.onListenerDidAdd) {
            _this3._options.onListenerDidAdd(_this3, listener, thisArgs);
          }

          var result;
          result = {
            dispose: function dispose() {
              result.dispose = Emitter._noop;

              if (!_this3._disposed) {
                remove();

                if (_this3._options && _this3._options.onLastListenerRemove && _this3._callbacks.isEmpty()) {
                  _this3._options.onLastListenerRemove(_this3);
                }
              }
            }
          };

          if (Array.isArray(disposables)) {
            disposables.push(result);
          }

          return result;
        };
      }

      return this._event;
    }
  }]);

  return Emitter;
}();

Emitter._noop = function () {};

var BoundedMap =
/*#__PURE__*/
function () {
  function BoundedMap() {
    var _this4 = this;

    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.MAX_VALUE;
    var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var value = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, BoundedMap);

    this.limit = limit;
    this.map = new Map();
    this.ratio = limit * ratio;

    if (value) {
      value.entries.forEach(function (entry) {
        _this4.set(entry.key, entry.value);
      });
    }
  }

  _createClass(BoundedMap, [{
    key: "setLimit",
    value: function setLimit(limit) {
      if (limit < 0) {
        return;
      }

      this.limit = limit;

      while (this.map.size > this.limit) {
        this.trim();
      }
    }
  }, {
    key: "serialize",
    value: function serialize() {
      var serialized = {
        entries: []
      };
      this.map.forEach(function (entry) {
        serialized.entries.push({
          key: entry.key,
          value: entry.value
        });
      });
      return serialized;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      if (this.map.has(key)) {
        return false;
      }

      var entry = {
        key: key,
        value: value
      };
      this.push(entry);

      if (this.size > this.limit) {
        this.trim();
      }

      return true;
    }
  }, {
    key: "get",
    value: function get(key) {
      var entry = this.map.get(key);
      return entry ? entry.value : null;
    }
  }, {
    key: "getOrSet",
    value: function getOrSet(k, t) {
      var res = this.get(k);

      if (res) {
        return res;
      }

      this.set(k, t);
      return t;
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      var entry = this.map.get(key);

      if (entry) {
        this.map.delete(key);

        if (entry.next) {
          entry.next.prev = entry.prev;
        } else {
          this.head = entry.prev;
        }

        if (entry.prev) {
          entry.prev.next = entry.next;
        } else {
          this.tail = entry.next;
        }

        return entry.value;
      }

      return null;
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.map.has(key);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.map.clear();
      this.head = null;
      this.tail = null;
    }
  }, {
    key: "push",
    value: function push(entry) {
      if (this.head) {
        entry.prev = this.head;
        this.head.next = entry;
      }

      if (!this.tail) {
        this.tail = entry;
      }

      this.head = entry;
      this.map.set(entry.key, entry);
    }
  }, {
    key: "trim",
    value: function trim() {
      if (this.tail) {
        if (this.ratio < this.limit) {
          var index = 0;
          var current = this.tail;

          while (current.next) {
            this.map.delete(current.key);

            if (index === this.ratio) {
              this.tail = current.next;
              this.tail.prev = null;
              break;
            }

            current = current.next;
            index++;
          }
        } else {
          this.map.delete(this.tail.key);
          this.tail = this.tail.next;

          if (this.tail) {
            this.tail.prev = null;
          }
        }
      }
    }
  }, {
    key: "size",
    get: function get() {
      return this.map.size;
    }
  }]);

  return BoundedMap;
}();

var PathIterator =
/*#__PURE__*/
function () {
  function PathIterator() {
    _classCallCheck(this, PathIterator);
  }

  _createClass(PathIterator, [{
    key: "reset",
    value: function reset(key) {
      this._value = key.replace(/\\$|\/$/, '');
      this._from = 0;
      this._to = 0;
      return this.next();
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      return this._to < this._value.length;
    }
  }, {
    key: "join",
    value: function join(parts) {
      return parts.join('/');
    }
  }, {
    key: "next",
    value: function next() {
      this._from = this._to;
      var justSeps = true;

      for (; this._to < this._value.length; this._to++) {
        var ch = this._value.charCodeAt(this._to);

        if (ch === PathIterator._fwd || ch === PathIterator._bwd) {
          if (justSeps) {
            this._from++;
          } else {
            break;
          }
        } else {
          justSeps = false;
        }
      }

      return this;
    }
  }, {
    key: "cmp",
    value: function cmp(a) {
      var aPos = 0;
      var aLen = a.length;
      var thisPos = this._from;

      while (aPos < aLen && thisPos < this._to) {
        var cmp = a.charCodeAt(aPos) - this._value.charCodeAt(thisPos);

        if (cmp !== 0) {
          return cmp;
        }

        aPos += 1;
        thisPos += 1;
      }

      if (aLen === this._to - this._from) {
        return 0;
      } else if (aPos < aLen) {
        return -1;
      } else {
        return 1;
      }
    }
  }, {
    key: "value",
    value: function value() {
      return this._value.substring(this._from, this._to);
    }
  }]);

  return PathIterator;
}();

PathIterator._fwd = '/'.charCodeAt(0);
PathIterator._bwd = '\\'.charCodeAt(0);
var Touch;

(function (Touch) {
  Touch.None = 0;
  Touch.First = 1;
  Touch.Last = 2;
})(Touch || (Touch = {}));

var nfcCache = new BoundedMap(10000);
var nfdCache = new BoundedMap(10000);
var CACHE = new BoundedMap(10000);

var TokenizationRegistryImpl =
/*#__PURE__*/
function () {
  function TokenizationRegistryImpl() {
    _classCallCheck(this, TokenizationRegistryImpl);

    this._onDidChange = new Emitter();
    this.onDidChange = this._onDidChange.event;
    this._map = Object.create(null);
    this._colorMap = null;
  }

  _createClass(TokenizationRegistryImpl, [{
    key: "fire",
    value: function fire(languages) {
      this._onDidChange.fire({
        changedLanguages: languages,
        changedColorMap: false
      });
    }
  }, {
    key: "register",
    value: function register(language, support) {
      var _this5 = this;

      this._map[language] = support;
      this.fire([language]);
      return {
        dispose: function dispose() {
          if (_this5._map[language] !== support) {
            return;
          }

          delete _this5._map[language];

          _this5.fire([language]);
        }
      };
    }
  }, {
    key: "get",
    value: function get(language) {
      return this._map[language] || null;
    }
  }, {
    key: "setColorMap",
    value: function setColorMap(colorMap) {
      this._colorMap = colorMap;

      this._onDidChange.fire({
        changedLanguages: Object.keys(this._map),
        changedColorMap: true
      });
    }
  }, {
    key: "getColorMap",
    value: function getColorMap() {
      return this._colorMap;
    }
  }, {
    key: "getDefaultForeground",
    value: function getDefaultForeground() {
      return this._colorMap[1];
    }
  }, {
    key: "getDefaultBackground",
    value: function getDefaultBackground() {
      return this._colorMap[2];
    }
  }]);

  return TokenizationRegistryImpl;
}();

var SuggestTriggerKind;

(function (SuggestTriggerKind) {
  SuggestTriggerKind[SuggestTriggerKind["Invoke"] = 0] = "Invoke";
  SuggestTriggerKind[SuggestTriggerKind["TriggerCharacter"] = 1] = "TriggerCharacter";
})(SuggestTriggerKind || (SuggestTriggerKind = {}));

var DocumentHighlightKind;

(function (DocumentHighlightKind) {
  DocumentHighlightKind[DocumentHighlightKind["Text"] = 0] = "Text";
  DocumentHighlightKind[DocumentHighlightKind["Read"] = 1] = "Read";
  DocumentHighlightKind[DocumentHighlightKind["Write"] = 2] = "Write";
})(DocumentHighlightKind || (DocumentHighlightKind = {}));

var SymbolKind;

(function (SymbolKind) {
  SymbolKind[SymbolKind["File"] = 0] = "File";
  SymbolKind[SymbolKind["Module"] = 1] = "Module";
  SymbolKind[SymbolKind["Namespace"] = 2] = "Namespace";
  SymbolKind[SymbolKind["Package"] = 3] = "Package";
  SymbolKind[SymbolKind["Class"] = 4] = "Class";
  SymbolKind[SymbolKind["Method"] = 5] = "Method";
  SymbolKind[SymbolKind["Property"] = 6] = "Property";
  SymbolKind[SymbolKind["Field"] = 7] = "Field";
  SymbolKind[SymbolKind["Constructor"] = 8] = "Constructor";
  SymbolKind[SymbolKind["Enum"] = 9] = "Enum";
  SymbolKind[SymbolKind["Interface"] = 10] = "Interface";
  SymbolKind[SymbolKind["Function"] = 11] = "Function";
  SymbolKind[SymbolKind["Variable"] = 12] = "Variable";
  SymbolKind[SymbolKind["Constant"] = 13] = "Constant";
  SymbolKind[SymbolKind["String"] = 14] = "String";
  SymbolKind[SymbolKind["Number"] = 15] = "Number";
  SymbolKind[SymbolKind["Boolean"] = 16] = "Boolean";
  SymbolKind[SymbolKind["Array"] = 17] = "Array";
  SymbolKind[SymbolKind["Object"] = 18] = "Object";
  SymbolKind[SymbolKind["Key"] = 19] = "Key";
  SymbolKind[SymbolKind["Null"] = 20] = "Null";
  SymbolKind[SymbolKind["EnumMember"] = 21] = "EnumMember";
  SymbolKind[SymbolKind["Struct"] = 22] = "Struct";
  SymbolKind[SymbolKind["Event"] = 23] = "Event";
  SymbolKind[SymbolKind["Operator"] = 24] = "Operator";
  SymbolKind[SymbolKind["TypeParameter"] = 25] = "TypeParameter";
})(SymbolKind || (SymbolKind = {}));

var symbolKindToCssClass = function () {
  var _fromMapping = Object.create(null);

  _fromMapping[SymbolKind.File] = 'file';
  _fromMapping[SymbolKind.Module] = 'module';
  _fromMapping[SymbolKind.Namespace] = 'namespace';
  _fromMapping[SymbolKind.Package] = 'package';
  _fromMapping[SymbolKind.Class] = 'class';
  _fromMapping[SymbolKind.Method] = 'method';
  _fromMapping[SymbolKind.Property] = 'property';
  _fromMapping[SymbolKind.Field] = 'field';
  _fromMapping[SymbolKind.Constructor] = 'constructor';
  _fromMapping[SymbolKind.Enum] = 'enum';
  _fromMapping[SymbolKind.Interface] = 'interface';
  _fromMapping[SymbolKind.Function] = 'function';
  _fromMapping[SymbolKind.Variable] = 'variable';
  _fromMapping[SymbolKind.Constant] = 'constant';
  _fromMapping[SymbolKind.String] = 'string';
  _fromMapping[SymbolKind.Number] = 'number';
  _fromMapping[SymbolKind.Boolean] = 'boolean';
  _fromMapping[SymbolKind.Array] = 'array';
  _fromMapping[SymbolKind.Object] = 'object';
  _fromMapping[SymbolKind.Key] = 'key';
  _fromMapping[SymbolKind.Null] = 'null';
  _fromMapping[SymbolKind.EnumMember] = 'enum-member';
  _fromMapping[SymbolKind.Struct] = 'struct';
  _fromMapping[SymbolKind.Event] = 'event';
  _fromMapping[SymbolKind.Operator] = 'operator';
  _fromMapping[SymbolKind.TypeParameter] = 'type-parameter';
  return function toCssClassName(kind) {
    return _fromMapping[kind] || 'property';
  };
}();

var TokenizationRegistry = new TokenizationRegistryImpl();

var Token =
/*#__PURE__*/
function () {
  function Token(offset, type, language) {
    _classCallCheck(this, Token);

    this.offset = offset | 0;
    this.type = type;
    this.language = language;
  }

  _createClass(Token, [{
    key: "toString",
    value: function toString() {
      return '(' + this.offset + ', ' + this.type + ')';
    }
  }]);

  return Token;
}();

var TokenizationResult = function TokenizationResult(tokens, endState) {
  _classCallCheck(this, TokenizationResult);

  this.tokens = tokens;
  this.endState = endState;
};

var TokenizationResult2 = function TokenizationResult2(tokens, endState) {
  _classCallCheck(this, TokenizationResult2);

  this.tokens = tokens;
  this.endState = endState;
};

var NullStateImpl =
/*#__PURE__*/
function () {
  function NullStateImpl() {
    _classCallCheck(this, NullStateImpl);
  }

  _createClass(NullStateImpl, [{
    key: "clone",
    value: function clone() {
      return this;
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return this === other;
    }
  }]);

  return NullStateImpl;
}();

var NULL_STATE = new NullStateImpl();
var NULL_MODE_ID = 'vs.editor.nullMode';
var CACHE_STACK_DEPTH = 5;

var MonarchStackElementFactory =
/*#__PURE__*/
function () {
  function MonarchStackElementFactory(maxCacheDepth) {
    _classCallCheck(this, MonarchStackElementFactory);

    this._maxCacheDepth = maxCacheDepth;
    this._entries = Object.create(null);
  }

  _createClass(MonarchStackElementFactory, [{
    key: "create",
    value: function create(parent, state) {
      if (parent !== null && parent.depth >= this._maxCacheDepth) {
        return new MonarchStackElement(parent, state);
      }

      var stackElementId = MonarchStackElement.getStackElementId(parent);

      if (stackElementId.length > 0) {
        stackElementId += '|';
      }

      stackElementId += state;
      var result = this._entries[stackElementId];

      if (result) {
        return result;
      }

      result = new MonarchStackElement(parent, state);
      this._entries[stackElementId] = result;
      return result;
    }
  }], [{
    key: "create",
    value: function create(parent, state) {
      return this._INSTANCE.create(parent, state);
    }
  }]);

  return MonarchStackElementFactory;
}();

MonarchStackElementFactory._INSTANCE = new MonarchStackElementFactory(CACHE_STACK_DEPTH);

var MonarchStackElement =
/*#__PURE__*/
function () {
  function MonarchStackElement(parent, state) {
    _classCallCheck(this, MonarchStackElement);

    this.parent = parent;
    this.state = state;
    this.depth = (this.parent ? this.parent.depth : 0) + 1;
  }

  _createClass(MonarchStackElement, [{
    key: "equals",
    value: function equals(other) {
      return MonarchStackElement._equals(this, other);
    }
  }, {
    key: "push",
    value: function push(state) {
      return MonarchStackElementFactory.create(this, state);
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.parent;
    }
  }, {
    key: "popall",
    value: function popall() {
      var result = this;

      while (result.parent) {
        result = result.parent;
      }

      return result;
    }
  }, {
    key: "switchTo",
    value: function switchTo(state) {
      return MonarchStackElementFactory.create(this.parent, state);
    }
  }], [{
    key: "getStackElementId",
    value: function getStackElementId(element) {
      var result = '';

      while (element !== null) {
        if (result.length > 0) {
          result += '|';
        }

        result += element.state;
        element = element.parent;
      }

      return result;
    }
  }, {
    key: "_equals",
    value: function _equals(a, b) {
      while (a !== null && b !== null) {
        if (a === b) {
          return true;
        }

        if (a.state !== b.state) {
          return false;
        }

        a = a.parent;
        b = b.parent;
      }

      if (a === null && b === null) {
        return true;
      }

      return false;
    }
  }]);

  return MonarchStackElement;
}();

var EmbeddedModeData =
/*#__PURE__*/
function () {
  function EmbeddedModeData(modeId, state) {
    _classCallCheck(this, EmbeddedModeData);

    this.modeId = modeId;
    this.state = state;
  }

  _createClass(EmbeddedModeData, [{
    key: "equals",
    value: function equals(other) {
      return this.modeId === other.modeId && this.state.equals(other.state);
    }
  }, {
    key: "clone",
    value: function clone() {
      var stateClone = this.state.clone();

      if (stateClone === this.state) {
        return this;
      }

      return new EmbeddedModeData(this.modeId, this.state);
    }
  }]);

  return EmbeddedModeData;
}();

var MonarchLineStateFactory =
/*#__PURE__*/
function () {
  function MonarchLineStateFactory(maxCacheDepth) {
    _classCallCheck(this, MonarchLineStateFactory);

    this._maxCacheDepth = maxCacheDepth;
    this._entries = Object.create(null);
  }

  _createClass(MonarchLineStateFactory, [{
    key: "create",
    value: function create(stack, embeddedModeData) {
      if (embeddedModeData !== null) {
        return new MonarchLineState(stack, embeddedModeData);
      }

      if (stack !== null && stack.depth >= this._maxCacheDepth) {
        return new MonarchLineState(stack, embeddedModeData);
      }

      var stackElementId = MonarchStackElement.getStackElementId(stack);
      var result = this._entries[stackElementId];

      if (result) {
        return result;
      }

      result = new MonarchLineState(stack, null);
      this._entries[stackElementId] = result;
      return result;
    }
  }], [{
    key: "create",
    value: function create(stack, embeddedModeData) {
      return this._INSTANCE.create(stack, embeddedModeData);
    }
  }]);

  return MonarchLineStateFactory;
}();

MonarchLineStateFactory._INSTANCE = new MonarchLineStateFactory(CACHE_STACK_DEPTH);

var MonarchLineState =
/*#__PURE__*/
function () {
  function MonarchLineState(stack, embeddedModeData) {
    _classCallCheck(this, MonarchLineState);

    this.stack = stack;
    this.embeddedModeData = embeddedModeData;
  }

  _createClass(MonarchLineState, [{
    key: "clone",
    value: function clone() {
      var embeddedModeDataClone = this.embeddedModeData ? this.embeddedModeData.clone() : null;

      if (embeddedModeDataClone === this.embeddedModeData) {
        return this;
      }

      return MonarchLineStateFactory.create(this.stack, this.embeddedModeData);
    }
  }, {
    key: "equals",
    value: function equals(other) {
      if (!(other instanceof MonarchLineState)) {
        return false;
      }

      if (!this.stack.equals(other.stack)) {
        return false;
      }

      if (this.embeddedModeData === null && other.embeddedModeData === null) {
        return true;
      }

      if (this.embeddedModeData === null || other.embeddedModeData === null) {
        return false;
      }

      return this.embeddedModeData.equals(other.embeddedModeData);
    }
  }]);

  return MonarchLineState;
}();

var hasOwnProperty$2 = Object.hasOwnProperty;

var MonarchClassicTokensCollector =
/*#__PURE__*/
function () {
  function MonarchClassicTokensCollector() {
    _classCallCheck(this, MonarchClassicTokensCollector);

    this._tokens = [];
    this._language = null;
    this._lastTokenType = null;
    this._lastTokenLanguage = null;
  }

  _createClass(MonarchClassicTokensCollector, [{
    key: "enterMode",
    value: function enterMode(startOffset, modeId) {
      this._language = modeId;
    }
  }, {
    key: "emit",
    value: function emit(startOffset, type) {
      if (this._lastTokenType === type && this._lastTokenLanguage === this._language) {
        return;
      }

      this._lastTokenType = type;
      this._lastTokenLanguage = this._language;

      this._tokens.push(new Token(startOffset, type, this._language));
    }
  }, {
    key: "nestedModeTokenize",
    value: function nestedModeTokenize(embeddedModeLine, embeddedModeData, offsetDelta) {
      var nestedModeId = embeddedModeData.modeId;
      var embeddedModeState = embeddedModeData.state;
      var nestedModeTokenizationSupport = TokenizationRegistry.get(nestedModeId);

      if (!nestedModeTokenizationSupport) {
        this.enterMode(offsetDelta, nestedModeId);
        this.emit(offsetDelta, '');
        return embeddedModeState;
      }

      var nestedResult = nestedModeTokenizationSupport.tokenize(embeddedModeLine, embeddedModeState, offsetDelta);
      this._tokens = this._tokens.concat(nestedResult.tokens);
      this._lastTokenType = null;
      this._lastTokenLanguage = null;
      this._language = null;
      return nestedResult.endState;
    }
  }, {
    key: "finalize",
    value: function finalize(endState) {
      return new TokenizationResult(this._tokens, endState);
    }
  }]);

  return MonarchClassicTokensCollector;
}();

var MonarchModernTokensCollector =
/*#__PURE__*/
function () {
  function MonarchModernTokensCollector(modeService, theme) {
    _classCallCheck(this, MonarchModernTokensCollector);

    this._modeService = modeService;
    this._theme = theme;
    this._prependTokens = null;
    this._tokens = [];
    this._currentLanguageId = 0;
    this._lastTokenMetadata = 0;
  }

  _createClass(MonarchModernTokensCollector, [{
    key: "enterMode",
    value: function enterMode(startOffset, modeId) {
      this._currentLanguageId = this._modeService.getLanguageIdentifier(modeId).id;
    }
  }, {
    key: "emit",
    value: function emit(startOffset, type) {
      var metadata = this._theme.match(this._currentLanguageId, type);

      if (this._lastTokenMetadata === metadata) {
        return;
      }

      this._lastTokenMetadata = metadata;

      this._tokens.push(startOffset);

      this._tokens.push(metadata);
    }
  }, {
    key: "nestedModeTokenize",
    value: function nestedModeTokenize(embeddedModeLine, embeddedModeData, offsetDelta) {
      var nestedModeId = embeddedModeData.modeId;
      var embeddedModeState = embeddedModeData.state;
      var nestedModeTokenizationSupport = TokenizationRegistry.get(nestedModeId);

      if (!nestedModeTokenizationSupport) {
        this.enterMode(offsetDelta, nestedModeId);
        this.emit(offsetDelta, '');
        return embeddedModeState;
      }

      var nestedResult = nestedModeTokenizationSupport.tokenize2(embeddedModeLine, embeddedModeState, offsetDelta);
      this._prependTokens = MonarchModernTokensCollector._merge(this._prependTokens, this._tokens, nestedResult.tokens);
      this._tokens = [];
      this._currentLanguageId = 0;
      this._lastTokenMetadata = 0;
      return nestedResult.endState;
    }
  }, {
    key: "finalize",
    value: function finalize(endState) {
      return new TokenizationResult2(MonarchModernTokensCollector._merge(this._prependTokens, this._tokens, null), endState);
    }
  }], [{
    key: "_merge",
    value: function _merge(a, b, c) {
      var aLen = a !== null ? a.length : 0;
      var bLen = b.length;
      var cLen = c !== null ? c.length : 0;

      if (aLen === 0 && bLen === 0 && cLen === 0) {
        return new Uint32Array(0);
      }

      if (aLen === 0 && bLen === 0) {
        return c;
      }

      if (bLen === 0 && cLen === 0) {
        return a;
      }

      var result = new Uint32Array(aLen + bLen + cLen);

      if (a !== null) {
        result.set(a);
      }

      for (var i = 0; i < bLen; i++) {
        result[aLen + i] = b[i];
      }

      if (c !== null) {
        result.set(c, aLen + bLen);
      }

      return result;
    }
  }]);

  return MonarchModernTokensCollector;
}();

var MonarchTokenizer =
/*#__PURE__*/
function () {
  function MonarchTokenizer(modeService, standaloneThemeService, modeId, lexer) {
    var _this6 = this;

    _classCallCheck(this, MonarchTokenizer);

    this._modeService = modeService;
    this._standaloneThemeService = standaloneThemeService;
    this._modeId = modeId;
    this._lexer = lexer;
    this._embeddedModes = Object.create(null);
    var emitting = false;
    this._tokenizationRegistryListener = TokenizationRegistry.onDidChange(function (e) {
      if (emitting) {
        return;
      }

      var isOneOfMyEmbeddedModes = false;

      for (var i = 0, len = e.changedLanguages.length; i < len; i++) {
        var language = e.changedLanguages[i];

        if (_this6._embeddedModes[language]) {
          isOneOfMyEmbeddedModes = true;
          break;
        }
      }

      if (isOneOfMyEmbeddedModes) {
        emitting = true;
        TokenizationRegistry.fire([_this6._modeId]);
        emitting = false;
      }
    });
  }

  _createClass(MonarchTokenizer, [{
    key: "dispose",
    value: function dispose() {
      this._tokenizationRegistryListener.dispose();
    }
  }, {
    key: "getInitialState",
    value: function getInitialState() {
      var rootState = MonarchStackElementFactory.create(null, this._lexer.start);
      return MonarchLineStateFactory.create(rootState, null);
    }
  }, {
    key: "tokenize",
    value: function tokenize(line, lineState, offsetDelta) {
      var tokensCollector = new MonarchClassicTokensCollector();

      var endLineState = this._tokenize(line, lineState, offsetDelta, tokensCollector);

      return tokensCollector.finalize(endLineState);
    }
  }, {
    key: "tokenize2",
    value: function tokenize2(line, lineState, offsetDelta) {
      var tokensCollector = new MonarchModernTokensCollector(this._modeService, this._standaloneThemeService.getTheme().tokenTheme);

      var endLineState = this._tokenize(line, lineState, offsetDelta, tokensCollector);

      return tokensCollector.finalize(endLineState);
    }
  }, {
    key: "_tokenize",
    value: function _tokenize(line, lineState, offsetDelta, collector) {
      if (lineState.embeddedModeData) {
        return this._nestedTokenize(line, lineState, offsetDelta, collector);
      } else {
        return this._myTokenize(line, lineState, offsetDelta, collector);
      }
    }
  }, {
    key: "_findLeavingNestedModeOffset",
    value: function _findLeavingNestedModeOffset(line, state) {
      var rules = this._lexer.tokenizer[state.stack.state];

      if (!rules) {
        rules = findRules(this._lexer, state.stack.state);

        if (!rules) {
          throwError(this._lexer, 'tokenizer state is not defined: ' + state.stack.state);
        }
      }

      var popOffset = -1;
      var hasEmbeddedPopRule = false;

      for (var idx in rules) {
        if (!hasOwnProperty$2.call(rules, idx)) {
          continue;
        }

        var rule = rules[idx];

        if (isIAction(rule.action) && rule.action.nextEmbedded !== '@pop') {
          continue;
        }

        hasEmbeddedPopRule = true;
        var regex = rule.regex;
        var regexSource = rule.regex.source;

        if (regexSource.substr(0, 4) === '^(?:' && regexSource.substr(regexSource.length - 1, 1) === ')') {
          regex = new RegExp(regexSource.substr(4, regexSource.length - 5), regex.ignoreCase ? 'i' : '');
        }

        var result = line.search(regex);

        if (result === -1) {
          continue;
        }

        if (popOffset === -1 || result < popOffset) {
          popOffset = result;
        }
      }

      if (!hasEmbeddedPopRule) {
        throwError(this._lexer, 'no rule containing nextEmbedded: "@pop" in tokenizer embedded state: ' + state.stack.state);
      }

      return popOffset;
    }
  }, {
    key: "_nestedTokenize",
    value: function _nestedTokenize(line, lineState, offsetDelta, tokensCollector) {
      var popOffset = this._findLeavingNestedModeOffset(line, lineState);

      if (popOffset === -1) {
        var nestedEndState = tokensCollector.nestedModeTokenize(line, lineState.embeddedModeData, offsetDelta);
        return MonarchLineStateFactory.create(lineState.stack, new EmbeddedModeData(lineState.embeddedModeData.modeId, nestedEndState));
      }

      var nestedModeLine = line.substring(0, popOffset);

      if (nestedModeLine.length > 0) {
        tokensCollector.nestedModeTokenize(nestedModeLine, lineState.embeddedModeData, offsetDelta);
      }

      var restOfTheLine = line.substring(popOffset);
      return this._myTokenize(restOfTheLine, lineState, offsetDelta + popOffset, tokensCollector);
    }
  }, {
    key: "_myTokenize",
    value: function _myTokenize(line, lineState, offsetDelta, tokensCollector) {
      tokensCollector.enterMode(offsetDelta, this._modeId);
      var lineLength = line.length;
      var embeddedModeData = lineState.embeddedModeData;
      var stack = lineState.stack;
      var pos = 0;
      var groupActions = null;
      var groupMatches = null;
      var groupMatched = null;
      var groupRule = null;

      while (pos < lineLength) {
        var pos0 = pos;
        var stackLen0 = stack.depth;
        var groupLen0 = groupActions ? groupActions.length : 0;
        var state = stack.state;
        var matches = null;
        var matched = null;
        var action = null;
        var rule = null;
        var enteringEmbeddedMode = null;

        if (groupActions) {
          matches = groupMatches;
          matched = groupMatched.shift();
          action = groupActions.shift();
          rule = groupRule;

          if (groupActions.length === 0) {
            groupActions = null;
            groupMatches = null;
            groupMatched = null;
            groupRule = null;
          }
        } else {
          if (pos >= lineLength) {
            break;
          }

          var rules = this._lexer.tokenizer[state];

          if (!rules) {
            rules = findRules(this._lexer, state);

            if (!rules) {
              throwError(this._lexer, 'tokenizer state is not defined: ' + state);
            }
          }

          var restOfLine = line.substr(pos);

          for (var idx in rules) {
            if (hasOwnProperty$2.call(rules, idx)) {
              var _rule = rules[idx];

              if (pos === 0 || !_rule.matchOnlyAtLineStart) {
                matches = restOfLine.match(_rule.regex);

                if (matches) {
                  matched = matches[0];
                  action = _rule.action;
                  break;
                }
              }
            }
          }
        }

        if (!matches) {
          matches = [''];
          matched = '';
        }

        if (!action) {
          if (pos < lineLength) {
            matches = [line.charAt(pos)];
            matched = matches[0];
          }

          action = this._lexer.defaultToken;
        }

        pos += matched.length;

        while (isFuzzyAction(action) && isIAction(action) && action.test) {
          action = action.test(matched, matches, state, pos === lineLength);
        }

        var result = null;

        if (typeof action === 'string' || Array.isArray(action)) {
          result = action;
        } else if (action.group) {
          result = action.group;
        } else if (action.token !== null && action.token !== undefined) {
          if (action.tokenSubst) {
            result = substituteMatches(this._lexer, action.token, matched, matches, state);
          } else {
            result = action.token;
          }

          if (action.nextEmbedded) {
            if (action.nextEmbedded === '@pop') {
              if (!embeddedModeData) {
                throwError(this._lexer, 'cannot pop embedded mode if not inside one');
              }

              embeddedModeData = null;
            } else if (embeddedModeData) {
              throwError(this._lexer, 'cannot enter embedded mode from within an embedded mode');
            } else {
              enteringEmbeddedMode = substituteMatches(this._lexer, action.nextEmbedded, matched, matches, state);
            }
          }

          if (action.goBack) {
            pos = Math.max(0, pos - action.goBack);
          }

          if (action.switchTo && typeof action.switchTo === 'string') {
            var nextState = substituteMatches(this._lexer, action.switchTo, matched, matches, state);

            if (nextState[0] === '@') {
              nextState = nextState.substr(1);
            }

            if (!findRules(this._lexer, nextState)) {
              throwError(this._lexer, 'trying to switch to a state \'' + nextState + '\' that is undefined in rule: ' + rule.name);
            } else {
              stack = stack.switchTo(nextState);
            }
          } else if (action.transform && typeof action.transform === 'function') {
            throwError(this._lexer, 'action.transform not supported');
          } else if (action.next) {
            if (action.next === '@push') {
              if (stack.depth >= this._lexer.maxStack) {
                throwError(this._lexer, 'maximum tokenizer stack size reached: [' + stack.state + ',' + stack.parent.state + ',...]');
              } else {
                stack = stack.push(state);
              }
            } else if (action.next === '@pop') {
              if (stack.depth <= 1) {
                throwError(this._lexer, 'trying to pop an empty stack in rule: ' + rule.name);
              } else {
                stack = stack.pop();
              }
            } else if (action.next === '@popall') {
              stack = stack.popall();
            } else {
              var _nextState = substituteMatches(this._lexer, action.next, matched, matches, state);

              if (_nextState[0] === '@') {
                _nextState = _nextState.substr(1);
              }

              if (!findRules(this._lexer, _nextState)) {
                throwError(this._lexer, 'trying to set a next state \'' + _nextState + '\' that is undefined in rule: ' + rule.name);
              } else {
                stack = stack.push(_nextState);
              }
            }
          }

          if (action.log && typeof action.log === 'string') {
            log(this._lexer, this._lexer.languageId + ': ' + substituteMatches(this._lexer, action.log, matched, matches, state));
          }
        }

        if (result === null) {
          throwError(this._lexer, 'lexer rule has no well-defined action in rule: ' + rule.name);
        }

        if (Array.isArray(result)) {
          if (groupActions && groupActions.length > 0) {
            throwError(this._lexer, 'groups cannot be nested: ' + rule.name);
          }

          if (matches.length !== result.length + 1) {
            throwError(this._lexer, 'matched number of groups does not match the number of actions in rule: ' + rule.name);
          }

          var totalLen = 0;

          for (var i = 1; i < matches.length; i++) {
            totalLen += matches[i].length;
          }

          if (totalLen !== matched.length) {
            throwError(this._lexer, 'with groups, all characters should be matched in consecutive groups in rule: ' + rule.name);
          }

          groupMatches = matches;
          groupMatched = matches.slice(1);
          groupActions = result.slice(0);
          groupRule = rule;
          pos -= matched.length;
          continue;
        } else {
          if (result === '@rematch') {
            pos -= matched.length;
            matched = '';
            matches = null;
            result = '';
          }

          if (matched.length === 0) {
            if (stackLen0 !== stack.depth || state !== stack.state || (!groupActions ? 0 : groupActions.length) !== groupLen0) {
              continue;
            } else {
              throwError(this._lexer, 'no progress in tokenizer in rule: ' + rule.name);
              pos = lineLength;
            }
          }

          var tokenType = null;

          if (isString$1(result) && result.indexOf('@brackets') === 0) {
            var rest = result.substr('@brackets'.length);
            var bracket = findBracket(this._lexer, matched);

            if (!bracket) {
              throwError(this._lexer, '@brackets token returned but no bracket defined as: ' + matched);
              bracket = {
                token: '',
                bracketType: 0
              };
            }

            tokenType = sanitize(bracket.token + rest);
          } else {
            var token = result === '' ? '' : result + this._lexer.tokenPostfix;
            tokenType = sanitize(token);
          }

          tokensCollector.emit(pos0 + offsetDelta, tokenType);
        }

        if (enteringEmbeddedMode !== null) {
          var enteringEmbeddedModeId = this._modeService.getModeIdForLanguageName(enteringEmbeddedMode);

          if (enteringEmbeddedModeId) {
            enteringEmbeddedMode = enteringEmbeddedModeId;
          }

          var _embeddedModeData = this._getNestedEmbeddedModeData(enteringEmbeddedMode);

          if (pos < lineLength) {
            var _restOfLine = line.substr(pos);

            return this._nestedTokenize(_restOfLine, MonarchLineStateFactory.create(stack, _embeddedModeData), offsetDelta + pos, tokensCollector);
          } else {
            return MonarchLineStateFactory.create(stack, _embeddedModeData);
          }
        }
      }

      return MonarchLineStateFactory.create(stack, embeddedModeData);
    }
  }, {
    key: "_getNestedEmbeddedModeData",
    value: function _getNestedEmbeddedModeData(mimetypeOrModeId) {
      var nestedMode = this._locateMode(mimetypeOrModeId);

      if (nestedMode) {
        var tokenizationSupport = TokenizationRegistry.get(nestedMode.getId());

        if (tokenizationSupport) {
          return new EmbeddedModeData(nestedMode.getId(), tokenizationSupport.getInitialState());
        }
      }

      var nestedModeId = nestedMode ? nestedMode.getId() : NULL_MODE_ID;
      return new EmbeddedModeData(nestedModeId, NULL_STATE);
    }
  }, {
    key: "_locateMode",
    value: function _locateMode(mimetypeOrModeId) {
      if (!mimetypeOrModeId || !this._modeService.isRegisteredMode(mimetypeOrModeId)) {
        return null;
      }

      var modeId = this._modeService.getModeId(mimetypeOrModeId);

      this._modeService.getOrCreateMode(modeId);

      var mode = this._modeService.getMode(modeId);

      if (mode) {
        this._embeddedModes[modeId] = true;
        return mode;
      }

      this._embeddedModes[modeId] = true;
      return null;
    }
  }]);

  return MonarchTokenizer;
}();

function findBracket(lexer, matched) {
  if (!matched) {
    return null;
  }

  matched = fixCase(lexer, matched);
  var brackets = lexer.brackets;

  for (var i = 0; i < brackets.length; i++) {
    var bracket = brackets[i];

    if (bracket.open === matched) {
      return {
        token: bracket.token,
        bracketType: 1
      };
    } else if (bracket.close === matched) {
      return {
        token: bracket.token,
        bracketType: -1
      };
    }
  }

  return null;
}

function createTokenizationSupport(modeService, standaloneThemeService, modeId, lexer) {
  return new MonarchTokenizer(modeService, standaloneThemeService, modeId, lexer);
}

function roundFloat(number, decimalPoints) {
  var decimal = Math.pow(10, decimalPoints);
  return Math.round(number * decimal) / decimal;
}

var RGBA =
/*#__PURE__*/
function () {
  function RGBA(r, g, b) {
    var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck(this, RGBA);

    this.r = Math.min(255, Math.max(0, r)) | 0;
    this.g = Math.min(255, Math.max(0, g)) | 0;
    this.b = Math.min(255, Math.max(0, b)) | 0;
    this.a = roundFloat(Math.max(Math.min(1, a), 0), 3);
  }

  _createClass(RGBA, null, [{
    key: "equals",
    value: function equals(a, b) {
      return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
    }
  }]);

  return RGBA;
}();

var HSLA =
/*#__PURE__*/
function () {
  function HSLA(h, s, l, a) {
    _classCallCheck(this, HSLA);

    this.h = Math.max(Math.min(360, h), 0) | 0;
    this.s = roundFloat(Math.max(Math.min(1, s), 0), 3);
    this.l = roundFloat(Math.max(Math.min(1, l), 0), 3);
    this.a = roundFloat(Math.max(Math.min(1, a), 0), 3);
  }

  _createClass(HSLA, null, [{
    key: "equals",
    value: function equals(a, b) {
      return a.h === b.h && a.s === b.s && a.l === b.l && a.a === b.a;
    }
  }, {
    key: "fromRGBA",
    value: function fromRGBA(rgba) {
      var r = rgba.r / 255;
      var g = rgba.g / 255;
      var b = rgba.b / 255;
      var a = rgba.a;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h = 0;
      var s = 0;
      var l = (min + max) / 2;
      var chroma = max - min;

      if (chroma > 0) {
        s = Math.min(l <= 0.5 ? chroma / (2 * l) : chroma / (2 - 2 * l), 1);

        switch (max) {
          case r:
            h = (g - b) / chroma + (g < b ? 6 : 0);
            break;

          case g:
            h = (b - r) / chroma + 2;
            break;

          case b:
            h = (r - g) / chroma + 4;
            break;
        }

        h *= 60;
        h = Math.round(h);
      }

      return new HSLA(h, s, l, a);
    }
  }, {
    key: "_hue2rgb",
    value: function _hue2rgb(p, q, t) {
      if (t < 0) {
        t += 1;
      }

      if (t > 1) {
        t -= 1;
      }

      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }

      if (t < 1 / 2) {
        return q;
      }

      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }

      return p;
    }
  }, {
    key: "toRGBA",
    value: function toRGBA(hsla) {
      var h = hsla.h / 360;
      var s = hsla.s,
          l = hsla.l,
          a = hsla.a;
      var r, g, b;

      if (s === 0) {
        r = g = b = l;
      } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = HSLA._hue2rgb(p, q, h + 1 / 3);
        g = HSLA._hue2rgb(p, q, h);
        b = HSLA._hue2rgb(p, q, h - 1 / 3);
      }

      return new RGBA(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a);
    }
  }]);

  return HSLA;
}();

var HSVA =
/*#__PURE__*/
function () {
  function HSVA(h, s, v, a) {
    _classCallCheck(this, HSVA);

    this.h = Math.max(Math.min(360, h), 0) | 0;
    this.s = roundFloat(Math.max(Math.min(1, s), 0), 3);
    this.v = roundFloat(Math.max(Math.min(1, v), 0), 3);
    this.a = roundFloat(Math.max(Math.min(1, a), 0), 3);
  }

  _createClass(HSVA, null, [{
    key: "equals",
    value: function equals(a, b) {
      return a.h === b.h && a.s === b.s && a.v === b.v && a.a === b.a;
    }
  }, {
    key: "fromRGBA",
    value: function fromRGBA(rgba) {
      var r = rgba.r / 255;
      var g = rgba.g / 255;
      var b = rgba.b / 255;
      var cmax = Math.max(r, g, b);
      var cmin = Math.min(r, g, b);
      var delta = cmax - cmin;
      var s = cmax === 0 ? 0 : delta / cmax;
      var m;

      if (delta === 0) {
        m = 0;
      } else if (cmax === r) {
        m = ((g - b) / delta % 6 + 6) % 6;
      } else if (cmax === g) {
        m = (b - r) / delta + 2;
      } else {
        m = (r - g) / delta + 4;
      }

      return new HSVA(m * 60, s, cmax, rgba.a);
    }
  }, {
    key: "toRGBA",
    value: function toRGBA(hsva) {
      var h = hsva.h,
          s = hsva.s,
          v = hsva.v,
          a = hsva.a;
      var c = v * s;
      var x = c * (1 - Math.abs(h / 60 % 2 - 1));
      var m = v - c;
      var r = 0,
          g = 0,
          b = 0;

      if (h < 60) {
        r = c;
        g = x;
      } else if (h < 120) {
        r = x;
        g = c;
      } else if (h < 180) {
        g = c;
        b = x;
      } else if (h < 240) {
        g = x;
        b = c;
      } else if (h < 300) {
        r = x;
        b = c;
      } else if (h < 360) {
        r = c;
        b = x;
      }

      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
      return new RGBA(r, g, b, a);
    }
  }]);

  return HSVA;
}();

var Color =
/*#__PURE__*/
function () {
  function Color(arg) {
    _classCallCheck(this, Color);

    if (!arg) {
      throw new Error('Color needs a value');
    } else if (arg instanceof RGBA) {
      this.rgba = arg;
    } else if (arg instanceof HSLA) {
      this._hsla = arg;
      this.rgba = HSLA.toRGBA(arg);
    } else if (arg instanceof HSVA) {
      this._hsva = arg;
      this.rgba = HSVA.toRGBA(arg);
    } else {
      throw new Error('Invalid color ctor argument');
    }
  }

  _createClass(Color, [{
    key: "equals",
    value: function equals(other) {
      return !!other && RGBA.equals(this.rgba, other.rgba) && HSLA.equals(this.hsla, other.hsla) && HSVA.equals(this.hsva, other.hsva);
    }
  }, {
    key: "getRelativeLuminance",
    value: function getRelativeLuminance() {
      var R = Color._relativeLuminanceForComponent(this.rgba.r);

      var G = Color._relativeLuminanceForComponent(this.rgba.g);

      var B = Color._relativeLuminanceForComponent(this.rgba.b);

      var luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;
      return roundFloat(luminance, 4);
    }
  }, {
    key: "getContrastRatio",
    value: function getContrastRatio(another) {
      var lum1 = this.getRelativeLuminance();
      var lum2 = another.getRelativeLuminance();
      return lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05);
    }
  }, {
    key: "isDarker",
    value: function isDarker() {
      var yiq = (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1000;
      return yiq < 128;
    }
  }, {
    key: "isLighter",
    value: function isLighter() {
      var yiq = (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1000;
      return yiq >= 128;
    }
  }, {
    key: "isLighterThan",
    value: function isLighterThan(another) {
      var lum1 = this.getRelativeLuminance();
      var lum2 = another.getRelativeLuminance();
      return lum1 > lum2;
    }
  }, {
    key: "isDarkerThan",
    value: function isDarkerThan(another) {
      var lum1 = this.getRelativeLuminance();
      var lum2 = another.getRelativeLuminance();
      return lum1 < lum2;
    }
  }, {
    key: "lighten",
    value: function lighten(factor) {
      return new Color(new HSLA(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * factor, this.hsla.a));
    }
  }, {
    key: "darken",
    value: function darken(factor) {
      return new Color(new HSLA(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * factor, this.hsla.a));
    }
  }, {
    key: "transparent",
    value: function transparent(factor) {
      var _this$rgba = this.rgba,
          r = _this$rgba.r,
          g = _this$rgba.g,
          b = _this$rgba.b,
          a = _this$rgba.a;
      return new Color(new RGBA(r, g, b, a * factor));
    }
  }, {
    key: "isTransparent",
    value: function isTransparent() {
      return this.rgba.a === 0;
    }
  }, {
    key: "isOpaque",
    value: function isOpaque() {
      return this.rgba.a === 1;
    }
  }, {
    key: "opposite",
    value: function opposite() {
      return new Color(new RGBA(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
    }
  }, {
    key: "blend",
    value: function blend(c) {
      var rgba = c.rgba;
      var thisA = this.rgba.a;
      var colorA = rgba.a;
      var a = thisA + colorA * (1 - thisA);

      if (a < 1.0e-6) {
        return Color.transparent;
      }

      var r = this.rgba.r * thisA / a + rgba.r * colorA * (1 - thisA) / a;
      var g = this.rgba.g * thisA / a + rgba.g * colorA * (1 - thisA) / a;
      var b = this.rgba.b * thisA / a + rgba.b * colorA * (1 - thisA) / a;
      return new Color(new RGBA(r, g, b, a));
    }
  }, {
    key: "toString",
    value: function toString() {
      return Color.Format.CSS.format(this);
    }
  }, {
    key: "hsla",
    get: function get() {
      if (this._hsla) {
        return this._hsla;
      } else {
        return HSLA.fromRGBA(this.rgba);
      }
    }
  }, {
    key: "hsva",
    get: function get() {
      if (this._hsva) {
        return this._hsva;
      }

      return HSVA.fromRGBA(this.rgba);
    }
  }], [{
    key: "fromHex",
    value: function fromHex(hex) {
      return Color.Format.CSS.parseHex(hex) || Color.red;
    }
  }, {
    key: "_relativeLuminanceForComponent",
    value: function _relativeLuminanceForComponent(color) {
      var c = color / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
  }, {
    key: "getLighterColor",
    value: function getLighterColor(of, relative, factor) {
      if (of.isLighterThan(relative)) {
        return of;
      }

      factor = factor ? factor : 0.5;
      var lum1 = of.getRelativeLuminance();
      var lum2 = relative.getRelativeLuminance();
      factor = factor * (lum2 - lum1) / lum2;
      return of.lighten(factor);
    }
  }, {
    key: "getDarkerColor",
    value: function getDarkerColor(of, relative, factor) {
      if (of.isDarkerThan(relative)) {
        return of;
      }

      factor = factor ? factor : 0.5;
      var lum1 = of.getRelativeLuminance();
      var lum2 = relative.getRelativeLuminance();
      factor = factor * (lum1 - lum2) / lum1;
      return of.darken(factor);
    }
  }]);

  return Color;
}();

Color.white = new Color(new RGBA(255, 255, 255, 1));
Color.black = new Color(new RGBA(0, 0, 0, 1));
Color.red = new Color(new RGBA(255, 0, 0, 1));
Color.blue = new Color(new RGBA(0, 0, 255, 1));
Color.green = new Color(new RGBA(0, 255, 0, 1));
Color.cyan = new Color(new RGBA(0, 255, 255, 1));
Color.lightgrey = new Color(new RGBA(211, 211, 211, 1));
Color.transparent = new Color(new RGBA(0, 0, 0, 0));

(function (Color) {
  var Format;

  (function (Format) {
    var CSS;

    (function (CSS) {
      function formatRGB(color) {
        if (color.rgba.a === 1) {
          return "rgb(".concat(color.rgba.r, ", ").concat(color.rgba.g, ", ").concat(color.rgba.b, ")");
        }

        return Color.Format.CSS.formatRGBA(color);
      }

      CSS.formatRGB = formatRGB;

      function formatRGBA(color) {
        return "rgba(".concat(color.rgba.r, ", ").concat(color.rgba.g, ", ").concat(color.rgba.b, ", ").concat(+color.rgba.a.toFixed(2), ")");
      }

      CSS.formatRGBA = formatRGBA;

      function formatHSL(color) {
        if (color.hsla.a === 1) {
          return "hsl(".concat(color.hsla.h, ", ").concat((color.hsla.s * 100).toFixed(2), "%, ").concat((color.hsla.l * 100).toFixed(2), "%)");
        }

        return Color.Format.CSS.formatHSLA(color);
      }

      CSS.formatHSL = formatHSL;

      function formatHSLA(color) {
        return "hsla(".concat(color.hsla.h, ", ").concat((color.hsla.s * 100).toFixed(2), "%, ").concat((color.hsla.l * 100).toFixed(2), "%, ").concat(color.hsla.a.toFixed(2), ")");
      }

      CSS.formatHSLA = formatHSLA;

      function _toTwoDigitHex(n) {
        var r = n.toString(16);
        return r.length !== 2 ? '0' + r : r;
      }

      function formatHex(color) {
        return "#".concat(_toTwoDigitHex(color.rgba.r)).concat(_toTwoDigitHex(color.rgba.g)).concat(_toTwoDigitHex(color.rgba.b));
      }

      CSS.formatHex = formatHex;

      function formatHexA(color) {
        var compact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (compact && color.rgba.a === 1) {
          return Color.Format.CSS.formatHex(color);
        }

        return "#".concat(_toTwoDigitHex(color.rgba.r)).concat(_toTwoDigitHex(color.rgba.g)).concat(_toTwoDigitHex(color.rgba.b)).concat(_toTwoDigitHex(Math.round(color.rgba.a * 255)));
      }

      CSS.formatHexA = formatHexA;

      function format(color) {
        if (!color) {
          return null;
        }

        if (color.isOpaque()) {
          return Color.Format.CSS.formatHex(color);
        }

        return Color.Format.CSS.formatRGBA(color);
      }

      CSS.format = format;

      function parseHex(hex) {
        if (!hex) {
          return null;
        }

        var length = hex.length;

        if (length === 0) {
          return null;
        }

        if (hex.charCodeAt(0) !== 35) {
          return null;
        }

        if (length === 7) {
          var r = 16 * _parseHexDigit(hex.charCodeAt(1)) + _parseHexDigit(hex.charCodeAt(2));

          var g = 16 * _parseHexDigit(hex.charCodeAt(3)) + _parseHexDigit(hex.charCodeAt(4));

          var b = 16 * _parseHexDigit(hex.charCodeAt(5)) + _parseHexDigit(hex.charCodeAt(6));

          return new Color(new RGBA(r, g, b, 1));
        }

        if (length === 9) {
          var _r = 16 * _parseHexDigit(hex.charCodeAt(1)) + _parseHexDigit(hex.charCodeAt(2));

          var _g = 16 * _parseHexDigit(hex.charCodeAt(3)) + _parseHexDigit(hex.charCodeAt(4));

          var _b = 16 * _parseHexDigit(hex.charCodeAt(5)) + _parseHexDigit(hex.charCodeAt(6));

          var a = 16 * _parseHexDigit(hex.charCodeAt(7)) + _parseHexDigit(hex.charCodeAt(8));

          return new Color(new RGBA(_r, _g, _b, a / 255));
        }

        if (length === 4) {
          var _r2 = _parseHexDigit(hex.charCodeAt(1));

          var _g2 = _parseHexDigit(hex.charCodeAt(2));

          var _b2 = _parseHexDigit(hex.charCodeAt(3));

          return new Color(new RGBA(16 * _r2 + _r2, 16 * _g2 + _g2, 16 * _b2 + _b2));
        }

        if (length === 5) {
          var _r3 = _parseHexDigit(hex.charCodeAt(1));

          var _g3 = _parseHexDigit(hex.charCodeAt(2));

          var _b3 = _parseHexDigit(hex.charCodeAt(3));

          var _a = _parseHexDigit(hex.charCodeAt(4));

          return new Color(new RGBA(16 * _r3 + _r3, 16 * _g3 + _g3, 16 * _b3 + _b3, (16 * _a + _a) / 255));
        }

        return null;
      }

      CSS.parseHex = parseHex;

      function _parseHexDigit(charCode) {
        switch (charCode) {
          case 48:
            return 0;

          case 49:
            return 1;

          case 50:
            return 2;

          case 51:
            return 3;

          case 52:
            return 4;

          case 53:
            return 5;

          case 54:
            return 6;

          case 55:
            return 7;

          case 56:
            return 8;

          case 57:
            return 9;

          case 97:
            return 10;

          case 65:
            return 10;

          case 98:
            return 11;

          case 66:
            return 11;

          case 99:
            return 12;

          case 67:
            return 12;

          case 100:
            return 13;

          case 68:
            return 13;

          case 101:
            return 14;

          case 69:
            return 14;

          case 102:
            return 15;

          case 70:
            return 15;
        }

        return 0;
      }
    })(CSS = Format.CSS || (Format.CSS = {}));
  })(Format = Color.Format || (Color.Format = {}));
})(Color || (Color = {}));

var ParsedTokenThemeRule = function ParsedTokenThemeRule(token, index, fontStyle, foreground, background) {
  _classCallCheck(this, ParsedTokenThemeRule);

  this.token = token;
  this.index = index;
  this.fontStyle = fontStyle;
  this.foreground = foreground;
  this.background = background;
};

function parseTokenTheme(source) {
  if (!source || !Array.isArray(source)) {
    return [];
  }

  var result = [],
      resultLen = 0;

  for (var i = 0, len = source.length; i < len; i++) {
    var entry = source[i];
    var fontStyle = -1;

    if (typeof entry.fontStyle === 'string') {
      fontStyle = 0;
      var segments = entry.fontStyle.split(' ');

      for (var j = 0, lenJ = segments.length; j < lenJ; j++) {
        var segment = segments[j];

        switch (segment) {
          case 'italic':
            fontStyle = fontStyle | 1;
            break;

          case 'bold':
            fontStyle = fontStyle | 2;
            break;

          case 'underline':
            fontStyle = fontStyle | 4;
            break;
        }
      }
    }

    var foreground = null;

    if (typeof entry.foreground === 'string') {
      foreground = entry.foreground;
    }

    var background = null;

    if (typeof entry.background === 'string') {
      background = entry.background;
    }

    result[resultLen++] = new ParsedTokenThemeRule(entry.token || '', i, fontStyle, foreground, background);
  }

  return result;
}

function resolveParsedTokenThemeRules(parsedThemeRules) {
  parsedThemeRules.sort(function (a, b) {
    var r = strcmp(a.token, b.token);

    if (r !== 0) {
      return r;
    }

    return a.index - b.index;
  });
  var defaultFontStyle = 0;
  var defaultForeground = '000000';
  var defaultBackground = 'ffffff';

  while (parsedThemeRules.length >= 1 && parsedThemeRules[0].token === '') {
    var incomingDefaults = parsedThemeRules.shift();

    if (incomingDefaults.fontStyle !== -1) {
      defaultFontStyle = incomingDefaults.fontStyle;
    }

    if (incomingDefaults.foreground !== null) {
      defaultForeground = incomingDefaults.foreground;
    }

    if (incomingDefaults.background !== null) {
      defaultBackground = incomingDefaults.background;
    }
  }

  var colorMap = new ColorMap();
  var defaults = new ThemeTrieElementRule(defaultFontStyle, colorMap.getId(defaultForeground), colorMap.getId(defaultBackground));
  var root = new ThemeTrieElement(defaults);

  for (var i = 0, len = parsedThemeRules.length; i < len; i++) {
    var rule = parsedThemeRules[i];
    root.insert(rule.token, rule.fontStyle, colorMap.getId(rule.foreground), colorMap.getId(rule.background));
  }

  return new TokenTheme(colorMap, root);
}

var ColorMap =
/*#__PURE__*/
function () {
  function ColorMap() {
    _classCallCheck(this, ColorMap);

    this._lastColorId = 0;
    this._id2color = [];
    this._color2id = new Map();
  }

  _createClass(ColorMap, [{
    key: "getId",
    value: function getId(color) {
      if (color === null) {
        return 0;
      }

      color = color.toUpperCase();

      if (!/^[0-9A-F]{6}$/.test(color)) {
        throw new Error('Illegal color name: ' + color);
      }

      var value = this._color2id.get(color);

      if (value) {
        return value;
      }

      value = ++this._lastColorId;

      this._color2id.set(color, value);

      this._id2color[value] = Color.fromHex('#' + color);
      return value;
    }
  }, {
    key: "getColorMap",
    value: function getColorMap() {
      return this._id2color.slice(0);
    }
  }]);

  return ColorMap;
}();

var TokenTheme =
/*#__PURE__*/
function () {
  _createClass(TokenTheme, null, [{
    key: "createFromRawTokenTheme",
    value: function createFromRawTokenTheme(source) {
      return this.createFromParsedTokenTheme(parseTokenTheme(source));
    }
  }, {
    key: "createFromParsedTokenTheme",
    value: function createFromParsedTokenTheme(source) {
      return resolveParsedTokenThemeRules(source);
    }
  }]);

  function TokenTheme(colorMap, root) {
    _classCallCheck(this, TokenTheme);

    this._colorMap = colorMap;
    this._root = root;
    this._cache = new Map();
  }

  _createClass(TokenTheme, [{
    key: "getColorMap",
    value: function getColorMap() {
      return this._colorMap.getColorMap();
    }
  }, {
    key: "getThemeTrieElement",
    value: function getThemeTrieElement() {
      return this._root.toExternalThemeTrieElement();
    }
  }, {
    key: "_match",
    value: function _match(token) {
      return this._root.match(token);
    }
  }, {
    key: "match",
    value: function match(languageId, token) {
      var result = this._cache.get(token);

      if (typeof result === 'undefined') {
        var rule = this._match(token);

        var standardToken = toStandardTokenType(token);
        result = (rule.metadata | standardToken << 8) >>> 0;

        this._cache.set(token, result);
      }

      return (result | languageId << 0) >>> 0;
    }
  }]);

  return TokenTheme;
}();

var STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex)\b/;

function toStandardTokenType(tokenType) {
  var m = tokenType.match(STANDARD_TOKEN_TYPE_REGEXP);

  if (!m) {
    return 0;
  }

  switch (m[1]) {
    case 'comment':
      return 1;

    case 'string':
      return 2;

    case 'regex':
      return 4;
  }

  throw new Error('Unexpected match for standard token type!');
}

function strcmp(a, b) {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

var ThemeTrieElementRule =
/*#__PURE__*/
function () {
  function ThemeTrieElementRule(fontStyle, foreground, background) {
    _classCallCheck(this, ThemeTrieElementRule);

    this._fontStyle = fontStyle;
    this._foreground = foreground;
    this._background = background;
    this.metadata = (this._fontStyle << 11 | this._foreground << 14 | this._background << 23) >>> 0;
  }

  _createClass(ThemeTrieElementRule, [{
    key: "clone",
    value: function clone() {
      return new ThemeTrieElementRule(this._fontStyle, this._foreground, this._background);
    }
  }, {
    key: "acceptOverwrite",
    value: function acceptOverwrite(fontStyle, foreground, background) {
      if (fontStyle !== -1) {
        this._fontStyle = fontStyle;
      }

      if (foreground !== 0) {
        this._foreground = foreground;
      }

      if (background !== 0) {
        this._background = background;
      }

      this.metadata = (this._fontStyle << 11 | this._foreground << 14 | this._background << 23) >>> 0;
    }
  }], [{
    key: "cloneArr",
    value: function cloneArr(arr) {
      var r = [];

      for (var i = 0, len = arr.length; i < len; i++) {
        r[i] = arr[i].clone();
      }

      return r;
    }
  }]);

  return ThemeTrieElementRule;
}();

var ExternalThemeTrieElement = function ExternalThemeTrieElement(mainRule, children) {
  _classCallCheck(this, ExternalThemeTrieElement);

  this.mainRule = mainRule;
  this.children = children || Object.create(null);
};

var ThemeTrieElement =
/*#__PURE__*/
function () {
  function ThemeTrieElement(mainRule) {
    _classCallCheck(this, ThemeTrieElement);

    this._mainRule = mainRule;
    this._children = new Map();
  }

  _createClass(ThemeTrieElement, [{
    key: "toExternalThemeTrieElement",
    value: function toExternalThemeTrieElement() {
      var children = Object.create(null);

      this._children.forEach(function (element, index) {
        children[index] = element.toExternalThemeTrieElement();
      });

      return new ExternalThemeTrieElement(this._mainRule, children);
    }
  }, {
    key: "match",
    value: function match(token) {
      if (token === '') {
        return this._mainRule;
      }

      var dotIndex = token.indexOf('.');
      var head;
      var tail;

      if (dotIndex === -1) {
        head = token;
        tail = '';
      } else {
        head = token.substring(0, dotIndex);
        tail = token.substring(dotIndex + 1);
      }

      var child = this._children.get(head);

      if (typeof child !== 'undefined') {
        return child.match(tail);
      }

      return this._mainRule;
    }
  }, {
    key: "insert",
    value: function insert(token, fontStyle, foreground, background) {
      if (token === '') {
        this._mainRule.acceptOverwrite(fontStyle, foreground, background);

        return;
      }

      var dotIndex = token.indexOf('.');
      var head;
      var tail;

      if (dotIndex === -1) {
        head = token;
        tail = '';
      } else {
        head = token.substring(0, dotIndex);
        tail = token.substring(dotIndex + 1);
      }

      var child = this._children.get(head);

      if (typeof child === 'undefined') {
        child = new ThemeTrieElement(this._mainRule.clone());

        this._children.set(head, child);
      }

      child.insert(tail, fontStyle, foreground, background);
    }
  }]);

  return ThemeTrieElement;
}();

var languages = {};
var lexers = {};
var aliases = {
  "text/css": "css",
  "application/javascript": "javascript" // create mock modeService

  /*
      isRegisteredMode(mimetypeOrModeId: string): boolean;
      getRegisteredModes(): string[];
      getRegisteredLanguageNames(): string[];
      getExtensions(alias: string): string[];
      getFilenames(alias: string): string[];
      getMimeForMode(modeId: string): string;
      getLanguageName(modeId: string): string;
      getModeIdForLanguageName(alias: string): string;
      getModeIdByFilenameOrFirstLine(filename: string, firstLine?: string): string;
      getModeId(commaSeparatedMimetypesOrCommaSeparatedIds: string): string;
      getLanguageIdentifier(modeId: string | LanguageId): LanguageIdentifier;
      getConfigurationFiles(modeId: string): string[];
  
      // --- instantiation
      lookup(commaSeparatedMimetypesOrCommaSeparatedIds: string): IModeLookupResult[];
      getMode(commaSeparatedMimetypesOrCommaSeparatedIds: string): IMode;
      getOrCreateMode(commaSeparatedMimetypesOrCommaSeparatedIds: string): TPromise<IMode>;
      getOrCreateModeByLanguageName(languageName: string): TPromise<IMode>;
      getOrCreateModeByFilenameOrFirstLine(filename: string, firstLine?: string): TPromise<IMode>;
  */

};
var modeService = {
  getModeIdForLanguageName: function getModeIdForLanguageName(name) {
    // console.log("get for langaugeName");
    return aliases[name] || name;
  },
  getModeId: function getModeId(name) {
    return aliases[name] || name;
  },
  getMode: function getMode(langid) {
    // console.log(TokenizationRegistry.get(langid));
    return {
      getId: function getId() {
        return langid;
      }
    };
  },
  getOrCreateMode: function getOrCreateMode(langid) {
    return true;
  },
  isRegisteredMode: function isRegisteredMode(name) {
    return !!languages[name];
  }
};

function register(langId, config) {
  languages[langId] = languages[langId] || compile(langId, config);
  lexers[langId] = lexers[langId] || createTokenizationSupport(modeService, null, langId, languages[langId]);
  return lexers[langId];
}

function getLexer(langId) {
  return lexers[langId];
}

function tokenize(langId, code, state) {
  var lexer = lexers[langId];
  var state = state || lexer.getInitialState(); // var lines = code.split('\n');

  return lexer.tokenize(code, state, 0);
}

exports.register = register;
exports.getLexer = getLexer;
exports.tokenize = tokenize;
exports.TokenTheme = TokenTheme;
exports.parseTokenTheme = parseTokenTheme;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["setTimeout"]))

/***/ }),

/***/ "./src/my-command.js":
/*!***************************!*\
  !*** ./src/my-command.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test.js */ "./src/test.js");
/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_test_js__WEBPACK_IMPORTED_MODULE_1__);

 // documentation: https://developer.sketchapp.com/reference/api/
// import monarch with templates

/* harmony default export */ __webpack_exports__["default"] = (function () {
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("It's alive 🙌"); // Hex to Color - helper function

  var hexToColor = function hexToColor(hex, alpha) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
        red = parseInt(result[1], 16) / 255,
        green = parseInt(result[2], 16) / 255,
        blue = parseInt(result[3], 16) / 255,
        alpha = typeof alpha !== 'undefined' ? alpha : 1;
    return NSColor.colorWithCalibratedRed_green_blue_alpha(red, green, blue, alpha);
  }; // Select a Text Layer with at least 4 characters


  var selection = context.selection,
      textLayer = selection.firstObject();
  var content = textLayer.stringValue();
  var tokens = Object(_test_js__WEBPACK_IMPORTED_MODULE_1__["highlight"])(content, 'imba', {
    json: true
  });
  var chr = 0;
  textLayer.setIsEditingText(true);
  tokens.forEach(function (tok) {
    var str = tok[0];
    var rgba = tok[1].rgba;
    var start = chr;
    var end = start + str.length;
    var range = NSMakeRange(start, end - start);

    if (rgba) {
      var color = NSColor.colorWithCalibratedRed_green_blue_alpha(rgba.r / 255, rgba.g / 255, rgba.b / 255, 1);
      console.log(str, rgba);
      textLayer.addAttribute_value_forRange(NSForegroundColorAttributeName, color, range);
    }

    ;
    chr = end;
  });
  textLayer.setIsEditingText(false);
  return;
  var range = NSMakeRange(1, 3);
  var color = hexToColor('4A90E2');
  textLayer.setIsEditingText(true);
  textLayer.addAttribute_value_forRange(NSForegroundColorAttributeName, color, range);
  textLayer.setIsEditingText(false);
});

/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a) {
  return a ? a.toArray ? a.toArray() : a : [];
}

;
var self = {}; // ivar namespace.instance.identifier

var monarch = __webpack_require__(/*! ./monarch */ "./src/monarch.js");

var languages = __webpack_require__(/*! ./monaco/languages */ "./src/monaco/languages.js");

var Theme = __webpack_require__(/*! ./theme */ "./src/theme.js").Theme;

var raw = Theme.toMonaco();
var inv = Theme.inverted;
var theme = exports.theme = monarch.TokenTheme.createFromRawTokenTheme(raw.rules);
var css = [];
var colors = {
  dark: {},
  light: {}
};

for (var i = 0, items = iter$(theme.getColorMap()), len = items.length, color; i < len; i++) {
  color = items[i];

  if (i <= 0) {
    continue;
  }

  ;
  colors.dark[i] = color;

  if (inv[color]) {
    colors.light[i] = inv[color];
  }

  ;
  css.push(".tok" + i + " \{ color: " + color + "; \}");

  if (inv[color]) {
    css.push(".mlight .tok" + i + " \{ color: " + inv[color] + "; \}");
  }

  ;
}

;
var cache = {};
var aliases = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  md: 'markdown'
};
var styleElement;

exports.styles = self.styles = function () {
  return css;
};

var registeredLanguages = {};

exports.getLanguage = self.getLanguage = function (lang) {
  if (false) {}

  ;
  lang = aliases[lang] || lang;

  if (registeredLanguages[lang]) {
    return registeredLanguages[lang];
  }

  ;

  if (languages[lang]) {
    monarch.register(lang, languages[lang].language.language);
    return registeredLanguages[lang] = true;
  }

  ;
  return false;
};

exports.tokenize = self.tokenize = function (lang, code, options) {
  if (options === undefined) options = {};
  lang = aliases[lang] || lang; // if $node$ and options:decorate and lang == 'imba'
  // 	# not on the web -- for now
  // 	var compiler = require 'imba/compiler'
  // 	var helpers = require 'imba/lib/compiler/helpers'
  // 	let analysis = compiler.analyze(code,{target: 'web'})
  // 	var locmap = helpers.locationToLineColMap(code)
  // 	var vars = []
  // 	for scope in analysis:scopes
  // 		for item in scope:vars
  // 			for ref in item:refs
  // 				let loc = locmap[ref:loc[0]].concat('identifier.l' + item:type)
  // 				vars.push(loc)
  // 	
  // 	vars = vars.sort do |a,b|
  // 		if a[0] == b[0]
  // 			a[1] - b[1]
  // 		else
  // 			a[0] - b[0]
  // 	
  // 	# console.log "decorations",vars
  // 
  // 	options:decorations = vars
  // make sure language exists?

  if (!self.getLanguage(lang)) {
    console.log("could not find language");

    if (code.indexOf('"') >= 0) {
      code = code.replace(/\"/g, "&quot;");
    }

    ;

    if (code.indexOf('<') >= 0) {
      code = code.replace(/\</g, "&lt;");
    }

    ;

    if (code.indexOf('>') >= 0) {
      code = code.replace(/\>/g, "&gt;");
    }

    ;
    return code;
  }

  ;
  var theme = options.theme;
  var decorations = (options.decorations || []).slice();
  var lexer = monarch.getLexer(lang);
  var types = theme ? null : [];
  var map = {};
  var state = lexer.getInitialState();
  var lines = [];
  var dec = decorations.shift();

  for (var ln = 0, _items = iter$(code.split('\n')), _len = _items.length, line; ln < _len; ln++) {
    line = _items[ln];
    var result = lexer.tokenize(line, state, 0);
    var tokens = result.tokens.filter(function (tok) {
      return tok.type.indexOf("white") == -1;
    });
    var offset = 0;
    var lstr = "";

    for (var _i = 0, ary = iter$(tokens), _len2 = ary.length, token; _i < _len2; _i++) {
      // skip whitespace
      token = ary[_i];
      var tref = void 0; // console.log ln,token:offset,token:type

      if (dec && dec[0] == ln && dec[1] == token.offset) {
        // console.log "found decoration!!!",dec
        token.type = dec[2];
        dec = decorations.shift();
      }

      ;
      var next = tokens[_i + 1];

      if (theme) {
        tref = theme._match(token.type);
        tref = tref._foreground;
      } else {
        var type = token.type.replace(/\./g, ' ').replace(lang, '').trim();
        tref = map[type];

        if (tref == undefined) {
          tref = map[type] = types.push(type) - 1;
        }

        ;
      }

      ;
      var end = next ? next.offset : line.length;
      lstr += String.fromCharCode(64 + tref);
      var move = end - offset;
      lstr += String.fromCharCode(64 + move);
      offset += move;
    }

    ;
    state = result.endState;
    lines.push(lstr);
  }

  ;
  return [code, lines.join('\n'), types];
};

exports.jsonify = self.jsonify = function (code, lineCount) {
  if (lineCount === undefined) lineCount = 30;
  var out = "";
  var raw = code[0];
  var tokens = code[1].split('\n');
  var types = code[2];
  var i = 0;
  var start = 0;
  var l = tokens.length;
  var lines = raw.split('\n');
  out = [];

  for (var li = 0, _items2 = iter$(lines), _len3 = _items2.length, line; li < _len3; li++) {
    line = _items2[li];
    var _start = 0;
    var desc = tokens[li];
    var k = 0;
    var type = void 0;

    var _color = void 0;

    while (k < desc.length) {
      var _code = desc.charCodeAt(k++) - 64;

      if (k % 2 == 0) {
        // move
        var content = line.slice(_start, _start = _start + _code);
        out.push([content, _color]);
      } else {
        type = _code;
        _color = colors.dark[_code];
      }

      ;
    }

    ;
    out.push(['\n', {}]);
  }

  ;
  return out;
};

exports.htmlify = self.htmlify = function (code, lineCount) {
  if (lineCount === undefined) lineCount = 30;
  var out = "";
  var raw = code[0];
  var tokens = code[1].split('\n');
  var types = code[2];
  var i = 0;
  var start = 0;
  var l = tokens.length;
  var lines = raw.split('\n');
  out = [];

  for (var li = 0, _items3 = iter$(lines), _len4 = _items3.length, line; li < _len4; li++) {
    line = _items3[li];
    var _start2 = 0;
    var desc = tokens[li];
    var k = 0;
    var s = "<span class='line'>";

    while (k < desc.length) {
      var _code2 = desc.charCodeAt(k++) - 64;

      if (k % 2 == 0) {
        // move
        var content = line.slice(_start2, _start2 = _start2 + _code2);
        s += content.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
        s += '</span>';
      } else {
        s += '<span class="' + (types ? types[_code2] : 'tok' + _code2) + '">';
      }

      ;
    }

    ;
    s += "</span>";
    out.push(s);
  }

  ;
  return out.join('\n');
};

exports.highlight = self.highlight = function (code, lang, options) {
  if (options === undefined) options = {};
  lang = aliases[lang] || lang;
  var langconf = self.getLanguage(lang);

  if (!langconf) {
    // return htmlify([code])
    return code;
  }

  ;
  options.theme == null ? options.theme = theme : options.theme;
  var tokens = self.tokenize(lang, code, options);
  return options.json ? self.jsonify(tokens) : self.htmlify(tokens);
};

self.test = function (code) {
  return self.highlight(code, 'imba', {
    json: true
  });
};

console.log(JSON.stringify(self.test("var hello = 1;")));

/***/ }),

/***/ "./src/theme.js":
/*!**********************!*\
  !*** ./src/theme.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a) {
  return a ? a.toArray ? a.toArray() : a : [];
}

;
var Theme = exports.Theme = {
  base: 'vs-dark',
  // can also be vs-dark or hc-black
  inherit: false,
  // can also be false to completely replace the builtin rules
  inverted: {
    '#d9bb73': '#b78100',
    '#a7c9de': '#2e5f7d',
    '#dcdcdc': '#464646',
    '#598da6': '#415e98',
    '#ea9b80': '#a21e1e',
    '#75aaff': '#3360a7',
    '#d4d4d4': '#4d5155',
    '#5d6e7a': '#888888',
    '#7da4b7': '#146186',
    // string
    '#bd9ac2': '#91359e'
  },
  named: {
    TAG: 'D9BB73',
    background: '282f33',
    foreground: 'D4D4D4',
    keyword: 'ea9b80',
    operator: 'ea9b80',
    string: 'B7DE95',
    number: '598DA6',
    bool: '598DA6',
    symbol: 'B7DE95',
    regex: 'FD9231',
    regexgroup: 'FFB26D',
    comment: '5D6E7A',
    constant: 'BD9AC2',
    identifier: 'd4d4d4',
    xml: 'D9BB72',
    xmlref: 'd2845f',
    decl: '75AAFF',
    key: 'a7c9de',
    lineNumber: '3b4750',
    agentCursor: '89b0fc',
    localCursor: 'ffe796',
    lvar: 'dcdbc7',
    limport: '91b7ea',
    ["string"]: '7da4b7',
    tagbase: '@TAG',
    tagname: '@TAG',
    tagstr: 'a0c6ca',
    tagop: 'd17e53',
    tagbracket: '8e7f54',
    tagattr: '@TAG',
    tagmodifier: 'd99372',
    taglistener: 'd99372',
    special: 'ffdb59'
  },
  toMonaco: function toMonaco() {
    var json = JSON.stringify(this);
    var named = this.named;
    json = json.replace(/@(\w+)/g, function (m, key) {
      var val = named[key];

      while (val[0] == '@') {
        val = named[val.slice(1)] || '';
      }

      ;

      if (val instanceof Array) {
        val = val[0];
      }

      ;

      if (val[0] == '#') {
        val = val.slice(1);
      }

      ;
      return val || m; // named[key] or m
    });
    return JSON.parse(json);
  },
  toTheme: function toTheme() {
    var v_, $1;
    var theme = this.toMonaco();
    var colors = theme.tokenColors = [];

    for (var i = 0, items = iter$(theme.rules), len = items.length, rule; i < len; i++) {
      rule = items[i];

      if (!rule.foreground) {
        continue;
      }

      ;
      var item = {
        name: rule.token,
        scope: rule.token,
        settings: {
          foreground: '#' + rule.foreground
        }
      };
      colors.push(item);
    }

    ;
    v_ = theme.rules, delete theme.rules, v_;
    $1 = theme.colors, delete theme.colors, $1;
    theme.type = 'dark';
    theme.name = "Imba Dark";
    return theme;
  },
  rules: [{
    token: '',
    foreground: '@foreground',
    background: '@background'
  }, {
    token: 'invalid',
    foreground: 'f44747'
  }, {
    token: 'emphasis',
    fontStyle: 'italic'
  }, {
    token: 'strong',
    fontStyle: 'bold'
  }, {
    token: 'variable',
    foreground: '74B0DF'
  }, {
    token: 'variable.predefined',
    foreground: '@keyword'
  }, {
    token: 'variable.parameter',
    foreground: '9CDCFE'
  }, {
    token: 'identifier',
    foreground: '@identifier'
  }, {
    token: 'identifier.const',
    foreground: '@constant'
  }, {
    token: 'identifier.const.class',
    foreground: '@decl'
  }, {
    token: 'identifier.class',
    foreground: '@decl'
  }, {
    token: 'identifier.const.tag',
    foreground: '@decl'
  }, {
    token: 'identifier.decl',
    foreground: '@decl'
  }, {
    token: 'identifier.tag',
    foreground: '@decl'
  }, {
    token: 'identifier.def',
    foreground: '@decl'
  }, {
    token: 'identifier.key',
    foreground: '@key'
  }, {
    token: 'identifier.env',
    foreground: '@keyword'
  }, {
    token: 'identifier.special',
    foreground: '@special'
  }, {
    token: 'identifier.import',
    foreground: '@limport'
  }, {
    token: 'entity.name.type',
    foreground: '@decl'
  }, {
    token: 'entity.name.function',
    foreground: '@decl'
  }, {
    token: 'entity.name.tag',
    foreground: '@xml'
  }, {
    token: 'storage.type.function',
    foreground: '@keyword'
  }, {
    token: 'storage.type.class',
    foreground: '@keyword'
  }, {
    token: 'comment',
    foreground: '@comment'
  }, {
    token: 'operator',
    foreground: '@operator'
  }, {
    token: 'number',
    foreground: '@number'
  }, {
    token: 'number.hex',
    foreground: '@number'
  }, {
    token: 'numeric.css',
    foreground: '@number'
  }, {
    token: 'regexp',
    foreground: '@regex'
  }, {
    token: 'regexp.escape',
    foreground: '@regexgroup'
  }, {
    token: 'annotation',
    foreground: 'cc6666'
  }, {
    token: 'type',
    foreground: '3DC9B0'
  }, {
    token: 'boolean',
    foreground: '@bool'
  }, {
    token: 'constant.numeric',
    foreground: '@number'
  }, {
    token: 'constant.language.boolean',
    foreground: '@bool'
  }, {
    token: 'delimiter',
    foreground: 'DCDCDC'
  }, {
    token: 'delimiter.access.imba',
    foreground: 'DCDCDB'
  }, {
    token: 'delimiter.html',
    foreground: '808080'
  }, {
    token: 'delimiter.xml',
    foreground: '808080'
  }, {
    token: 'delimiter.eq.tag',
    foreground: 'ea9b7c'
  }, {
    token: 'tag',
    foreground: '@tagbase'
  }, {
    token: 'tag.name',
    foreground: '@tagname'
  }, {
    token: 'tag.open',
    foreground: '@tagbracket'
  }, {
    token: 'tag.close',
    foreground: '@tagbracket'
  }, {
    token: 'tag.attribute',
    foreground: '@tagattr'
  }, {
    token: 'tag.attribute.listener',
    foreground: '@taglistener'
  }, {
    token: 'tag.attribute.modifier',
    foreground: '@tagmodifier'
  }, {
    token: 'paren.open.tag',
    foreground: '@taglistener'
  }, {
    token: 'paren.close.tag',
    foreground: '@taglistener'
  }, {
    token: 'meta.scss',
    foreground: 'A79873'
  }, {
    token: 'meta.tag',
    foreground: '@xml'
  }, {
    token: 'metatag',
    foreground: 'DD6A6F'
  }, {
    token: 'metatag.content.html',
    foreground: '9CDCFE'
  }, {
    token: 'metatag.html',
    foreground: '569CD6'
  }, {
    token: 'metatag.xml',
    foreground: '569CD6'
  }, {
    token: 'metatag.php',
    fontStyle: 'bold'
  }, {
    token: 'key',
    foreground: '@key'
  }, {
    token: 'string.key.json',
    foreground: '9CDCFE'
  }, {
    token: 'string.value.json',
    foreground: 'CE9178'
  }, {
    token: 'attribute.name',
    foreground: '@key'
  }, {
    token: 'attribute.value',
    foreground: '@number'
  }, {
    token: 'attribute.value.number.css',
    foreground: '@number'
  }, {
    token: 'attribute.value.unit.css',
    foreground: '@number'
  }, {
    token: 'attribute.value.hex.css',
    foreground: '@number'
  }, {
    token: 'string',
    foreground: '@string'
  }, {
    token: 'string.sql',
    foreground: '@string'
  }, {
    token: 'keyword',
    foreground: '@keyword'
  }, {
    token: 'keyword.flow',
    foreground: '@keyword'
  }, {
    token: 'keyword.json',
    foreground: '@keyword'
  }, {
    token: 'keyword.flow.scss',
    foreground: '@keyword'
  }, {
    token: 'operator.scss',
    foreground: '909090'
  }, {
    token: 'operator.sql',
    foreground: '778899'
  }, {
    token: 'operator.swift',
    foreground: '909090'
  }, {
    token: 'predefined.sql',
    foreground: 'FF00FF'
  }, // css
  {
    token: "entity.name.selector.css",
    foreground: '@xml'
  }, {
    token: "support.type.property-name.css",
    foreground: '@decl'
  }, {
    token: "meta.object-literal.key",
    foreground: '@key'
  }],
  colors: {
    'foreground': '#@foreground',
    'editor.background': '#282f33',
    'editorGutter.background': '#282f33',
    'editor.selectionBackground': '#30455f',
    // #33393f
    'editorLineNumber.foreground': '#5D6E7A',
    'editorWidget.background': '#383d47',
    // #20262a
    'editorWidget.border': '#20262a',
    'widget.shadow': '#00000000',
    'list.focusBackground': '#33393f',
    'list.hoverBackground': '#282f33',
    'list.highlightForeground': '#ffffff',
    'input.foreground': '#ffffff',
    'input.background': '#2d3139',
    'input.border': '#262b35',
    'editorSuggestWidget.foreground': '#@foreground',
    'editorHoverWidget.background': '#20262a',
    'editorCursor.foreground': '#@agentCursor'
  }
};

if (false) {}

;

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=my-command.js.map