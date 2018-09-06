/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// =============================================================================

// Utilities JavaScript (jQuery)

// =============================================================================

(function ($) {

                    // Add isValid()

                    $.fn.isValid = function () {
                                        return this[0].checkValidity();
                    };

                    $(document).ready(function () {

                                        // Accordion Handlers ==================================================

                                        function accordionTrigger(trigger) {
                                                            if ($(trigger).parent(".accordion").hasClass("active")) {
                                                                                $(trigger).attr("aria-expanded", "false");
                                                                                $(trigger).parent(".accordion").removeClass("active");
                                                                                $(trigger).parent(".accordion").find(".accordion-content").attr("aria-hidden", "true");
                                                            } else {
                                                                                $(trigger).attr("aria-expanded", "true");
                                                                                $(trigger).parent(".accordion").addClass("active");
                                                                                $(trigger).parent(".accordion").find(".accordion-content").attr("aria-hidden", "false");
                                                            }
                                        }

                                        $(document).on("click", ".accordion-trigger", function (e) {

                                                            accordionTrigger(this);
                                        });

                                        $(document).on("keyup", ".accordion-trigger", function (e) {

                                                            if (e.which == 13) {
                                                                                accordionTrigger(this);
                                                            }
                                        });

                                        // Modal Handlers ======================================================

                                        function openModal(trigger) {

                                                            var modalID = $(trigger).attr("data-modal-id");
                                                            var modal = $(".modal[data-modal-id=" + modalID + "]");
                                                            $(".modal-overlay").addClass("active");
                                                            modal.addClass("active");
                                                            $("body").css("overflow", "hidden");

                                                            // Tab Items

                                                            var focusableItems = modal.find(":focusable");

                                                            var firstInput = focusableItems.first();
                                                            var lastInput = focusableItems.last();

                                                            if (modal.find("form").length == 0) {
                                                                                lastInput.focus();
                                                            } else {
                                                                                firstInput.focus();
                                                            }

                                                            modalTabHandler(firstInput, lastInput);
                                                            escapeModalHandler();
                                        }

                                        $(document).on("click", ".modal-trigger", function (e) {

                                                            openModal(this);
                                        });

                                        $(document).on("keyup", ".modal-trigger", function (e) {

                                                            if (e.which == 13) {
                                                                                openModal(this);
                                                            }
                                        });

                                        function closeModal(trigger) {

                                                            $(".modal-overlay").removeClass("active");
                                                            $(".modal").removeClass("active");
                                                            $("body").css("overflow", "visible");
                                        }

                                        $(document).on("click", ".modal-cancel-trigger", function (e) {

                                                            closeModal(this);
                                        });

                                        $(document).on("keyup", ".modal-cancel-trigger", function (e) {

                                                            if (e.which == 13) {
                                                                                closeModal(this);
                                                            }
                                        });

                                        // Tab Handler =====================================================

                                        function modalTabHandler(first, last) {

                                                            $(document).on("keydown", function (e) {

                                                                                var keyCode = e.keyCode || e.which;

                                                                                if (keyCode == 9 && !e.shiftKey) {

                                                                                                    if ($(last).is(":focus")) {
                                                                                                                        e.preventDefault();
                                                                                                                        $(first).focus();
                                                                                                    }
                                                                                } else if (keyCode == 9 && e.shiftKey) {

                                                                                                    if ($(first).is(":focus")) {
                                                                                                                        e.preventDefault();
                                                                                                                        $(last).focus();
                                                                                                    }
                                                                                }
                                                            });
                                        }

                                        // Escape Handler ==================================================

                                        function escapeModalHandler() {

                                                            $(document).on("keyup", function (e) {

                                                                                if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {

                                                                                                    $(".modal-overlay").removeClass("active");
                                                                                                    $(".modal").removeClass("active");
                                                                                                    $("body").css("overflow", "visible");

                                                                                                    // FF and compatible
                                                                                                    if (e.stopPropagation) {
                                                                                                                        e.stopPropagation();
                                                                                                                        e.preventDefault();
                                                                                                    }
                                                                                }
                                                            });
                                        }

                                        // Form Handlers =======================================================

                                        // Required Fields

                                        function requiredFields() {
                                                            $("input:required, textarea:required").each(function (e) {
                                                                                $(this).parent().addClass("required");
                                                                                $(this).parent().find("label").append("<span class='form__required'><i class='fa fa-asterisk' aria-label='Asterisk'></i></span>");
                                                            });
                                        }

                                        requiredFields();

                                        // Label Handers ===================================================

                                        function labelHandlers() {

                                                            $("[class*='form__input-wrapper'] input, [class*='form__input-wrapper'] textarea").focusin(function (e) {
                                                                                $(this).parent().addClass("active");
                                                            });

                                                            $("[class*='form__input-wrapper'] input, [class*='form__input-wrapper'] textarea").focusout(function (e) {

                                                                                // Check for existing value.

                                                                                if ($(this).val() == "") {
                                                                                                    $(this).parent().removeClass("active");
                                                                                }

                                                                                // Check Validity

                                                                                if ($(this).isValid() == true) {

                                                                                                    if ($(this).val() == "" || $(this).attr("type") == "password") {
                                                                                                                        $(this).parent().removeClass("valid");
                                                                                                                        $(this).parent().removeClass("invalid");
                                                                                                    } else {
                                                                                                                        $(this).parent().addClass("valid");
                                                                                                                        $(this).parent().removeClass("invalid");
                                                                                                    }
                                                                                } else {

                                                                                                    if ($(this).attr("type") == "password") {
                                                                                                                        return false;
                                                                                                    } else {
                                                                                                                        $(this).parent().addClass("invalid");
                                                                                                                        $(this).parent().removeClass("valid");
                                                                                                    }
                                                                                }
                                                            });
                                        }

                                        labelHandlers();

                                        //Individualize template attributes
                                        function appendToAttributes(parent, attribute, suffix, conditions) {
                                                            var selector = "*[" + attribute + "]";

                                                            //If conditions is set, only modify attributes that also
                                                            //satisfy that selector
                                                            if (conditions) {
                                                                                selector = conditions + selector;
                                                            }

                                                            parent.find(selector).each(function () {
                                                                                $(this).attr(attribute, $(this).attr(attribute) + suffix);
                                                            });
                                        }

                                        //Return the next unused data-item-id value
                                        function getNextItemId(parent) {
                                                            var maxId = 0;
                                                            parent.find("*[data-item-id]").each(function () {
                                                                                var id = parseInt($(this).attr('data-item-id'));
                                                                                if (id > maxId) {
                                                                                                    maxId = id;
                                                                                }
                                                            });
                                                            return maxId + 1;
                                        }

                                        // Profile List Handlers ===============================================

                                        // Add Profile Element
                                        function addProfileElement(trigger) {

                                                            // Get Parent
                                                            var parent = $(trigger).parents(".profile-list");

                                                            // Get List Wrapper
                                                            var wrapper = parent.find(".profile-element-list");

                                                            // Set Null to Hidden
                                                            parent.find(".profile-null").removeClass("active");

                                                            // Get Template
                                                            var template = parent.find(".profile-element.template").clone();

                                                            // Remove Template Class
                                                            template.removeClass("template");

                                                            // Get New ID
                                                            var newId = getNextItemId(wrapper);

                                                            template.attr('data-item-id', newId);

                                                            // Individualize Form IDs and labels
                                                            appendToAttributes(template, 'id', '_' + newId);
                                                            appendToAttributes(template, 'for', '_' + newId);

                                                            // Individualize form names, except for submit buttons
                                                            appendToAttributes(template, 'name', '[' + newId + ']', ':not([name=submit])');
                                                            // Individualize values on submit buttons
                                                            appendToAttributes(template, 'value', '[' + newId + ']', '[name=submit]');

                                                            // Prepend Clone to the Wrapper
                                                            wrapper.prepend(template);

                                                            // Reactivate Required Fields
                                                            requiredFields();

                                                            // Reactivate Labels
                                                            labelHandlers();

                                                            // Reactivate Nested Relatives
                                                            loadProfileRelatives();
                                        }

                                        // Click Trigger
                                        $(".profile-list__add-element-trigger").on("click", function (e) {

                                                            // Prevent Default Functions
                                                            e.preventDefault();

                                                            // Add Profile Elements
                                                            addProfileElement(this);
                                        });

                                        // Enter Key Trigger
                                        $(".profile-list__add-element-trigger").on("keyup", function (e) {

                                                            if (e.which == 13) {

                                                                                // Prevent Default Functions
                                                                                e.preventDefault();

                                                                                // Add Profile Elements
                                                                                addProfileElement(this);
                                                            }
                                        });

                                        // Remove Profile Element

                                        // Add Profile Relative
                                        function addProfileRelative(trigger) {

                                                            // Get Parent
                                                            var parent = $(trigger).parents(".profile-relative-list");

                                                            // Get List Wrapper
                                                            var wrapper = parent.find(".profile-relative-list__wrapper");

                                                            // Set Null to Hidden
                                                            // parent.find(".profile-null").removeClass("active");

                                                            // Get Template
                                                            var template = parent.find(".profile-relative.template").clone();

                                                            // Remove Template Class
                                                            template.removeClass("template");

                                                            // Edit Form IDs

                                                            // Tristan, help! x_x

                                                            // Append Clone to the Wrapper
                                                            wrapper.append(template);

                                                            // Reactivate Required Fields
                                                            requiredFields();

                                                            // Reactivate Labels
                                                            labelHandlers();

                                                            // Reactivate Nested Relatives
                                                            loadProfileRelativeDeletion();
                                        }

                                        // Load Function
                                        function loadProfileRelatives() {

                                                            // Click Trigger
                                                            $(".profile-relative__add-trigger").off("click");

                                                            $(".profile-relative__add-trigger").on("click", function (e) {

                                                                                // Prevent Default Functions
                                                                                e.preventDefault();

                                                                                // Add Profile Relative
                                                                                addProfileRelative(this);
                                                            });

                                                            // Enter Key Trigger
                                                            $(".profile-relative__add-trigger").off("keyup");

                                                            $(".profile-relative__add-trigger").on("keyup", function (e) {

                                                                                if (e.which == 13) {

                                                                                                    // Prevent Default Functions
                                                                                                    e.preventDefault();

                                                                                                    // Add Profile Relative
                                                                                                    addProfileRelative(this);
                                                                                }
                                                            });
                                        }

                                        loadProfileRelatives();

                                        // Remove Profile Relative
                                        function deleteProfileRelative(trigger) {

                                                            $(trigger).parents(".profile-relative").remove();
                                        }

                                        // Load Function
                                        function loadProfileRelativeDeletion() {

                                                            // Click Trigger
                                                            $(".profile-relative__remove-trigger").on("click", function (e) {

                                                                                // Prevent Default Functions
                                                                                e.preventDefault();

                                                                                // Delete Profile Relative
                                                                                deleteProfileRelative(this);
                                                            });

                                                            // Enter Key Trigger
                                                            $(".profile-relative__remove-trigger").on("keyup", function (e) {

                                                                                if (e.which == 13) {

                                                                                                    // Prevent Default Functions
                                                                                                    e.preventDefault();

                                                                                                    // Delete Profile Relative
                                                                                                    deleteProfileRelative(this);
                                                                                }
                                                            });
                                        }

                                        loadProfileRelativeDeletion();

                                        // Experience Handlers =================================================

                                        // Degrees

                                        function addDegree(trigger) {

                                                            // Get Wrapper
                                                            var wrapper = $(".application-post__experience-wrapper");

                                                            // Get Template
                                                            var template = $(".application-post__accordion--degree.template").clone();

                                                            // Get New ID
                                                            var newID = parseInt(wrapper.find("[class*='application-post__accordion--']").last().attr("data-experience-id")) + 1;

                                                            // Remove Template Class
                                                            template.removeClass("template");

                                                            // Assign the New ID
                                                            template.attr("data-experience-id", newID);

                                                            // Edit Form IDs

                                                            // Degree Type
                                                            template.find("[data-form-id*='experience-degree']").find("label").attr("for", "degree" + newID);
                                                            template.find("[data-form-id*='experience-degree']").find("select").attr("id", "degree" + newID);

                                                            // Area of Study
                                                            template.find("[data-form-id*='experience-aos']").find("label").attr("for", "areaOfStudy" + newID);
                                                            template.find("[data-form-id*='experience-aos']").find("input").attr("id", "areaOfStudy" + newID);

                                                            // Institution
                                                            template.find("[data-form-id*='experience-institution']").find("label").attr("for", "institution" + newID);
                                                            template.find("[data-form-id*='experience-institution']").find("input").attr("id", "institution" + newID);

                                                            // Start Date
                                                            template.find("[data-form-id*='experience-start-date']").find("label").attr("for", "startDate" + newID);
                                                            template.find("[data-form-id*='experience-start-date']").find("input").attr("id", "startDate" + newID);

                                                            // End Date
                                                            template.find("[data-form-id*='experience-end-date']").find("label").attr("for", "endDate" + newID);
                                                            template.find("[data-form-id*='experience-end-date']").find("input").attr("id", "endDate" + newID);

                                                            // Append Clone to the Wrapper
                                                            wrapper.append(template);

                                                            requiredFields();
                                                            labelHandlers();
                                        }

                                        $("#addDegreeButton").on("click", function (e) {

                                                            e.preventDefault();

                                                            addDegree(this);
                                        });

                                        $("#addDegreeButton").on("keyup", function (e) {

                                                            if (e.which == 13) {
                                                                                e.preventDefault();
                                                                                addDegree(this);
                                                            }
                                        });

                                        // Courses

                                        function addCourse(trigger) {

                                                            // Get Wrapper
                                                            var wrapper = $(".application-post__experience-wrapper");

                                                            // Get Template
                                                            var template = $(".application-post__accordion--course.template").clone();

                                                            // Get New ID
                                                            var newID = parseInt(wrapper.find("[class*='application-post__accordion--']").last().attr("data-experience-id")) + 1;

                                                            // Remove Template Class
                                                            template.removeClass("template");

                                                            // Assign the New ID
                                                            template.attr("data-experience-id", newID);

                                                            // Edit Form IDs

                                                            // Course Name
                                                            template.find("[data-form-id*='experience-course-name']").find("label").attr("for", "courseName" + newID);
                                                            template.find("[data-form-id*='experience-course-name']").find("input").attr("id", "courseName" + newID);

                                                            // Institution
                                                            template.find("[data-form-id*='experience-institution']").find("label").attr("for", "institution" + newID);
                                                            template.find("[data-form-id*='experience-institution']").find("input").attr("id", "institution" + newID);

                                                            // Start Date
                                                            template.find("[data-form-id*='experience-start-date']").find("label").attr("for", "startDate" + newID);
                                                            template.find("[data-form-id*='experience-start-date']").find("input").attr("id", "startDate" + newID);

                                                            // End Date
                                                            template.find("[data-form-id*='experience-end-date']").find("label").attr("for", "endDate" + newID);
                                                            template.find("[data-form-id*='experience-end-date']").find("input").attr("id", "endDate" + newID);

                                                            // Append Clone to the Wrapper
                                                            wrapper.append(template);

                                                            requiredFields();
                                                            labelHandlers();
                                        }

                                        $("#addCourseButton").on("click", function (e) {

                                                            e.preventDefault();

                                                            addCourse(this);
                                        });

                                        $("#addCourseButton").on("keyup", function (e) {

                                                            if (e.which == 13) {
                                                                                e.preventDefault();
                                                                                addCourse(this);
                                                            }
                                        });

                                        // Work

                                        function addWork(trigger) {

                                                            // Get Wrapper
                                                            var wrapper = $(".application-post__experience-wrapper");

                                                            // Get Template
                                                            var template = $(".application-post__accordion--work.template").clone();

                                                            // Get New ID
                                                            var newID = parseInt(wrapper.find("[class*='application-post__accordion--']").last().attr("data-experience-id")) + 1;

                                                            // Remove Template Class
                                                            template.removeClass("template");

                                                            // Assign the New ID
                                                            template.attr("data-experience-id", newID);

                                                            // Edit Form IDs

                                                            // Role
                                                            template.find("[data-form-id*='experience-course-name']").find("label").attr("for", "role" + newID);
                                                            template.find("[data-form-id*='experience-course-name']").find("input").attr("id", "role" + newID);

                                                            // Group / Company
                                                            template.find("[data-form-id*='experience-institution']").find("label").attr("for", "group" + newID);
                                                            template.find("[data-form-id*='experience-institution']").find("input").attr("id", "group" + newID);

                                                            // Description
                                                            template.find("[data-form-id*='experience-description']").find("label").attr("for", "description" + newID);
                                                            template.find("[data-form-id*='experience-description']").find("input").attr("id", "description" + newID);

                                                            // Start Date
                                                            template.find("[data-form-id*='experience-start-date']").find("label").attr("for", "startDate" + newID);
                                                            template.find("[data-form-id*='experience-start-date']").find("input").attr("id", "startDate" + newID);

                                                            // End Date
                                                            template.find("[data-form-id*='experience-end-date']").find("label").attr("for", "endDate" + newID);
                                                            template.find("[data-form-id*='experience-end-date']").find("input").attr("id", "endDate" + newID);

                                                            // Append Clone to the Wrapper
                                                            wrapper.append(template);

                                                            requiredFields();
                                                            labelHandlers();
                                        }

                                        $("#addWorkButton").on("click", function (e) {

                                                            e.preventDefault();

                                                            addWork(this);
                                        });

                                        $("#addWorkButton").on("keyup", function (e) {

                                                            if (e.which == 13) {
                                                                                e.preventDefault();
                                                                                addWork(this);
                                                            }
                                        });

                                        // Create Job Handlers =================================================

                                        // Tasks

                                        function addTask(trigger) {

                                                            // Get Wrapper
                                                            var wrapper = $(".manager-jobs__create-task-wrapper");

                                                            // Get Template
                                                            var template = $(".manager-jobs__create-task.template").clone();

                                                            console.log(wrapper.find(".manager-jobs__create-task"));

                                                            // Get New ID
                                                            if (wrapper.find(".manager-jobs__create-task").length == 0) {
                                                                                var newID = parseInt(template.attr("data-task-id")) + 1;
                                                            } else {
                                                                                var newID = parseInt(wrapper.find("[class*='manager-jobs__create-task']").last().attr("data-task-id")) + 1;
                                                            }

                                                            // Remove Template Class
                                                            template.removeClass("template");

                                                            // Assign the New ID
                                                            template.attr("data-task-id", newID);

                                                            // Add newID as suffix to all "id" and "for" attributes
                                                            template.find("*[id]").each(function () {
                                                                                $(this).attr("id", this.id + newID);
                                                            });
                                                            template.find("*[for]").each(function () {
                                                                                $(this).attr("for", $(this).attr("for") + newID);
                                                            });

                                                            // Replace :id with newID in all form names
                                                            template.find("*[name]").each(function () {
                                                                                $(this).attr('name', $(this).attr("name").replace(":id", newID));
                                                            });

                                                            // Task (English)
                                                            //template.find("[data-form-id*='task-english']").find("label").attr("for", "taskEN" + newID);
                                                            //template.find("[data-form-id*='task-english']").find("input").attr("id", "taskEN" + newID);

                                                            // Task (French)
                                                            //template.find("[data-form-id*='task-french']").find("label").attr("for", "taskFR" + newID);
                                                            //template.find("[data-form-id*='task-french']").find("input").attr("id", "taskFR" + newID);

                                                            // Append Clone to the Wrapper
                                                            wrapper.append(template);

                                                            requiredFields();
                                                            labelHandlers();
                                                            deleteTaskTrigger();
                                        }

                                        $("#addTaskButton").on("click", function (e) {

                                                            e.preventDefault();

                                                            addTask(this);
                                        });

                                        $("#addTaskButton").on("keyup", function (e) {

                                                            if (e.which == 13) {
                                                                                e.preventDefault();
                                                                                addTask(this);
                                                            }
                                        });

                                        // Task Deletion

                                        function deleteTask(trigger) {

                                                            $(trigger).parents(".manager-jobs__create-task").remove();
                                        }

                                        function deleteTaskTrigger() {

                                                            $(".manager-jobs__delete-task-button").on("click", function (e) {

                                                                                e.preventDefault();

                                                                                deleteTask(this);
                                                            });

                                                            $(".manager-jobs__delete-task-button").on("keyup", function (e) {

                                                                                if (e.which == 13) {
                                                                                                    e.preventDefault();
                                                                                                    deleteTask(this);
                                                                                }
                                                            });
                                        }

                                        deleteTaskTrigger();

                                        // Skills

                                        function addSkill(trigger) {

                                                            // Get Parent
                                                            var parent = $(trigger).parents(".manager-jobs__skill-wrapper");

                                                            // Get Wrapper
                                                            var wrapper = parent.find(".manager-jobs__create-skill-wrapper");

                                                            // Get Template
                                                            var template = parent.find(".manager-jobs__create-skill.template").clone();

                                                            console.log(wrapper.find(".manager-jobs__create-skill"));

                                                            // Get New ID
                                                            if (wrapper.find(".manager-jobs__create-skill").length == 0) {
                                                                                var newID = parseInt(template.attr("data-skill-id")) + 1;
                                                            } else {
                                                                                var newID = parseInt(wrapper.find("[class*='manager-jobs__create-skill']").last().attr("data-skill-id")) + 1;
                                                            }

                                                            // Remove Template Class
                                                            template.removeClass("template");

                                                            // Assign the New ID
                                                            template.attr("data-skill-id", newID);

                                                            // Add newID as suffix to all "id" and "for" attributes
                                                            template.find("*[id]").each(function () {
                                                                                $(this).attr("id", this.id + newID);
                                                            });
                                                            template.find("*[for]").each(function () {
                                                                                $(this).attr("for", $(this).attr("for") + newID);
                                                            });

                                                            // Replace :id with newID in all form names
                                                            template.find("*[name]").each(function () {
                                                                                $(this).attr('name', $(this).attr("name").replace(":id", newID));
                                                            });

                                                            // Edit Form IDs
                                                            //
                                                            // // Queestion (English)
                                                            // template.find("[data-form-id*='question-english']").find("label").attr("for", "questionEN" + newID);
                                                            // template.find("[data-form-id*='question-english']").find("input").attr("id", "questionEN" + newID);
                                                            //
                                                            // // Queestion (French)
                                                            // template.find("[data-form-id*='question-french']").find("label").attr("for", "questionFR" + newID);
                                                            // template.find("[data-form-id*='question-french']").find("input").attr("id", "questionFR" + newID);

                                                            // Append Clone to the Wrapper
                                                            wrapper.append(template);

                                                            requiredFields();
                                                            labelHandlers();
                                                            deleteSkillTrigger();
                                        }

                                        $(".manager-jobs__add-skill-button").on("click", function (e) {

                                                            e.preventDefault();

                                                            addSkill(this);
                                        });

                                        $(".manager-jobs__add-skill-button").on("keyup", function (e) {

                                                            if (e.which == 13) {
                                                                                e.preventDefault();
                                                                                addSkill(this);
                                                            }
                                        });

                                        // Skill Deletion

                                        function deleteSkill(trigger) {

                                                            $(trigger).parents(".manager-jobs__create-skill").remove();
                                        }

                                        function deleteSkillTrigger() {

                                                            $(".manager-jobs__delete-skill-button").on("click", function (e) {

                                                                                e.preventDefault();

                                                                                deleteSkill(this);
                                                            });

                                                            $(".manager-jobs__delete-skill-button").on("keyup", function (e) {

                                                                                if (e.which == 13) {
                                                                                                    e.preventDefault();
                                                                                                    deleteSkill(this);
                                                                                }
                                                            });
                                        }

                                        deleteSkillTrigger();

                                        // Questions

                                        function addQuestion(trigger) {

                                                            // Get Wrapper
                                                            var wrapper = $(".manager-jobs__create-question-wrapper");

                                                            // Get Template
                                                            var template = $(".manager-jobs__create-question.template").clone();

                                                            console.log(wrapper.find(".manager-jobs__create-question"));

                                                            // Get New ID
                                                            if (wrapper.find(".manager-jobs__create-question").length == 0) {
                                                                                var newID = parseInt(template.attr("data-question-id")) + 1;
                                                            } else {
                                                                                var newID = parseInt(wrapper.find("[class*='manager-jobs__create-question']").last().attr("data-question-id")) + 1;
                                                            }

                                                            // Remove Template Class
                                                            template.removeClass("template");

                                                            // Assign the New ID
                                                            template.attr("data-question-id", newID);

                                                            // Add newID as suffix to all "id" and "for" attributes
                                                            template.find("*[id]").each(function () {
                                                                                $(this).attr("id", this.id + newID);
                                                            });
                                                            template.find("*[for]").each(function () {
                                                                                $(this).attr("for", $(this).attr("for") + newID);
                                                            });

                                                            // Replace :id with newID in all form names
                                                            template.find("*[name]").each(function () {
                                                                                $(this).attr('name', $(this).attr("name").replace(":id", newID));
                                                            });

                                                            // Edit Form IDs
                                                            //
                                                            // // Queestion (English)
                                                            // template.find("[data-form-id*='question-english']").find("label").attr("for", "questionEN" + newID);
                                                            // template.find("[data-form-id*='question-english']").find("input").attr("id", "questionEN" + newID);
                                                            //
                                                            // // Queestion (French)
                                                            // template.find("[data-form-id*='question-french']").find("label").attr("for", "questionFR" + newID);
                                                            // template.find("[data-form-id*='question-french']").find("input").attr("id", "questionFR" + newID);

                                                            // Append Clone to the Wrapper
                                                            wrapper.append(template);

                                                            requiredFields();
                                                            labelHandlers();
                                                            deleteQuestionTrigger();
                                        }

                                        $("#addQuestionButton").on("click", function (e) {

                                                            e.preventDefault();

                                                            addQuestion(this);
                                        });

                                        $("#addQuestionButton").on("keyup", function (e) {

                                                            if (e.which == 13) {
                                                                                e.preventDefault();
                                                                                addQuestion(this);
                                                            }
                                        });

                                        // Question Deletion

                                        function deleteQuestion(trigger) {

                                                            $(trigger).parents(".manager-jobs__create-question").remove();
                                        }

                                        function deleteQuestionTrigger() {

                                                            $(".manager-jobs__delete-question-button").on("click", function (e) {

                                                                                e.preventDefault();

                                                                                deleteQuestion(this);
                                                            });

                                                            $(".manager-jobs__delete-question-button").on("keyup", function (e) {

                                                                                if (e.which == 13) {
                                                                                                    e.preventDefault();
                                                                                                    deleteQuestion(this);
                                                                                }
                                                            });
                                        }

                                        deleteQuestionTrigger();
                    });
})(jQuery);

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(3);


/***/ })
/******/ ]);