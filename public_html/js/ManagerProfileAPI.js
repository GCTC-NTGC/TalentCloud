ManagerProfileAPI = {};



ManagerProfileAPI.ManagerProfile = function(
        user_manager_profile_id, 
        user_manager_profile_department,
        user_manager_profile_position,
        user_manager_profile_branch_id,
        user_manager_profile_division_id,
        user_manager_profile_twitter,
        user_manager_profile_linkedin,
        user_id,
        profile_pic){
    this.user_manager_profile_id = user_manager_profile_id;
    this.user_manager_profile_department = user_manager_profile_department;
    this.user_manager_profile_position = user_manager_profile_position;
    this.user_manager_profile_branch_id = user_manager_profile_branch_id;
    this.user_manager_profile_division_id = user_manager_profile_division_id;
    this.user_manager_profile_twitter = user_manager_profile_twitter;
    this.user_manager_profile_linkedin = user_manager_profile_linkedin;
    this.user_id = user_id,
    this.profile_pic = profile_pic;
};

ManagerProfileAPI.ManagerProfileDetails = function(
        user_manager_profile_details_id,
        locale_id,
        user_manager_profile_details_aboutme,
        user_manager_profile_details_proud,
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

ManagerProfileAPI.showManagerProfile = function(user_id) {
    var stateInfo = {pageInfo: 'manager_profile', pageTitle: 'Talent Cloud: Manager Profile'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#ManagerProfile/' + user_id);
    
    TalentCloudAPI.hideAllContent();
    var managerProfileSection = document.getElementById('managerProfileSection');
    managerProfileSection.classList.remove('hidden');
    
    DataAPI.getManagerProfile(user_id, ManagerProfileAPI.populateManagerProfile);
}

ManagerProfileAPI.populateManagerProfile = function(response) {
    var manager_profile_with_details_json = JSON.parse(response);
    
    var manager_profile_json = manager_profile_with_details_json["manager_profile"];
    
    var manager_profile_details_json = manager_profile_with_details_json["manager_profile_details"];
};

