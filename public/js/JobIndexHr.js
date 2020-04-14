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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@formatjs/macro/dist/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@formatjs/macro/dist/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function _(msg) {
    return msg;
}
exports._ = _;
function defineMessages(msgs) {
    return msgs;
}
exports.defineMessages = defineMessages;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/intl-format-cache/dist/index.js":
/*!******************************************************!*\
  !*** ./node_modules/intl-format-cache/dist/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// -- Utilities ----------------------------------------------------------------
function getCacheId(inputs) {
    return JSON.stringify(inputs.map(function (input) {
        return input && typeof input === 'object' ? orderedProps(input) : input;
    }));
}
function orderedProps(obj) {
    return Object.keys(obj)
        .sort()
        .map(function (k) {
        var _a;
        return (_a = {}, _a[k] = obj[k], _a);
    });
}
var memoizeFormatConstructor = function (FormatConstructor, cache) {
    if (cache === void 0) { cache = {}; }
    return function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var cacheId = getCacheId(args);
        var format = cacheId && cache[cacheId];
        if (!format) {
            format = new ((_a = FormatConstructor).bind.apply(_a, __spreadArrays([void 0], args)))();
            if (cacheId) {
                cache[cacheId] = format;
            }
        }
        return format;
    };
};
exports.default = memoizeFormatConstructor;


/***/ }),

/***/ "./node_modules/intl-locales-supported/dist/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/intl-locales-supported/dist/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function areIntlLocalesSupported(locales, constructorsToCheck) {
    if (typeof Intl === 'undefined') {
        return false;
    }
    if (!locales) {
        throw new Error('locales must be supplied.');
    }
    if (!Array.isArray(locales)) {
        locales = [locales];
    }
    var intlConstructors = constructorsToCheck || [
        Intl.DateTimeFormat,
        Intl.NumberFormat,
        Intl.PluralRules,
    ];
    intlConstructors = intlConstructors.filter(Boolean);
    if (intlConstructors.length === 0 ||
        (constructorsToCheck &&
            intlConstructors.length !== constructorsToCheck.length)) {
        return false;
    }
    return intlConstructors.every(function (intlConstructor) {
        return intlConstructor.supportedLocalesOf(locales).length === locales.length;
    });
}
exports.default = areIntlLocalesSupported;


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/dist/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/intl-messageformat-parser/dist/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __webpack_require__(/*! ./parser */ "./node_modules/intl-messageformat-parser/dist/parser.js");
var normalize_1 = __webpack_require__(/*! ./normalize */ "./node_modules/intl-messageformat-parser/dist/normalize.js");
__export(__webpack_require__(/*! ./types */ "./node_modules/intl-messageformat-parser/dist/types.js"));
__export(__webpack_require__(/*! ./parser */ "./node_modules/intl-messageformat-parser/dist/parser.js"));
__export(__webpack_require__(/*! ./skeleton */ "./node_modules/intl-messageformat-parser/dist/skeleton.js"));
function parse(input, opts) {
    var els = parser_1.pegParse(input, opts);
    if (!opts || opts.normalizeHashtagInPlural !== false) {
        normalize_1.normalizeHashtagInPlural(els);
    }
    return els;
}
exports.parse = parse;


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/dist/normalize.js":
/*!******************************************************************!*\
  !*** ./node_modules/intl-messageformat-parser/dist/normalize.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(/*! ./types */ "./node_modules/intl-messageformat-parser/dist/types.js");
var parser_1 = __webpack_require__(/*! ./parser */ "./node_modules/intl-messageformat-parser/dist/parser.js");
var PLURAL_HASHTAG_REGEX = /(^|[^\\])#/g;
/**
 * Whether to convert `#` in plural rule options
 * to `{var, number}`
 * @param el AST Element
 * @param pluralStack current plural stack
 */
function normalizeHashtagInPlural(els) {
    els.forEach(function (el) {
        // If we're encountering a plural el
        if (!types_1.isPluralElement(el) && !types_1.isSelectElement(el)) {
            return;
        }
        // Go down the options and search for # in any literal element
        Object.keys(el.options).forEach(function (id) {
            var _a;
            var opt = el.options[id];
            // If we got a match, we have to split this
            // and inject a NumberElement in the middle
            var matchingLiteralElIndex = -1;
            var literalEl = undefined;
            for (var i = 0; i < opt.value.length; i++) {
                var el_1 = opt.value[i];
                if (types_1.isLiteralElement(el_1) && PLURAL_HASHTAG_REGEX.test(el_1.value)) {
                    matchingLiteralElIndex = i;
                    literalEl = el_1;
                    break;
                }
            }
            if (literalEl) {
                var newValue = literalEl.value.replace(PLURAL_HASHTAG_REGEX, "$1{" + el.value + ", number}");
                var newEls = parser_1.pegParse(newValue);
                (_a = opt.value).splice.apply(_a, __spreadArrays([matchingLiteralElIndex, 1], newEls));
            }
            normalizeHashtagInPlural(opt.value);
        });
    });
}
exports.normalizeHashtagInPlural = normalizeHashtagInPlural;


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/dist/parser.js":
/*!***************************************************************!*\
  !*** ./node_modules/intl-messageformat-parser/dist/parser.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:only-arrow-functions
// tslint:disable:object-literal-shorthand
// tslint:disable:trailing-comma
// tslint:disable:object-literal-sort-keys
// tslint:disable:one-variable-per-declaration
// tslint:disable:max-line-length
// tslint:disable:no-consecutive-blank-lines
// tslint:disable:align
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Generated by PEG.js v. 0.10.0 (ts-pegjs plugin v. 0.2.6 )
//
// https://pegjs.org/   https://github.com/metadevpro/ts-pegjs
var types_1 = __webpack_require__(/*! ./types */ "./node_modules/intl-messageformat-parser/dist/types.js");
var SyntaxError = /** @class */ (function (_super) {
    __extends(SyntaxError, _super);
    function SyntaxError(message, expected, found, location) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.expected = expected;
        _this.found = found;
        _this.location = location;
        _this.name = "SyntaxError";
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(_this, SyntaxError);
        }
        return _this;
    }
    SyntaxError.buildMessage = function (expected, found) {
        function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        function literalEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/"/g, "\\\"")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
        }
        function classEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/\]/g, "\\]")
                .replace(/\^/g, "\\^")
                .replace(/-/g, "\\-")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
        }
        function describeExpectation(expectation) {
            switch (expectation.type) {
                case "literal":
                    return "\"" + literalEscape(expectation.text) + "\"";
                case "class":
                    var escapedParts = expectation.parts.map(function (part) {
                        return Array.isArray(part)
                            ? classEscape(part[0]) + "-" + classEscape(part[1])
                            : classEscape(part);
                    });
                    return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
                case "any":
                    return "any character";
                case "end":
                    return "end of input";
                case "other":
                    return expectation.description;
            }
        }
        function describeExpected(expected1) {
            var descriptions = expected1.map(describeExpectation);
            var i;
            var j;
            descriptions.sort();
            if (descriptions.length > 0) {
                for (i = 1, j = 1; i < descriptions.length; i++) {
                    if (descriptions[i - 1] !== descriptions[i]) {
                        descriptions[j] = descriptions[i];
                        j++;
                    }
                }
                descriptions.length = j;
            }
            switch (descriptions.length) {
                case 1:
                    return descriptions[0];
                case 2:
                    return descriptions[0] + " or " + descriptions[1];
                default:
                    return descriptions.slice(0, -1).join(", ")
                        + ", or "
                        + descriptions[descriptions.length - 1];
            }
        }
        function describeFound(found1) {
            return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
        }
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };
    return SyntaxError;
}(Error));
exports.SyntaxError = SyntaxError;
function peg$parse(input, options) {
    options = options !== undefined ? options : {};
    var peg$FAILED = {};
    var peg$startRuleFunctions = { start: peg$parsestart };
    var peg$startRuleFunction = peg$parsestart;
    var peg$c0 = function (parts) {
        return parts.join('');
    };
    var peg$c1 = function (messageText) {
        return __assign({ type: types_1.TYPE.literal, value: messageText }, insertLocation());
    };
    var peg$c2 = peg$otherExpectation("argumentElement");
    var peg$c3 = "{";
    var peg$c4 = peg$literalExpectation("{", false);
    var peg$c5 = "}";
    var peg$c6 = peg$literalExpectation("}", false);
    var peg$c7 = function (value) {
        return __assign({ type: types_1.TYPE.argument, value: value }, insertLocation());
    };
    var peg$c8 = peg$otherExpectation("numberSkeletonId");
    var peg$c9 = /^['\/{}]/;
    var peg$c10 = peg$classExpectation(["'", "/", "{", "}"], false, false);
    var peg$c11 = peg$anyExpectation();
    var peg$c12 = peg$otherExpectation("numberSkeletonTokenOption");
    var peg$c13 = "/";
    var peg$c14 = peg$literalExpectation("/", false);
    var peg$c15 = function (option) { return option; };
    var peg$c16 = peg$otherExpectation("numberSkeletonToken");
    var peg$c17 = function (stem, options) {
        return { stem: stem, options: options };
    };
    var peg$c18 = function (tokens) {
        return __assign({ type: 0 /* number */, tokens: tokens }, insertLocation());
    };
    var peg$c19 = "::";
    var peg$c20 = peg$literalExpectation("::", false);
    var peg$c21 = function (skeleton) { return skeleton; };
    var peg$c22 = function (style) { return style.replace(/\s*$/, ''); };
    var peg$c23 = ",";
    var peg$c24 = peg$literalExpectation(",", false);
    var peg$c25 = "number";
    var peg$c26 = peg$literalExpectation("number", false);
    var peg$c27 = function (value, type, style) {
        return __assign({ type: type === 'number' ? types_1.TYPE.number : type === 'date' ? types_1.TYPE.date : types_1.TYPE.time, style: style && style[2], value: value }, insertLocation());
    };
    var peg$c28 = "'";
    var peg$c29 = peg$literalExpectation("'", false);
    var peg$c30 = /^[^']/;
    var peg$c31 = peg$classExpectation(["'"], true, false);
    var peg$c32 = /^[^a-zA-Z'{}]/;
    var peg$c33 = peg$classExpectation([["a", "z"], ["A", "Z"], "'", "{", "}"], true, false);
    var peg$c34 = /^[a-zA-Z]/;
    var peg$c35 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);
    var peg$c36 = function (pattern) {
        return __assign({ type: 1 /* dateTime */, pattern: pattern }, insertLocation());
    };
    var peg$c37 = "date";
    var peg$c38 = peg$literalExpectation("date", false);
    var peg$c39 = "time";
    var peg$c40 = peg$literalExpectation("time", false);
    var peg$c41 = "plural";
    var peg$c42 = peg$literalExpectation("plural", false);
    var peg$c43 = "selectordinal";
    var peg$c44 = peg$literalExpectation("selectordinal", false);
    var peg$c45 = "offset:";
    var peg$c46 = peg$literalExpectation("offset:", false);
    var peg$c47 = function (value, pluralType, offset, options) {
        return __assign({ type: types_1.TYPE.plural, pluralType: pluralType === 'plural' ? 'cardinal' : 'ordinal', value: value, offset: offset ? offset[2] : 0, options: options.reduce(function (all, _a) {
                var id = _a.id, value = _a.value, optionLocation = _a.location;
                if (id in all) {
                    error("Duplicate option \"" + id + "\" in plural element: \"" + text() + "\"", location());
                }
                all[id] = {
                    value: value,
                    location: optionLocation
                };
                return all;
            }, {}) }, insertLocation());
    };
    var peg$c48 = "select";
    var peg$c49 = peg$literalExpectation("select", false);
    var peg$c50 = function (value, options) {
        return __assign({ type: types_1.TYPE.select, value: value, options: options.reduce(function (all, _a) {
                var id = _a.id, value = _a.value, optionLocation = _a.location;
                if (id in all) {
                    error("Duplicate option \"" + id + "\" in select element: \"" + text() + "\"", location());
                }
                all[id] = {
                    value: value,
                    location: optionLocation
                };
                return all;
            }, {}) }, insertLocation());
    };
    var peg$c51 = "=";
    var peg$c52 = peg$literalExpectation("=", false);
    var peg$c53 = function (id, value) {
        return __assign({ id: id,
            value: value }, insertLocation());
    };
    var peg$c54 = function (id, value) {
        return __assign({ id: id,
            value: value }, insertLocation());
    };
    var peg$c55 = peg$otherExpectation("whitespace pattern");
    var peg$c56 = /^[\t-\r \x85\u200E\u200F\u2028\u2029]/;
    var peg$c57 = peg$classExpectation([["\t", "\r"], " ", "\x85", "\u200E", "\u200F", "\u2028", "\u2029"], false, false);
    var peg$c58 = peg$otherExpectation("syntax pattern");
    var peg$c59 = /^[!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/;
    var peg$c60 = peg$classExpectation([["!", "/"], [":", "@"], ["[", "^"], "`", ["{", "~"], ["\xA1", "\xA7"], "\xA9", "\xAB", "\xAC", "\xAE", "\xB0", "\xB1", "\xB6", "\xBB", "\xBF", "\xD7", "\xF7", ["\u2010", "\u2027"], ["\u2030", "\u203E"], ["\u2041", "\u2053"], ["\u2055", "\u205E"], ["\u2190", "\u245F"], ["\u2500", "\u2775"], ["\u2794", "\u2BFF"], ["\u2E00", "\u2E7F"], ["\u3001", "\u3003"], ["\u3008", "\u3020"], "\u3030", "\uFD3E", "\uFD3F", "\uFE45", "\uFE46"], false, false);
    var peg$c61 = peg$otherExpectation("optional whitespace");
    var peg$c62 = peg$otherExpectation("number");
    var peg$c63 = "-";
    var peg$c64 = peg$literalExpectation("-", false);
    var peg$c65 = function (negative, num) {
        return num
            ? negative
                ? -num
                : num
            : 0;
    };
    var peg$c66 = peg$otherExpectation("apostrophe");
    var peg$c67 = peg$otherExpectation("double apostrophes");
    var peg$c68 = "''";
    var peg$c69 = peg$literalExpectation("''", false);
    var peg$c70 = function () { return "'"; };
    var peg$c71 = /^[{}]/;
    var peg$c72 = peg$classExpectation(["{", "}"], false, false);
    var peg$c73 = function (escapedChar, quotedChars) {
        return escapedChar + quotedChars.replace("''", "'");
    };
    var peg$c74 = /^[^{}]/;
    var peg$c75 = peg$classExpectation(["{", "}"], true, false);
    var peg$c76 = peg$otherExpectation("argNameOrNumber");
    var peg$c77 = peg$otherExpectation("argNumber");
    var peg$c78 = "0";
    var peg$c79 = peg$literalExpectation("0", false);
    var peg$c80 = function () { return 0; };
    var peg$c81 = /^[1-9]/;
    var peg$c82 = peg$classExpectation([["1", "9"]], false, false);
    var peg$c83 = /^[0-9]/;
    var peg$c84 = peg$classExpectation([["0", "9"]], false, false);
    var peg$c85 = function (digits) {
        return parseInt(digits.join(''), 10);
    };
    var peg$c86 = peg$otherExpectation("argName");
    var peg$currPos = 0;
    var peg$savedPos = 0;
    var peg$posDetailsCache = [{ line: 1, column: 1 }];
    var peg$maxFailPos = 0;
    var peg$maxFailExpected = [];
    var peg$silentFails = 0;
    var peg$result;
    if (options.startRule !== undefined) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location1);
    }
    function error(message, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location1);
    }
    function peg$literalExpectation(text1, ignoreCase) {
        return { type: "literal", text: text1, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos];
        var p;
        if (details) {
            return details;
        }
        else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                }
                else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos);
        var endPosDetails = peg$computePosDetails(endPos);
        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected1) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected1);
    }
    function peg$buildSimpleError(message, location1) {
        return new SyntaxError(message, [], "", location1);
    }
    function peg$buildStructuredError(expected1, found, location1) {
        return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
    }
    function peg$parsestart() {
        var s0;
        s0 = peg$parsemessage();
        return s0;
    }
    function peg$parsemessage() {
        var s0, s1;
        s0 = [];
        s1 = peg$parsemessageElement();
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$parsemessageElement();
        }
        return s0;
    }
    function peg$parsemessageElement() {
        var s0;
        s0 = peg$parseliteralElement();
        if (s0 === peg$FAILED) {
            s0 = peg$parseargumentElement();
            if (s0 === peg$FAILED) {
                s0 = peg$parsesimpleFormatElement();
                if (s0 === peg$FAILED) {
                    s0 = peg$parsepluralElement();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseselectElement();
                    }
                }
            }
        }
        return s0;
    }
    function peg$parsemessageText() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsedoubleApostrophes();
        if (s2 === peg$FAILED) {
            s2 = peg$parsequotedString();
            if (s2 === peg$FAILED) {
                s2 = peg$parseunquotedString();
            }
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parsedoubleApostrophes();
                if (s2 === peg$FAILED) {
                    s2 = peg$parsequotedString();
                    if (s2 === peg$FAILED) {
                        s2 = peg$parseunquotedString();
                    }
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c0(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseliteralElement() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsemessageText();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseargumentElement() {
        var s0, s1, s2, s3, s4, s5;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c3;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c4);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 125) {
                            s5 = peg$c5;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c6);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c7(s3);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c2);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeletonId() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parsepatternWhiteSpace();
        if (s4 === peg$FAILED) {
            if (peg$c9.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c10);
                }
            }
        }
        peg$silentFails--;
        if (s4 === peg$FAILED) {
            s3 = undefined;
        }
        else {
            peg$currPos = s3;
            s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c11);
                }
            }
            if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$currPos;
                s3 = peg$currPos;
                peg$silentFails++;
                s4 = peg$parsepatternWhiteSpace();
                if (s4 === peg$FAILED) {
                    if (peg$c9.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c10);
                        }
                    }
                }
                peg$silentFails--;
                if (s4 === peg$FAILED) {
                    s3 = undefined;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 !== peg$FAILED) {
                    if (input.length > peg$currPos) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c11);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s3 = [s3, s4];
                        s2 = s3;
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c8);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeletonTokenOption() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 47) {
            s1 = peg$c13;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c14);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsenumberSkeletonId();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c15(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c12);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeletonToken() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsenumberSkeletonId();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parsenumberSkeletonTokenOption();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsenumberSkeletonTokenOption();
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c17(s2, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c16);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeleton() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsenumberSkeletonToken();
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parsenumberSkeletonToken();
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c18(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsenumberArgStyle() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c19) {
            s1 = peg$c19;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c20);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsenumberSkeleton();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c21(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsemessageText();
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c22(s1);
            }
            s0 = s1;
        }
        return s0;
    }
    function peg$parsenumberFormatElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c3;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c4);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c23;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c24);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 6) === peg$c25) {
                                    s7 = peg$c25;
                                    peg$currPos += 6;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c26);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$currPos;
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s10 = peg$c23;
                                            peg$currPos++;
                                        }
                                        else {
                                            s10 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c24);
                                            }
                                        }
                                        if (s10 !== peg$FAILED) {
                                            s11 = peg$parse_();
                                            if (s11 !== peg$FAILED) {
                                                s12 = peg$parsenumberArgStyle();
                                                if (s12 !== peg$FAILED) {
                                                    s10 = [s10, s11, s12];
                                                    s9 = s10;
                                                }
                                                else {
                                                    peg$currPos = s9;
                                                    s9 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s9;
                                                s9 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                        if (s9 === peg$FAILED) {
                                            s9 = null;
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 125) {
                                                    s11 = peg$c5;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c6);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    peg$savedPos = s0;
                                                    s1 = peg$c27(s3, s7, s9);
                                                    s0 = s1;
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsedateTimeSkeletonLiteral() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c28;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c29);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsedoubleApostrophes();
            if (s3 === peg$FAILED) {
                if (peg$c30.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c31);
                    }
                }
            }
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$parsedoubleApostrophes();
                    if (s3 === peg$FAILED) {
                        if (peg$c30.test(input.charAt(peg$currPos))) {
                            s3 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c31);
                            }
                        }
                    }
                }
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 39) {
                    s3 = peg$c28;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c29);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = [];
            s1 = peg$parsedoubleApostrophes();
            if (s1 === peg$FAILED) {
                if (peg$c32.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c33);
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                while (s1 !== peg$FAILED) {
                    s0.push(s1);
                    s1 = peg$parsedoubleApostrophes();
                    if (s1 === peg$FAILED) {
                        if (peg$c32.test(input.charAt(peg$currPos))) {
                            s1 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c33);
                            }
                        }
                    }
                }
            }
            else {
                s0 = peg$FAILED;
            }
        }
        return s0;
    }
    function peg$parsedateTimeSkeletonPattern() {
        var s0, s1;
        s0 = [];
        if (peg$c34.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c35);
            }
        }
        if (s1 !== peg$FAILED) {
            while (s1 !== peg$FAILED) {
                s0.push(s1);
                if (peg$c34.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c35);
                    }
                }
            }
        }
        else {
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsedateTimeSkeleton() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$parsedateTimeSkeletonLiteral();
        if (s3 === peg$FAILED) {
            s3 = peg$parsedateTimeSkeletonPattern();
        }
        if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parsedateTimeSkeletonLiteral();
                if (s3 === peg$FAILED) {
                    s3 = peg$parsedateTimeSkeletonPattern();
                }
            }
        }
        else {
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
        }
        else {
            s1 = s2;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c36(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsedateOrTimeArgStyle() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c19) {
            s1 = peg$c19;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c20);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsedateTimeSkeleton();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c21(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsemessageText();
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c22(s1);
            }
            s0 = s1;
        }
        return s0;
    }
    function peg$parsedateOrTimeFormatElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c3;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c4);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c23;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c24);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 4) === peg$c37) {
                                    s7 = peg$c37;
                                    peg$currPos += 4;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c38);
                                    }
                                }
                                if (s7 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 4) === peg$c39) {
                                        s7 = peg$c39;
                                        peg$currPos += 4;
                                    }
                                    else {
                                        s7 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c40);
                                        }
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$currPos;
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s10 = peg$c23;
                                            peg$currPos++;
                                        }
                                        else {
                                            s10 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c24);
                                            }
                                        }
                                        if (s10 !== peg$FAILED) {
                                            s11 = peg$parse_();
                                            if (s11 !== peg$FAILED) {
                                                s12 = peg$parsedateOrTimeArgStyle();
                                                if (s12 !== peg$FAILED) {
                                                    s10 = [s10, s11, s12];
                                                    s9 = s10;
                                                }
                                                else {
                                                    peg$currPos = s9;
                                                    s9 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s9;
                                                s9 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                        if (s9 === peg$FAILED) {
                                            s9 = null;
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 125) {
                                                    s11 = peg$c5;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c6);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    peg$savedPos = s0;
                                                    s1 = peg$c27(s3, s7, s9);
                                                    s0 = s1;
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsesimpleFormatElement() {
        var s0;
        s0 = peg$parsenumberFormatElement();
        if (s0 === peg$FAILED) {
            s0 = peg$parsedateOrTimeFormatElement();
        }
        return s0;
    }
    function peg$parsepluralElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c3;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c4);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c23;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c24);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 6) === peg$c41) {
                                    s7 = peg$c41;
                                    peg$currPos += 6;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c42);
                                    }
                                }
                                if (s7 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 13) === peg$c43) {
                                        s7 = peg$c43;
                                        peg$currPos += 13;
                                    }
                                    else {
                                        s7 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c44);
                                        }
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s9 = peg$c23;
                                            peg$currPos++;
                                        }
                                        else {
                                            s9 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c24);
                                            }
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                s11 = peg$currPos;
                                                if (input.substr(peg$currPos, 7) === peg$c45) {
                                                    s12 = peg$c45;
                                                    peg$currPos += 7;
                                                }
                                                else {
                                                    s12 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c46);
                                                    }
                                                }
                                                if (s12 !== peg$FAILED) {
                                                    s13 = peg$parse_();
                                                    if (s13 !== peg$FAILED) {
                                                        s14 = peg$parsenumber();
                                                        if (s14 !== peg$FAILED) {
                                                            s12 = [s12, s13, s14];
                                                            s11 = s12;
                                                        }
                                                        else {
                                                            peg$currPos = s11;
                                                            s11 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s11;
                                                        s11 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s11;
                                                    s11 = peg$FAILED;
                                                }
                                                if (s11 === peg$FAILED) {
                                                    s11 = null;
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parse_();
                                                    if (s12 !== peg$FAILED) {
                                                        s13 = [];
                                                        s14 = peg$parsepluralOption();
                                                        if (s14 !== peg$FAILED) {
                                                            while (s14 !== peg$FAILED) {
                                                                s13.push(s14);
                                                                s14 = peg$parsepluralOption();
                                                            }
                                                        }
                                                        else {
                                                            s13 = peg$FAILED;
                                                        }
                                                        if (s13 !== peg$FAILED) {
                                                            s14 = peg$parse_();
                                                            if (s14 !== peg$FAILED) {
                                                                if (input.charCodeAt(peg$currPos) === 125) {
                                                                    s15 = peg$c5;
                                                                    peg$currPos++;
                                                                }
                                                                else {
                                                                    s15 = peg$FAILED;
                                                                    if (peg$silentFails === 0) {
                                                                        peg$fail(peg$c6);
                                                                    }
                                                                }
                                                                if (s15 !== peg$FAILED) {
                                                                    peg$savedPos = s0;
                                                                    s1 = peg$c47(s3, s7, s11, s13);
                                                                    s0 = s1;
                                                                }
                                                                else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseselectElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c3;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c4);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c23;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c24);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 6) === peg$c48) {
                                    s7 = peg$c48;
                                    peg$currPos += 6;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c49);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s9 = peg$c23;
                                            peg$currPos++;
                                        }
                                        else {
                                            s9 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c24);
                                            }
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                s11 = [];
                                                s12 = peg$parseselectOption();
                                                if (s12 !== peg$FAILED) {
                                                    while (s12 !== peg$FAILED) {
                                                        s11.push(s12);
                                                        s12 = peg$parseselectOption();
                                                    }
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parse_();
                                                    if (s12 !== peg$FAILED) {
                                                        if (input.charCodeAt(peg$currPos) === 125) {
                                                            s13 = peg$c5;
                                                            peg$currPos++;
                                                        }
                                                        else {
                                                            s13 = peg$FAILED;
                                                            if (peg$silentFails === 0) {
                                                                peg$fail(peg$c6);
                                                            }
                                                        }
                                                        if (s13 !== peg$FAILED) {
                                                            peg$savedPos = s0;
                                                            s1 = peg$c50(s3, s11);
                                                            s0 = s1;
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsepluralRuleSelectValue() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61) {
            s2 = peg$c51;
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c52);
            }
        }
        if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$parseargName();
        }
        return s0;
    }
    function peg$parseselectOption() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseargName();
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 123) {
                        s4 = peg$c3;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c4);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsemessage();
                        if (s5 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 125) {
                                s6 = peg$c5;
                                peg$currPos++;
                            }
                            else {
                                s6 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c6);
                                }
                            }
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c53(s2, s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsepluralOption() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsepluralRuleSelectValue();
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 123) {
                        s4 = peg$c3;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c4);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsemessage();
                        if (s5 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 125) {
                                s6 = peg$c5;
                                peg$currPos++;
                            }
                            else {
                                s6 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c6);
                                }
                            }
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c54(s2, s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsepatternWhiteSpace() {
        var s0, s1;
        peg$silentFails++;
        if (peg$c56.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c57);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c55);
            }
        }
        return s0;
    }
    function peg$parsepatternSyntax() {
        var s0, s1;
        peg$silentFails++;
        if (peg$c59.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c60);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c58);
            }
        }
        return s0;
    }
    function peg$parse_() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsepatternWhiteSpace();
        while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsepatternWhiteSpace();
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c61);
            }
        }
        return s0;
    }
    function peg$parsenumber() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
            s1 = peg$c63;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c64);
            }
        }
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseargNumber();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c65(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c62);
            }
        }
        return s0;
    }
    function peg$parseapostrophe() {
        var s0, s1;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 39) {
            s0 = peg$c28;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c29);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c66);
            }
        }
        return s0;
    }
    function peg$parsedoubleApostrophes() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c68) {
            s1 = peg$c68;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c69);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c70();
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c67);
            }
        }
        return s0;
    }
    function peg$parsequotedString() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c28;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c29);
            }
        }
        if (s1 !== peg$FAILED) {
            if (peg$c71.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c72);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = [];
                if (input.substr(peg$currPos, 2) === peg$c68) {
                    s5 = peg$c68;
                    peg$currPos += 2;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c69);
                    }
                }
                if (s5 === peg$FAILED) {
                    if (peg$c30.test(input.charAt(peg$currPos))) {
                        s5 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c31);
                        }
                    }
                }
                while (s5 !== peg$FAILED) {
                    s4.push(s5);
                    if (input.substr(peg$currPos, 2) === peg$c68) {
                        s5 = peg$c68;
                        peg$currPos += 2;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c69);
                        }
                    }
                    if (s5 === peg$FAILED) {
                        if (peg$c30.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c31);
                            }
                        }
                    }
                }
                if (s4 !== peg$FAILED) {
                    s3 = input.substring(s3, peg$currPos);
                }
                else {
                    s3 = s4;
                }
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 39) {
                        s4 = peg$c28;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c29);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c73(s2, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseunquotedString() {
        var s0, s1;
        s0 = peg$currPos;
        if (peg$c74.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c75);
            }
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        return s0;
    }
    function peg$parseargNameOrNumber() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseargNumber();
        if (s1 === peg$FAILED) {
            s1 = peg$parseargName();
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c76);
            }
        }
        return s0;
    }
    function peg$parseargNumber() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 48) {
            s1 = peg$c78;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c79);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c80();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$currPos;
            if (peg$c81.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c82);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = [];
                if (peg$c83.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c84);
                    }
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    if (peg$c83.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c84);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                }
                else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c85(s1);
            }
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c77);
            }
        }
        return s0;
    }
    function peg$parseargName() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parsepatternWhiteSpace();
        if (s4 === peg$FAILED) {
            s4 = peg$parsepatternSyntax();
        }
        peg$silentFails--;
        if (s4 === peg$FAILED) {
            s3 = undefined;
        }
        else {
            peg$currPos = s3;
            s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c11);
                }
            }
            if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$currPos;
                s3 = peg$currPos;
                peg$silentFails++;
                s4 = peg$parsepatternWhiteSpace();
                if (s4 === peg$FAILED) {
                    s4 = peg$parsepatternSyntax();
                }
                peg$silentFails--;
                if (s4 === peg$FAILED) {
                    s3 = undefined;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 !== peg$FAILED) {
                    if (input.length > peg$currPos) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c11);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s3 = [s3, s4];
                        s2 = s3;
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c86);
            }
        }
        return s0;
    }
    function insertLocation() {
        return options && options.captureLocation ? {
            location: location()
        } : {};
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    }
    else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
exports.pegParse = peg$parse;


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/dist/skeleton.js":
/*!*****************************************************************!*\
  !*** ./node_modules/intl-messageformat-parser/dist/skeleton.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
 * with some tweaks
 */
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
/**
 * Parse Date time skeleton into Intl.DateTimeFormatOptions
 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * @public
 * @param skeleton skeleton string
 */
function parseDateTimeSkeleton(skeleton) {
    var result = {};
    skeleton.replace(DATE_TIME_REGEX, function (match) {
        var len = match.length;
        switch (match[0]) {
            // Era
            case 'G':
                result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                break;
            // Year
            case 'y':
                result.year = len === 2 ? '2-digit' : 'numeric';
                break;
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
            // Quarter
            case 'q':
            case 'Q':
                throw new RangeError('`q/Q` (quarter) patterns are not supported');
            // Month
            case 'M':
            case 'L':
                result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
                break;
            // Week
            case 'w':
            case 'W':
                throw new RangeError('`w/W` (week) patterns are not supported');
            case 'd':
                result.day = ['numeric', '2-digit'][len - 1];
                break;
            case 'D':
            case 'F':
            case 'g':
                throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
            // Weekday
            case 'E':
                result.weekday = len === 4 ? 'short' : len === 5 ? 'narrow' : 'short';
                break;
            case 'e':
                if (len < 4) {
                    throw new RangeError('`e..eee` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            case 'c':
                if (len < 4) {
                    throw new RangeError('`c..ccc` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            // Period
            case 'a': // AM, PM
                result.hour12 = true;
                break;
            case 'b': // am, pm, noon, midnight
            case 'B': // flexible day periods
                throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
            // Hour
            case 'h':
                result.hourCycle = 'h12';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'H':
                result.hourCycle = 'h23';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'K':
                result.hourCycle = 'h11';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'k':
                result.hourCycle = 'h24';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'j':
            case 'J':
            case 'C':
                throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
            // Minute
            case 'm':
                result.minute = ['numeric', '2-digit'][len - 1];
                break;
            // Second
            case 's':
                result.second = ['numeric', '2-digit'][len - 1];
                break;
            case 'S':
            case 'A':
                throw new RangeError('`S/A` (second) pattenrs are not supported, use `s` instead');
            // Zone
            case 'z': // 1..3, 4: specific non-location format
                result.timeZoneName = len < 4 ? 'short' : 'long';
                break;
            case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
            case 'O': // 1, 4: miliseconds in day short, long
            case 'v': // 1, 4: generic non-location format
            case 'V': // 1, 2, 3, 4: time zone ID or city
            case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
            case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
                throw new RangeError('`Z/O/v/V/X/x` (timeZone) pattenrs are not supported, use `z` instead');
        }
        return '';
    });
    return result;
}
exports.parseDateTimeSkeleton = parseDateTimeSkeleton;
function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, '');
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\+|#+)?)?$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?$/g;
function parseSignificantPrecision(str) {
    var result = {};
    str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
        // @@@ case
        if (typeof g2 !== 'string') {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length;
        }
        // @@@+ case
        else if (g2 === '+') {
            result.minimumSignificantDigits = g1.length;
        }
        // .### case
        else if (g1[0] === '#') {
            result.maximumSignificantDigits = g1.length;
        }
        // .@@## or .@@@ case
        else {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits =
                g1.length + (typeof g2 === 'string' ? g2.length : 0);
        }
        return '';
    });
    return result;
}
function parseSign(str) {
    switch (str) {
        case 'sign-auto':
            return {
                signDisplay: 'auto',
            };
        case 'sign-accounting':
            return {
                currencySign: 'accounting',
            };
        case 'sign-always':
            return {
                signDisplay: 'always',
            };
        case 'sign-accounting-always':
            return {
                signDisplay: 'always',
                currencySign: 'accounting',
            };
        case 'sign-except-zero':
            return {
                signDisplay: 'exceptZero',
            };
        case 'sign-accounting-except-zero':
            return {
                signDisplay: 'exceptZero',
                currencySign: 'accounting',
            };
        case 'sign-never':
            return {
                signDisplay: 'never',
            };
    }
}
function parseNotationOptions(opt) {
    var result = {};
    var signOpts = parseSign(opt);
    if (signOpts) {
        return signOpts;
    }
    return result;
}
/**
 * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
 */
function convertNumberSkeletonToNumberFormatOptions(tokens) {
    var result = {};
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token.stem) {
            case 'percent':
                result.style = 'percent';
                continue;
            case 'currency':
                result.style = 'currency';
                result.currency = token.options[0];
                continue;
            case 'group-off':
                result.useGrouping = false;
                continue;
            case 'precision-integer':
                result.maximumFractionDigits = 0;
                continue;
            case 'measure-unit':
                result.style = 'unit';
                result.unit = icuUnitToEcma(token.options[0]);
                continue;
            case 'compact-short':
                result.notation = 'compact';
                result.compactDisplay = 'short';
                continue;
            case 'compact-long':
                result.notation = 'compact';
                result.compactDisplay = 'long';
                continue;
            case 'scientific':
                result = __assign(__assign(__assign({}, result), { notation: 'scientific' }), token.options.reduce(function (all, opt) { return (__assign(__assign({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'engineering':
                result = __assign(__assign(__assign({}, result), { notation: 'engineering' }), token.options.reduce(function (all, opt) { return (__assign(__assign({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'notation-simple':
                result.notation = 'standard';
                continue;
            // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
            case 'unit-width-narrow':
                result.currencyDisplay = 'narrowSymbol';
                result.unitDisplay = 'narrow';
                continue;
            case 'unit-width-short':
                result.currencyDisplay = 'code';
                result.unitDisplay = 'short';
                continue;
            case 'unit-width-full-name':
                result.currencyDisplay = 'name';
                result.unitDisplay = 'long';
                continue;
            case 'unit-width-iso-code':
                result.currencyDisplay = 'symbol';
                continue;
        }
        // Precision
        // https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#fraction-precision
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
            if (token.options.length > 1) {
                throw new RangeError('Fraction-precision stems only accept a single optional option');
            }
            token.stem.replace(FRACTION_PRECISION_REGEX, function (match, g1, g2) {
                // precision-integer case
                if (match === '.') {
                    result.maximumFractionDigits = 0;
                }
                // .000+ case
                else if (g2 === '+') {
                    result.minimumFractionDigits = g2.length;
                }
                // .### case
                else if (g1[0] === '#') {
                    result.maximumFractionDigits = g1.length;
                }
                // .00## or .000 case
                else {
                    result.minimumFractionDigits = g1.length;
                    result.maximumFractionDigits =
                        g1.length + (typeof g2 === 'string' ? g2.length : 0);
                }
                return '';
            });
            if (token.options.length) {
                result = __assign(__assign({}, result), parseSignificantPrecision(token.options[0]));
            }
            continue;
        }
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
            result = __assign(__assign({}, result), parseSignificantPrecision(token.stem));
            continue;
        }
        var signOpts = parseSign(token.stem);
        if (signOpts) {
            result = __assign(__assign({}, result), signOpts);
        }
    }
    return result;
}
exports.convertNumberSkeletonToNumberFormatOptions = convertNumberSkeletonToNumberFormatOptions;


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/dist/types.js":
/*!**************************************************************!*\
  !*** ./node_modules/intl-messageformat-parser/dist/types.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TYPE;
(function (TYPE) {
    /**
     * Raw text
     */
    TYPE[TYPE["literal"] = 0] = "literal";
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */
    TYPE[TYPE["argument"] = 1] = "argument";
    /**
     * Variable w/ number format
     */
    TYPE[TYPE["number"] = 2] = "number";
    /**
     * Variable w/ date format
     */
    TYPE[TYPE["date"] = 3] = "date";
    /**
     * Variable w/ time format
     */
    TYPE[TYPE["time"] = 4] = "time";
    /**
     * Variable w/ select format
     */
    TYPE[TYPE["select"] = 5] = "select";
    /**
     * Variable w/ plural format
     */
    TYPE[TYPE["plural"] = 6] = "plural";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
/**
 * Type Guards
 */
function isLiteralElement(el) {
    return el.type === TYPE.literal;
}
exports.isLiteralElement = isLiteralElement;
function isArgumentElement(el) {
    return el.type === TYPE.argument;
}
exports.isArgumentElement = isArgumentElement;
function isNumberElement(el) {
    return el.type === TYPE.number;
}
exports.isNumberElement = isNumberElement;
function isDateElement(el) {
    return el.type === TYPE.date;
}
exports.isDateElement = isDateElement;
function isTimeElement(el) {
    return el.type === TYPE.time;
}
exports.isTimeElement = isTimeElement;
function isSelectElement(el) {
    return el.type === TYPE.select;
}
exports.isSelectElement = isSelectElement;
function isPluralElement(el) {
    return el.type === TYPE.plural;
}
exports.isPluralElement = isPluralElement;
function isNumberSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === 0 /* number */);
}
exports.isNumberSkeleton = isNumberSkeleton;
function isDateTimeSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === 1 /* dateTime */);
}
exports.isDateTimeSkeleton = isDateTimeSkeleton;
function createLiteralElement(value) {
    return {
        type: TYPE.literal,
        value: value,
    };
}
exports.createLiteralElement = createLiteralElement;
function createNumberElement(value, style) {
    return {
        type: TYPE.number,
        value: value,
        style: style,
    };
}
exports.createNumberElement = createNumberElement;


/***/ }),

/***/ "./node_modules/intl-messageformat/dist/core.js":
/*!******************************************************!*\
  !*** ./node_modules/intl-messageformat/dist/core.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var intl_messageformat_parser_1 = __webpack_require__(/*! intl-messageformat-parser */ "./node_modules/intl-messageformat-parser/dist/index.js");
var intl_format_cache_1 = __webpack_require__(/*! intl-format-cache */ "./node_modules/intl-format-cache/dist/index.js");
var formatters_1 = __webpack_require__(/*! ./formatters */ "./node_modules/intl-messageformat/dist/formatters.js");
// -- MessageFormat --------------------------------------------------------
function mergeConfig(c1, c2) {
    if (!c2) {
        return c1;
    }
    return __assign(__assign(__assign({}, (c1 || {})), (c2 || {})), Object.keys(c1).reduce(function (all, k) {
        all[k] = __assign(__assign({}, c1[k]), (c2[k] || {}));
        return all;
    }, {}));
}
function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
        return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce(function (all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
    }, __assign({}, defaultConfig));
}
function createDefaultFormatters(cache) {
    if (cache === void 0) { cache = {
        number: {},
        dateTime: {},
        pluralRules: {},
    }; }
    return {
        getNumberFormat: intl_format_cache_1.default(Intl.NumberFormat, cache.number),
        getDateTimeFormat: intl_format_cache_1.default(Intl.DateTimeFormat, cache.dateTime),
        getPluralRules: intl_format_cache_1.default(Intl.PluralRules, cache.pluralRules),
    };
}
exports.createDefaultFormatters = createDefaultFormatters;
var IntlMessageFormat = /** @class */ (function () {
    function IntlMessageFormat(message, locales, overrideFormats, opts) {
        var _this = this;
        if (locales === void 0) { locales = IntlMessageFormat.defaultLocale; }
        this.formatterCache = {
            number: {},
            dateTime: {},
            pluralRules: {},
        };
        this.format = function (values) {
            return formatters_1.formatToString(_this.ast, _this.locales, _this.formatters, _this.formats, values, _this.message);
        };
        this.formatToParts = function (values) {
            return formatters_1.formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
        };
        this.formatHTMLMessage = function (values) {
            return formatters_1.formatHTMLMessage(_this.ast, _this.locales, _this.formatters, _this.formats, values, _this.message);
        };
        this.resolvedOptions = function () { return ({
            locale: Intl.NumberFormat.supportedLocalesOf(_this.locales)[0],
        }); };
        this.getAst = function () { return _this.ast; };
        if (typeof message === 'string') {
            this.message = message;
            if (!IntlMessageFormat.__parse) {
                throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
            }
            // Parse string messages into an AST.
            this.ast = IntlMessageFormat.__parse(message, {
                normalizeHashtagInPlural: false,
            });
        }
        else {
            this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
            throw new TypeError('A message must be provided as a String or AST.');
        }
        // Creates a new object with the specified `formats` merged with the default
        // formats.
        this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
        // Defined first because it's used to build the format pattern.
        this.locales = locales;
        this.formatters =
            (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
    }
    IntlMessageFormat.defaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
    IntlMessageFormat.__parse = intl_messageformat_parser_1.parse;
    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    IntlMessageFormat.formats = {
        number: {
            currency: {
                style: 'currency',
            },
            percent: {
                style: 'percent',
            },
        },
        date: {
            short: {
                month: 'numeric',
                day: 'numeric',
                year: '2-digit',
            },
            medium: {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            },
            long: {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
            full: {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
        },
        time: {
            short: {
                hour: 'numeric',
                minute: 'numeric',
            },
            medium: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            },
            long: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
            full: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
        },
    };
    return IntlMessageFormat;
}());
exports.IntlMessageFormat = IntlMessageFormat;
exports.default = IntlMessageFormat;


/***/ }),

/***/ "./node_modules/intl-messageformat/dist/formatters.js":
/*!************************************************************!*\
  !*** ./node_modules/intl-messageformat/dist/formatters.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var intl_messageformat_parser_1 = __webpack_require__(/*! intl-messageformat-parser */ "./node_modules/intl-messageformat-parser/dist/index.js");
var ESCAPE_HASH_REGEX = /\\#/g;
var PLURAL_HASH = /(^|[^\\])#/g;
var FormatError = /** @class */ (function (_super) {
    __extends(FormatError, _super);
    function FormatError(msg, variableId) {
        var _this = _super.call(this, msg) || this;
        _this.variableId = variableId;
        return _this;
    }
    return FormatError;
}(Error));
function mergeLiteral(parts) {
    if (parts.length < 2) {
        return parts;
    }
    return parts.reduce(function (all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart ||
            lastPart.type !== 0 /* literal */ ||
            part.type !== 0 /* literal */) {
            all.push(part);
        }
        else {
            lastPart.value += part.value;
        }
        return all;
    }, []);
}
// TODO(skeleton): add skeleton support
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, 
// For debugging
originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && intl_messageformat_parser_1.isLiteralElement(els[0])) {
        var value = els[0].value;
        if (typeof currentPluralValue === 'number') {
            value = value.replace(PLURAL_HASH, '$1' + formatters.getNumberFormat(locales).format(currentPluralValue));
        }
        return [
            {
                type: 0 /* literal */,
                value: value.replace(ESCAPE_HASH_REGEX, '#'),
            },
        ];
    }
    var result = [];
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        // Exit early for string parts.
        if (intl_messageformat_parser_1.isLiteralElement(el)) {
            var value_1 = el.value;
            if (typeof currentPluralValue === 'number') {
                value_1 = value_1.replace(PLURAL_HASH, '$1' + formatters.getNumberFormat(locales).format(currentPluralValue));
            }
            result.push({
                type: 0 /* literal */,
                value: value_1.replace(ESCAPE_HASH_REGEX, '#'),
            });
            continue;
        }
        var varName = el.value;
        // Enforce that all required values are provided by the caller.
        if (!(values && varName in values)) {
            throw new FormatError("The intl string context variable \"" + varName + "\" was not provided to the string \"" + originalMessage + "\"");
        }
        var value = values[varName];
        if (intl_messageformat_parser_1.isArgumentElement(el)) {
            if (!value || typeof value === 'string' || typeof value === 'number') {
                value =
                    typeof value === 'string' || typeof value === 'number'
                        ? String(value)
                        : '';
            }
            result.push({
                type: 1 /* argument */,
                value: value,
            });
            continue;
        }
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (intl_messageformat_parser_1.isDateElement(el)) {
            var style = typeof el.style === 'string' ? formats.date[el.style] : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (intl_messageformat_parser_1.isTimeElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.time[el.style]
                : intl_messageformat_parser_1.isDateTimeSkeleton(el.style)
                    ? intl_messageformat_parser_1.parseDateTimeSkeleton(el.style.pattern)
                    : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (intl_messageformat_parser_1.isNumberElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.number[el.style]
                : intl_messageformat_parser_1.isNumberSkeleton(el.style)
                    ? intl_messageformat_parser_1.convertNumberSkeletonToNumberFormatOptions(el.style.tokens)
                    : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getNumberFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (intl_messageformat_parser_1.isSelectElement(el)) {
            var opt = el.options[value] || el.options.other;
            if (!opt) {
                throw new RangeError("Invalid values for \"" + el.value + "\": \"" + value + "\". Options are \"" + Object.keys(el.options).join('", "') + "\"");
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
        if (intl_messageformat_parser_1.isPluralElement(el)) {
            var opt = el.options["=" + value];
            if (!opt) {
                if (!Intl.PluralRules) {
                    throw new FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n");
                }
                var rule = formatters
                    .getPluralRules(locales, { type: el.pluralType })
                    .select(value - (el.offset || 0));
                opt = el.options[rule] || el.options.other;
            }
            if (!opt) {
                throw new RangeError("Invalid values for \"" + el.value + "\": \"" + value + "\". Options are \"" + Object.keys(el.options).join('", "') + "\"");
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
            continue;
        }
    }
    return mergeLiteral(result);
}
exports.formatToParts = formatToParts;
function formatToString(els, locales, formatters, formats, values, 
// For debugging
originalMessage) {
    var parts = formatToParts(els, locales, formatters, formats, values, undefined, originalMessage);
    // Hot path for straight simple msg translations
    if (parts.length === 1) {
        return parts[0].value;
    }
    return parts.reduce(function (all, part) { return (all += part.value); }, '');
}
exports.formatToString = formatToString;
// Singleton
var domParser;
var TOKEN_DELIMITER = '@@';
var TOKEN_REGEX = /@@(\d+_\d+)@@/g;
var counter = 0;
function generateId() {
    return Date.now() + "_" + ++counter;
}
function restoreRichPlaceholderMessage(text, objectParts) {
    return text
        .split(TOKEN_REGEX)
        .filter(Boolean)
        .map(function (c) { return (objectParts[c] != null ? objectParts[c] : c); })
        .reduce(function (all, c) {
        if (!all.length) {
            all.push(c);
        }
        else if (typeof c === 'string' &&
            typeof all[all.length - 1] === 'string') {
            all[all.length - 1] += c;
        }
        else {
            all.push(c);
        }
        return all;
    }, []);
}
/**
 * Not exhaustive, just for sanity check
 */
var SIMPLE_XML_REGEX = /(<([0-9a-zA-Z-_]*?)>(.*?)<\/([0-9a-zA-Z-_]*?)>)|(<[0-9a-zA-Z-_]*?\/>)/;
var TEMPLATE_ID = Date.now() + '@@';
var VOID_ELEMENTS = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
];
function formatHTMLElement(el, objectParts, values) {
    var tagName = el.tagName;
    var outerHTML = el.outerHTML, textContent = el.textContent, childNodes = el.childNodes;
    // Regular text
    if (!tagName) {
        return restoreRichPlaceholderMessage(textContent || '', objectParts);
    }
    tagName = tagName.toLowerCase();
    var isVoidElement = ~VOID_ELEMENTS.indexOf(tagName);
    var formatFnOrValue = values[tagName];
    if (formatFnOrValue && isVoidElement) {
        throw new FormatError(tagName + " is a self-closing tag and can not be used, please use another tag name.");
    }
    if (!childNodes.length) {
        return [outerHTML];
    }
    var chunks = Array.prototype.slice.call(childNodes).reduce(function (all, child) {
        return all.concat(formatHTMLElement(child, objectParts, values));
    }, []);
    // Legacy HTML
    if (!formatFnOrValue) {
        return __spreadArrays(["<" + tagName + ">"], chunks, ["</" + tagName + ">"]);
    }
    // HTML Tag replacement
    if (typeof formatFnOrValue === 'function') {
        return [formatFnOrValue.apply(void 0, chunks)];
    }
    return [formatFnOrValue];
}
function formatHTMLMessage(els, locales, formatters, formats, values, 
// For debugging
originalMessage) {
    var parts = formatToParts(els, locales, formatters, formats, values, undefined, originalMessage);
    var objectParts = {};
    var formattedMessage = parts.reduce(function (all, part) {
        if (part.type === 0 /* literal */) {
            return (all += part.value);
        }
        var id = generateId();
        objectParts[id] = part.value;
        return (all += "" + TOKEN_DELIMITER + id + TOKEN_DELIMITER);
    }, '');
    // Not designed to filter out aggressively
    if (!SIMPLE_XML_REGEX.test(formattedMessage)) {
        return restoreRichPlaceholderMessage(formattedMessage, objectParts);
    }
    if (!values) {
        throw new FormatError('Message has placeholders but no values was given');
    }
    if (typeof DOMParser === 'undefined') {
        throw new FormatError('Cannot format XML message without DOMParser');
    }
    if (!domParser) {
        domParser = new DOMParser();
    }
    var content = domParser
        .parseFromString("<formatted-message id=\"" + TEMPLATE_ID + "\">" + formattedMessage + "</formatted-message>", 'text/html')
        .getElementById(TEMPLATE_ID);
    if (!content) {
        throw new FormatError("Malformed HTML message " + formattedMessage);
    }
    var tagsToFormat = Object.keys(values).filter(function (varName) { return !!content.getElementsByTagName(varName).length; });
    // No tags to format
    if (!tagsToFormat.length) {
        return restoreRichPlaceholderMessage(formattedMessage, objectParts);
    }
    var caseSensitiveTags = tagsToFormat.filter(function (tagName) { return tagName !== tagName.toLowerCase(); });
    if (caseSensitiveTags.length) {
        throw new FormatError("HTML tag must be lowercased but the following tags are not: " + caseSensitiveTags.join(', '));
    }
    // We're doing this since top node is `<formatted-message/>` which does not have a formatter
    return Array.prototype.slice
        .call(content.childNodes)
        .reduce(function (all, child) { return all.concat(formatHTMLElement(child, objectParts, values)); }, []);
}
exports.formatHTMLMessage = formatHTMLMessage;


/***/ }),

/***/ "./node_modules/intl-messageformat/dist/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/intl-messageformat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! ./core */ "./node_modules/intl-messageformat/dist/core.js");
__export(__webpack_require__(/*! ./formatters */ "./node_modules/intl-messageformat/dist/formatters.js"));
__export(__webpack_require__(/*! ./core */ "./node_modules/intl-messageformat/dist/core.js"));
exports.default = core_1.default;


/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/react-intl/dist/components/createFormattedComponent.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/react-intl/dist/components/createFormattedComponent.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
var injectIntl_1 = __webpack_require__(/*! ./injectIntl */ "./node_modules/react-intl/dist/components/injectIntl.js");
var DisplayName;
(function (DisplayName) {
    DisplayName["formatDate"] = "FormattedDate";
    DisplayName["formatTime"] = "FormattedTime";
    DisplayName["formatNumber"] = "FormattedNumber";
    DisplayName["formatList"] = "FormattedList";
})(DisplayName || (DisplayName = {}));
var DisplayNameParts;
(function (DisplayNameParts) {
    DisplayNameParts["formatDate"] = "FormattedDateParts";
    DisplayNameParts["formatTime"] = "FormattedTimeParts";
    DisplayNameParts["formatNumber"] = "FormattedNumberParts";
    DisplayNameParts["formatList"] = "FormattedListParts";
})(DisplayNameParts || (DisplayNameParts = {}));
exports.FormattedNumberParts = function (props) { return (React.createElement(injectIntl_1.Context.Consumer, null, function (intl) {
    utils_1.invariantIntlContext(intl);
    var value = props.value, children = props.children, formatProps = __rest(props, ["value", "children"]);
    return children(intl.formatNumberToParts(value, formatProps));
})); };
exports.FormattedNumberParts.displayName = 'FormattedNumberParts';
function createFormattedDateTimePartsComponent(name) {
    var ComponentParts = function (props) { return (React.createElement(injectIntl_1.Context.Consumer, null, function (intl) {
        utils_1.invariantIntlContext(intl);
        var value = props.value, children = props.children, formatProps = __rest(props, ["value", "children"]);
        var date = typeof value === 'string' ? new Date(value || 0) : value;
        var formattedParts = name === 'formatDate'
            ? intl.formatDateToParts(date, formatProps)
            : intl.formatTimeToParts(date, formatProps);
        return children(formattedParts);
    })); };
    ComponentParts.displayName = DisplayNameParts[name];
    return ComponentParts;
}
exports.createFormattedDateTimePartsComponent = createFormattedDateTimePartsComponent;
function createFormattedComponent(name) {
    var Component = function (props) { return (React.createElement(injectIntl_1.Context.Consumer, null, function (intl) {
        utils_1.invariantIntlContext(intl);
        var value = props.value, children = props.children, formatProps = __rest(props, ["value", "children"]);
        // TODO: fix TS type definition for localeMatcher upstream
        var formattedValue = intl[name](value, formatProps);
        if (typeof children === 'function') {
            return children(formattedValue);
        }
        var Text = intl.textComponent || React.Fragment;
        return React.createElement(Text, null, formattedValue);
    })); };
    Component.displayName = DisplayName[name];
    return Component;
}
exports.createFormattedComponent = createFormattedComponent;


/***/ }),

/***/ "./node_modules/react-intl/dist/components/html-message.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-intl/dist/components/html-message.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var message_1 = __webpack_require__(/*! ./message */ "./node_modules/react-intl/dist/components/message.js");
var injectIntl_1 = __webpack_require__(/*! ./injectIntl */ "./node_modules/react-intl/dist/components/injectIntl.js");
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
var FormattedHTMLMessage = /** @class */ (function (_super) {
    __extends(FormattedHTMLMessage, _super);
    function FormattedHTMLMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormattedHTMLMessage.prototype.render = function () {
        var _this = this;
        return (React.createElement(injectIntl_1.Context.Consumer, null, function (intl) {
            if (!_this.props.defaultMessage) {
                utils_1.invariantIntlContext(intl);
            }
            var formatHTMLMessage = intl.formatHTMLMessage, textComponent = intl.textComponent;
            var _a = _this.props, id = _a.id, description = _a.description, defaultMessage = _a.defaultMessage, rawValues = _a.values, children = _a.children;
            var Component = _this.props.tagName;
            // This is bc of TS3.3 doesn't recognize `defaultProps`
            if (!Component) {
                Component = textComponent || 'span';
            }
            var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
            var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);
            if (typeof children === 'function') {
                return children(formattedHTMLMessage);
            }
            // Since the message presumably has HTML in it, we need to set
            // `innerHTML` in order for it to be rendered and not escaped by React.
            // To be safe, all string prop values were escaped when formatting the
            // message. It is assumed that the message is not UGC, and came from the
            // developer making it more like a template.
            //
            // Note: There's a perf impact of using this component since there's no
            // way for React to do its virtual DOM diffing.
            var html = { __html: formattedHTMLMessage };
            return React.createElement(Component, { dangerouslySetInnerHTML: html });
        }));
    };
    FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
    FormattedHTMLMessage.defaultProps = __assign(__assign({}, message_1.default.defaultProps), { tagName: 'span' });
    return FormattedHTMLMessage;
}(message_1.default));
exports.default = FormattedHTMLMessage;


/***/ }),

/***/ "./node_modules/react-intl/dist/components/injectIntl.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-intl/dist/components/injectIntl.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var hoistNonReactStatics_ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/react-intl/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
// Since rollup cannot deal with namespace being a function,
// this is to interop with TypeScript since `invariant`
// does not export a default
// https://github.com/rollup/rollup/issues/1267
var hoistNonReactStatics = hoistNonReactStatics_.default || hoistNonReactStatics_;
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}
// TODO: We should provide initial value here
var IntlContext = React.createContext(null);
var IntlConsumer = IntlContext.Consumer, IntlProvider = IntlContext.Provider;
exports.Provider = IntlProvider;
exports.Context = IntlContext;
function injectIntl(WrappedComponent, options) {
    var _a = options || {}, _b = _a.intlPropName, intlPropName = _b === void 0 ? 'intl' : _b, _c = _a.forwardRef, forwardRef = _c === void 0 ? false : _c, _d = _a.enforceContext, enforceContext = _d === void 0 ? true : _d;
    var WithIntl = function (props) { return (React.createElement(IntlConsumer, null, function (intl) {
        var _a;
        if (enforceContext) {
            utils_1.invariantIntlContext(intl);
        }
        return (React.createElement(WrappedComponent, __assign({}, props, (_a = {},
            _a[intlPropName] = intl,
            _a), { ref: forwardRef ? props.forwardedRef : null })));
    })); };
    WithIntl.displayName = "injectIntl(" + getDisplayName(WrappedComponent) + ")";
    WithIntl.WrappedComponent = WrappedComponent;
    if (forwardRef) {
        return hoistNonReactStatics(React.forwardRef(function (props, ref) { return (React.createElement(WithIntl, __assign({}, props, { forwardedRef: ref }))); }), WrappedComponent);
    }
    return hoistNonReactStatics(WithIntl, WrappedComponent);
}
exports.default = injectIntl;


/***/ }),

/***/ "./node_modules/react-intl/dist/components/message.js":
/*!************************************************************!*\
  !*** ./node_modules/react-intl/dist/components/message.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var injectIntl_1 = __webpack_require__(/*! ./injectIntl */ "./node_modules/react-intl/dist/components/injectIntl.js");
var message_1 = __webpack_require__(/*! ../formatters/message */ "./node_modules/react-intl/dist/formatters/message.js");
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
var shallowEquals_ = __webpack_require__(/*! shallow-equal/objects */ "./node_modules/react-intl/node_modules/shallow-equal/objects/index.js");
var shallowEquals = shallowEquals_.default || shallowEquals_;
var defaultFormatMessage = function (descriptor, values) {
    if (true) {
        console.error('[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. Using default message as fallback.');
    }
    return message_1.formatMessage(__assign(__assign({}, utils_1.DEFAULT_INTL_CONFIG), { locale: 'en' }), utils_1.createFormatters(), descriptor, values);
};
var FormattedMessage = /** @class */ (function (_super) {
    __extends(FormattedMessage, _super);
    function FormattedMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormattedMessage.prototype.shouldComponentUpdate = function (nextProps) {
        var _a = this.props, values = _a.values, otherProps = __rest(_a, ["values"]);
        var nextValues = nextProps.values, nextOtherProps = __rest(nextProps, ["values"]);
        return (!shallowEquals(nextValues, values) ||
            !shallowEquals(otherProps, nextOtherProps));
    };
    FormattedMessage.prototype.render = function () {
        var _this = this;
        return (React.createElement(injectIntl_1.Context.Consumer, null, function (intl) {
            if (!_this.props.defaultMessage) {
                utils_1.invariantIntlContext(intl);
            }
            var _a = intl || {}, _b = _a.formatMessage, formatMessage = _b === void 0 ? defaultFormatMessage : _b, _c = _a.textComponent, Text = _c === void 0 ? React.Fragment : _c;
            var _d = _this.props, id = _d.id, description = _d.description, defaultMessage = _d.defaultMessage, values = _d.values, children = _d.children, _e = _d.tagName, Component = _e === void 0 ? Text : _e;
            var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
            var nodes = formatMessage(descriptor, values);
            if (!Array.isArray(nodes)) {
                nodes = [nodes];
            }
            if (typeof children === 'function') {
                return children.apply(void 0, nodes);
            }
            if (Component) {
                // Needs to use `createElement()` instead of JSX, otherwise React will
                // warn about a missing `key` prop with rich-text message formatting.
                return React.createElement.apply(React, __spreadArrays([Component, null], nodes));
            }
            return nodes;
        }));
    };
    FormattedMessage.displayName = 'FormattedMessage';
    FormattedMessage.defaultProps = {
        values: {},
    };
    return FormattedMessage;
}(React.Component));
exports.default = FormattedMessage;


/***/ }),

/***/ "./node_modules/react-intl/dist/components/plural.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-intl/dist/components/plural.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var injectIntl_1 = __webpack_require__(/*! ./injectIntl */ "./node_modules/react-intl/dist/components/injectIntl.js");
var FormattedPlural = function (props) {
    var value = props.value, other = props.other, children = props.children, _a = props.intl, formatPlural = _a.formatPlural, Text = _a.textComponent;
    var pluralCategory = formatPlural(value, props);
    var formattedPlural = props[pluralCategory] || other;
    if (typeof children === 'function') {
        return children(formattedPlural);
    }
    if (Text) {
        return React.createElement(Text, null, formattedPlural);
    }
    // Work around @types/react where React.FC cannot return string
    return formattedPlural;
};
FormattedPlural.defaultProps = {
    type: 'cardinal',
};
FormattedPlural.displayName = 'FormattedPlural';
exports.default = injectIntl_1.default(FormattedPlural);


/***/ }),

/***/ "./node_modules/react-intl/dist/components/provider.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-intl/dist/components/provider.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var injectIntl_1 = __webpack_require__(/*! ./injectIntl */ "./node_modules/react-intl/dist/components/injectIntl.js");
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
var intl_locales_supported_1 = __webpack_require__(/*! intl-locales-supported */ "./node_modules/intl-locales-supported/dist/index.js");
var number_1 = __webpack_require__(/*! ../formatters/number */ "./node_modules/react-intl/dist/formatters/number.js");
var relativeTime_1 = __webpack_require__(/*! ../formatters/relativeTime */ "./node_modules/react-intl/dist/formatters/relativeTime.js");
var dateTime_1 = __webpack_require__(/*! ../formatters/dateTime */ "./node_modules/react-intl/dist/formatters/dateTime.js");
var plural_1 = __webpack_require__(/*! ../formatters/plural */ "./node_modules/react-intl/dist/formatters/plural.js");
var message_1 = __webpack_require__(/*! ../formatters/message */ "./node_modules/react-intl/dist/formatters/message.js");
var shallowEquals_ = __webpack_require__(/*! shallow-equal/objects */ "./node_modules/react-intl/node_modules/shallow-equal/objects/index.js");
var list_1 = __webpack_require__(/*! ../formatters/list */ "./node_modules/react-intl/dist/formatters/list.js");
var shallowEquals = shallowEquals_.default || shallowEquals_;
function processIntlConfig(config) {
    return {
        locale: config.locale,
        timeZone: config.timeZone,
        formats: config.formats,
        textComponent: config.textComponent,
        messages: config.messages,
        defaultLocale: config.defaultLocale,
        defaultFormats: config.defaultFormats,
        onError: config.onError,
    };
}
/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
function createIntl(config, cache) {
    var formatters = utils_1.createFormatters(cache);
    var resolvedConfig = __assign(__assign({}, utils_1.DEFAULT_INTL_CONFIG), config);
    if (!resolvedConfig.locale ||
        !intl_locales_supported_1.default(resolvedConfig.locale)) {
        var locale = resolvedConfig.locale, defaultLocale = resolvedConfig.defaultLocale, onError = resolvedConfig.onError;
        if (typeof onError === 'function') {
            onError(utils_1.createError("Missing locale data for locale: \"" + locale + "\". " +
                ("Using default locale: \"" + defaultLocale + "\" as fallback.")));
        }
        // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.
        resolvedConfig.locale = resolvedConfig.defaultLocale || 'en';
    }
    return __assign(__assign({}, resolvedConfig), { formatters: formatters, formatNumber: number_1.formatNumber.bind(null, resolvedConfig, formatters.getNumberFormat), formatNumberToParts: number_1.formatNumberToParts.bind(null, resolvedConfig, formatters.getNumberFormat), formatRelativeTime: relativeTime_1.formatRelativeTime.bind(null, resolvedConfig, formatters.getRelativeTimeFormat), formatDate: dateTime_1.formatDate.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatDateToParts: dateTime_1.formatDateToParts.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatTime: dateTime_1.formatTime.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatTimeToParts: dateTime_1.formatTimeToParts.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatPlural: plural_1.formatPlural.bind(null, resolvedConfig, formatters.getPluralRules), formatMessage: message_1.formatMessage.bind(null, resolvedConfig, formatters), formatHTMLMessage: message_1.formatHTMLMessage.bind(null, resolvedConfig, formatters), formatList: list_1.formatList.bind(null, resolvedConfig, formatters.getListFormat) });
}
exports.createIntl = createIntl;
var IntlProvider = /** @class */ (function (_super) {
    __extends(IntlProvider, _super);
    function IntlProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cache = utils_1.createIntlCache();
        _this.state = {
            cache: _this.cache,
            intl: createIntl(processIntlConfig(_this.props), _this.cache),
            prevConfig: processIntlConfig(_this.props),
        };
        return _this;
    }
    IntlProvider.getDerivedStateFromProps = function (props, _a) {
        var prevConfig = _a.prevConfig, cache = _a.cache;
        var config = processIntlConfig(props);
        if (!shallowEquals(prevConfig, config)) {
            return {
                intl: createIntl(config, cache),
                prevConfig: config,
            };
        }
        return null;
    };
    IntlProvider.prototype.render = function () {
        utils_1.invariantIntlContext(this.state.intl);
        return React.createElement(injectIntl_1.Provider, { value: this.state.intl }, this.props.children);
    };
    IntlProvider.displayName = 'IntlProvider';
    IntlProvider.defaultProps = utils_1.DEFAULT_INTL_CONFIG;
    return IntlProvider;
}(React.PureComponent));
exports.default = IntlProvider;


/***/ }),

/***/ "./node_modules/react-intl/dist/components/relative.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-intl/dist/components/relative.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var injectIntl_1 = __webpack_require__(/*! ./injectIntl */ "./node_modules/react-intl/dist/components/injectIntl.js");
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
// Since rollup cannot deal with namespace being a function,
// this is to interop with TypeScript since `invariant`
// does not export a default
// https://github.com/rollup/rollup/issues/1267
var invariant_ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
var invariant = invariant_.default || invariant_;
var MINUTE = 60;
var HOUR = 60 * 60;
var DAY = 60 * 60 * 24;
function selectUnit(seconds) {
    var absValue = Math.abs(seconds);
    if (absValue < MINUTE) {
        return 'second';
    }
    if (absValue < HOUR) {
        return 'minute';
    }
    if (absValue < DAY) {
        return 'hour';
    }
    return 'day';
}
function getDurationInSeconds(unit) {
    switch (unit) {
        case 'second':
            return 1;
        case 'minute':
            return MINUTE;
        case 'hour':
            return HOUR;
        default:
            return DAY;
    }
}
function valueToSeconds(value, unit) {
    if (!value) {
        return 0;
    }
    switch (unit) {
        case 'second':
            return value;
        case 'minute':
            return value * MINUTE;
        default:
            return value * HOUR;
    }
}
var INCREMENTABLE_UNITS = ['second', 'minute', 'hour'];
function canIncrement(unit) {
    if (unit === void 0) { unit = 'second'; }
    return INCREMENTABLE_UNITS.includes(unit);
}
function verifyProps(updateIntervalInSeconds, unit) {
    invariant(!updateIntervalInSeconds || (updateIntervalInSeconds && canIncrement(unit)), 'Cannot schedule update with unit longer than hour');
}
var FormattedRelativeTime = /** @class */ (function (_super) {
    __extends(FormattedRelativeTime, _super);
    function FormattedRelativeTime(props) {
        var _this = _super.call(this, props) || this;
        // Public for testing
        _this._updateTimer = null;
        _this.state = {
            prevUnit: _this.props.unit,
            prevValue: _this.props.value,
            currentValueInSeconds: canIncrement(_this.props.unit)
                ? valueToSeconds(_this.props.value, _this.props.unit)
                : 0,
        };
        verifyProps(props.updateIntervalInSeconds, props.unit);
        return _this;
    }
    FormattedRelativeTime.prototype.scheduleNextUpdate = function (_a, _b) {
        var _this = this;
        var updateIntervalInSeconds = _a.updateIntervalInSeconds, unit = _a.unit;
        var currentValueInSeconds = _b.currentValueInSeconds;
        clearTimeout(this._updateTimer);
        this._updateTimer = null;
        // If there's no interval and we cannot increment this unit, do nothing
        if (!updateIntervalInSeconds || !canIncrement(unit)) {
            return;
        }
        // Figure out the next interesting time
        var nextValueInSeconds = currentValueInSeconds - updateIntervalInSeconds;
        var nextUnit = selectUnit(nextValueInSeconds);
        // We've reached the max auto incrementable unit, don't schedule another update
        if (nextUnit === 'day') {
            return;
        }
        var unitDuration = getDurationInSeconds(nextUnit);
        var remainder = nextValueInSeconds % unitDuration;
        var prevInterestingValueInSeconds = nextValueInSeconds - remainder;
        var nextInterestingValueInSeconds = prevInterestingValueInSeconds >= currentValueInSeconds
            ? prevInterestingValueInSeconds - unitDuration
            : prevInterestingValueInSeconds;
        var delayInSeconds = Math.abs(nextInterestingValueInSeconds - currentValueInSeconds);
        this._updateTimer = setTimeout(function () {
            return _this.setState({
                currentValueInSeconds: nextInterestingValueInSeconds,
            });
        }, delayInSeconds * 1e3);
    };
    FormattedRelativeTime.prototype.componentDidMount = function () {
        this.scheduleNextUpdate(this.props, this.state);
    };
    FormattedRelativeTime.prototype.componentDidUpdate = function () {
        this.scheduleNextUpdate(this.props, this.state);
    };
    FormattedRelativeTime.prototype.componentWillUnmount = function () {
        clearTimeout(this._updateTimer);
        this._updateTimer = null;
    };
    FormattedRelativeTime.getDerivedStateFromProps = function (props, state) {
        if (props.unit !== state.prevUnit || props.value !== state.prevValue) {
            return {
                prevValue: props.value,
                prevUnit: props.unit,
                currentValueInSeconds: canIncrement(props.unit)
                    ? valueToSeconds(props.value, props.unit)
                    : 0,
            };
        }
        return null;
    };
    FormattedRelativeTime.prototype.render = function () {
        var _this = this;
        return (React.createElement(injectIntl_1.Context.Consumer, null, function (intl) {
            utils_1.invariantIntlContext(intl);
            var formatRelativeTime = intl.formatRelativeTime, Text = intl.textComponent;
            var _a = _this.props, children = _a.children, value = _a.value, unit = _a.unit, updateIntervalInSeconds = _a.updateIntervalInSeconds;
            var currentValueInSeconds = _this.state.currentValueInSeconds;
            var currentValue = value || 0;
            var currentUnit = unit;
            if (canIncrement(unit) &&
                typeof currentValueInSeconds === 'number' &&
                updateIntervalInSeconds) {
                currentUnit = selectUnit(currentValueInSeconds);
                var unitDuration = getDurationInSeconds(currentUnit);
                currentValue = Math.round(currentValueInSeconds / unitDuration);
            }
            var formattedRelativeTime = formatRelativeTime(currentValue, currentUnit, __assign({}, _this.props));
            if (typeof children === 'function') {
                return children(formattedRelativeTime);
            }
            if (Text) {
                return React.createElement(Text, null, formattedRelativeTime);
            }
            return formattedRelativeTime;
        }));
    };
    FormattedRelativeTime.displayName = 'FormattedRelativeTime';
    FormattedRelativeTime.defaultProps = {
        value: 0,
        unit: 'second',
    };
    return FormattedRelativeTime;
}(React.PureComponent));
exports.FormattedRelativeTime = FormattedRelativeTime;
exports.default = FormattedRelativeTime;


/***/ }),

/***/ "./node_modules/react-intl/dist/components/useIntl.js":
/*!************************************************************!*\
  !*** ./node_modules/react-intl/dist/components/useIntl.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var injectIntl_1 = __webpack_require__(/*! ./injectIntl */ "./node_modules/react-intl/dist/components/injectIntl.js");
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
function useIntl() {
    var intl = react_1.useContext(injectIntl_1.Context);
    utils_1.invariantIntlContext(intl);
    return intl;
}
exports.default = useIntl;


/***/ }),

/***/ "./node_modules/react-intl/dist/formatters/dateTime.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-intl/dist/formatters/dateTime.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
var DATE_TIME_FORMAT_OPTIONS = [
    'localeMatcher',
    'formatMatcher',
    'timeZone',
    'hour12',
    'weekday',
    'era',
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'timeZoneName',
];
function getFormatter(_a, type, getDateTimeFormat, options) {
    var locale = _a.locale, formats = _a.formats, onError = _a.onError, timeZone = _a.timeZone;
    if (options === void 0) { options = {}; }
    var format = options.format;
    var defaults = __assign(__assign({}, (timeZone && { timeZone: timeZone })), (format && utils_1.getNamedFormat(formats, type, format, onError)));
    var filteredOptions = utils_1.filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
    if (type === 'time' &&
        !filteredOptions.hour &&
        !filteredOptions.minute &&
        !filteredOptions.second) {
        // Add default formatting options if hour, minute, or second isn't defined.
        filteredOptions = __assign(__assign({}, filteredOptions), { hour: 'numeric', minute: 'numeric' });
    }
    return getDateTimeFormat(locale, filteredOptions);
}
exports.getFormatter = getFormatter;
function formatDate(config, getDateTimeFormat, value, options) {
    if (options === void 0) { options = {}; }
    var date = typeof value === 'string' ? new Date(value || 0) : value;
    try {
        return getFormatter(config, 'date', getDateTimeFormat, options).format(date);
    }
    catch (e) {
        config.onError(utils_1.createError('Error formatting date.', e));
    }
    return String(date);
}
exports.formatDate = formatDate;
function formatTime(config, getDateTimeFormat, value, options) {
    if (options === void 0) { options = {}; }
    var date = typeof value === 'string' ? new Date(value || 0) : value;
    try {
        return getFormatter(config, 'time', getDateTimeFormat, options).format(date);
    }
    catch (e) {
        config.onError(utils_1.createError('Error formatting time.', e));
    }
    return String(date);
}
exports.formatTime = formatTime;
function formatDateToParts(config, getDateTimeFormat, value, options) {
    if (options === void 0) { options = {}; }
    var date = typeof value === 'string' ? new Date(value || 0) : value;
    try {
        return getFormatter(config, 'date', getDateTimeFormat, options).formatToParts(date);
    }
    catch (e) {
        config.onError(utils_1.createError('Error formatting date.', e));
    }
    return [];
}
exports.formatDateToParts = formatDateToParts;
function formatTimeToParts(config, getDateTimeFormat, value, options) {
    if (options === void 0) { options = {}; }
    var date = typeof value === 'string' ? new Date(value || 0) : value;
    try {
        return getFormatter(config, 'time', getDateTimeFormat, options).formatToParts(date);
    }
    catch (e) {
        config.onError(utils_1.createError('Error formatting time.', e));
    }
    return [];
}
exports.formatTimeToParts = formatTimeToParts;


/***/ }),

/***/ "./node_modules/react-intl/dist/formatters/list.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-intl/dist/formatters/list.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
var LIST_FORMAT_OPTIONS = [
    'localeMatcher',
    'type',
    'style',
];
var now = Date.now();
function generateToken(i) {
    return now + "_" + i + "_" + now;
}
function formatList(_a, getListFormat, values, options) {
    var locale = _a.locale, onError = _a.onError;
    if (options === void 0) { options = {}; }
    var ListFormat = Intl.ListFormat;
    if (!ListFormat) {
        onError(utils_1.createError("Intl.ListFormat is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-listformat\"\n"));
    }
    var filteredOptions = utils_1.filterProps(options, LIST_FORMAT_OPTIONS);
    try {
        var richValues_1 = {};
        var serializedValues = values.map(function (v, i) {
            if (typeof v === 'object') {
                var id = generateToken(i);
                richValues_1[id] = v;
                return id;
            }
            return String(v);
        });
        if (!Object.keys(richValues_1).length) {
            return getListFormat(locale, filteredOptions).format(serializedValues);
        }
        var parts = getListFormat(locale, filteredOptions).formatToParts(serializedValues);
        return parts.reduce(function (all, el) {
            var val = el.value;
            if (richValues_1[val]) {
                all.push(richValues_1[val]);
            }
            else if (typeof all[all.length - 1] === 'string') {
                all[all.length - 1] += val;
            }
            else {
                all.push(val);
            }
            return all;
        }, []);
    }
    catch (e) {
        onError(utils_1.createError('Error formatting list.', e));
    }
    return values;
}
exports.formatList = formatList;


/***/ }),

/***/ "./node_modules/react-intl/dist/formatters/message.js":
/*!************************************************************!*\
  !*** ./node_modules/react-intl/dist/formatters/message.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Since rollup cannot deal with namespace being a function,
// this is to interop with TypeScript since `invariant`
// does not export a default
// https://github.com/rollup/rollup/issues/1267
var invariant_ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
var invariant = invariant_.default || invariant_;
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
var intl_messageformat_1 = __webpack_require__(/*! intl-messageformat */ "./node_modules/intl-messageformat/dist/index.js");
function setTimeZoneInOptions(opts, timeZone) {
    return Object.keys(opts).reduce(function (all, k) {
        all[k] = __assign({ timeZone: timeZone }, opts[k]);
        return all;
    }, {});
}
function deepMergeOptions(opts1, opts2) {
    var keys = Object.keys(__assign(__assign({}, opts1), opts2));
    return keys.reduce(function (all, k) {
        all[k] = __assign(__assign({}, (opts1[k] || {})), (opts2[k] || {}));
        return all;
    }, {});
}
function deepMergeFormatsAndSetTimeZone(f1, timeZone) {
    if (!timeZone) {
        return f1;
    }
    var mfFormats = intl_messageformat_1.default.formats;
    return __assign(__assign(__assign({}, mfFormats), f1), { date: deepMergeOptions(setTimeZoneInOptions(mfFormats.date, timeZone), setTimeZoneInOptions(f1.date || {}, timeZone)), time: deepMergeOptions(setTimeZoneInOptions(mfFormats.time, timeZone), setTimeZoneInOptions(f1.time || {}, timeZone)) });
}
function formatMessage(_a, state, messageDescriptor, values) {
    var locale = _a.locale, formats = _a.formats, messages = _a.messages, defaultLocale = _a.defaultLocale, defaultFormats = _a.defaultFormats, onError = _a.onError, timeZone = _a.timeZone;
    if (messageDescriptor === void 0) { messageDescriptor = { id: '' }; }
    if (values === void 0) { values = {}; }
    var id = messageDescriptor.id, defaultMessage = messageDescriptor.defaultMessage;
    // `id` is a required field of a Message Descriptor.
    invariant(id, '[React Intl] An `id` must be provided to format a message.');
    if (!id) {
        throw new Error('[React Intl] An `id` must be provided to format a message.');
    }
    var message = messages && messages[id];
    formats = deepMergeFormatsAndSetTimeZone(formats, timeZone);
    defaultFormats = deepMergeFormatsAndSetTimeZone(defaultFormats, timeZone);
    var formattedMessageParts = [];
    if (message) {
        try {
            var formatter = state.getMessageFormat(message, locale, formats, {
                formatters: state,
            });
            formattedMessageParts = formatter.formatHTMLMessage(values);
        }
        catch (e) {
            onError(utils_1.createError("Error formatting message: \"" + id + "\" for locale: \"" + locale + "\"" +
                (defaultMessage ? ', using default message as fallback.' : ''), e));
        }
    }
    else {
        // This prevents warnings from littering the console in development
        // when no `messages` are passed into the <IntlProvider> for the
        // default locale, and a default message is in the source.
        if (!defaultMessage ||
            (locale && locale.toLowerCase() !== defaultLocale.toLowerCase())) {
            onError(utils_1.createError("Missing message: \"" + id + "\" for locale: \"" + locale + "\"" +
                (defaultMessage ? ', using default message as fallback.' : '')));
        }
    }
    if (!formattedMessageParts.length && defaultMessage) {
        try {
            var formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);
            formattedMessageParts = formatter.formatHTMLMessage(values);
        }
        catch (e) {
            onError(utils_1.createError("Error formatting the default message for: \"" + id + "\"", e));
        }
    }
    if (!formattedMessageParts.length) {
        onError(utils_1.createError("Cannot format message: \"" + id + "\", " +
            ("using message " + (message || defaultMessage ? 'source' : 'id') + " as fallback.")));
        if (typeof message === 'string') {
            return message || defaultMessage || id;
        }
        return defaultMessage || id;
    }
    if (formattedMessageParts.length === 1 &&
        typeof formattedMessageParts[0] === 'string') {
        return formattedMessageParts[0] || defaultMessage || id;
    }
    return formattedMessageParts;
}
exports.formatMessage = formatMessage;
function formatHTMLMessage(config, state, messageDescriptor, rawValues) {
    if (messageDescriptor === void 0) { messageDescriptor = { id: '' }; }
    if (rawValues === void 0) { rawValues = {}; }
    // Process all the values before they are used when formatting the ICU
    // Message string. Since the formatted message might be injected via
    // `innerHTML`, all String-based values need to be HTML-escaped.
    var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
        var value = rawValues[name];
        escaped[name] = typeof value === 'string' ? utils_1.escape(value) : value;
        return escaped;
    }, {});
    return formatMessage(config, state, messageDescriptor, escapedValues);
}
exports.formatHTMLMessage = formatHTMLMessage;


/***/ }),

/***/ "./node_modules/react-intl/dist/formatters/number.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-intl/dist/formatters/number.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
var NUMBER_FORMAT_OPTIONS = [
    'localeMatcher',
    'style',
    'currency',
    'currencyDisplay',
    'unit',
    'unitDisplay',
    'useGrouping',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
    // Unified NumberFormat (Stage 3 as of 10/22/19)
    'compactDisplay',
    'currencyDisplay',
    'currencySign',
    'notation',
    'signDisplay',
    'unit',
    'unitDisplay',
];
function getFormatter(_a, getNumberFormat, options) {
    var locale = _a.locale, formats = _a.formats, onError = _a.onError;
    if (options === void 0) { options = {}; }
    var format = options.format;
    var defaults = ((format &&
        utils_1.getNamedFormat(formats, 'number', format, onError)) ||
        {});
    var filteredOptions = utils_1.filterProps(options, NUMBER_FORMAT_OPTIONS, defaults);
    return getNumberFormat(locale, filteredOptions);
}
exports.getFormatter = getFormatter;
function formatNumber(config, getNumberFormat, value, options) {
    if (options === void 0) { options = {}; }
    try {
        return getFormatter(config, getNumberFormat, options).format(value);
    }
    catch (e) {
        config.onError(utils_1.createError('Error formatting number.', e));
    }
    return String(value);
}
exports.formatNumber = formatNumber;
function formatNumberToParts(config, getNumberFormat, value, options) {
    if (options === void 0) { options = {}; }
    try {
        return getFormatter(config, getNumberFormat, options).formatToParts(value);
    }
    catch (e) {
        config.onError(utils_1.createError('Error formatting number.', e));
    }
    return [];
}
exports.formatNumberToParts = formatNumberToParts;


/***/ }),

/***/ "./node_modules/react-intl/dist/formatters/plural.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-intl/dist/formatters/plural.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
var PLURAL_FORMAT_OPTIONS = [
    'localeMatcher',
    'type',
];
function formatPlural(_a, getPluralRules, value, options) {
    var locale = _a.locale, onError = _a.onError;
    if (options === void 0) { options = {}; }
    if (!Intl.PluralRules) {
        onError(utils_1.createError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n"));
    }
    var filteredOptions = utils_1.filterProps(options, PLURAL_FORMAT_OPTIONS);
    try {
        return getPluralRules(locale, filteredOptions).select(value);
    }
    catch (e) {
        onError(utils_1.createError('Error formatting plural.', e));
    }
    return 'other';
}
exports.formatPlural = formatPlural;


/***/ }),

/***/ "./node_modules/react-intl/dist/formatters/relativeTime.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-intl/dist/formatters/relativeTime.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/react-intl/dist/utils.js");
var RELATIVE_TIME_FORMAT_OPTIONS = [
    'numeric',
    'style',
];
function getFormatter(_a, getRelativeTimeFormat, options) {
    var locale = _a.locale, formats = _a.formats, onError = _a.onError;
    if (options === void 0) { options = {}; }
    var format = options.format;
    var defaults = (!!format && utils_1.getNamedFormat(formats, 'relative', format, onError)) || {};
    var filteredOptions = utils_1.filterProps(options, RELATIVE_TIME_FORMAT_OPTIONS, defaults);
    return getRelativeTimeFormat(locale, filteredOptions);
}
function formatRelativeTime(config, getRelativeTimeFormat, value, unit, options) {
    if (options === void 0) { options = {}; }
    if (!unit) {
        unit = 'second';
    }
    var RelativeTimeFormat = Intl.RelativeTimeFormat;
    if (!RelativeTimeFormat) {
        config.onError(utils_1.createError("Intl.RelativeTimeFormat is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-relativetimeformat\"\n"));
    }
    try {
        return getFormatter(config, getRelativeTimeFormat, options).format(value, unit);
    }
    catch (e) {
        config.onError(utils_1.createError('Error formatting relative time.', e));
    }
    return String(value);
}
exports.formatRelativeTime = formatRelativeTime;


/***/ }),

/***/ "./node_modules/react-intl/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/react-intl/dist/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var macro_1 = __webpack_require__(/*! @formatjs/macro */ "./node_modules/@formatjs/macro/dist/index.js");
exports.defineMessages = macro_1.defineMessages;
var createFormattedComponent_1 = __webpack_require__(/*! ./components/createFormattedComponent */ "./node_modules/react-intl/dist/components/createFormattedComponent.js");
var injectIntl_1 = __webpack_require__(/*! ./components/injectIntl */ "./node_modules/react-intl/dist/components/injectIntl.js");
exports.injectIntl = injectIntl_1.default;
exports.RawIntlProvider = injectIntl_1.Provider;
exports.IntlContext = injectIntl_1.Context;
var useIntl_1 = __webpack_require__(/*! ./components/useIntl */ "./node_modules/react-intl/dist/components/useIntl.js");
exports.useIntl = useIntl_1.default;
var provider_1 = __webpack_require__(/*! ./components/provider */ "./node_modules/react-intl/dist/components/provider.js");
exports.IntlProvider = provider_1.default;
exports.createIntl = provider_1.createIntl;
// IMPORTANT: Explicit here to prevent api-extractor from outputing `import('./types').CustomFormatConfig`
exports.FormattedDate = createFormattedComponent_1.createFormattedComponent('formatDate');
exports.FormattedTime = createFormattedComponent_1.createFormattedComponent('formatTime');
exports.FormattedNumber = createFormattedComponent_1.createFormattedComponent('formatNumber');
exports.FormattedList = createFormattedComponent_1.createFormattedComponent('formatList');
exports.FormattedDateParts = createFormattedComponent_1.createFormattedDateTimePartsComponent('formatDate');
exports.FormattedTimeParts = createFormattedComponent_1.createFormattedDateTimePartsComponent('formatTime');
var createFormattedComponent_2 = __webpack_require__(/*! ./components/createFormattedComponent */ "./node_modules/react-intl/dist/components/createFormattedComponent.js");
exports.FormattedNumberParts = createFormattedComponent_2.FormattedNumberParts;
var relative_1 = __webpack_require__(/*! ./components/relative */ "./node_modules/react-intl/dist/components/relative.js");
exports.FormattedRelativeTime = relative_1.default;
var plural_1 = __webpack_require__(/*! ./components/plural */ "./node_modules/react-intl/dist/components/plural.js");
exports.FormattedPlural = plural_1.default;
var message_1 = __webpack_require__(/*! ./components/message */ "./node_modules/react-intl/dist/components/message.js");
exports.FormattedMessage = message_1.default;
var html_message_1 = __webpack_require__(/*! ./components/html-message */ "./node_modules/react-intl/dist/components/html-message.js");
exports.FormattedHTMLMessage = html_message_1.default;
var utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/react-intl/dist/utils.js");
exports.createIntlCache = utils_1.createIntlCache;


/***/ }),

/***/ "./node_modules/react-intl/dist/utils.js":
/*!***********************************************!*\
  !*** ./node_modules/react-intl/dist/utils.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
HTML escaping is the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var intl_messageformat_1 = __webpack_require__(/*! intl-messageformat */ "./node_modules/intl-messageformat/dist/index.js");
var intl_format_cache_1 = __webpack_require__(/*! intl-format-cache */ "./node_modules/intl-format-cache/dist/index.js");
// Since rollup cannot deal with namespace being a function,
// this is to interop with TypeScript since `invariant`
// does not export a default
// https://github.com/rollup/rollup/issues/1267
var invariant_ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
var invariant = invariant_.default || invariant_;
var ESCAPED_CHARS = {
    38: '&amp;',
    62: '&gt;',
    60: '&lt;',
    34: '&quot;',
    39: '&#x27;',
};
var UNSAFE_CHARS_REGEX = /[&><"']/g;
function escape(str) {
    return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) { return ESCAPED_CHARS[match.charCodeAt(0)]; });
}
exports.escape = escape;
function filterProps(props, whitelist, defaults) {
    if (defaults === void 0) { defaults = {}; }
    return whitelist.reduce(function (filtered, name) {
        if (name in props) {
            filtered[name] = props[name];
        }
        else if (name in defaults) {
            filtered[name] = defaults[name];
        }
        return filtered;
    }, {});
}
exports.filterProps = filterProps;
function invariantIntlContext(intl) {
    invariant(intl, '[React Intl] Could not find required `intl` object. ' +
        '<IntlProvider> needs to exist in the component ancestry.');
}
exports.invariantIntlContext = invariantIntlContext;
function createError(message, exception) {
    var eMsg = exception ? "\n" + exception.stack : '';
    return "[React Intl] " + message + eMsg;
}
exports.createError = createError;
function defaultErrorHandler(error) {
    if (true) {
        console.error(error);
    }
}
exports.defaultErrorHandler = defaultErrorHandler;
exports.DEFAULT_INTL_CONFIG = {
    formats: {},
    messages: {},
    timeZone: undefined,
    textComponent: React.Fragment,
    defaultLocale: 'en',
    defaultFormats: {},
    onError: defaultErrorHandler,
};
function createIntlCache() {
    return {
        dateTime: {},
        number: {},
        message: {},
        relativeTime: {},
        pluralRules: {},
        list: {},
    };
}
exports.createIntlCache = createIntlCache;
/**
 * Create intl formatters and populate cache
 * @param cache explicit cache to prevent leaking memory
 */
function createFormatters(cache) {
    if (cache === void 0) { cache = createIntlCache(); }
    var RelativeTimeFormat = Intl.RelativeTimeFormat;
    var ListFormat = Intl.ListFormat;
    return {
        getDateTimeFormat: intl_format_cache_1.default(Intl.DateTimeFormat, cache.dateTime),
        getNumberFormat: intl_format_cache_1.default(Intl.NumberFormat, cache.number),
        getMessageFormat: intl_format_cache_1.default(intl_messageformat_1.default, cache.message),
        getRelativeTimeFormat: intl_format_cache_1.default(RelativeTimeFormat, cache.relativeTime),
        getPluralRules: intl_format_cache_1.default(Intl.PluralRules, cache.pluralRules),
        getListFormat: intl_format_cache_1.default(ListFormat, cache.list),
    };
}
exports.createFormatters = createFormatters;
function getNamedFormat(formats, type, name, onError) {
    var formatType = formats && formats[type];
    var format;
    if (formatType) {
        format = formatType[name];
    }
    if (format) {
        return format;
    }
    onError(createError("No " + type + " format named: " + name));
}
exports.getNamedFormat = getNamedFormat;


/***/ }),

/***/ "./node_modules/react-intl/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/react-intl/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;

function getStatics(component) {
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  }

  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/react-intl/node_modules/shallow-equal/objects/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/react-intl/node_modules/shallow-equal/objects/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function shallowEqualObjects(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);
  var len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var key = aKeys[i];

    if (objA[key] !== objB[key] || !Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqualObjects;


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

// AsyncMode is deprecated along with isAsyncMode
var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;

var hasWarnedAboutDeprecatedIsAsyncMode = false;

// AsyncMode should be deprecated
function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react/cjs/react.development.js":
/*!*****************************************************!*\
  !*** ./node_modules/react/cjs/react.development.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.12.0
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var _assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var checkPropTypes = __webpack_require__(/*! prop-types/checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.12.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?


var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

// Do not require this module directly! Use normal `invariant` calls with
// template literal strings. The messages will be replaced with error codes
// during build.

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */
var lowPriorityWarningWithoutStack = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.warn(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarningWithoutStack = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(void 0, [format].concat(args));
    }
  };
}

var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */
var warningWithoutStack = function () {};

{
  warningWithoutStack = function (condition, format) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (args.length > 8) {
      // Check before the condition to catch violations early.
      throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
    }

    if (condition) {
      return;
    }

    if (typeof console !== 'undefined') {
      var argsWithFormat = args.map(function (item) {
        return '' + item;
      });
      argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610

      Function.prototype.apply.call(console.error, console, argsWithFormat);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  };
}

var warningWithoutStack$1 = warningWithoutStack;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + "." + callerName;

    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }

    warningWithoutStack$1(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}
/**
 * This is the abstract API for an update queue.
 */


var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var emptyObject = {};

{
  Object.freeze(emptyObject);
}
/**
 * Base class helpers for the updating state of a component.
 */


function Component(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
  // renderer.

  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};
/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */

Component.prototype.setState = function (partialState, callback) {
  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
    {
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    }
  }

  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */


Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};
/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */


{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };

  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarningWithoutStack$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };

  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}

ComponentDummy.prototype = Component.prototype;
/**
 * Convenience component with default shallow equality check for sCU.
 */

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

_assign(pureComponentPrototype, Component.prototype);

pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };

  {
    Object.seal(refObject);
  }

  return refObject;
}

/**
 * Keeps track of the current dispatcher.
 */
var ReactCurrentDispatcher = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

/**
 * Keeps track of the current batch's configuration such as how long an update
 * should suspend for if it needs to.
 */
var ReactCurrentBatchConfig = {
  suspense: null
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
var describeComponentFrame = function (name, source, ownerName) {
  var sourceInfo = '';

  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');

    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);

        if (match) {
          var pathBeforeSlash = match[1];

          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }

    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }

  return '\n    in ' + (name || 'Unknown') + sourceInfo;
};

var Resolved = 1;

function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      warningWithoutStack$1(false, 'Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return "Profiler";

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';

      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);

          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }

          break;
        }
    }
  }

  return null;
}

var ReactDebugCurrentFrame = {};
var currentlyValidatingElement = null;
function setCurrentlyValidatingElement(element) {
  {
    currentlyValidatingElement = element;
  }
}

{
  // Stack implementation injected by the current renderer.
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = ''; // Add an extra top frame while an element is being validated

    if (currentlyValidatingElement) {
      var name = getComponentName(currentlyValidatingElement.type);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
    } // Delegate to the injected renderer-specific implementation


    var impl = ReactDebugCurrentFrame.getCurrentStack;

    if (impl) {
      stack += impl() || '';
    }

    return stack;
  };
}

/**
 * Used by act() to track whether you're inside an act() scope.
 */
var IsSomeRendererActing = {
  current: false
};

var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
  ReactCurrentOwner: ReactCurrentOwner,
  IsSomeRendererActing: IsSomeRendererActing,
  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
  assign: _assign
};

{
  _assign(ReactSharedInternals, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = warningWithoutStack$1;

{
  warning = function (condition, format) {
    if (condition) {
      return;
    }

    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum(); // eslint-disable-next-line react-internal/warning-and-invariant-args

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    warningWithoutStack$1.apply(void 0, [false, format + '%s'].concat(args, [stack]));
  };
}

var warning$1 = warning;

var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warningWithoutStack$1(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };

  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warningWithoutStack$1(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };

  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */



/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  var propName; // Reserved names are extracted

  var props = {};
  var key = null;
  var ref = null; // Currently, key can be spread in as a prop. This causes a potential
  // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
  // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
  // but as an intermediary step, we will use jsxDEV for everything except
  // <div {...props} key="Hi" />, because we aren't currently able to tell if
  // key is explicitly declared to be undefined or not.

  if (maybeKey !== undefined) {
    key = '' + maybeKey;
  }

  if (hasValidKey(config)) {
    key = '' + config.key;
  }

  if (hasValidRef(config)) {
    ref = config.ref;
  } // Remaining properties are added to a new props object


  for (propName in config) {
    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName];
    }
  } // Resolve default props


  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  if (key || ref) {
    var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

    if (key) {
      defineKeyPropWarningGetter(props, displayName);
    }

    if (ref) {
      defineRefPropWarningGetter(props, displayName);
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */

function createElement(type, config, children) {
  var propName; // Reserved names are extracted

  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }

    props.children = childArray;
  } // Resolve default props


  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
  return newElement;
}
/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */

function cloneElement(element, config, children) {
  if (!!(element === null || element === undefined)) {
    {
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
    }
  }

  var propName; // Original props are copied

  var props = _assign({}, element.props); // Reserved names are extracted


  var key = element.key;
  var ref = element.ref; // Self is preserved since the owner is preserved.

  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.

  var source = element._source; // Owner will be preserved, unless ref is overridden

  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    } // Remaining properties override existing props


    var defaultProps;

    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */

function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';
/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });
  return '$' + escapedString;
}
/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */


var didWarnAboutMaps = false;
var userProvidedKeyEscapeRegex = /\/+/g;

function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];

function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;

  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}
/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */


function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;

      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }

    }
  }

  if (invokeCallback) {
    callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.

  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);

    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          !didWarnAboutMaps ? warning$1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.') : void 0;
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;

      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';

      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }

      var childrenString = '' + children;

      {
        {
          throw Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ")." + addendum);
        }
      }
    }
  }

  return subtreeCount;
}
/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */


function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}
/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */


function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  } // Implicit key determined by the index in the set


  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;
  func.call(context, child, bookKeeping.count++);
}
/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */


function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }

  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;
  var mappedChild = func.call(context, child, bookKeeping.count++);

  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
      return c;
    });
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }

    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';

  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }

  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}
/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */


function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }

  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}
/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */


function countChildren(children) {
  return traverseAllChildren(children, function () {
    return null;
  }, null);
}
/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */


function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
    return child;
  });
  return result;
}
/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */


function onlyChild(children) {
  if (!isValidElement(children)) {
    {
      throw Error("React.Children.only expected to receive a single React element child.");
    }
  }

  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warningWithoutStack$1(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;

  {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;
            warning$1(false, 'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }

          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function () {
          return context._threadCount;
        },
        set: function (_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;
            warning$1(false, 'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }

          return context.Consumer;
        }
      }
    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

    context.Consumer = Consumer;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

function lazy(ctor) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null
  };

  {
    // In production, this would just set it on the object.
    var defaultProps;
    var propTypes;
    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function () {
          return defaultProps;
        },
        set: function (newDefaultProps) {
          warning$1(false, 'React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          defaultProps = newDefaultProps; // Match production behavior more closely:

          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function () {
          return propTypes;
        },
        set: function (newPropTypes) {
          warning$1(false, 'React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          propTypes = newPropTypes; // Match production behavior more closely:

          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true
          });
        }
      }
    });
  }

  return lazyType;
}

function forwardRef(render) {
  {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      warningWithoutStack$1(false, 'forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
    } else if (typeof render !== 'function') {
      warningWithoutStack$1(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      !( // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
      render.length === 0 || render.length === 2) ? warningWithoutStack$1(false, 'forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.') : void 0;
    }

    if (render != null) {
      !(render.defaultProps == null && render.propTypes == null) ? warningWithoutStack$1(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
    }
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
}

function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      warningWithoutStack$1(false, 'memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }

  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };
}

function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;

  if (!(dispatcher !== null)) {
    {
      throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.");
    }
  }

  return dispatcher;
}

function useContext(Context, unstable_observedBits) {
  var dispatcher = resolveDispatcher();

  {
    !(unstable_observedBits === undefined) ? warning$1(false, 'useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '') : void 0; // TODO: add a more generic warning for invalid values.

    if (Context._context !== undefined) {
      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.

      if (realContext.Consumer === Context) {
        warning$1(false, 'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        warning$1(false, 'Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
  }

  return dispatcher.useContext(Context, unstable_observedBits);
}
function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}
function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}
function useEffect(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, inputs);
}
function useLayoutEffect(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, inputs);
}
function useCallback(callback, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, inputs);
}
function useMemo(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, inputs);
}
function useImperativeHandle(ref, create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, inputs);
}
function useDebugValue(value, formatterFn) {
  {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}
var emptyObject$1 = {};
function useResponder(responder, listenerProps) {
  var dispatcher = resolveDispatcher();

  {
    if (responder == null || responder.$$typeof !== REACT_RESPONDER_TYPE) {
      warning$1(false, 'useResponder: invalid first argument. Expected an event responder, but instead got %s', responder);
      return;
    }
  }

  return dispatcher.useResponder(responder, listenerProps || emptyObject$1);
}
function useTransition(config) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useTransition(config);
}
function useDeferredValue(value, config) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useDeferredValue(value, config);
}

function withSuspenseConfig(scope, config) {
  var previousConfig = ReactCurrentBatchConfig.suspense;
  ReactCurrentBatchConfig.suspense = config === undefined ? null : config;

  try {
    scope();
  } finally {
    ReactCurrentBatchConfig.suspense = previousConfig;
  }
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */
var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current.type);

    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }

  return '';
}

function getSourceInfoErrorAddendum(source) {
  if (source !== undefined) {
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }

  return '';
}

function getSourceInfoErrorAddendumForProps(elementProps) {
  if (elementProps !== null && elementProps !== undefined) {
    return getSourceInfoErrorAddendum(elementProps.__source);
  }

  return '';
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

    if (parentName) {
      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
    }
  }

  return info;
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }

  element._store.validated = true;
  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }

  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.

  var childOwner = '';

  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
  }

  setCurrentlyValidatingElement(element);

  {
    warning$1(false, 'Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
  }

  setCurrentlyValidatingElement(null);
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }

  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];

      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);

    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;

        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  var type = element.type;

  if (type === null || type === undefined || typeof type === 'string') {
    return;
  }

  var name = getComponentName(type);
  var propTypes;

  if (typeof type === 'function') {
    propTypes = type.propTypes;
  } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
  // Inner props are checked in the reconciler.
  type.$$typeof === REACT_MEMO_TYPE)) {
    propTypes = type.propTypes;
  } else {
    return;
  }

  if (propTypes) {
    setCurrentlyValidatingElement(element);
    checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
    setCurrentlyValidatingElement(null);
  } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warningWithoutStack$1(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }

  if (typeof type.getDefaultProps === 'function') {
    !type.getDefaultProps.isReactClassApproved ? warningWithoutStack$1(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  setCurrentlyValidatingElement(fragment);
  var keys = Object.keys(fragment.props);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (key !== 'children' && key !== 'key') {
      warning$1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
      break;
    }
  }

  if (fragment.ref !== null) {
    warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');
  }

  setCurrentlyValidatingElement(null);
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.

  if (!validType) {
    var info = '';

    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(source);

    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString;

    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    warning$1(false, 'React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }

  var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.

  if (element == null) {
    return element;
  } // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)


  if (validType) {
    var children = props.children;

    if (children !== undefined) {
      if (isStaticChildren) {
        if (Array.isArray(children)) {
          for (var i = 0; i < children.length; i++) {
            validateChildKeys(children[i], type);
          }

          if (Object.freeze) {
            Object.freeze(children);
          }
        } else {
          warning$1(false, 'React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
        }
      } else {
        validateChildKeys(children, type);
      }
    }
  }

  if (hasOwnProperty$1.call(props, 'key')) {
    warning$1(false, 'React.jsx: Spreading a key to JSX is a deprecated pattern. ' + 'Explicitly pass a key after spreading props in your JSX call. ' + 'E.g. <ComponentName {...props} key={key} />');
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  return jsxWithValidation(type, props, key, true);
}
function jsxWithValidationDynamic(type, props, key) {
  return jsxWithValidation(type, props, key, false);
}
function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.

  if (!validType) {
    var info = '';

    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendumForProps(props);

    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString;

    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }

  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.

  if (element == null) {
    return element;
  } // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)


  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}
function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type; // Legacy hook: remove it

  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarningWithoutStack$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}
function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);

  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }

  validatePropTypes(newElement);
  return newElement;
}

var hasBadMapPolyfill;

{
  hasBadMapPolyfill = false;

  try {
    var frozenObject = Object.freeze({});
    var testMap = new Map([[frozenObject, null]]);
    var testSet = new Set([frozenObject]); // This is necessary for Rollup to not consider these unused.
    // https://github.com/rollup/rollup/issues/1771
    // TODO: we can remove these if Rollup fixes the bug.

    testMap.set(0, 0);
    testSet.add(0);
  } catch (e) {
    // TODO: Consider warning about bad polyfills
    hasBadMapPolyfill = true;
  }
}

function createFundamentalComponent(impl) {
  // We use responder as a Map key later on. When we have a bad
  // polyfill, then we can't use it as a key as the polyfill tries
  // to add a property to the object.
  if ( true && !hasBadMapPolyfill) {
    Object.freeze(impl);
  }

  var fundamantalComponent = {
    $$typeof: REACT_FUNDAMENTAL_TYPE,
    impl: impl
  };

  {
    Object.freeze(fundamantalComponent);
  }

  return fundamantalComponent;
}

function createEventResponder(displayName, responderConfig) {
  var getInitialState = responderConfig.getInitialState,
      onEvent = responderConfig.onEvent,
      onMount = responderConfig.onMount,
      onUnmount = responderConfig.onUnmount,
      onRootEvent = responderConfig.onRootEvent,
      rootEventTypes = responderConfig.rootEventTypes,
      targetEventTypes = responderConfig.targetEventTypes,
      targetPortalPropagation = responderConfig.targetPortalPropagation;
  var eventResponder = {
    $$typeof: REACT_RESPONDER_TYPE,
    displayName: displayName,
    getInitialState: getInitialState || null,
    onEvent: onEvent || null,
    onMount: onMount || null,
    onRootEvent: onRootEvent || null,
    onUnmount: onUnmount || null,
    rootEventTypes: rootEventTypes || null,
    targetEventTypes: targetEventTypes || null,
    targetPortalPropagation: targetPortalPropagation || false
  }; // We use responder as a Map key later on. When we have a bad
  // polyfill, then we can't use it as a key as the polyfill tries
  // to add a property to the object.

  if ( true && !hasBadMapPolyfill) {
    Object.freeze(eventResponder);
  }

  return eventResponder;
}

function createScope() {
  var scopeComponent = {
    $$typeof: REACT_SCOPE_TYPE
  };

  {
    Object.freeze(scopeComponent);
  }

  return scopeComponent;
}

// Helps identify side effects in render-phase lifecycle hooks and setState
// reducers by double invoking them in Strict Mode.

 // To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.

 // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:

 // Gather advanced timing metrics for Profiler subtrees.

 // Trace which interactions trigger each commit.

 // SSR experiments


 // Only used in www builds.

 // Only used in www builds.

 // Disable javascript: URL strings in href for XSS protection.

 // React Fire: prevent the value and checked attributes from syncing
// with their related DOM properties

 // These APIs will no longer be "unstable" in the upcoming 16.7 release,
// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.

var exposeConcurrentModeAPIs = false;
 // Experimental React Flare event system and event components support.

var enableFlareAPI = false; // Experimental Host Component support.

var enableFundamentalAPI = false; // Experimental Scope support.

var enableScopeAPI = false; // New API for JSX transforms to target - https://github.com/reactjs/rfcs/pull/107

var enableJSXTransformAPI = false; // We will enforce mocking scheduler with scheduler/unstable_mock at some point. (v17?)
// Till then, we warn about the missing mock, but still fallback to a legacy mode compatible version

 // For tests, we flush suspense fallbacks in an act scope;
// *except* in some of our own tests, where we test incremental loading states.

 // Add a callback property to suspense to notify which promises are currently
// in the update queue. This allows reporting and tracing of what is causing
// the user to see a loading state.
// Also allows hydration callbacks to fire when a dehydrated boundary gets
// hydrated or deleted.

 // Part of the simplification of React.createElement so we can eventually move
// from React.createElement to React.jsx
// https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md





 // Flag to turn event.target and event.currentTarget in ReactNative from a reactTag to a component instance

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },
  createRef: createRef,
  Component: Component,
  PureComponent: PureComponent,
  createContext: createContext,
  forwardRef: forwardRef,
  lazy: lazy,
  memo: memo,
  useCallback: useCallback,
  useContext: useContext,
  useEffect: useEffect,
  useImperativeHandle: useImperativeHandle,
  useDebugValue: useDebugValue,
  useLayoutEffect: useLayoutEffect,
  useMemo: useMemo,
  useReducer: useReducer,
  useRef: useRef,
  useState: useState,
  Fragment: REACT_FRAGMENT_TYPE,
  Profiler: REACT_PROFILER_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,
  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,
  version: ReactVersion,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
};

if (exposeConcurrentModeAPIs) {
  React.useTransition = useTransition;
  React.useDeferredValue = useDeferredValue;
  React.SuspenseList = REACT_SUSPENSE_LIST_TYPE;
  React.unstable_withSuspenseConfig = withSuspenseConfig;
}

if (enableFlareAPI) {
  React.unstable_useResponder = useResponder;
  React.unstable_createResponder = createEventResponder;
}

if (enableFundamentalAPI) {
  React.unstable_createFundamental = createFundamentalComponent;
}

if (enableScopeAPI) {
  React.unstable_createScope = createScope;
} // Note: some APIs are added with feature flags.
// Make sure that stable builds for open source
// don't modify the React object to avoid deopts.
// Also let's not expose their names in stable builds.


if (enableJSXTransformAPI) {
  {
    React.jsxDEV = jsxWithValidation;
    React.jsx = jsxWithValidationDynamic;
    React.jsxs = jsxWithValidationStatic;
  }
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.


var react = React$3.default || React$3;

module.exports = react;
  })();
}


/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ "./node_modules/react/cjs/react.development.js");
}


/***/ }),

/***/ "./resources/assets/js/components/HRPortal/JobIndexHr.tsx":
/*!****************************************************************!*\
  !*** ./resources/assets/js/components/HRPortal/JobIndexHr.tsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_intl_1 = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/dist/index.js");
var JobCard_1 = __importDefault(__webpack_require__(/*! ../JobCard */ "./resources/assets/js/components/JobCard.tsx"));
var UnclaimedJobCard_1 = __importDefault(__webpack_require__(/*! ../UnclaimedJobCard */ "./resources/assets/js/components/UnclaimedJobCard.tsx"));
var lookupConstants_1 = __webpack_require__(/*! ../../models/lookupConstants */ "./resources/assets/js/models/lookupConstants.ts");
var CompletedJobsAccordion = function (_a) {
    var completedJobActions = _a.completedJobActions;
    var _b = react_1.useState(false), isExpanded = _b[0], setIsExpanded = _b[1];
    return (react_1.default.createElement("section", { "data-c-accordion-group": true, "data-c-margin": "top(triple)" },
        react_1.default.createElement("div", { "data-c-accordion": "", className: "" + (isExpanded && "active") },
            react_1.default.createElement("button", { "aria-expanded": isExpanded, "data-c-accordion-trigger": true, tabIndex: 0, type: "button", onClick: function () {
                    setIsExpanded(!isExpanded);
                } },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h3", { "data-c-font-size": "h3", "data-c-color": "c3" },
                        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.completedJobsHeader", description: "Header for completed jobs accordion section.", defaultMessage: "My Completed Job Actions" }))),
                react_1.default.createElement("span", { "data-c-visibility": "invisible" },
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.clickToView", description: "Accordion trigger message for screen readers.", defaultMessage: "Click to view..." })),
                react_1.default.createElement("p", { "data-c-accordion-add": true, "data-c-font-style": "underline", "data-c-color": "c2" },
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.showAccordion", description: "Accordion trigger message to show items.", defaultMessage: "Show" })),
                react_1.default.createElement("p", { "data-c-accordion-remove": true, "data-c-font-style": "underline", "data-c-color": "c2" },
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.hideAccordion", description: "Accordion trigger message to hide items.", defaultMessage: "Hide" }))),
            react_1.default.createElement("div", { "aria-hidden": "true", "data-c-accordion-content": true, "data-c-padding": "top(double)" },
                react_1.default.createElement("div", null, (completedJobActions.length !== 0 &&
                    completedJobActions.map(function (jobAction) {
                        return react_1.default.createElement(JobCard_1.default, __assign({}, jobAction));
                    })) || (react_1.default.createElement("p", null,
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.noJobsCompleted", description: "Message displayed if the completed jobs list is empty.", defaultMessage: "No jobs completed yet!" }))))))));
};
var JobIndexHr = function (_a) {
    var jobActions = _a.jobActions, unclaimedJobs = _a.unclaimedJobs, departmentName = _a.departmentName;
    var notCompletedJobActions = react_1.useMemo(function () {
        return jobActions.filter(function (jobAction) { return jobAction.status !== lookupConstants_1.JobStatus.Complete; });
    }, [jobActions]);
    var completedJobActions = react_1.useMemo(function () {
        return jobActions.filter(function (jobAction) { return jobAction.status === lookupConstants_1.JobStatus.Complete; });
    }, [jobActions]);
    return (react_1.default.createElement("section", null,
        react_1.default.createElement("div", { "data-c-background": "gray(10)" },
            react_1.default.createElement("div", { "data-c-container": "large", "data-c-padding": "tb(triple)" },
                react_1.default.createElement("p", null,
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.welcomeMessage", description: "Welcome message at beginning of page.", defaultMessage: "Welcome! Introductory copy that explains how this page works, and\n                what an HR adviser needs to do to claim a job action as their own.\n                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium\n                ducimus laboriosam sequi, quis autem minima esse quasi aspernatur\n                vero provident quos eligendi, ea officia exercitationem. Obcaecati\n                impedit quae veritatis corrupti!" })),
                react_1.default.createElement("h2", { "data-c-font-size": "h2", "data-c-margin": "top(triple) bottom(normal)" },
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.jobActionsHeader", description: "Header for my job actions section.", defaultMessage: "My Job Actions" })),
                react_1.default.createElement("p", { "data-c-margin": "bottom(double)" },
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.jobActionsMessage", description: "Message before list of users job actions.", defaultMessage: "This is a list of all job actions you are currently participating\n                in. Looking for an older job? Check the 'My Completed Job Actions'\n                section below your active jobs." })),
                (notCompletedJobActions.length !== 0 &&
                    notCompletedJobActions.map(function (jobAction) {
                        return react_1.default.createElement(JobCard_1.default, __assign({}, jobAction));
                    })) || (react_1.default.createElement("p", null,
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.jobActionsEmpty", description: "Message displayed if the jobs actions list is empty.", defaultMessage: "Claim a job below!" }))),
                react_1.default.createElement(CompletedJobsAccordion, { completedJobActions: completedJobActions }),
                react_1.default.createElement("hr", { "data-c-margin": "tb(triple)", "data-c-hr": "gray" }),
                react_1.default.createElement("h2", { "data-c-font-size": "h2", "data-c-margin": "top(triple) bottom(double)" },
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.preDepartmentName", description: "Message before department name.", defaultMessage: "All Jobs in" }), " " + departmentName),
                react_1.default.createElement("p", { "data-c-margin": "bottom(double)" },
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.unclaimedJobsMessage", description: "Message before list of unclaimed jobs.", defaultMessage: "This is the list of all active job actions in your department. From\n                here you can 'claim' a job, which will move it into your jobs list\n                above and allow you to begin working with the hiring manager on\n                finding the best talent possible. If you claim a job by accident, no\n                fear, for you can click into the job summary and remove yourself\n                using the 'Remove Myself From This Job' button." })),
                react_1.default.createElement("section", { "data-c-grid": "gutter" }, unclaimedJobs.length !== 0 &&
                    unclaimedJobs.map(function (unclaimedJob) {
                        return react_1.default.createElement(UnclaimedJobCard_1.default, __assign({}, unclaimedJob));
                    })),
                unclaimedJobs.length === 0 && (react_1.default.createElement("p", null,
                    react_1.default.createElement(react_intl_1.FormattedMessage, { id: "hrPortal.jobPageIndex.unclaimedJobsEmpty", description: "Message displayed if the unclaimed jobs list is empty.", defaultMessage: "There are currently no active jobs available." })))))));
};
exports.default = JobIndexHr;


/***/ }),

/***/ "./resources/assets/js/components/JobCard.tsx":
/*!****************************************************!*\
  !*** ./resources/assets/js/components/JobCard.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_intl_1 = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/dist/index.js");
var lookupConstants_1 = __webpack_require__(/*! ../models/lookupConstants */ "./resources/assets/js/models/lookupConstants.ts");
var statuses = react_intl_1.defineMessages({
    Approved: {
        id: "jobCard.status.approved",
        description: "Text displayed for a Job Status of Approved.",
        defaultMessage: "Approved",
    },
    Closed: {
        id: "jobCard.status.closed",
        description: "Text displayed for a Job Status of Closed.",
        defaultMessage: "Closed",
    },
    Complete: {
        id: "jobCard.status.complete",
        description: "Text displayed for a Job Status of Complete.",
        defaultMessage: "Complete",
    },
    Draft: {
        id: "jobCard.status.draft",
        description: "Text displayed for a Job Status of Draft.",
        defaultMessage: "Draft",
    },
    Published: {
        id: "jobCard.status.published",
        description: "Text displayed for a Job Status of Published.",
        defaultMessage: "Published",
    },
    Review: {
        id: "jobCard.status.review",
        description: "Text displayed for a Job Status of In Review.",
        defaultMessage: "In Review",
    },
});
var StatusPill = function (_a) {
    var text = _a.text, status = _a.status;
    return (react_1.default.createElement("span", { "data-c-tag": status === lookupConstants_1.JobStatus.Published ? "go" : "c1", "data-c-font-size": "small", "data-c-radius": "pill", "data-c-margin": "right(half)" }, text));
};
var JobCard = function (_a) {
    var activity = _a.activity, applicants = _a.applicants, classification = _a.classification, draft = _a.draft, managerTime = _a.managerTime, owned = _a.owned, preview = _a.preview, screeningPlan = _a.screeningPlan, status = _a.status, summary = _a.summary, title = _a.title, userTime = _a.userTime;
    var intl = react_intl_1.useIntl();
    return (react_1.default.createElement("div", { "data-c-card": "", "data-c-background": "white(100)", "data-c-radius": "rounded", "data-tc-status": "in review", "data-c-padding": "all(normal)", "data-c-margin": "bottom(normal)" },
        react_1.default.createElement("div", { "data-c-grid": "gutter middle" },
            react_1.default.createElement("div", { "data-c-grid-item": "tl(5of10)" },
                react_1.default.createElement("h2", { "data-c-margin": "bottom(normal)", "data-c-font-size": "h3" }, classification + " - ",
                    react_1.default.createElement("span", { "data-c-font-weight": "bold", "data-c-margin": "right(normal)" }, title),
                    react_1.default.createElement(StatusPill, { text: intl.formatMessage(statuses[status]), status: status })),
                react_1.default.createElement("p", { "data-c-font-size": "small", "data-c-margin": "top(normal)" },
                    draft.url.length === 0 ? (react_1.default.createElement("a", { href: draft.url, title: draft.title, "data-c-margin": "right(half)" }, draft.text)) : (react_1.default.createElement("span", { "data-c-color": "gray", "data-c-margin": "right(half)" }, draft.text)),
                    preview.url !== null ? (react_1.default.createElement("a", { href: preview.url, title: preview.title, "data-c-margin": "right(half)" }, preview.text)) : (react_1.default.createElement("span", { "data-c-color": "gray", "data-c-margin": "right(half)" }, preview.text)),
                    screeningPlan.url !== null ? (react_1.default.createElement("a", { href: screeningPlan.url, title: screeningPlan.title, "data-c-margin": "right(half)" }, screeningPlan.text)) : (react_1.default.createElement("span", { "data-c-color": "gray", "data-c-margin": "right(half)" }, screeningPlan.text)),
                    react_1.default.createElement("span", { "data-c-color": "gray", "data-c-margin": "right(half)" },
                        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "jobCard.applicants", defaultMessage: "{applicants, plural,\n                  =0 {No Applicants}\n                  one {# Applicant}\n                  other {# Applicants}\n                }", description: "Text displaying how many applicants have applied to this Job.", values: {
                                applicants: applicants,
                            } })))),
            react_1.default.createElement("div", { "data-c-grid-item": "tl(3of10)" },
                react_1.default.createElement("div", { "data-c-grid": "gutter" },
                    react_1.default.createElement("div", { "data-c-grid-item": "base(1of1)" },
                        react_1.default.createElement("p", { "data-c-font-size": "small" },
                            react_1.default.createElement(react_intl_1.FormattedMessage, { id: "jobCard.managerTime", defaultMessage: "Time with Manager: {managerTime, plural,\n                    one {# day}\n                    other {# days}\n                  }", description: "Text displaying how long a job post has been claimed by a manager.", values: {
                                    managerTime: managerTime,
                                } })),
                        react_1.default.createElement("p", { "data-c-font-size": "small", className: owned ? "pulse" : "" },
                            react_1.default.createElement(react_intl_1.FormattedMessage, { id: "jobCard.userTime", defaultMessage: "Time with you: <s>{userTime, plural,\n                    one {# day}\n                    other {# days}\n                  }</s>", description: "Text displaying how long a job has been claimed by the current user.", values: {
                                    s: function (msg) { return react_1.default.createElement("span", null, msg); },
                                    userTime: userTime,
                                } })),
                        activity.count > 0 && activity.new.url !== null ? (react_1.default.createElement("a", { href: activity.new.url, title: activity.new.title, "data-c-font-size": "small", "data-c-margin": "top(half)", "data-c-color": "stop" }, activity.new.text + " (" + activity.count + ")")) : (react_1.default.createElement("p", { "data-c-font-size": "small", "data-c-margin": "top(half)", "data-c-color": "gray" },
                            react_1.default.createElement(react_intl_1.FormattedMessage, { id: "jobCard.noActivity", defaultMessage: "No New Activity", description: "Fallback text for no new activity on a Job." })))))),
            react_1.default.createElement("div", { "data-c-grid-item": "tl(2of10)", "data-c-align": "base(center)" },
                react_1.default.createElement("a", { href: summary.url !== null ? summary.url : "#", title: summary.title, "data-c-button": "solid(c1)", "data-c-radius": "rounded" }, summary.text)))));
};
exports.default = JobCard;


/***/ }),

/***/ "./resources/assets/js/components/UnclaimedJobCard.tsx":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/UnclaimedJobCard.tsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_intl_1 = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/dist/index.js");
var UnclaimedJobCard = function (_a) {
    var jobLink = _a.jobLink, createdAt = _a.createdAt, status = _a.status, hiringManagers = _a.hiringManagers, hrAdvisors = _a.hrAdvisors, claimJob = _a.claimJob;
    return (react_1.default.createElement("div", { "data-c-grid-item": "tp(1of2) tl(1of3) equal-col", className: "tc-hr-job-card" },
        react_1.default.createElement("div", { "data-c-card": true, "data-c-radius": "rounded", "data-c-background": "white(100)" },
            react_1.default.createElement("a", { href: jobLink.url, title: jobLink.title, style: { textDecoration: "none" } },
                react_1.default.createElement("div", { "data-c-background": "black(100)", "data-c-padding": "all(normal)" },
                    react_1.default.createElement("div", { "data-c-grid": "gutter middle" },
                        react_1.default.createElement("div", { "data-c-grid-item": "base(1of1)" },
                            react_1.default.createElement("p", { "data-c-font-size": "h4", "data-c-colour": "white", "data-c-font-style": "underline" }, jobLink.text)),
                        react_1.default.createElement("div", { "data-c-grid-item": "base(1of2)" },
                            react_1.default.createElement("p", { "data-c-colour": "white", "data-c-font-size": "small" },
                                react_1.default.createElement(react_intl_1.FormattedMessage, { id: "openJobCard.createdAt", description: "Header for when Job Poster was created.", defaultMessage: "Created: " }),
                                createdAt)),
                        react_1.default.createElement("div", { "data-c-grid-item": "base(1of2)", "data-c-align": "base(right)" },
                            react_1.default.createElement("span", { "data-c-color": "white", "data-c-border": "all(thin, solid, white)", "data-c-padding": "tb(quarter) rl(half)", "data-c-font-size": "small", "data-c-radius": "pill" }, status)))),
                react_1.default.createElement("div", { "data-c-padding": "all(normal)" },
                    react_1.default.createElement("p", { "data-c-color": "black", "data-c-margin": "bottom(normal)" },
                        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "openJobCard.hiringManager", description: "Header before list of hiring managers.", defaultMessage: "Hiring Managers: " }),
                        hiringManagers.map(function (manager, index) {
                            var comma = hiringManagers.length !== 1 &&
                                index + 1 !== hiringManagers.length
                                ? ","
                                : " ";
                            return "" + manager + comma + " ";
                        })),
                    hrAdvisors.length > 0 ? (react_1.default.createElement("p", { "data-c-color": "black", "data-c-margin": "bottom(normal)" },
                        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "openJobCard.hrAdvisors", description: "Header before list of HR advisors.", defaultMessage: "HR Advisors: " }),
                        hrAdvisors.map(function (advisor, index) {
                            var comma = hrAdvisors.length !== 1 && index + 1 !== hrAdvisors.length
                                ? ","
                                : " ";
                            return "" + advisor + comma + " ";
                        }))) : (react_1.default.createElement("p", { "data-c-color": "stop", "data-c-margin": "bottom(normal)" },
                        react_1.default.createElement(react_intl_1.FormattedMessage, { id: "openJobCard.unclaimed", description: "Message displayed if not HR managers have claimed a job.", defaultMessage: "Unclaimed" }))))),
            react_1.default.createElement("div", { "data-c-padding": "all(normal)", "data-c-border": "top(thin, solid, black)", "data-c-align": "base(right)" },
                react_1.default.createElement("button", { "data-c-button": "solid(c2)", "data-c-radius": "rounded", type: "button", onClick: claimJob },
                    react_1.default.createElement("span", { "data-c-color": "black" },
                        "+",
                        " ",
                        react_1.default.createElement("span", { "data-c-font-style": "underline" },
                            react_1.default.createElement(react_intl_1.FormattedMessage, { id: "openJobCard.claimJob", description: "Message indicating the event of clicking on the job card.", defaultMessage: "Claim This Job" }))))))));
};
exports.default = UnclaimedJobCard;


/***/ }),

/***/ "./resources/assets/js/models/lookupConstants.ts":
/*!*******************************************************!*\
  !*** ./resources/assets/js/models/lookupConstants.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReviewStatusId;
(function (ReviewStatusId) {
    ReviewStatusId[ReviewStatusId["ScreenedOut"] = 1] = "ScreenedOut";
    ReviewStatusId[ReviewStatusId["StillThinking"] = 2] = "StillThinking";
    ReviewStatusId[ReviewStatusId["StillIn"] = 3] = "StillIn";
})(ReviewStatusId = exports.ReviewStatusId || (exports.ReviewStatusId = {}));
var CriteriaTypeId;
(function (CriteriaTypeId) {
    CriteriaTypeId[CriteriaTypeId["Essential"] = 1] = "Essential";
    CriteriaTypeId[CriteriaTypeId["Asset"] = 2] = "Asset";
})(CriteriaTypeId = exports.CriteriaTypeId || (exports.CriteriaTypeId = {}));
var SkillTypeId;
(function (SkillTypeId) {
    SkillTypeId[SkillTypeId["Soft"] = 1] = "Soft";
    SkillTypeId[SkillTypeId["Hard"] = 2] = "Hard";
})(SkillTypeId = exports.SkillTypeId || (exports.SkillTypeId = {}));
var SkillLevelId;
(function (SkillLevelId) {
    SkillLevelId[SkillLevelId["Basic"] = 1] = "Basic";
    SkillLevelId[SkillLevelId["Intermediate"] = 2] = "Intermediate";
    SkillLevelId[SkillLevelId["Advanced"] = 3] = "Advanced";
    SkillLevelId[SkillLevelId["Expert"] = 4] = "Expert";
})(SkillLevelId = exports.SkillLevelId || (exports.SkillLevelId = {}));
var AssessmentTypeId;
(function (AssessmentTypeId) {
    AssessmentTypeId[AssessmentTypeId["NarrativeAssessment"] = 1] = "NarrativeAssessment";
    AssessmentTypeId[AssessmentTypeId["ApplicationScreeningQuestion"] = 2] = "ApplicationScreeningQuestion";
    AssessmentTypeId[AssessmentTypeId["GroupTest"] = 3] = "GroupTest";
    AssessmentTypeId[AssessmentTypeId["InformalPhoneConversation"] = 4] = "InformalPhoneConversation";
    AssessmentTypeId[AssessmentTypeId["Interview"] = 5] = "Interview";
    AssessmentTypeId[AssessmentTypeId["OnlineExam"] = 6] = "OnlineExam";
    AssessmentTypeId[AssessmentTypeId["OnSiteExam"] = 7] = "OnSiteExam";
    AssessmentTypeId[AssessmentTypeId["TakeHomeExam"] = 8] = "TakeHomeExam";
    AssessmentTypeId[AssessmentTypeId["PortfolioReview"] = 9] = "PortfolioReview";
    AssessmentTypeId[AssessmentTypeId["ReferenceCheck"] = 10] = "ReferenceCheck";
    AssessmentTypeId[AssessmentTypeId["SeriousGames"] = 11] = "SeriousGames";
})(AssessmentTypeId = exports.AssessmentTypeId || (exports.AssessmentTypeId = {}));
exports.ProvinceId = {
    AB: 1,
    BC: 2,
    MB: 3,
    NL: 4,
    NB: 5,
    NS: 6,
    NU: 7,
    NT: 8,
    ON: 9,
    PE: 10,
    QC: 11,
    SK: 12,
    YT: 13,
};
exports.SecurityClearanceId = {
    reliability: 1,
    secret: 2,
    topSecret: 3,
};
exports.LanguageRequirementId = {
    english: 1,
    french: 2,
    bilingualIntermediate: 3,
    bilingualAdvanced: 4,
    englishOrFrench: 5,
};
exports.DepartmentId = {
    treasuryBoard: 1,
    naturalResources: 2,
    transport: 3,
    environmentAndClimateChange: 4,
    employmentAndSocialDevelopment: 5,
    globalAffairs: 6,
    borderServices: 7,
    fisheriesAndOceans: 8,
    innovationScience: 9,
    publicServiceAndProcurement: 10,
    nationalDefence: 11,
};
exports.FrequencyId = {
    never: 1,
    rarely: 2,
    sometimes: 3,
    often: 4,
    always: 5,
};
exports.TravelRequirementId = {
    frequently: 1,
    available: 2,
    none: 3,
};
exports.OvertimeRequirementId = {
    frequently: 1,
    available: 2,
    none: 3,
};
exports.ClassificationId = {
    AS: 1,
    BI: 2,
    CO: 3,
    CR: 4,
    CS: 5,
    EC: 6,
    EX: 7,
    FO: 8,
    IS: 9,
    PC: 10,
    PE: 11,
    PM: 12,
    AD: 13,
};
var JobStatus;
(function (JobStatus) {
    JobStatus["Approved"] = "Approved";
    JobStatus["Closed"] = "Closed";
    JobStatus["Complete"] = "Complete";
    JobStatus["Draft"] = "Draft";
    JobStatus["Published"] = "Published";
    JobStatus["Review"] = "Review";
})(JobStatus = exports.JobStatus || (exports.JobStatus = {}));
function getKeyByValue(object, value) {
    return (Object.keys(object).find(function (key) { return object[key] === parseInt(value, 10); }) || "");
}
exports.getKeyByValue = getKeyByValue;
function enumToIds(enumType) {
    var enumVals = Object.values(enumType);
    // Note: this first array includes the list of ids as strings, followed by the list of names as strings
    var enumIds = enumVals.filter(function (item) { return !Number.isNaN(Number(item)); });
    return enumIds.map(function (id) { return Number(id); });
}
exports.enumToIds = enumToIds;
exports.SkillLevelIdValues = enumToIds(SkillLevelId);
exports.SkillTypeIdValues = enumToIds(SkillTypeId);
exports.AssessmentTypeIdValues = enumToIds(AssessmentTypeId);
exports.CriteriaTypeIdValues = enumToIds(CriteriaTypeId);


/***/ }),

/***/ 14:
/*!**********************************************************************!*\
  !*** multi ./resources/assets/js/components/HRPortal/JobIndexHr.tsx ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\dev\TalentCloud\resources\assets\js\components\HRPortal\JobIndexHr.tsx */"./resources/assets/js/components/HRPortal/JobIndexHr.tsx");


/***/ })

/******/ });