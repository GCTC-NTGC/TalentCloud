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

FormValidationAPI.validateRegisterForm = function(email, email_confirm, password, confirm_password) {
    var valid = true;

    /*FormValidationAPI.setValidationErrorProperties(false, "register_name_error", "register_name_error_msg");
    if(name < 2 || !name) {
        valid = false;
        FormValidationAPI.setValidationErrorProperties(true, "register_name_error", "register_name_error_msg", "Error: Invalid name.");
    }*/

    FormValidationAPI.setValidationErrorProperties(false, "register_email_confirm_error", "register_email_confirm_error_msg");
    if(email !== email_confirm) {
        valid = false;
        FormValidationAPI.setValidationErrorProperties(true, "register_email_confirm_error", "register_email_confirm_error_msg", "Error: Emails do not match.");
    }

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
        //FormValidationAPI.setValidationErrorProperties(true, "register_password_confirm_error", "register_password_confirm_error_msg", "Error: Invalid password.");
        FormValidationAPI.setValidationErrorProperties(true, "register_password_error", "register_password_error_msg", "Error: Password must be at least 6 characters.");
    }

    return valid;
};

FormValidationAPI.validateUpdateProfileBasicInfo = function(twitter, linkedin) {
    var valid = true;
        
    if(FormValidationAPI.fieldNotEmpty(twitter) && !FormValidationAPI.validateTwitterUsername(twitter)) {
        FormValidationAPI.setValidationErrorProperties(true, "profileEditTwitterError", "profileEditTwitterErrorMsg", "Error: Invalid Twitter Username");
        FormValidationAPI.focusIfFirstInvalidField(valid, "profileEditTwitter")
        valid = false;
    } else {
        FormValidationAPI.setValidationErrorProperties(false, "profileEditTwitterError", "profileEditTwitterErrorMsg", "Error: Invalid Twitter Username");
    }


    //TODO: validate linkedin url

    return valid;
};

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

FormValidationAPI.validateJobPoster = function(
    title_en, title_fr, department_id, branch_en, branch_fr, division_en, division_fr, province_id, city_en, city_fr, open_date_time,
    close_date_time, start_date, term_qty, remuneration_range_low, remuneration_range_high, classification, clearance_id, language_id) {
    var valid = true;

    if(!FormValidationAPI.fieldNotEmpty(title_en)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_jobTitle_error", "createJobPoster_jobTitle_error_msg", "Error: No Job Title");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_jobTitle_error", "createJobPoster_jobTitle_error_msg", "Error: No Job Title");
    }

    if(!FormValidationAPI.fieldNotEmpty(title_fr)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_jobTitle_fr_error", "createJobPoster_jobTitle_fr_error_msg", "Error: No Job Title");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_jobTitle_fr_error", "createJobPoster_jobTitle_fr_error_msg", "Error: No Job Title");
    }

    if(!FormValidationAPI.fieldNotEmpty(department_id)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_department_error", "createJobPoster_department_error_msg", "Error: No Department Selected");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_department_error", "createJobPoster_department_error_msg", "Error: No Department Selected");
    }

    if(!FormValidationAPI.fieldNotEmpty(branch_en)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_branch_error", "createJobPoster_branch_error_msg", "Error: No Branch");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_branch_error", "createJobPoster_branch_error_msg", "Error: Branch");
    }

    if(!FormValidationAPI.fieldNotEmpty(branch_fr)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_branch_fr_error", "createJobPoster_branch_fr_error_msg", "Error: No Branch");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_branch_fr_error", "createJobPoster_branch_fr_error_msg", "Error: No Division");
    }

    if(!FormValidationAPI.fieldNotEmpty(division_en)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_division_error", "createJobPoster_division_error_msg", "Error: No Division");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_division_error", "createJobPoster_division_error_msg", "Error: No Division");
    }

    if(!FormValidationAPI.fieldNotEmpty(division_fr)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_division_fr_error", "createJobPoster_division_fr_error_msg", "Error: No Division");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_division_fr_error", "createJobPoster_division_fr_error_msg", "Error: No Division");
    }

    if(!FormValidationAPI.fieldNotEmpty(province_id)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_province_error", "createJobPoster_province_error_msg", "Error: No Province Selected");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_province_error", "createJobPoster_province_error_msg", "Error: No Province Selected");
    }

    if(!FormValidationAPI.fieldNotEmpty(city_en)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_city_error", "createJobPoster_city_error_msg", "Error: No City");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_city_error", "createJobPoster_city_error_msg", "Error: No City");
    }

    /*if(!FormValidationAPI.fieldNotEmpty(city_fr)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_city_fr_error", "createJobPoster_city_fr_error_msg", "Error: No City");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_city_fr_error", "createJobPoster_city_fr_error_msg", "Error: No City");
    }*/

    if(!FormValidationAPI.fieldNotEmpty(open_date_time)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_openDate_error", "createJobPoster_openDate_error_msg", "Error: No Open Date/Time");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_openDate_error", "createJobPoster_openDate_error_msg", "Error: No Open Date/Time");
    }

    if(!FormValidationAPI.fieldNotEmpty(close_date_time)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_closeDate_error", "createJobPoster_closeDate_error_msg", "Error: No Close Date/Time");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_closeDate_error", "createJobPoster_closeDate_error_msg", "Error: No Close Date/Time");
    }

    if(!FormValidationAPI.fieldNotEmpty(start_date)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_startDate_error", "createJobPoster_startDate_error_msg", "Error: No Start Date");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_startDate_error", "createJobPoster_startDate_error_msg", "Error: No Start Date");
    }

    if(!FormValidationAPI.fieldNotEmpty(term_qty)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_termQuantity_error", "createJobPoster_termQuantity_error_msg", "Error: No Term Duration");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_termQuantity_error", "createJobPoster_termQuantity_error_msg", "Error: No Term Duration");
    }

    if(!FormValidationAPI.fieldNotEmpty(remuneration_range_low)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_remunerationLowRange_error", "createJobPoster_remunerationLowRange_error_msg", "Error: No minimum salary");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_remunerationLowRange_error", "createJobPoster_remunerationLowRange_error_msg", "Error: No minimum salary");
    }

    if(!FormValidationAPI.fieldNotEmpty(remuneration_range_high)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_remunerationHighRange_error", "createJobPoster_remunerationHighRange_error_msg", "Error: No maximum salary");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_remunerationHighRange_error", "createJobPoster_remunerationHighRange_error_msg", "Error: No maximum salary");
    }

    if(!FormValidationAPI.fieldNotEmpty(classification)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_classification_error", "createJobPoster_classification_error_msg", "Error: No Classification");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_classification_error", "createJobPoster_classification_error_msg", "Error: No Classification");
    }

    if(!FormValidationAPI.fieldNotEmpty(clearance_id)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_clearance_error", "createJobPoster_clearance_error_msg", "Error: No Security Clearance Selected");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_clearance_error", "createJobPoster_clearance_error_msg", "Error: No Security Clearance Selected");
    }

    if(!FormValidationAPI.fieldNotEmpty(language_id)){
        FormValidationAPI.setValidationErrorProperties(true, "createJobPoster_language_error", "createJobPoster_language_error_msg", "Error: No Language Selected");
        valid = false;
    }
    else{
        FormValidationAPI.setValidationErrorProperties(false, "createJobPoster_language_error", "createJobPoster_language_error_msg", "Error: No Language Selected");
    }

    return valid;
}

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
