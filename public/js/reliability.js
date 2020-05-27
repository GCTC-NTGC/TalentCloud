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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/reliability.js":
/*!********************************************!*\
  !*** ./resources/assets/js/reliability.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Clone Playground: JavaScript
jQuery(document).ready(function ($) {
  // Clone Stuff
  // Clone Shorthand =============================================================
  function clone(attr, option, selector) {
    if (option != null) {
      if (selector != null) {
        return "[data-c-".concat(attr).concat(selector, "='").concat(option, "']");
      }

      return "[data-c-".concat(attr, "='").concat(option, "']");
    }

    return "[data-c-".concat(attr, "]");
  } // Dialog Sizing -------------------------------------------------------


  function dialogSizing(dialog) {
    var viewportHeight = $(window).height();

    if (dialog != null) {
      var dialogHeight = $(dialog).children("div").height() + 50;

      if (dialogHeight > viewportHeight) {
        $(dialog).attr("data-c-dialog", "active--overflowing");
      } else {
        $(dialog).attr("data-c-dialog", "active--contained");
      }
    } else {
      $(clone("dialog")).each(function () {
        if ($(this).attr("data-c-dialog") == false) {
          return false;
        }

        var dialogHeight = $(this).children("div").height() + 50;

        if (dialogHeight > viewportHeight) {
          $(this).attr("data-c-dialog", "active--overflowing");
        } else {
          $(this).attr("data-c-dialog", "active--contained");
        }
      });
    }
  } // Age of Consent ==============================================================


  $("[data-gc-parent-guardian-consent-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-parent-guardian-consent]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-personal-consent-trigger]").removeClass("active");
      $("[data-gc-personal-consent]").addClass("hidden");
    }
  });
  $("[data-gc-personal-consent-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-personal-consent]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-parent-guardian-consent-trigger]").removeClass("active");
      $("[data-gc-parent-guardian-consent]").addClass("hidden");
    }
  }); // Birth Name ==================================================================

  $("[data-gc-birth-name-same-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      // Remove alternative option's stuff.
      $("[data-gc-birth-name-different-trigger]").removeClass("active");
      $("[data-gc-birth-name-different]").addClass("hidden");
    }
  });
  $("[data-gc-birth-name-different-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-birth-name-different]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-birth-name-same-trigger]").removeClass("active");
      $("[data-gc-birth-name-same]").addClass("hidden");
    }
  }); // Legal Names =================================================================

  $("[data-gc-legal-name-same-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      // Remove alternative option's stuff.
      $("[data-gc-legal-name-different-trigger]").removeClass("active");
      $("[data-gc-legal-name-different]").addClass("hidden");
    }
  });
  $("[data-gc-legal-name-different-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-legal-name-different]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-legal-name-same-trigger]").removeClass("active");
      $("[data-gc-legal-name-same]").addClass("hidden");
    }
  }); // Repeater ----------------------------------------------------------------
  // Citizenship =================================================================

  $("[data-gc-citizen-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      // Remove alternative option's stuff.
      $("[data-gc-citizen-false-trigger]").removeClass("active");
      $("[data-gc-citizen-false]").addClass("hidden");
    }
  });
  $("[data-gc-citizen-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-citizen-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-citizen-true-trigger]").removeClass("active");
      $("[data-gc-citizen-true]").addClass("hidden");
    }
  }); // Multiple Citizenship ========================================================

  $("[data-gc-multiple-citizen-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-multiple-citizen-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-multiple-citizen-false-trigger]").removeClass("active");
      $("[data-gc-multiple-citizen-false]").addClass("hidden");
    }
  });
  $("[data-gc-multiple-citizen-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      // Remove alternative option's stuff.
      $("[data-gc-multiple-citizen-true-trigger]").removeClass("active");
      $("[data-gc-multiple-citizen-true]").addClass("hidden");
    }
  }); // Born Outside the Country ====================================================

  $("[data-gc-home-select]").on("click", function () {
    if ($(this).val() === "Canada") {
      $("[data-gc-foreign-born]").addClass("hidden");
    } else {
      $("[data-gc-foreign-born]").removeClass("hidden");
    }
  }); // Naturalization ==============================================================

  $("[data-gc-naturalization-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-naturalization-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-naturalization-false-trigger]").removeClass("active");
      $("[data-gc-naturalization-false]").addClass("hidden");
    }
  });
  $("[data-gc-naturalization-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-naturalization-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-naturalization-true-trigger]").removeClass("active");
      $("[data-gc-naturalization-true]").addClass("hidden");
    }
  }); // Naturalization w/ Citizenship ===============================================

  $("[data-gc-naturalization-application-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-naturalization-application-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-naturalization-application-false-trigger]").removeClass("active");
      $("[data-gc-naturalization-application-false]").addClass("hidden");
    }
  });
  $("[data-gc-naturalization-application-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-naturalization-application-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-naturalization-application-true-trigger]").removeClass("active");
      $("[data-gc-naturalization-application-true]").addClass("hidden");
    }
  }); // Previous Screening ==========================================================
  // Applications

  $("[data-gc-screen-apply-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-screen-apply-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-screen-apply-false-trigger]").removeClass("active");
      $("[data-gc-screen-apply-false]").addClass("hidden");
    }
  });
  $("[data-gc-screen-apply-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-screen-apply-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-screen-apply-true-trigger]").removeClass("active");
      $("[data-gc-screen-apply-true]").addClass("hidden");
    }
  }); // Granted

  $("[data-gc-screen-granted-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-screen-granted-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-screen-granted-false-trigger]").removeClass("active");
      $("[data-gc-screen-granted-false]").addClass("hidden");
    }
  });
  $("[data-gc-screen-granted-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-screen-granted-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-screen-granted-true-trigger]").removeClass("active");
      $("[data-gc-screen-granted-true]").addClass("hidden");
    }
  }); // Revoked

  $("[data-gc-screen-revoked-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-screen-revoked-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-screen-revoked-false-trigger]").removeClass("active");
      $("[data-gc-screen-revoked-false]").addClass("hidden");
    }
  });
  $("[data-gc-screen-revoked-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-screen-revoked-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-screen-revoked-true-trigger]").removeClass("active");
      $("[data-gc-screen-revoked-true]").addClass("hidden");
    }
  }); // Denied

  $("[data-gc-screen-denied-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-screen-denied-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-screen-denied-false-trigger]").removeClass("active");
      $("[data-gc-screen-denied-false]").addClass("hidden");
    }
  });
  $("[data-gc-screen-denied-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-screen-denied-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-screen-denied-true-trigger]").removeClass("active");
      $("[data-gc-screen-denied-true]").addClass("hidden");
    }
  }); // Current Address =============================================================

  $("[data-gc-current-address-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $("[data-gc-current-address]").removeClass("hidden");
    } else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-current-address]").addClass("hidden");
    }
  }); // Current Experience ==========================================================

  $("[data-gc-current-experience-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $("[data-gc-current-experience]").removeClass("hidden");
    } else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-current-experience]").addClass("hidden");
    }
  }); // Experience Unemployment

  $("[data-gc-experience-unemployed-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-experience-unemployed-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-experience-unemployed-false-trigger]").removeClass("active");
      $("[data-gc-experience-unemployed-false]").addClass("hidden");
      dialogSizing($('[data-c-dialog][data-c-dialog-id="experience-dialog"]'));
    }
  });
  $("[data-gc-experience-unemployed-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-experience-unemployed-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-experience-unemployed-true-trigger]").removeClass("active");
      $("[data-gc-experience-unemployed-true]").addClass("hidden");
      dialogSizing($('[data-c-dialog][data-c-dialog-id="experience-dialog"]'));
    }
  }); // Experience Dismissal

  $("[data-gc-experience-dismissal-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-experience-dismissal-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-experience-dismissal-false-trigger]").removeClass("active");
      $("[data-gc-experience-dismissal-false]").addClass("hidden");
      dialogSizing($('[data-c-dialog][data-c-dialog-id="experience-dialog"]'));
    }
  });
  $("[data-gc-experience-dismissal-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-experience-dismissal-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-experience-dismissal-true-trigger]").removeClass("active");
      $("[data-gc-experience-dismissal-true]").addClass("hidden");
      dialogSizing($('[data-c-dialog][data-c-dialog-id="experience-dialog"]'));
    }
  }); // Experience Supervisor

  $("[data-gc-experience-supervisor-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-experience-supervisor-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-experience-supervisor-false-trigger]").removeClass("active");
      $("[data-gc-experience-supervisor-false]").addClass("hidden");
      dialogSizing($('[data-c-dialog][data-c-dialog-id="experience-dialog"]'));
    }
  });
  $("[data-gc-experience-supervisor-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-experience-supervisor-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-experience-supervisor-true-trigger]").removeClass("active");
      $("[data-gc-experience-supervisor-true]").addClass("hidden");
      dialogSizing($('[data-c-dialog][data-c-dialog-id="experience-dialog"]'));
    }
  }); // Reference Work/Education

  $("[data-gc-reference-work-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-reference-work-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-reference-work-false-trigger]").removeClass("active");
      $("[data-gc-reference-work-false]").addClass("hidden");
    }
  });
  $("[data-gc-reference-work-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-reference-work-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-reference-work-true-trigger]").removeClass("active");
      $("[data-gc-reference-work-true]").addClass("hidden");
    }
  }); // Record

  $("[data-gc-record-true-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-record-true]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-record-false-trigger]").removeClass("active");
      $("[data-gc-record-false]").addClass("hidden");
    }
  });
  $("[data-gc-record-false-trigger]").on("click", function () {
    if ($(this).hasClass("active")) {} else {
      // Trigger this elements stuff.
      $(this).addClass("active");
      $("[data-gc-record-false]").removeClass("hidden"); // Remove alternative option's stuff.

      $("[data-gc-record-true-trigger]").removeClass("active");
      $("[data-gc-record-true]").addClass("hidden");
    }
  });
});

/***/ }),

/***/ 2:
/*!**************************************************!*\
  !*** multi ./resources/assets/js/reliability.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\dev\CombinedTalentCloud\tc\resources\assets\js\reliability.js */"./resources/assets/js/reliability.js");


/***/ })

/******/ });