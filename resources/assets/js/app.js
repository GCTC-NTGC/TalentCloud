// =============================================================================

// Utilities JavaScript (jQuery)

// =============================================================================

(function($) {

    // Add isValid()

    $.fn.isValid = function(){
        return this[0].checkValidity()
    }

    // Root

    var $root = $('html, body');

    // Add has attribute Function
    $.fn.hasAttr = function(name) {
        var attr = $(this).attr(name);
        // For some browsers, `attr` is undefined; for others,
        // `attr` is false.  Check for both.
        return (typeof attr !== typeof undefined && attr !== false);

    };

    // User Agent Data Attributes ==============================================

    var ua = navigator.userAgent;
    ua = ua.toString();
    $('body').attr('id', ua);

    $(document).ready(function() {

        // Accordion Handlers ==================================================

        function accordionTrigger(trigger) {
            if ($(trigger).parent(".accordion").hasClass("active")) {
                $(trigger).attr("aria-expanded", "false");
                $(trigger).parent(".accordion").removeClass("active");
                $(trigger).parent(".accordion").find(".accordion-content").attr("aria-hidden", "true");
            }
            else {
                $(trigger).attr("aria-expanded", "true");
                $(trigger).parent(".accordion").addClass("active");
                $(trigger).parent(".accordion").find(".accordion-content").attr("aria-hidden", "false");
            }
        }

        $(document).on("click", ".accordion-trigger", function(e){

            accordionTrigger(this);

        });

        $(document).on("keyup", ".accordion-trigger", function(e){

            if(e.which == 13) {
                accordionTrigger(this);
            }

        });

        // Modal Handlers ======================================================

        function openModal(trigger) {

            var modalID = $(trigger).attr("data-modal-id");
            var modal = $(".modal[data-modal-id="+modalID+"]");
            var modalObject = $(trigger).parents(".modal-target-object");
            $(".modal-overlay").addClass("active");
            modal.addClass("active");
            $("body").css("overflow", "hidden");

            // Tab Items

            var focusableItems = modal.find(":focusable");

            var firstInput = focusableItems.first();
            var lastInput = focusableItems.last();

            if (modal.find("form").length == 0) {
                lastInput.focus();
            }
            else {
                firstInput.focus();
            }

            modalTabHandler(firstInput, lastInput);
            modalDeleteTrigger(trigger, modal, modalObject);
            escapeModalHandler();

        }

        $(document).on("click", ".modal-trigger", function(e){

            openModal(this);

        });

        $(document).on("keyup", ".modal-trigger", function(e){

            if(e.which == 13) {
                openModal(this);
            }

        });


        function closeModal(trigger) {

            $(".modal-overlay").removeClass("active");
            $(".modal").removeClass("active");
            $("body").css("overflow", "visible");

        }

        $(document).on("click", ".modal-cancel-trigger", function(e){

            closeModal(this);

        });

        $(document).on("keyup", ".modal-cancel-trigger", function(e){

            if(e.which == 13) {
                closeModal(this);
            }

        });

        // Delete Trigger ==================================================

        function modalDeleteTrigger(trigger, modal, object) {

            // .one() unbinds the event handler once it triggers
            // This is important because this modal is reused to delete
            //  different items.
            $(".modal-delete-trigger").one("click", function(e){

                //TODO: when items are saved with ajax too, the check
                // will become more complicated than checking for a
                // delete url

                //If object has been saved to server, make an ajax delete
                // call to the item url, and only close the modal when it
                // succeeds
                if ( $(object).attr('data-item-saved') ) {
                    var itemId = $(object).attr('data-item-id');
                    var deleteUrl = [$(object).attr('data-item-url'), itemId].join('/');
                    $(modal).addClass('working');

                    axios.delete(deleteUrl)
                    .then(function(response) {
                        closeModal(trigger);
                        $(object).remove();
                        $(modal).removeClass('working');
                    }).catch(function(error) {
                        $(modal).removeClass('working');
                    });
                    //TODO: catch and present errors

                } else {
                    //If item isn't saved on server yet, simply delete the
                    // object and close the modal.

                    closeModal(trigger);
                    $(object).remove();
                }
            });

        }

        // Tab Handler =====================================================

        function modalTabHandler(first, last) {

            $(document).on("keydown", function(e){

                var keyCode = e.keyCode || e.which;

                if (keyCode == 9 && !e.shiftKey) {

                    if ($(last).is(":focus")) {
                        e.preventDefault();
                        $(first).focus();
                    }

                }
                else if (keyCode == 9 && e.shiftKey) {

                    if($(first).is(":focus")) {
                        e.preventDefault();
                        $(last).focus();
                    }

                }

            });

        }

        // Escape Handler ==================================================

        function escapeModalHandler() {

            $(document).on("keyup", function(e){

                if((e.key==='Escape'||e.key==='Esc'||e.keyCode===27)){

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
            $("input:required, textarea:required").each(function(e) {
                $(this).parent().addClass("required");
                $(this).parent().find("label").append("<span class='form__required'><i class='fa fa-asterisk' aria-label='Asterisk'></i></span>");
            });
        }

        requiredFields();

        // Label Handers ===================================================

        function labelHandlers() {

            $("[class*='form__input-wrapper'] input, [class*='form__input-wrapper'] textarea").focusin(function(e) {
                $(this).parent().addClass("active");
            });

            $("[class*='form__input-wrapper'] input, [class*='form__input-wrapper'] textarea").focusout(function(e) {

                // Check for existing value.

                if ($(this).val() == "") {
                    $(this).parent().removeClass("active");
                }

                // Check Validity

                if ($(this).isValid() == true) {

                    if ($(this).val() == "" || $(this).attr("type") == "password") {
                        $(this).parent().removeClass("valid");
                        $(this).parent().removeClass("invalid");
                    }
                    else {
                        $(this).parent().addClass("valid");
                        $(this).parent().removeClass("invalid");
                    }

                }
                else {

                    if ($(this).attr("type") == "password") {
                        return false;
                    }
                    else {
                        $(this).parent().addClass("invalid");
                        $(this).parent().removeClass("valid");
                    }

                }

            });

        }

        labelHandlers();

        // AJAX Form Handlers ==========================================

        //Return an onSave function specific to this ajax object
        function ajaxOnSave(object) {
            return function onSave(response) {
                setItemSaved(object, response);
                clearFormErrors(object);
                $(object).find('button[type=submit]').removeClass('working');
                $(object).find('.accordion-trigger').focus();
            };
        }

        //Return an onError function specific to this ajax object
        function ajaxOnError(object) {
            return function onError(error) {
                showFormErrors(object, error.response);
                $(object).find('button[type=submit]').removeClass('working');
                $(object).addClass('active'); //Ensure errors are displayed
                $(object).find('.accordion-trigger').focus();
            };
        }

        // Submits the object's form, and returns the request Promise
        function submitItem(object) {
            const form = $(object).find('form').first();
            const formData = $(form).serialize();

            //Add working class to submit button
            $(object).find('button[type=submit]').addClass('working');

            var requestPromise;
            //If object already exists on server, update it
            if ( $(object).attr('data-item-saved') ) {
                var itemId = $(object).attr('data-item-id');
                var itemUrl = [$(object).attr('data-item-url'), itemId].join('/');
                requestPromise = axios.put(itemUrl, formData);
            } else {
                //If item isn't saved on server yet, create it
                var resourceUrl = $(object).attr('data-item-url');
                requestPromise = axios.post(resourceUrl, formData);
            }

            return requestPromise;
        }

        function submitAllForms(event) {
            //Add working class to triggering button
            const button = $(event.currentTarget);
            button.addClass('working');

            const forms = $(".ajax-form.edited");
            const requests = $.map(forms, function(object) {
                const request = submitItem(object);
                request.then(ajaxOnSave(object)).catch(ajaxOnError(object));
                return request;
            });

            //Define processing for when all requests have returned
            axios.all(requests).then(function(responses) {
                //If nothing went wrong, continue
                if (button.hasAttr('data-on-success-url')) {
                    window.location = button.attr('data-on-success-url');
                }
                button.removeClass('working');
            }).catch(function(error) {
                //If something went wrong, do nothing (individual errors processed seperately)
                button.removeClass('working');
            });
        }

        // all .ajax-submit-all elements should trigger submitAllForms()
        $(".ajax-submit-all").on("click", function(e) {
            e.preventDefault();
            submitAllForms(e)
        });

        function addSubmitTrigger(object) {

            var form = $(object).find('form').first();

            $(form).on("submit", function(event){
                event.preventDefault();
                submitItem(object)
                .then(ajaxOnSave(object))
                .catch(ajaxOnError(object));
            });
        }

        //Update ajax-form to reflect that it has been edited since being saved.
        function setItemEdited(object) {
            $(object).removeClass('complete');
            $(object).addClass('edited');
        }

        //Add setItemEdited handlers to all ajax forms
        $(".ajax-form").each(function(){
            const object = $(this);
            object.find(":input").change(function() {
                setItemEdited(object);
                //Set data on input element to reflect it has been edited
                $(this).data("edited", true);
            });
        });

        //Set object attributes to reflect that it has been saved on server
        function setItemSaved(object, response) {
            var id = response.data.id;

            // Run model specific ui updates
            // Do this before updating data-item-saved attr, so that
            //  functions can can if they're already saved
            if ($(object).hasClass('skill')) {
                setSkillSaved(object, response);
            }

            $(object).removeClass('edited');
            $(object).addClass('complete');
            $(object).find(":input").data("edited", false);

            var itemUrl = [$(object).attr('data-item-url'), id].join('/');

            $(object).attr('data-item-saved', 'true');
            $(object).attr('data-item-id', id);

            var form = $(object).find('form').first();
            $(form).attr('action', itemUrl);
            $(form).find('input[name=_method]').attr('value', 'PUT');

            $(object).find('.remove-on-save').remove();
            $(object).find('.reveal-on-save').removeClass('hidden');

            //$(object).removeClass('active');
        }

        //Update ui for Skill object to reflect that it has been setItem
        function setSkillSaved(object, response) {
            console.log(response);
            $(object).find('.accordion-title').text(response.data.skill.skill);
            $(object).find('.skill__description').text(response.data.skill.description);
            $(object).find('.skill__status--level').text(response.data.skill_status.status);
        }

        function clearFormErrors(object) {
            $(object).find(".form-error").empty();
        }

        function showFormErrors(object, response) {
            clearFormErrors(object);

            //TODO: is this correct way of checking if empty?
            if (response.data.errors) {
                var list = document.createElement("ul");
                $.each(response.data.errors, function(key, value) {
                    //key is the name of the field associated with the error
                    //value is a list of error messages associated with a single field
                    $.each(value, function(i, errorMsg) {
                        list.append(makeErrorElement(errorMsg));
                    });
                });
                var div = document.createElement("div");
                $(div).addClass("site-error").append(list);
                $(object).find(".form-error").append(div);
            }
        }

        // Return an <li> html element displaying the errorMsg
        function makeErrorElement(errorMsg) {
            var inner = document.createElement("strong");
            $(inner).text(errorMsg);

            var block = document.createElement("span");
            $(block).addClass("help-block").append(inner);

            var li = document.createElement("li");
            $(li).append(block);

            return li;
        }

        function noUnsavedDataOnPage() {
            return $('.ajax-form.edited').length === 0;
        }

        // Confirmable link handlers
        function confirmLinkIfUnsavedData(event) {
            if (noUnsavedDataOnPage()) {
                return;
            }

            event.preventDefault();
            const anchor = $(event.currentTarget);
            const link = anchor.attr('href');
            var message = "";

            if (anchor.hasAttr('data-confirm-message')) {
                message = anchor.attr('data-confirm-message');
            } else {
                message = "Are you sure you want to continue?";
            }

            if (window.confirm(message)) {
                window.location = link;
            }
        }
        $('a.confirm-unsaved-data').click(confirmLinkIfUnsavedData);

        // Individualizing repeater name and id attributes======================

        //Individualize template attributes
        function appendToAttributes(parent, attribute, suffix, conditions = null) {
            var selector = "*[" + attribute + "]";

            //If conditions is set, only modify attributes that also
            //satisfy that selector
            if (conditions) {
                selector = conditions + selector;
            }

            parent.find(selector).each(function() {
                $(this).attr(attribute, $(this).attr(attribute) + suffix);
            });
        }

        //Individualize template attributes
        function replaceInAttributes(parent, attribute, oldString, newString, conditions = null) {
            var selector = "*[" + attribute + "]";

            //If conditions is set, only modify attributes that also
            //satisfy that selector
            if (conditions) {
                selector = conditions + selector;
            }

            parent.find(selector).each(function() {
                //replaces only the first instance of a match in a string
                $(this).attr(attribute, $(this).attr(attribute).replace(oldString, newString));
            });
        }

        //Return the next unused idAttr value
        function getNextItemId(parent, idAttr = "data-item-id") {
            var maxId = 0;
            parent.find("*[" + idAttr + "]").each(function() {
                var id = parseInt( $(this).attr(idAttr) );
                if (id > maxId) {
                    maxId = id;
                }
            });
            return maxId + 1;
        }

        //The all in one function to set proper ids and form names
        function individualizeFormIdsAndNames(template, wrapper) {
            // Get New ID
            var newId = getNextItemId(wrapper);

            //Set date-item-id, used to track which newId's are taken
            template.attr('data-item-id', newId);

            //Differentiate real forms from templates

            // filter, if we only want to affect certain results
            var filter = '';

            replaceInAttributes(template, 'id', ':template', 'new', filter);
            replaceInAttributes(template, 'for', ':template', 'new', filter);
            replaceInAttributes(template, 'name', ':template', 'new', filter);
            replaceInAttributes(template, 'submit', ':template', 'new', filter);
            replaceInAttributes(template, 'value', ':template', 'new', filter+'[name=submit]');

            replaceInAttributes(template, 'id', ':id', newId, filter);
            replaceInAttributes(template, 'for', ':id', newId, filter);
            replaceInAttributes(template, 'name', ':id', newId, filter);
            replaceInAttributes(template, 'submit', ':id', newId, filter);
            replaceInAttributes(template, 'value', ':id', newId, filter+'[name=submit]');
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

            //Set ids and form names to be unique
            individualizeFormIdsAndNames(template, wrapper);

            // Prepend Clone to the Wrapper
            wrapper.prepend(template);

            // Reactivate Required Fields
            requiredFields();

            // Reactivate Labels
            labelHandlers();

            // Reactivate Nested Relatives
            loadProfileRelatives();

            // Set save trigger on ajax forms
            if (template.hasClass('ajax-form')) {
                addSubmitTrigger(template);
            }

        }

        // Click Trigger
        $(".profile-list__add-element-trigger").on("click", function(e) {

            // Prevent Default Functions
            e.preventDefault();

            // Add Profile Elements
            addProfileElement(this);

        });

        // Enter Key Trigger
        $(".profile-list__add-element-trigger").on("keyup", function(e) {

            if(e.which == 13) {

                // Prevent Default Functions
                e.preventDefault();

                // Add Profile Elements
                addProfileElement(this);

            }

        });

        // add submit listener to ajax forms
        $(".ajax-form").each(function(index, element) {
            addSubmitTrigger(element);
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

            //Set ids and form names to be unique
            individualizeFormIdsAndNames(template, wrapper);

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

            $(".profile-relative__add-trigger").on("click", function(e) {

                // Prevent Default Functions
                e.preventDefault();

                // Add Profile Relative
                addProfileRelative(this);

            });

            // Enter Key Trigger
            $(".profile-relative__add-trigger").off("keyup");

            $(".profile-relative__add-trigger").on("keyup", function(e) {

                if(e.which == 13) {

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
            $(".profile-relative__remove-trigger").on("click", function(e) {

                // Prevent Default Functions
                e.preventDefault();

                // Delete Profile Relative
                deleteProfileRelative(this);

            });

            // Enter Key Trigger
            $(".profile-relative__remove-trigger").on("keyup", function(e) {

                if(e.which == 13) {

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

            // Remove Template Class
            template.removeClass("template");

            //Set ids and form names to be unique
            individualizeFormIdsAndNames(template, wrapper);

            // Append Clone to the Wrapper
            wrapper.append(template);

            requiredFields();
            labelHandlers();

        }

        $("#addDegreeButton").on("click", function(e) {

            e.preventDefault();

            addDegree(this);

        });

        $("#addDegreeButton").on("keyup", function(e) {

            if(e.which == 13) {
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

            // Remove Template Class
            template.removeClass("template");

            //Set ids and form names to be unique
            individualizeFormIdsAndNames(template, wrapper);

            // Append Clone to the Wrapper
            wrapper.append(template);

            requiredFields();
            labelHandlers();

        }

        $("#addCourseButton").on("click", function(e) {

            e.preventDefault();

            addCourse(this);

        });

        $("#addCourseButton").on("keyup", function(e) {

            if(e.which == 13) {
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

            // Remove Template Class
            template.removeClass("template");

            //Set ids and form names to be unique
            individualizeFormIdsAndNames(template, wrapper);

            // Append Clone to the Wrapper
            wrapper.append(template);

            requiredFields();
            labelHandlers();

        }

        $("#addWorkButton").on("click", function(e) {

            e.preventDefault();

            addWork(this);

        });

        $("#addWorkButton").on("keyup", function(e) {

            if(e.which == 13) {
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
            }
            else {
                var newID = parseInt(wrapper.find("[class*='manager-jobs__create-task']").last().attr("data-task-id")) + 1;
            }

            // Remove Template Class
            template.removeClass("template");

            //TODO: replace with call to individualizeFormIdsAndNames(template, wrapper);
            //TODO: This requires changes to JobController@create, because the id would change places

            // Assign the New ID
            template.attr("data-task-id", newID);

            // Add newID as suffix to all "id" and "for" attributes
            template.find("*[id]").each(function() { $(this).attr("id", this.id + newID)});
            template.find("*[for]").each(function() { $(this).attr("for",  $(this).attr("for") + newID)});

            // Replace :id with newID in all form names
            template.find("*[name]").each(function() { $(this).attr('name', $(this).attr("name").replace(":id", newID))});

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

        $("#addTaskButton").on("click", function(e) {

            e.preventDefault();

            addTask(this);

        });

        $("#addTaskButton").on("keyup", function(e) {

            if(e.which == 13) {
                e.preventDefault();
                addTask(this);
            }

        });

        // Task Deletion

        function deleteTask(trigger) {

            $(trigger).parents(".manager-jobs__create-task").remove();

        }

        function deleteTaskTrigger() {

            $(".manager-jobs__delete-task-button").on("click", function(e) {

                e.preventDefault();

                deleteTask(this);

            });

            $(".manager-jobs__delete-task-button").on("keyup", function(e) {

                if(e.which == 13) {
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

            // Remove Template Class
            template.removeClass("template");

            //Set ids and form names to be unique
            individualizeFormIdsAndNames(template, wrapper);

            // Append Clone to the Wrapper
            wrapper.append(template);

            requiredFields();
            labelHandlers();
            deleteSkillTrigger();

        }

        $(".manager-jobs__add-skill-button").on("click", function(e) {

            e.preventDefault();

            addSkill(this);

        });

        $(".manager-jobs__add-skill-button").on("keyup", function(e) {

            if(e.which == 13) {
                e.preventDefault();
                addSkill(this);
            }

        });

        // Skill Deletion

        function deleteSkill(trigger) {

            $(trigger).parents(".manager-jobs__create-skill").remove();

        }

        function deleteSkillTrigger() {

            $(".manager-jobs__delete-skill-button").on("click", function(e) {

                e.preventDefault();

                deleteSkill(this);

            });

            $(".manager-jobs__delete-skill-button").on("keyup", function(e) {

                if(e.which == 13) {
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
            }
            else {
                var newID = parseInt(wrapper.find("[class*='manager-jobs__create-question']").last().attr("data-question-id")) + 1;
            }

            // Remove Template Class
            template.removeClass("template");

            //TODO: replace with call to individualizeFormIdsAndNames(template, wrapper);
            //TODO: This requires changes to JobController@create, because the id would change places

            // Assign the New ID
            template.attr("data-question-id", newID);

            // Add newID as suffix to all "id" and "for" attributes
            template.find("*[id]").each(function() { $(this).attr("id", this.id + newID)});
            template.find("*[for]").each(function() { $(this).attr("for",  $(this).attr("for") + newID)});

            // Replace :id with newID in all form names
            template.find("*[name]").each(function() { $(this).attr('name', $(this).attr("name").replace(":id", newID))});

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

        $("#addQuestionButton").on("click", function(e) {

            e.preventDefault();

            addQuestion(this);

        });

        $("#addQuestionButton").on("keyup", function(e) {

            if(e.which == 13) {
                e.preventDefault();
                addQuestion(this);
            }

        });

        // Question Deletion

        function deleteQuestion(trigger) {

            $(trigger).parents(".manager-jobs__create-question").remove();

        }

        function deleteQuestionTrigger() {

            $(".manager-jobs__delete-question-button").on("click", function(e) {

                e.preventDefault();

                deleteQuestion(this);

            });

            $(".manager-jobs__delete-question-button").on("keyup", function(e) {

                if(e.which == 13) {
                    e.preventDefault();
                    deleteQuestion(this);
                }

            });

        }

        deleteQuestionTrigger();

    });

})(jQuery);
