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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/managerRegistration.ts":
/*!****************************************************!*\
  !*** ./resources/assets/js/managerRegistration.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var getDeptInput = function () {
    return document.querySelector("select#department");
};
var getGovEmailWrapper = function () { return document.querySelector("#gov_email_wrapper"); };
var getGovEmailInput = function () {
    return document.querySelector("input#gov_email");
};
var hideGovEmail = function () {
    var wrapper = getGovEmailWrapper();
    if (wrapper !== null) {
        wrapper.setAttribute("data-c-visibility", "hidden");
    }
    var input = getGovEmailInput();
    if (input !== null) {
        input.removeAttribute("required");
    }
};
var showGovEmail = function () {
    var wrapper = getGovEmailWrapper();
    if (wrapper !== null) {
        wrapper.removeAttribute("data-c-visibility");
    }
    var input = getGovEmailInput();
    if (input !== null) {
        input.setAttribute("required", "");
    }
};
var handleDeptChange = function (event) {
    if (event.target instanceof HTMLSelectElement) {
        var value = event.target.value;
        var NOT_IN_GOV = "0";
        if (value !== null && value !== "" && value !== NOT_IN_GOV) {
            showGovEmail();
        }
        else {
            hideGovEmail();
        }
    }
};
var deptInput = getDeptInput();
if (deptInput !== null) {
    deptInput.addEventListener("change", handleDeptChange);
}


/***/ }),

/***/ 7:
/*!**********************************************************!*\
  !*** multi ./resources/assets/js/managerRegistration.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/Grant/Sites/tc-docker/TalentCloud/resources/assets/js/managerRegistration.ts */"./resources/assets/js/managerRegistration.ts");


/***/ })

/******/ });