/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var FormValidationAPI = {};

/**
 * 
 * @param {string} emailToValidate
 * @returns {Boolean}
 */
FormValidationAPI.validateEmail = function(emailToValidate){
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(emailToValidate);
};

/**
 * 
 * @param {string} password1
 * @param {string} password2
 * @returns {Boolean}
 */
FormValidationAPI.passwordMatch = function(password1, password2){
    return password1 === password2;
};

FormValidationAPI.validateLoginForm = function(email, password) {
    var credentials = {};
    var valid = true;
    
    FormValidationAPI.setValidationErrorProperties(false, "login_email_error", "login_email_error_msg");
    
    //console.log(FormValidationAPI.validateEmail(email));
    if(FormValidationAPI.fieldNotEmpty(email)){
        if(!FormValidationAPI.validateEmail(email)) {
            valid = false;
            FormValidationAPI.setValidationErrorProperties(true, "login_email_error", "login_email_error_msg", "Error: Invalid email address.");
        }
    }else{
        FormValidationAPI.setValidationErrorProperties(true, "login_email_error", "login_email_error_msg", "Error: Please enter your mail address.");
    }
    
    FormValidationAPI.setValidationErrorProperties(false, "login_password_error", "login_password_error_msg");
    if(!FormValidationAPI.fieldNotEmpty(password)){
        valid = false;
        FormValidationAPI.setValidationErrorProperties(true, "login_password_error", "login_password_error_msg", "Error: Please enter your password.");
    }
    
    if(valid) {
        credentials.email = encodeURIComponent(email);
        credentials.password = encodeURIComponent(password);
        return credentials;
    }
};

FormValidationAPI.validateRegisterForm = function(email, password, confirm_password) {
    var valid = true;
    
    /*FormValidationAPI.setValidationErrorProperties(false, "register_name_error", "register_name_error_msg");
    if(name < 2 || !name) {
        valid = false;
        FormValidationAPI.setValidationErrorProperties(true, "register_name_error", "register_name_error_msg", "Error: Invalid name.");
    }*/

    FormValidationAPI.setValidationErrorProperties(false, "register_email_error", "register_email_error_msg");
    if((FormValidationAPI.validateEmail(email)).length === 0 || !FormValidationAPI.validateEmail(email)) {
        valid = false;
        FormValidationAPI.setValidationErrorProperties(true, "register_email_error", "register_email_error_msg", "Error: Invalid email.");
    }
    
    FormValidationAPI.setValidationErrorProperties(false, "register_password_confirm_error", "register_password_confirm_error_msg");
    if(!FormValidationAPI.passwordMatch(password, confirm_password)) {
        valid = false;
        FormValidationAPI.setValidationErrorProperties(true, "register_password_confirm_error", "register_password_confirm_error_msg", "Error: Passwords do not match.");
    }

    FormValidationAPI.setValidationErrorProperties(false, "register_password_error", "register_password_error_msg");
    if(password.length < 6 || !password) {
        valid = false;
        FormValidationAPI.setValidationErrorProperties(true, "register_password_confirm_error", "register_password_confirm_error_msg", "Error: Invalid password.");
        FormValidationAPI.setValidationErrorProperties(true, "register_password_error", "register_password_error_msg", "Error: Invalid password.");
    }
    
    return valid;
};

FormValidationAPI.validateUpdateProfileBasicInfo = function(firstName, lastName, twitter, linkedin) {
    var valid = true;
    
    if(!FormValidationAPI.fieldNotEmpty(firstName)) {
        FormValidationAPI.setValidationErrorProperties(true, "profileEditFirstNameError", "profileEditFirstNameErrorMsg", "Error: No First Name");
        FormValidationAPI.focusIfFirstInvalidField(valid, "profileEditFirstName")
        valid = false;
    } else {
        FormValidationAPI.setValidationErrorProperties(false, "profileEditFirstNameError", "profileEditFirstNameErrorMsg", "Error: No First Name");
    }
    
    if(!FormValidationAPI.fieldNotEmpty(lastName)) {
        FormValidationAPI.setValidationErrorProperties(true, "profileEditLastNameError", "profileEditLastNameErrorMsg", "Error: No Last Name");
        FormValidationAPI.focusIfFirstInvalidField(valid, "profileEditLastName")
        valid = false;
    } else {
        FormValidationAPI.setValidationErrorProperties(false, "profileEditLastNameError", "profileEditLastNameErrorMsg", "Error: No Last Name");
    }
    
    /*
    if(!FormValidationAPI.fieldNotEmpty(tagline)) {
        FormValidationAPI.setValidationErrorProperties(true, "profileEditTaglineError", "profileEditTaglineErrorMsg", "Error: No Tagline");
        FormValidationAPI.focusIfFirstInvalidField(valid, "profileEditTagline")
        valid = false;
    } else {
        FormValidationAPI.setValidationErrorProperties(false, "profileEditTaglineError", "profileEditTaglineErrorMsg", "Error: No Tagline");
    }
    */
    
    //TODO: validate linkedin url
    
    return valid;
}

FormValidationAPI.validateTwitterUsername = function(twitterUsername) {
    var regex = /^@[0-9a-zA-Z_]+$/;
    return regex.test(twitterUsername);
};

FormValidationAPI.focusIfFirstInvalidField = function(isFirstInvalidField, fieldId) {
    if (isFirstInvalidField) {
        document.getElementById(fieldId).focus();
    }
};

FormValidationAPI.validateUpdateProfileStep1 = function(name, link, accomplishment, accomplishment_fr) {
    var valid = true;
    if(!FormValidationAPI.fieldNotEmpty(name)){
        FormValidationAPI.setValidationErrorProperties(true, "createEditProfile_name_error", "createEditProfile_name_error_msg", "Error: No Name");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createEditProfile_name_error", "createEditProfile_name_error_msg", "Error: No Name");
    }
    
    if(!FormValidationAPI.fieldNotEmpty(link)){
        FormValidationAPI.setValidationErrorProperties(true, "createEditProfile_link_error", "createEditProfile_link_error_msg", "Error: Need valid link");
        valid = false;
    }else{
        FormValidationAPI.setValidationErrorProperties(false, "createEditProfile_link_error", "createEditProfile_link_error_msg", "Error: Need valid link");
    }
    
    if(!FormValidationAPI.fieldNotEmpty(accomplishment)){
        FormValidationAPI.setValidationErrorProperties(true, "createEditProfile_accomplishment_error", "createEditProfile_accomplishment_error_msg", "Error: Need accomplishment");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createEditProfile_accomplishment_error", "createEditProfile_accomplishment_error_msg", "Error: Need accomplishment");
    }
    
    if(!FormValidationAPI.fieldNotEmpty(accomplishment_fr)){
        FormValidationAPI.setValidationErrorProperties(true, "createEditProfile_accomplishment_fr_error", "createEditProfile_accomplishment_fr_error_msg", "Error: Need accomplishment_fr");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createEditProfile_accomplishment_fr_error", "createEditProfile_accomplishment_fr_error_msg", "Error: Need accomplishment_fr");
    }
    
    return valid;
};

FormValidationAPI.validateUpdateProfileStep1 = function(b_exp, w_exp, sup, b_exp_fr, w_exp_fr, sup_fr) {
    var valid = true;
    if(!FormValidationAPI.fieldNotEmpty(b_exp) && !FormValidationAPI.fieldNotEmpty(b_exp_fr)){
        FormValidationAPI.setValidationErrorProperties(true, "createEditProfile_best_work_exp_error", "createEditProfile_best_work_exp_error_msg", "Error: No work exp");
        valid = false;
    }
    else {
        FormValidationAPI.setValidationErrorProperties(false, "createEditProfile_best_work_exp_error", "createEditProfile_best_work_exp_error_msg", "Error: No work exp");
    }
};

FormValidationAPI.validateNewJobPosterForm = function(name, closeDate, id, department) {
    var valid = true;
    
    FormValidationAPI.setValidationErrorProperties(false, "newJobPoster_title_error", "newJobPoster_title_error_msg");
    if(name === ''){
        valid = false;
        FormValidationAPI.setValidationErrorProperties(true, "newJobPoster_title_error", "newJobPoster_title_error_msg", "Error: Invalid job title");
    }
    
    //Check closeDate
    
    //if(id is not equal to the session manager's value of id)  valid = false
    
    //Validate that the department matches session information
    
    return valid;
};

FormValidationAPI.setValidationErrorProperties = function(isVisible, errorId, msgId, msg) {
    var errorElement = document.getElementById(errorId);
    var msgElement = document.getElementById(msgId);
    if(isVisible) {
        errorElement.classList.remove("hidden");
    } else {
        errorElement.classList.add("hidden");
    }
    msgElement.textContent = msg;
};

FormValidationAPI.fieldNotEmpty = function(fieldValue){
    return fieldValue.length > 0 ? true : false;
};
