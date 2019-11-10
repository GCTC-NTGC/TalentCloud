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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/getpdf.js":
/*!***************************************!*\
  !*** ./resources/assets/js/getpdf.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-disable func-names */

/* eslint-disable no-undef */

/* eslint-disable new-cap */

/* eslint-disable no-plusplus */

/* eslint-disable prefer-template */
// run on Review Applicants page to export all applications to PDF
// add bookmark to Chrome with this as the URL:
// javascript:function clickAllApplicants(){let t=document.querySelectorAll("div.box.lg-2of11.applicant-links > a:nth-child(1)");!function(t){(t=Array.prototype.slice.call(t)).map(function(t){return t.getAttribute("href")})}(t);for(var e=0;e<t.length;e++){var l=window.open(t[e],"_blank"),n=l.document.createElement("script");n.setAttribute("src",t[e].origin+"/js/getpdf.js"),l.document.body.appendChild(n)}}clickAllApplicants();
function replaceAll(subject, search, replacement) {
  return subject.split(search).join(replacement);
}

function downloadPdfs() {
  var applicantName = document.querySelector("div.applicant-information>span").textContent;
  applicantName = replaceAll(applicantName, " ", "_");
  document.querySelector("#expand-all").click();
  var canvasDiv = document.querySelector("#canvas_div_pdf");
  var htmlWidth = canvasDiv.clientWidth;
  var htmlHeight = canvasDiv.clientHeight;
  var topLeftMargin = 15;
  var pdfWidth = htmlWidth + topLeftMargin * 2;
  var pdfHeight = pdfWidth * 1.2 + topLeftMargin * 2;
  var totalPages = Math.ceil(htmlHeight / pdfHeight) - 1;
  html2canvas(canvasDiv, {
    allowTaint: true
  }).then(function (canvas) {
    canvas.getContext("2d");
    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF("p", "pt", [pdfWidth, pdfHeight + topLeftMargin * 2]);
    pdf.addImage(imgData, "JPG", 0, 0, htmlWidth, htmlHeight);

    for (var i = 1; i <= totalPages; i++) {
      pdf.addPage(pdfWidth, pdfHeight + topLeftMargin * 2);
      pdf.addImage(imgData, "JPG", 0, -(pdfHeight * i + topLeftMargin * 2), htmlWidth, htmlHeight);
    }

    pdf.save(applicantName + ".pdf");
    window.close();
  });
}

window.onload = downloadPdfs;

/***/ }),

/***/ 6:
/*!*********************************************!*\
  !*** multi ./resources/assets/js/getpdf.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/Grant/Sites/tc-docker/TalentCloud/resources/assets/js/getpdf.js */"./resources/assets/js/getpdf.js");


/***/ })

/******/ });