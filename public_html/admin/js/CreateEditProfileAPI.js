/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CreateEditProfileAPI = {};

CreateEditProfileAPI.managerProfileObj = {};

CreateEditProfileAPI.ManagerProfile = function(
        user_manager_profile_id, 
        user_manager_profile_department_id,
        user_manager_profile_position,
        user_manager_profile_twitter,
        user_manager_profile_linkedin,
        user_id,
        profile_pic){
    this.user_manager_profile_id = user_manager_profile_id;
    this.user_manager_profile_department_id = user_manager_profile_department_id;
    this.user_manager_profile_position = user_manager_profile_position;
    this.user_manager_profile_twitter = user_manager_profile_twitter;
    this.user_manager_profile_linkedin = user_manager_profile_linkedin;
    this.user_id = user_id,
    this.profile_pic = profile_pic;
};

CreateEditProfileAPI.ManagerProfileDetails = function(
        user_manager_profile_details_id,
        locale_id,
        user_manager_profile_details_aboutme,
        user_manager_profile_details_proud,
        user_manager_profile_details_branch,
        user_manager_profile_details_division,
        user_manager_profile_details_lead_style,
        user_manager_profile_details_emp_learn,
        user_manager_profile_details_expectations,
        user_manager_profile_id,
        user_manager_profile_review_options,
        user_manager_profile_staylate,
        user_manager_profile_engage,
        user_manager_profile_devops,
        user_manager_profile_lvwrequests,
        user_manager_profile_work_experience,
        user_manager_profile_education){
    this.user_manager_profile_details_id = user_manager_profile_details_id;
    this.locale_id = locale_id;
    this.user_manager_profile_details_aboutme = user_manager_profile_details_aboutme;
    this.user_manager_profile_details_proud = user_manager_profile_details_proud;
    this.user_manager_profile_details_branch = user_manager_profile_details_branch;
    this.user_manager_profile_details_division = user_manager_profile_details_division;
    this.user_manager_profile_details_lead_style = user_manager_profile_details_lead_style;
    this.user_manager_profile_details_emp_learn = user_manager_profile_details_emp_learn;
    this.user_manager_profile_details_expectations = user_manager_profile_details_expectations;
    this.user_manager_profile_id = user_manager_profile_id;
    this.user_manager_profile_review_options = user_manager_profile_review_options;
    this.user_manager_profile_staylate = user_manager_profile_staylate;
    this.user_manager_profile_engage = user_manager_profile_engage;
    this.user_manager_profile_devops = user_manager_profile_devops;
    this.user_manager_profile_lvwrequests = user_manager_profile_lvwrequests;
    this.user_manager_profile_work_experience = user_manager_profile_work_experience;
    this.user_manager_profile_education = user_manager_profile_education;
    
};

/**
 * 
 * @param {TalentCloudAPI.Content} siteContent
 * @return {undefined}
 */
CreateEditProfileAPI.localizeCreateEditProfile = function(siteContent) {
    LookupAPI.populateDropdown("department", "createEditProfile_department");
            
    document.getElementById("createEditProfile_branch_label").innerHTML = siteContent.branch;
    document.getElementById("createEditProfile_branch_fr_label").innerHTML = siteContent.branch;
    document.getElementById("createEditProfile_division_label").innerHTML = siteContent.division;
    document.getElementById("createEditProfile_division_fr_label").innerHTML = siteContent.division;
};

CreateEditProfileAPI.selectedUnit = function(newID){
    var option = document.getElementById(newID);
    option.checked = true;
};

//below are the functions for the tabbed layout of the 'create job poster' page for managers
CreateEditProfileAPI.goToStep = function(stepId) {
    var stepGroups = document.getElementsByClassName('stepGroup_createEditProfile');
    //console.log("+   " + stepGroups);
    
    for (var s = 0; s < stepGroups.length; s++) {
        var stepGroup = stepGroups[s];
        //console.log(stepGroup);
        if (!stepGroup.classList.contains('hidden')) {
            stepGroup.classList.add('hidden');
        }
        if (stepGroup.id === stepId) {
            stepGroup.classList.remove('hidden');
        }
    }
};

CreateEditProfileAPI.stepHighlight = function(stepID){
    var s1 = document.getElementById("createJobPosterStep1Label");
    s1.classList.remove("create-job-poster-tab-current");
    var s2 = document.getElementById("createJobPosterStep2Label");
    s2.classList.remove("create-job-poster-tab-current");
    var s3 = document.getElementById("createJobPosterStep3Label");
    s3.classList.remove("create-job-poster-tab-current");
    var s4 = document.getElementById("createJobPosterStep4Label");
    s4.classList.remove("create-job-poster-tab-current");
    
    var current = document.getElementById(stepID);
    current.classList.add("create-job-poster-tab-current");
};

CreateEditProfileAPI.firstLoad = function() {
    DepartmentAPI.filterCreateJobPosterDepartments(true);
    
};

CreateEditProfileAPI.validateStep1 = function() {
    var valid = true;
    
    /*var name = document.getElementById("createEditProfile_name").value;
    CreateEditProfileAPI.managerProfileObj.name = name;
    if(!FormValidationAPI.fieldNotEmpty(name)) valid = false;
    
    var link = document.getElementById("createEditProfile_link").value;
    CreateEditProfileAPI.managerProfileObj.link = link;
    if(!FormValidationAPI.fieldNotEmpty(link)) valid = false;
    
    var accomplishment = document.getElementById("createEditProfile_accomplishment").value;
    CreateEditProfileAPI.managerProfileObj.accomplishment = accomplishment;
    if(!FormValidationAPI.fieldNotEmpty(accomplishment)) valid = false;
    
    var accomplishment_fr = document.getElementById("createEditProfile_accomplishment_fr").value;
    CreateEditProfileAPI.managerProfileObj.accomplishment_fr = accomplishment_fr;
    if(!FormValidationAPI.fieldNotEmpty(accomplishment_fr)) valid = false;
    */
    /*
   
    var createEditProfileForm = document.getElementById("CreateEditProfileForm");
    var name = createEditProfileForm.createEditProfile_name.value;
    var link = createEditProfileForm.createEditProfile_link.value;
    var accomplishment = createEditProfileForm.createEditProfile_accomplishment.value;
    var accomplishment_fr = createEditProfileForm.createEditProfile_accomplishment_fr.value;
    valid = FormValidationAPI.validateUpdateProfileStep1(name, link, accomplishment, accomplishment_fr);
    */
    
    if (valid) {
        CreateEditProfileAPI.goToStep('createEditProfile_step2');
        //CreateJobPosterAPI.stepHighlight("createJobPosterStep1Label");
    }
};

CreateEditProfileAPI.validateStep2 = function() {
    var valid = true;
    /*
    var best_work_exp = document.getElementById("createEditProfile_best_work_exp").value;
    CreateEditProfileAPI.managerProfileObj.best_work_exp = best_work_exp;
    if(!FormValidationAPI.fieldNotEmpty(best_work_exp)) valid = false;
    
    var best_work_exp_fr = document.getElementById("createEditProfile_best_work_exp_fr").value;
    CreateEditProfileAPI.managerProfileObj.best_work_exp_fr = best_work_exp_fr;
    if(!FormValidationAPI.fieldNotEmpty(best_work_exp_fr)) valid = false;
    
    var worst_work_exp = document.getElementById("createEditProfile_worst_work_exp").value;
    CreateEditProfileAPI.managerProfileObj.worst_work_exp = worst_work_exp;
    if(!FormValidationAPI.fieldNotEmpty(worst_work_exp)) valid = false;
    
    var worst_work_exp_fr = document.getElementById("createEditProfile_worst_work_exp_fr").value;
    CreateEditProfileAPI.managerProfileObj.worst_work_exp_fr = worst_work_exp_fr;
    if(!FormValidationAPI.fieldNotEmpty(worst_work_exp_fr)) valid = false;
    
    var superpower = document.getElementById("createEditProfile_superpower").value;
    CreateEditProfileAPI.managerProfileObj.superpower = superpower;
    if(!FormValidationAPI.fieldNotEmpty(superpower)) valid = false;
    
    var superpower_fr = document.getElementById("createEditProfile_superpower_fr").value;
    CreateEditProfileAPI.managerProfileObj.superpower_fr = superpower_fr;
    if(!FormValidationAPI.fieldNotEmpty(superpower_fr)) valid = false;
    
    var createEditProfileForm = document.getElementById("CreateEditProfileForm");
    var b_exp = createEditProfileForm.createEditProfile_best_work_exp.value;
    var w_exp = createEditProfileForm.createEditProfile_worst_work_exp.value;
    var sup = createEditProfileForm.createEditProfile_superpower.value;
    var b_exp_fr = createEditProfileForm.createEditProfile_best_work_exp_fr.value;
    var w_exp_fr = createEditProfileForm.createEditProfile_worst_work_exp_fr.value;
    var sup_fr = createEditProfileForm.createEditProfile_superpower_fr.value;
    valid = FormValidationAPI.validateUpdateProfileStep2(b_exp, w_exp, sup, b_exp_fr, w_exp_fr, sup_fr);
    */
   
    if (valid) {
        CreateEditProfileAPI.goToStep('createEditProfile_step3');
        var createEditProfileForm = document.getElementById("CreateEditProfileForm");
        /*var demoAreaEnglish = document.getElementById("createEditProfileDemoAreaEnglish");
        //demoAreaEnglish.innerHTML = 'Profile Object printed in console!';//JSON.stringify(CreateEditProfileAPI.managerProfileObj);
        //Temp prifle obj
        var tempProfileObj = {name: createEditProfileForm.createEditProfile_name.value, 
            bio: createEditProfileForm.createEditProfile_bio.value,
            bio_fr: createEditProfileForm.createEditProfile_bio_fr.value,
            position: createEditProfileForm.createEditProfile_position.value, 
            position_fr: createEditProfileForm.createEditProfile_position_fr.value,
            department: createEditProfileForm.createEditProfile_department.value, 
            department_fr: createEditProfileForm.createEditProfile_department_fr.value,
            branch_fr: createEditProfileForm.createEditProfile_branch_fr.value,
            branch: createEditProfileForm.createEditProfile_branch.value, 
            division: createEditProfileForm.createEditProfile_division.value,
            division_fr: createEditProfileForm.createEditProfile_division_fr.value,
            twitter: createEditProfileForm.createEditProfile_twitter.value,
            linkedin: createEditProfileForm.createEditProfile_linkedin.value,
            leadership_style: createEditProfileForm.createEditProfile_leadership_style.value,
            leadership_style_fr: createEditProfileForm.createEditProfile_leadership_style_fr.value,
            app_to_employees: createEditProfileForm.createEditProfile_app_to_employees.value,
            app_to_employees_fr: createEditProfileForm.createEditProfile_app_to_employees_fr.value,
            exp_of_employees: createEditProfileForm.createEditProfile_exp_of_employees.value,
            exp_of_employees_fr: createEditProfileForm.createEditProfile_exp_of_employees_fr.value,
            how_often_review: '',
            how_often_early: ''
        };
    
        var how_often_review_radios= document.getElementsByName('createEditProfile_how_often_review_options');
        for(var i = 0;i < how_often_review_radios.length;i++){
            if(how_often_review_radios[i].checked){
                tempProfileObj.how_often_review = how_often_review_radios[i].value;
                break;
            }
        }
        var how_often_early_radios= document.getElementsByName('createEditProfile_how_often_early_options');
        for(var i = 0;i < how_often_early_radios.length;i++){
            if(how_often_early_radios[i].checked){
                tempProfileObj.how_often_early = how_often_early_radios[i].value;
                break;
            }
        }

        console.log(tempProfileObj);
        demoAreaEnglish.innerHTML = '';
        demoAreaEnglish.appendChild(CreateEditProfileAPI.viewProfile(tempProfileObj));

        var demoAreaFrench = document.getElementById("createEditProfileDemoAreaFrench");
        demoAreaFrench.innerHTML = "";
        
        */
    }
};

CreateEditProfileAPI.validateStep3 = function() {
    var valid = true;
    
    if (valid) {
        Utilities.debug?console.log(CreateEditProfileAPI.managerProfileObj):null;
        //console.log(CreateEditProfileAPI.managerProfileObj);
        //submitForm();
        CreateEditProfileAPI.updateManagerProfileWithDetails();
        
        var managerProfileId = document.getElementById("ManagerProfileId").value;
        CreateWorkEnvironmentAPI.saveWorkEnvironment(managerProfileId);
        EditTeamCultureAPI.submitTeamCulture(managerProfileId);
    }
};

CreateEditProfileAPI.updateManagerProfileWithDetails = function(){
    
    var updated_manager_profile = new CreateEditProfileAPI.ManagerProfile();
    
    updated_manager_profile.user_id = document.getElementById("UserId").value;
    
    updated_manager_profile.user_manager_profile_id = document.getElementById("ManagerProfileId").value;
    
    updated_manager_profile.user_manager_profile_position = document.getElementById("createEditProfile_position").value;
    updated_manager_profile.user_manager_profile_department_id = document.getElementById("createEditProfile_department").value;
    updated_manager_profile.user_manager_profile_twitter = document.getElementById("createEditProfile_twitter").value;
    updated_manager_profile.user_manager_profile_linkedin = document.getElementById("createEditProfile_linkedin").value;    
    
    console.log(updated_manager_profile);
    
    var updated_manager_profile_details = new CreateEditProfileAPI.ManagerProfileDetails();
    
    updated_manager_profile_details.user_manager_profile_details_id = document.getElementById("ManagerProfileDetailsId").value;
    
    updated_manager_profile_details.locale_id = 1;
    
    updated_manager_profile_details.user_manager_profile_id = document.getElementById("ManagerProfileId").value;
    
    updated_manager_profile_details.user_manager_profile_details_aboutme = document.getElementById("createEditProfile_bio").value;
    updated_manager_profile_details.user_manager_profile_details_proud = document.getElementById("createEditProfile_proudOf").value;
    updated_manager_profile_details.user_manager_profile_details_branch = document.getElementById("createEditProfile_branch").value;
    updated_manager_profile_details.user_manager_profile_details_division = document.getElementById("createEditProfile_division").value;
    updated_manager_profile_details.user_manager_profile_details_lead_style = document.getElementById("createEditProfile_leadership_style").value;
    updated_manager_profile_details.user_manager_profile_details_emp_learn = document.getElementById("createEditProfile_app_to_employees").value;
    updated_manager_profile_details.user_manager_profile_details_expectations = document.getElementById("createEditProfile_exp_of_employees").value;

    updated_manager_profile_details.user_manager_profile_work_experience = document.getElementById("user_manager_profile_work_experience").value;
    updated_manager_profile_details.user_manager_profile_education = document.getElementById("user_manager_profile_education").value;

    
    //Get slider option values, and default to "option0" if any NOTHING in a slider is selected, default to "option0"
    var defaultOption = "option0";

    var reviewSelected = document.querySelector('input[name="createEditProfile_how_often_review_options"]:checked');
    updated_manager_profile_details.user_manager_profile_review_options = (reviewSelected ? reviewSelected.value : defaultOption); //Ternary Operator
    
    var staylateSelected = document.querySelector('input[name="createEditProfile_staylate"]:checked');
    updated_manager_profile_details.user_manager_profile_staylate = (staylateSelected ? staylateSelected.value : defaultOption);
    
    var engageSelected = document.querySelector('input[name="createEditProfile_engage"]:checked');
    updated_manager_profile_details.user_manager_profile_engage = (engageSelected ? engageSelected.value : defaultOption);
    
    var devopsSelected = document.querySelector('input[name="createEditProfile_devops"]:checked');
    updated_manager_profile_details.user_manager_profile_devops = (devopsSelected ? devopsSelected.value : defaultOption);
    
    var lvwrequestSelected = document.querySelector('input[name="createEditProfile_lvwrequests"]:checked');
    updated_manager_profile_details.user_manager_profile_lvwrequests = (lvwrequestSelected ? lvwrequestSelected.value : defaultOption);

    
    
    console.log(updated_manager_profile_details);
    
    var complete_manager_profile = {};
        
    complete_manager_profile.manager_profile = updated_manager_profile;
    complete_manager_profile.manager_profile_details = updated_manager_profile_details;
    
    CreateEditProfileAPI.saveManagerProfile(complete_manager_profile);
    
};

CreateEditProfileAPI.saveManagerProfile = function(complete_manager_profile){
    
    var complete_manager_profileJSON = JSON.stringify(complete_manager_profile);
    
    if (UserAPI.hasSessionUser()) {
        var user = UserAPI.getSessionUserAsJSON();
        var authToken = UserAPI.getAuthTokenAsJSON();
        var user_id = user["user_id"];
        var manager_profile_url = UserAPI.baseURL + "/postManagerProfile/"+user_id;
        var manager_profile_xhr = new XMLHttpRequest();
        if ("withCredentials" in manager_profile_xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            manager_profile_xhr.open("POST", manager_profile_url);

        } else if (typeof XDomainRequest != "undefined") {
            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            manager_profile_xhr = new XDomainRequest();
            manager_profile_xhr.open("POST", manager_profile_url);
        } else {
            // Otherwise, CORS is not supported by the browser.
            manager_profile_xhr = null;
            // TODO: indicate to user that browser is not supported
        }

        manager_profile_xhr.open('POST', manager_profile_url);
        manager_profile_xhr.setRequestHeader("Content-type", "application/json");
        manager_profile_xhr.setRequestHeader("Accept", "application/json");
        manager_profile_xhr.setRequestHeader('x-access-token', authToken.access_token);
        //xhr.setRequestHeader('X-CSRF-Token', UserAPI.getCSRFTokenValue());
        manager_profile_xhr.addEventListener("progress", UserAPI.updateProgress, false);
        manager_profile_xhr.addEventListener("load", function () {
           CreateEditProfileAPI.goToStep('createEditProfile_step1');
        }, false);
        manager_profile_xhr.addEventListener("error", UserAPI.transferFailed, false);
        manager_profile_xhr.addEventListener("abort", UserAPI.transferAborted, false);

        manager_profile_xhr.send(complete_manager_profileJSON);
    }
};

CreateEditProfileAPI.viewProfile = function(profileObj){
    
    var engFreBreak = '///';
    
    var viewProfileContent = document.createElement("div");
    viewProfileContent.setAttribute("class", "viewProfileContent");
    viewProfileContent.setAttribute("id", "viewProfile_ContentID");
    
    //'vp' stands for view profile
    //Name
    //
    //About me
    var vp_aboutMe_div = document.createElement("div");
    vp_aboutMe_div.setAttribute("id", "vpAboutMeContent");
    var vp_aboutMe = document.createElement("div");
    vp_aboutMe.setAttribute("id", "vpAboutMe");
    vp_aboutMe.innerHTML = siteContent.aboutMe;
    
    var vp_name = document.createElement("div");
    vp_name.setAttribute("id", "vpName");
    vp_name.innerHTML = profileObj.name;
    
    var vp_bio = document.createElement("div");
    vp_bio.setAttribute("id", "vpBio");
    vp_bio.innerHTML = profileObj.bio + '<br>' + engFreBreak + '<br>' + profileObj.bio_fr;
    
    vp_aboutMe_div.appendChild(vp_aboutMe);
    vp_aboutMe_div.appendChild(document.createElement("hr"));
    vp_aboutMe_div.appendChild(vp_name);
    vp_aboutMe_div.appendChild(vp_bio);
    
    
    
    //Gneral information
    var vp_generalInfo_div = document.createElement("div");
    vp_generalInfo_div.setAttribute("id", "vpGeneralInfoContent");
    vp_generalInfo_div.setAttribute("class", "viewProfileGeneralInformationPane");
    var vp_genInfo = document.createElement("div");
    vp_genInfo.setAttribute("id", "vpGenInfo");
    vp_genInfo.innerHTML = siteContent.generalInformation;
    
    //GENERAL INFO (LEFT)
    var vp_generalInfo_div_left = document.createElement("div");
    //vp_generalInfo_div_left.setAttribute("class", "viewProfileLeftPane");
    
    var vp_dep = document.createElement("div");
    vp_dep.setAttribute("id", "vpSlot_department");
    vp_dep.setAttribute("class","viewProfileSlot");
    var vp_dep_label = document.createElement("div");
    vp_dep_label.innerHTML = siteContent.department;
    vp_dep_label.setAttribute("class", "viewProfileSlotLabel");
    vp_dep_label.setAttribute("id", "viewProfile_slot_dep_label");
    var vp_dep_content = document.createElement("div");
    vp_dep_content.setAttribute("class", "viewProfileSlotContent");
    var vp_dep_img = document.createElement("div");
    vp_dep_img.setAttribute("class", "viewProfileSlotImg");
    var vp_dep_img_tag = document.createElement("img");
    vp_dep_img_tag.setAttribute("src", "/images/checkmark.png");
    vp_dep_img_tag.setAttribute("width", "24");
    vp_dep_img_tag.setAttribute("height", "24");
    vp_dep_img.appendChild(vp_dep_img_tag);
    var vp_dep_value = document.createElement("div");
    vp_dep_value.setAttribute("class", "viewProfileSlotValue");
    vp_dep_value.innerHTML = profileObj.department + '<br>' + engFreBreak + '<br>' + profileObj.department_fr;
    vp_dep_content.appendChild(vp_dep_img);
    vp_dep_content.appendChild(vp_dep_value);
    vp_dep.appendChild(vp_dep_label);
    vp_dep.appendChild(vp_dep_content);
    
    var vp_pos = document.createElement("div");
    vp_pos.setAttribute("id", "vpSlot_position");
    vp_pos.setAttribute("class","viewProfileSlot");
    var vp_pos_label = document.createElement("div");
    vp_pos_label.innerHTML = siteContent.position;
    vp_pos_label.setAttribute("class", "viewProfileSlotLabel");
    vp_pos_label.setAttribute("id", "viewProfile_slot_pos_label");
    var vp_pos_content = document.createElement("div");
    vp_pos_content.setAttribute("class", "viewProfileSlotContent");
    var vp_pos_img = document.createElement("div");
    vp_pos_img.setAttribute("class", "viewProfileSlotImg");
    var vp_pos_img_tag = document.createElement("img");
    vp_pos_img_tag.setAttribute("src", "/images/checkmark.png");
    vp_pos_img_tag.setAttribute("width", "24");
    vp_pos_img_tag.setAttribute("height", "24");
    vp_pos_img.appendChild(vp_pos_img_tag);
    var vp_pos_value = document.createElement("div");
    vp_pos_value.setAttribute("class", "viewProfileSlotValue");
    vp_pos_value.innerHTML = profileObj.position + '<br>' + engFreBreak + '<br>' + profileObj.position_fr;
    vp_pos_content.appendChild(vp_pos_img);
    vp_pos_content.appendChild(vp_pos_value);
    vp_pos.appendChild(vp_pos_label);
    vp_pos.appendChild(vp_pos_content);
    
    var vp_branch = document.createElement("div");
    vp_branch.setAttribute("id", "vpSlot_branch");
    vp_branch.setAttribute("class","viewProfileSlot");
    var vp_branch_label = document.createElement("div");
    vp_branch_label.innerHTML = siteContent.branch;
    vp_branch_label.setAttribute("class", "viewProfileSlotLabel");
    vp_branch_label.setAttribute("id", "viewProfile_slot_branch_label");
    var vp_branch_content = document.createElement("div");
    vp_branch_content.setAttribute("class", "viewProfileSlotContent");
    var vp_branch_img = document.createElement("div");
    vp_branch_img.setAttribute("class", "viewProfileSlotImg");
    var vp_branch_img_tag = document.createElement("img");
    vp_branch_img_tag.setAttribute("src", "/images/checkmark.png");
    vp_branch_img_tag.setAttribute("width", "24");
    vp_branch_img_tag.setAttribute("height", "24");
    vp_branch_img.appendChild(vp_branch_img_tag);
    var vp_branch_value = document.createElement("div");
    vp_branch_value.setAttribute("class", "viewProfileSlotValue");
    vp_branch_value.innerHTML = profileObj.branch + '<br>' + engFreBreak + '<br>' + profileObj.branch_fr;
    vp_branch_content.appendChild(vp_branch_img);
    vp_branch_content.appendChild(vp_branch_value);
    vp_branch.appendChild(vp_branch_label);
    vp_branch.appendChild(vp_branch_content);
    
    var vp_division = document.createElement("div");
    vp_division.setAttribute("id", "vpSlot_division");
    vp_division.setAttribute("class","viewProfileSlot");
    var vp_division_label = document.createElement("div");
    vp_division_label.innerHTML = siteContent.division;
    vp_division_label.setAttribute("class", "viewProfileSlotLabel");
    vp_division_label.setAttribute("id", "viewProfile_slot_division_label");
    var vp_division_content = document.createElement("div");
    vp_division_content.setAttribute("class", "viewProfileSlotContent");
    var vp_division_img = document.createElement("div");
    vp_division_img.setAttribute("class", "viewProfileSlotImg");
    var vp_division_img_tag = document.createElement("img");
    vp_division_img_tag.setAttribute("src", "/images/checkmark.png");
    vp_division_img_tag.setAttribute("width", "24");
    vp_division_img_tag.setAttribute("height", "24");
    vp_division_img.appendChild(vp_division_img_tag);
    var vp_division_value = document.createElement("div");
    vp_division_value.setAttribute("class", "viewProfileSlotValue");
    vp_division_value.innerHTML = profileObj.division + '<br>' + engFreBreak + '<br>' + profileObj.division_fr;
    vp_division_content.appendChild(vp_division_img);
    vp_division_content.appendChild(vp_division_value);
    vp_division.appendChild(vp_division_label);
    vp_division.appendChild(vp_division_content);
    
    //TWITTER AND LINKED IN (LEFT) //(RIGHT)
    //var vp_generalInfo_div_right = document.createElement("div");
    //vp_generalInfo_div_right.setAttribute("class", "viewProfileRightPane");
    
    var vp_twitter = document.createElement("div");
    vp_twitter.setAttribute("id", "vpSlot_twitter");
    vp_twitter.setAttribute("class","viewProfileSlot");
    var vp_twitter_label = document.createElement("div");
    vp_twitter_label.innerHTML = "Twitter";//siteContent.division;
    vp_twitter_label.setAttribute("class", "viewProfileSlotLabel");
    vp_twitter_label.setAttribute("id", "viewProfile_slot_twitter_label");
    var vp_twitter_content = document.createElement("div");
    vp_twitter_content.setAttribute("class", "viewProfileSlotContent");
    var vp_twitter_img = document.createElement("div");
    vp_twitter_img.setAttribute("class", "viewProfileSlotImg");
    var vp_twitter_img_tag = document.createElement("img");
    vp_twitter_img_tag.setAttribute("src", "/images/twitter.png");
    vp_twitter_img_tag.setAttribute("width", "32");
    vp_twitter_img_tag.setAttribute("height", "32");
    vp_twitter_img.appendChild(vp_twitter_img_tag);
    var vp_twitter_value = document.createElement("div");
    vp_twitter_value.setAttribute("class", "viewProfileSlotValue");
    vp_twitter_value.innerHTML = profileObj.twitter;
    vp_twitter_content.appendChild(vp_twitter_img);
    vp_twitter_content.appendChild(vp_twitter_value);
    vp_twitter.appendChild(vp_twitter_label);
    vp_twitter.appendChild(vp_twitter_content);
    
    var vp_linkedin = document.createElement("div");
    vp_linkedin.setAttribute("id", "vpSlot_linkedin");
    vp_linkedin.setAttribute("class","viewProfileSlot");
    var vp_linkedin_label = document.createElement("div");
    vp_linkedin_label.innerHTML = "LinkedIn";//siteContent.linkedin;
    vp_linkedin_label.setAttribute("class", "viewProfileSlotLabel");
    vp_linkedin_label.setAttribute("id", "viewProfile_slot_linkedin_label");
    var vp_linkedin_content = document.createElement("div");
    vp_linkedin_content.setAttribute("class", "viewProfileSlotContent");
    var vp_linkedin_img = document.createElement("div");
    vp_linkedin_img.setAttribute("class", "viewProfileSlotImg");
    var vp_linkedin_img_tag = document.createElement("img");
    vp_linkedin_img_tag.setAttribute("src", "/images/linkedin.png");
    vp_linkedin_img_tag.setAttribute("width", "32");
    vp_linkedin_img_tag.setAttribute("height", "32");
    vp_linkedin_img.appendChild(vp_linkedin_img_tag);
    var vp_linkedin_value = document.createElement("div");
    vp_linkedin_value.setAttribute("class", "viewProfileSlotValue");
    vp_linkedin_value.innerHTML = profileObj.linkedin;
    vp_linkedin_content.appendChild(vp_linkedin_img);
    vp_linkedin_content.appendChild(vp_linkedin_value);
    vp_linkedin.appendChild(vp_linkedin_label);
    vp_linkedin.appendChild(vp_linkedin_content);
    
    //ASSEMBLE GENERAL INFO SECTION
    vp_generalInfo_div.appendChild(vp_genInfo);
    
    vp_generalInfo_div_left.appendChild(vp_dep);
    vp_generalInfo_div_left.appendChild(vp_pos);
    vp_generalInfo_div_left.appendChild(vp_branch);
    vp_generalInfo_div_left.appendChild(vp_division);
    vp_generalInfo_div_left.appendChild(vp_twitter);
    vp_generalInfo_div_left.appendChild(vp_linkedin);
    
    vp_generalInfo_div.appendChild(document.createElement("hr"));
    vp_generalInfo_div.appendChild(vp_generalInfo_div_left);
    //vp_generalInfo_div.appendChild(vp_generalInfo_div_right);
    
    
    //Leadership style
    var vp_leadershipStyle_div = document.createElement("div");
    vp_leadershipStyle_div.setAttribute("id", "vpLeadershipStyleContent");
    var vp_leadershipStyle = document.createElement("div");
    vp_leadershipStyle.setAttribute("id", "vpLeadershipStyle");
    vp_leadershipStyle.innerHTML = siteContent.leadershipStyle;
    
    var vp_mystyle = document.createElement("div");
    vp_mystyle.setAttribute("id", "vpSlot_mystyle");
    vp_mystyle.setAttribute("class","viewProfileSlot");
    var vp_mystyle_label = document.createElement("div");
    vp_mystyle_label.innerHTML = siteContent.myLeadershipStyle;
    vp_mystyle_label.setAttribute("class", "viewProfileSlotLabel");
    vp_mystyle_label.setAttribute("id", "viewProfile_slot_mystyle_label");
    var vp_mystyle_content = document.createElement("div");
    vp_mystyle_content.setAttribute("class", "viewProfileSlotContent");
    var vp_mystyle_img = document.createElement("div");
    vp_mystyle_img.setAttribute("class", "viewProfileSlotImg");
    var vp_mystyle_img_tag = document.createElement("img");
    vp_mystyle_img_tag.setAttribute("src", "/images/checkmark.png");
    vp_mystyle_img_tag.setAttribute("width", "24");
    vp_mystyle_img_tag.setAttribute("height", "24");
    vp_mystyle_img.appendChild(vp_mystyle_img_tag);
    var vp_mystyle_value = document.createElement("div");
    vp_mystyle_value.setAttribute("class", "viewProfileSlotValue viewProfileHeightBoost");
    vp_mystyle_value.innerHTML = profileObj.leadership_style + '<br>' + engFreBreak + '<br>' + profileObj.leadership_style_fr;
    vp_mystyle_content.appendChild(vp_mystyle_img);
    vp_mystyle_content.appendChild(vp_mystyle_value);
    vp_mystyle.appendChild(vp_mystyle_label);
    vp_mystyle.appendChild(vp_mystyle_content);
    
    var vp_myapp = document.createElement("div");
    vp_myapp.setAttribute("id", "vpSlot_myapp");
    vp_myapp.setAttribute("class","viewProfileSlot");
    var vp_myapp_label = document.createElement("div");
    vp_myapp_label.innerHTML = siteContent.myApproachToEmployee;
    vp_myapp_label.setAttribute("class", "viewProfileSlotLabel");
    vp_myapp_label.setAttribute("id", "viewProfile_slot_myapp_label");
    var vp_myapp_content = document.createElement("div");
    vp_myapp_content.setAttribute("class", "viewProfileSlotContent");
    var vp_myapp_img = document.createElement("div");
    vp_myapp_img.setAttribute("class", "viewProfileSlotImg");
    var vp_myapp_img_tag = document.createElement("img");
    vp_myapp_img_tag.setAttribute("src", "/images/checkmark.png");
    vp_myapp_img_tag.setAttribute("width", "24");
    vp_myapp_img_tag.setAttribute("height", "24");
    vp_myapp_img.appendChild(vp_myapp_img_tag);
    var vp_myapp_value = document.createElement("div");
    vp_myapp_value.setAttribute("class", "viewProfileSlotValue viewProfileHeightBoost");
    vp_myapp_value.innerHTML = profileObj.app_to_employees + '<br>' + engFreBreak + '<br>' + profileObj.app_to_employees_fr;
    vp_myapp_content.appendChild(vp_myapp_img);
    vp_myapp_content.appendChild(vp_myapp_value);
    vp_myapp.appendChild(vp_myapp_label);
    vp_myapp.appendChild(vp_myapp_content);
    
    var vp_myexp = document.createElement("div");
    vp_myexp.setAttribute("id", "vpSlot_myapp");
    vp_myexp.setAttribute("class","viewProfileSlot");
    var vp_myexp_label = document.createElement("div");
    vp_myexp_label.innerHTML = siteContent.myExpectationsOfEmployees;
    vp_myexp_label.setAttribute("class", "viewProfileSlotLabel");
    vp_myexp_label.setAttribute("id", "viewProfile_slot_myapp_label");
    var vp_myexp_content = document.createElement("div");
    vp_myexp_content.setAttribute("class", "viewProfileSlotContent");
    var vp_myexp_img = document.createElement("div");
    vp_myexp_img.setAttribute("class", "viewProfileSlotImg");
    var vp_myexp_img_tag = document.createElement("img");
    vp_myexp_img_tag.setAttribute("src", "/images/checkmark.png");
    vp_myexp_img_tag.setAttribute("width", "24");
    vp_myexp_img_tag.setAttribute("height", "24");
    vp_myexp_img.appendChild(vp_myexp_img_tag);
    var vp_myexp_value = document.createElement("div");
    vp_myexp_value.setAttribute("class", "viewProfileSlotValue viewProfileHeightBoost");
    vp_myexp_value.innerHTML = profileObj.exp_of_employees + '<br>' + engFreBreak + '<br>' + profileObj.exp_of_employees_fr;
    vp_myexp_content.appendChild(vp_myexp_img);
    vp_myexp_content.appendChild(vp_myexp_value);
    vp_myexp.appendChild(vp_myexp_label);
    vp_myexp.appendChild(vp_myexp_content);
    
    
    //ASSEMBLE LEADERSHIP STYLE SECTION
    vp_leadershipStyle_div.appendChild(vp_leadershipStyle);
    vp_leadershipStyle_div.appendChild(document.createElement("hr"));
    vp_leadershipStyle_div.appendChild(vp_mystyle);
    vp_leadershipStyle_div.appendChild(vp_myapp);
    vp_leadershipStyle_div.appendChild(vp_myexp);
    
    //Radio buttons
    var vp_decisionMaking_div = document.createElement("div");
    vp_decisionMaking_div.setAttribute("id", "vpDecisionMakingContent");
    var vp_decisionMaking = document.createElement("div");
    vp_decisionMaking.setAttribute("id", "vpDecisionMaking");
    vp_decisionMaking.innerHTML = siteContent.myApproachToDecisionMaking;
    
    var vp_howOftenReview = document.createElement("div");
    var reviewVal = siteContent.howOftenDoYouReview + '&nbsp;   ' + profileObj.how_often_review;
    vp_howOftenReview.innerHTML = reviewVal;
    
    var vp_howOftenEarly = document.createElement("div");
    var earlyVal = siteContent.howOftenDoYouStayLate + '&nbsp;   ' + profileObj.how_often_early;
    vp_howOftenEarly.innerHTML = earlyVal;
    //if(profileObj.howOftenReview === 1)
    
    //vp_howOftenReview.innerHTML = reviewVal;
    
    //ASSEMBLE DECISION MAKING STYLE
    vp_decisionMaking_div.appendChild(vp_decisionMaking);
    vp_decisionMaking_div.appendChild(document.createElement("hr"));
    vp_decisionMaking_div.appendChild(vp_howOftenReview);
    vp_decisionMaking_div.appendChild(document.createElement("br"));
    vp_decisionMaking_div.appendChild(vp_howOftenEarly);
    
    //////////////////
    //AddSections to the view profile container
    /////////////////
    //Addf the about me div
    viewProfileContent.appendChild(document.createElement("br"));
    viewProfileContent.appendChild(document.createElement("br"));
    viewProfileContent.appendChild(vp_aboutMe_div);
    
    //Add the general information div
    viewProfileContent.appendChild(document.createElement("br"));
    viewProfileContent.appendChild(document.createElement("br"));
    viewProfileContent.appendChild(vp_generalInfo_div);
    
    //Add the leadership style div
    viewProfileContent.appendChild(document.createElement("br"));
    viewProfileContent.appendChild(document.createElement("br"));
    viewProfileContent.appendChild(vp_leadershipStyle_div);
    
    //Add decisin making
    viewProfileContent.appendChild(document.createElement("br"));
    viewProfileContent.appendChild(document.createElement("br"));
    viewProfileContent.appendChild(vp_decisionMaking_div);
    
    return viewProfileContent;
    
};

CreateEditProfileAPI.showCreateEditProfile = function(){
    var stateInfo = {pageInfo: 'create_edit_profile', pageTitle: 'Talent Cloud: Create/Edit Profile'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#CreateEditProfile');
    
    TalentCloudAPI.hideAllContent();
    
    var createEditProfile = document.getElementById("createEditProfileSection");
    createEditProfile.classList.remove("hidden");
         
    ProfilePicAPI.refreshUserProfilePic(document.getElementById("myProfilePic"));

    CreateEditProfileAPI.getManagerProfile();
};

CreateEditProfileAPI.showViewProfile = function(linkElement){
    var stateInfo = {pageInfo: 'manager_view_profile', pageTitle: 'Talent Cloud: View Profile'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#ViewProfile');
    
    //Temp prifle obj
    var tempProfileObj = {name: 'John Dore', 
        bio: 'BIo in englsih',
        bio_fr: 'BIo in French',
        position: 'Position In English', 
        position_fr: 'Position in French',
        department: 'Department in Enlgish', 
        department_fr: 'Department in French',
        branch_fr: 'Branch name in French',
        branch: 'Branch name in English',
        division: 'The division (in English)',
        division_fr: 'The division (in french)',
        twitter: 'Twitter Link',
        linkedin: 'LinkedIn Link',
        leadership_style: 'Leadership style in English',
        leadership_style_fr: 'Leadership Style in French',
        app_to_employees: 'Approach to employees',
        app_to_employees_fr: 'Approach to employees french',
        exp_of_employees: 'Expectations of employees',
        exp_of_employees_fr: 'Expectations of emplyoees in the second language',
        how_often_review: 'Almost Never',
        how_often_early: 'Usually'
    };
    
    EventsAPI.hideAllLayouts();
    
    var createEditProfile = document.getElementById("createEditProfileSection");
    createEditProfile.classList.remove("hidden");
    
    var viewProfileElement = document.getElementById("viewProfile");
    viewProfileElement.classList.remove("hidden");
    
    viewProfileElement.innerHTML = '';
    viewProfileElement.appendChild(CreateEditProfileAPI.viewProfile(tempProfileObj));
};

CreateEditProfileAPI.profilePicUploader = null;

CreateEditProfileAPI.showUploadProfilePic = function() {
    //document.body.style.overflow = "hidden";
    var uploadOverlay = document.getElementById('profilePicUploadOverlay');
    uploadOverlay.classList.remove("hidden");
    // ManagerEventsAPI.setFormFocus("profilePicUploadField");
    
    // var fileField = document.getElementById('profilePicUploadField');
    // var fileDrop = document.getElementById('profilePicUploadDrop');
    // var previewImage = document.getElementById('fileUploadPreviewImg');
    // var clearBtn = document.getElementById('profilePicUploadClear');
    // var uploadBtn = document.getElementById('profilePicUploadBtn');
    // CreateEditProfileAPI.profilePicUploader = new ProfilePicAPI.Uploader(
    //         [fileField],
    //         fileDrop,
    //         previewImage,
    //         clearBtn,
    //         uploadBtn,
    //         UserAPI.getSessionUserAsJSON().user_id,
    //         CreateEditProfileAPI.onProfilePicUploaded
    //     );

    AccessibilityAPI.focusElement("updateProfileChoosePhotoButtonLabel");

    EventsAPI.hideBodyOverflow(true);

    var fileInputButtons = [document.getElementById('updateProfileChoosePhotoButton'),
        document.getElementById('updateProfileChooseAltPhotoButton')];
    var fileDrop = document.getElementById('updateProfilePhotoDraggableArea');
    var imagePreview = document.getElementById('updateProfilePhotoCroppieContainer');
    var clearBtn = document.getElementById('updateProfilePhotoCancelButton');
    var uploadBtn = document.getElementById('profilePicUploadBtn');

    //Don't pass in a save button, because there is no dedicated button for pic uploading.
    //The save button must upload photo, as well as profile info.
    JobSeekerAPI.profilePicUploader = new ProfilePicAPI.Uploader(
        fileInputButtons,
        fileDrop,
        imagePreview,
        clearBtn,
        uploadBtn,
        UserAPI.getSessionUserAsJSON().user_id,
        CreateEditProfileAPI.onProfilePicUploaded
    );

    modalSize();

};

CreateEditProfileAPI.hideUploadProfilePic = function() {
    document.body.style.overflow = "";
    document.body.classList.remove("overFlowHidden");
    var uploadOverlay = document.getElementById('profilePicUploadOverlay');
    uploadOverlay.classList.add("hidden");
    CreateEditProfileAPI.profilePicUploader = null;
};

CreateEditProfileAPI.onProfilePicUploaded = function() {
    ProfilePicAPI.refreshUserProfilePic(document.getElementById("myProfilePic"));
    CreateEditProfileAPI.hideUploadProfilePic();
};

CreateEditProfileAPI.getManagerProfile = function(){
    
    if (UserAPI.hasSessionUser()) {
        var user = UserAPI.getSessionUserAsJSON();
        var authToken = UserAPI.getAuthTokenAsJSON();
        var user_id = user["user_id"];
        var manager_profile_url = UserAPI.baseURL + "/getManagerProfile/"+user_id;
        var manager_profile_xhr = new XMLHttpRequest();
        if ("withCredentials" in manager_profile_xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            manager_profile_xhr.open("GET", manager_profile_url);

        } else if (typeof XDomainRequest != "undefined") {
            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            manager_profile_xhr = new XDomainRequest();
            manager_profile_xhr.open("GET", manager_profile_url);
        } else {
            // Otherwise, CORS is not supported by the browser.
            manager_profile_xhr = null;
            // TODO: indicate to user that browser is not supported
        }

        manager_profile_xhr.open('GET', manager_profile_url);
        manager_profile_xhr.setRequestHeader("Content-type", "application/json");
        manager_profile_xhr.setRequestHeader("Accept", "application/json");
        manager_profile_xhr.setRequestHeader('x-access-token', authToken.access_token);
        //xhr.setRequestHeader('X-CSRF-Token', UserAPI.getCSRFTokenValue());
        manager_profile_xhr.addEventListener("progress", UserAPI.updateProgress, false);
        manager_profile_xhr.addEventListener("load", function () {
            CreateEditProfileAPI.populateProfile(manager_profile_xhr.response);
        }, false);
        manager_profile_xhr.addEventListener("error", UserAPI.transferFailed, false);
        manager_profile_xhr.addEventListener("abort", UserAPI.transferAborted, false);

        manager_profile_xhr.send(null);
    }
};

CreateEditProfileAPI.userLoaded = function(response){
    var user_json = JSON.parse(response);
    var user = new UserAPI.User();
    user.id = user_json['id'];
   
};

CreateEditProfileAPI.populateProfile = function(response){
    var manager_profile_with_details_json = JSON.parse(response);
    
    var manager_profile_json = manager_profile_with_details_json["manager_profile"];
    
    var manager_profile_details_json = manager_profile_with_details_json["manager_profile_details"];
    
    var manager_profile = new CreateEditProfileAPI.ManagerProfile();
    
    manager_profile.user_id = manager_profile_json["user_id"];
    manager_profile.user_manager_profile_id = manager_profile_json["user_manager_profile_id"];
    
    manager_profile.user_manager_profile_position = manager_profile_json["user_manager_profile_position"];
    manager_profile.user_manager_profile_department_id = manager_profile_json["user_manager_profile_department_id"];
    manager_profile.user_manager_profile_twitter = manager_profile_json["user_manager_profile_twitter"];
    manager_profile.user_manager_profile_linkedin = manager_profile_json["user_manager_profile_linkedin"];
    
    var manager_profile_details = new CreateEditProfileAPI.ManagerProfileDetails();
    manager_profile_details.user_manager_profile_details_id = manager_profile_details_json["user_manager_profile_details_id"];
    manager_profile_details.locale_id = manager_profile_details_json["locale_id"];
    manager_profile_details.user_manager_profile_details_aboutme = manager_profile_details_json["user_manager_profile_details_aboutme"];
    manager_profile_details.user_manager_profile_details_proud = manager_profile_details_json["user_manager_profile_details_proud"];
    manager_profile_details.user_manager_profile_details_division = manager_profile_details_json["user_manager_profile_details_branch"];
    manager_profile_details.user_manager_profile_details_branch = manager_profile_details_json["user_manager_profile_details_division"];
    manager_profile_details.user_manager_profile_details_lead_style = manager_profile_details_json["user_manager_profile_details_lead_style"];
    manager_profile_details.user_manager_profile_details_emp_learn = manager_profile_details_json["user_manager_profile_details_emp_learn"];
    manager_profile_details.user_manager_profile_details_expectations = manager_profile_details_json["user_manager_profile_details_expectations"];
    manager_profile_details.user_manager_profile_id = manager_profile_details_json["user_manager_profile_id"];
    
    manager_profile_details.user_manager_profile_review_options = manager_profile_details_json["user_manager_profile_review_options"];
    manager_profile_details.user_manager_profile_staylate = manager_profile_details_json["user_manager_profile_staylate"];
    manager_profile_details.user_manager_profile_engage = manager_profile_details_json["user_manager_profile_engage"];
    manager_profile_details.user_manager_profile_devops = manager_profile_details_json["user_manager_profile_devops"];
    manager_profile_details.user_manager_profile_lvwrequests = manager_profile_details_json["user_manager_profile_lvwrequests"];
    manager_profile_details.user_manager_profile_work_experience = manager_profile_details_json["user_manager_profile_work_experience"];
    manager_profile_details.user_manager_profile_education = manager_profile_details_json["user_manager_profile_education"];
    
    
    //Initialize Work Environment
    CreateWorkEnvironmentAPI.initializeWorkEnvironmentForm(manager_profile.user_manager_profile_id); 
    
    //Initialize Team Culture
    EditTeamCultureAPI.initializeTeamCultureForm(manager_profile.user_manager_profile_id);


    //set hidden field values
    var UserId = document.getElementById("UserId");
    if (manager_profile.user_id) {
        UserId.value = manager_profile.user_id;
    } else { 
        UserId.value = "";
    }
    
    var managerProfileId = document.getElementById("ManagerProfileId");
    if (manager_profile.user_manager_profile_id) {
        managerProfileId.value = manager_profile.user_manager_profile_id;
    } else {
        managerProfileId.value = "";
    }
    
    var managerProfileDetailsId = document.getElementById("ManagerProfileDetailsId");
    if (manager_profile_details.user_manager_profile_details_id) {
        managerProfileDetailsId.value = manager_profile_details.user_manager_profile_details_id;
    } else {
        managerProfileDetailsId.value = "";
    }
    
    var createEditProfile_name_preview = document.getElementById("createEditProfile_name_preview");
    if(UserAPI.hasSessionUser()){
        var session_user = UserAPI.getSessionUserAsJSON();
        createEditProfile_name_preview.innerHTML = session_user.firstname + " " + session_user.lastname;
    }
    
    //AboutMe
    var createEditProfile_bio = document.getElementById("createEditProfile_bio");
    createEditProfile_bio.value = manager_profile_details.user_manager_profile_details_aboutme;
    
    var createEditProfile_proudOf = document.getElementById("createEditProfile_proudOf");
    createEditProfile_proudOf.value = manager_profile_details.user_manager_profile_details_proud;
    
    //Position
    var profile_position = manager_profile.user_manager_profile_position;
    var profile_department_id = manager_profile.user_manager_profile_department_id;
    var profile_division = manager_profile_details.user_manager_profile_details_division;
    var profile_branch = manager_profile_details.user_manager_profile_details_branch;
    
    if(profile_position !== null){
        var createEditProfile_position_preview = document.getElementById("createEditProfile_position_preview");
        createEditProfile_position_preview.innerHTML = profile_position;

        var createEditProfile_position = document.getElementById("createEditProfile_position");
        createEditProfile_position.value = profile_position;
    }
    
    if(profile_department_id !== null){
        console.log("profile_department="+profile_department_id);
        var createEditProfile_department = document.getElementById("createEditProfile_department");
        createEditProfile_department.value = profile_department_id;
        //createEditProfile_department.value = profile_department_id.toString();
        //FormsAPI.selectByValue(createEditProfile_department,profile_department_id.toString());
        var createEditProfile_department_preview = document.getElementById("createEditProfile_department_preview");
        createEditProfile_department_preview.innerHTML = LookupAPI.getLocalizedLookupValue("department", profile_department_id);
    }    
    
    document.getElementById("createEditProfile_branch").value = profile_branch;
    document.getElementById("createEditProfile_division").value = profile_division;
    
    //createEditProfile_leadership_style
    var createEditProfile_leadership_style = document.getElementById("createEditProfile_leadership_style");
    createEditProfile_leadership_style.value = manager_profile_details.user_manager_profile_details_lead_style;
    
    var createEditProfile_app_to_employees = document.getElementById("createEditProfile_app_to_employees");
    createEditProfile_app_to_employees.value = manager_profile_details.user_manager_profile_details_emp_learn;
    
    var createEditProfile_exp_of_employees = document.getElementById("createEditProfile_exp_of_employees");
    createEditProfile_exp_of_employees.value = manager_profile_details.user_manager_profile_details_expectations;
    
    //Social Media
    
    var createEditProfile_twitter = document.getElementById("createEditProfile_twitter");
    createEditProfile_twitter.value = manager_profile.user_manager_profile_twitter;
    
    var createEditProfile_linkedin = document.getElementById("createEditProfile_linkedin");
    createEditProfile_linkedin.value = manager_profile.user_manager_profile_linkedin;
    
    //Multiple choice slider questions

    SliderAPI.selectOptionByValue('createEditProfile_how_often_review_options', manager_profile_details.user_manager_profile_review_options, 'review_options');

    SliderAPI.selectOptionByValue('createEditProfile_staylate', manager_profile_details.user_manager_profile_staylate, 'staylate');
    
    SliderAPI.selectOptionByValue('createEditProfile_engage', manager_profile_details.user_manager_profile_engage, 'engage');
    
    SliderAPI.selectOptionByValue('createEditProfile_devops', manager_profile_details.user_manager_profile_devops, 'devops');
    
    SliderAPI.selectOptionByValue('createEditProfile_lvwrequests', manager_profile_details.user_manager_profile_lvwrequests, 'lvwRequests');
    
    SliderAPI.selectOptionByValue('createEditProfile_telework', manager_profile_details.user_manager_profile_telework, 'telework');
    
    SliderAPI.selectOptionByValue('createEditProfile_flexHours', manager_profile_details.user_manager_profile_flexHours, 'flexHours');
    
    var user_manager_profile_work_experience = document.getElementById('user_manager_profile_work_experience');
    user_manager_profile_work_experience.value = manager_profile_details.user_manager_profile_work_experience;
    
    var user_manager_profile_education = document.getElementById('user_manager_profile_education');
    user_manager_profile_education.value = manager_profile_details.user_manager_profile_education;
    
};
