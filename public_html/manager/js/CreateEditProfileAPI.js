/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var CreateEditProfileAPI = {};

CreateEditProfileAPI.managerProfileObj = {};

CreateEditProfileAPI.Profile = function(name, link, accomplishment, accomplishment_fr, best_work_exp, best_work_exp_fr, worst_work_exp, worst_work_exp_fr, superpower, superpower_fr){
    this.name = name;
    this.link = link;
    this.accomplishment = accomplishment;
    this.accomplishment_fr = accomplishment_fr;
    this.best_work_exp = best_work_exp;
    this.best_work_exp_fr = best_work_exp_fr;
    this.worst_work_exp = worst_work_exp;
    this.worst_work_exp_fr = worst_work_exp_fr;
    this.superpower = superpower;
    this.superpower_fr = superpower_fr;
};



CreateJobPosterAPI.selectedUnit = function(newID){
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
        var demoAreaEnglish = document.getElementById("createEditProfileDemoAreaEnglish");
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
        
         
    }
};

CreateEditProfileAPI.validateStep3 = function() {
    var valid = true;
    
    if (valid) {
        Utilities.debug?console.log(CreateEditProfileAPI.managerProfileObj):null;
        console.log(CreateEditProfileAPI.managerProfileObj);
        //submitForm();
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

CreateJobPosterAPI.hideCreateJobPosterForm = function(){
    var jobPosterCreation = document.getElementById("createJobPosterOverlay");    
    jobPosterCreation.classList.add("hidden");
    
};
