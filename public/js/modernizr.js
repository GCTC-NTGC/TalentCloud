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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/modernizr.js":
/*!******************************************!*\
  !*** ./resources/assets/js/modernizr.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}
/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-emoji-svg-touchevents-setclasses !*/


!function (e, t, n) {
  function o(e, t) {
    return _typeof(e) === t;
  }

  function a() {
    var e, t, n, a, s, i, r;

    for (var l in c) {
      if (c.hasOwnProperty(l)) {
        if (e = [], t = c[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) {
          e.push(t.options.aliases[n].toLowerCase());
        }

        for (a = o(t.fn, "function") ? t.fn() : t.fn, s = 0; s < e.length; s++) {
          i = e[s], r = i.split("."), 1 === r.length ? Modernizr[r[0]] = a : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = a), f.push((a ? "" : "no-") + r.join("-"));
        }
      }
    }
  }

  function s(e) {
    var t = u.className,
        n = Modernizr._config.classPrefix || "";

    if (p && (t = t.baseVal), Modernizr._config.enableJSClass) {
      var o = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
      t = t.replace(o, "$1" + n + "js$2");
    }

    Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), p ? u.className.baseVal = t : u.className = t);
  }

  function i() {
    return "function" != typeof t.createElement ? t.createElement(arguments[0]) : p ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments);
  }

  function r() {
    var e = t.body;
    return e || (e = i(p ? "svg" : "body"), e.fake = !0), e;
  }

  function l(e, n, o, a) {
    var s,
        l,
        f,
        c,
        d = "modernizr",
        p = i("div"),
        v = r();
    if (parseInt(o, 10)) for (; o--;) {
      f = i("div"), f.id = a ? a[o] : d + (o + 1), p.appendChild(f);
    }
    return s = i("style"), s.type = "text/css", s.id = "s" + d, (v.fake ? v : p).appendChild(s), v.appendChild(p), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(t.createTextNode(e)), p.id = d, v.fake && (v.style.background = "", v.style.overflow = "hidden", c = u.style.overflow, u.style.overflow = "hidden", u.appendChild(v)), l = n(p, e), v.fake ? (v.parentNode.removeChild(v), u.style.overflow = c, u.offsetHeight) : p.parentNode.removeChild(p), !!l;
  }

  var f = [],
      c = [],
      d = {
    _version: "3.5.0",
    _config: {
      classPrefix: "",
      enableClasses: !0,
      enableJSClass: !0,
      usePrefixes: !0
    },
    _q: [],
    on: function on(e, t) {
      var n = this;
      setTimeout(function () {
        t(n[e]);
      }, 0);
    },
    addTest: function addTest(e, t, n) {
      c.push({
        name: e,
        fn: t,
        options: n
      });
    },
    addAsyncTest: function addAsyncTest(e) {
      c.push({
        name: null,
        fn: e
      });
    }
  },
      Modernizr = function Modernizr() {};

  Modernizr.prototype = d, Modernizr = new Modernizr(), Modernizr.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
  var u = t.documentElement,
      p = "svg" === u.nodeName.toLowerCase();
  Modernizr.addTest("canvas", function () {
    var e = i("canvas");
    return !(!e.getContext || !e.getContext("2d"));
  }), Modernizr.addTest("canvastext", function () {
    return Modernizr.canvas === !1 ? !1 : "function" == typeof i("canvas").getContext("2d").fillText;
  }), Modernizr.addTest("emoji", function () {
    if (!Modernizr.canvastext) return !1;
    var t = e.devicePixelRatio || 1,
        n = 12 * t,
        o = i("canvas"),
        a = o.getContext("2d");
    return a.fillStyle = "#f00", a.textBaseline = "top", a.font = "32px Arial", a.fillText("🐨", 0, 0), 0 !== a.getImageData(n, n, 1, 1).data[0];
  });
  var v = d._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
  d._prefixes = v;
  var m = d.testStyles = l;
  Modernizr.addTest("touchevents", function () {
    var n;
    if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0;else {
      var o = ["@media (", v.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
      m(o, function (e) {
        n = 9 === e.offsetTop;
      });
    }
    return n;
  }), a(), s(f), delete d.addTest, delete d.addAsyncTest;

  for (var h = 0; h < Modernizr._q.length; h++) {
    Modernizr._q[h]();
  }

  e.Modernizr = Modernizr;
}(window, document);

/***/ }),

/***/ 4:
/*!************************************************!*\
  !*** multi ./resources/assets/js/modernizr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/Grant/Sites/tc-docker/TalentCloud/resources/assets/js/modernizr.js */"./resources/assets/js/modernizr.js");


/***/ })

/******/ });