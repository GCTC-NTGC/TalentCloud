var ManagerProfileAPI = {};

ManagerProfileAPI.ManagerProfile = function(){
    this.user_id = null,
    this.manager_profile_id = null;
    this.department_id = null;
    this.position = null;
    this.twitter = null;
    this.linkedin = null;
    
    this.locale_id = null;
    this.about_me = null;
    this.accomplishment = null;
    this.branch = null;
    this.division = null;
    this.lead_style = null;
    this.employee_learning = null;
    this.expectations = null;
    this.review_options = null;
    this.stay_late = null;
    this.engagement = null;
    this.development_opportunities = null;
    this.low_value_work_requests = null;
    this.work_experience = null;
    this.education = null;
    
    this.firstname = null;
    this.lastname = null;
};

/**
 * 
 * @param {XMLHttpRequest} response - returned from http request
 * @return {MangagerProfileAPI.ManagerProfile}
 */
ManagerProfileAPI.parseManagerProfileResponse = function(response) {
    var manager_profile_with_details_json = JSON.parse(response);
    
    var manager_profile = manager_profile_with_details_json.manager_profile;
    var manager_profile_details = manager_profile_with_details_json.manager_profile_details;
    var manager_user = manager_profile_with_details_json.user;
    
    var profile = new ManagerProfileAPI.ManagerProfile();
    profile.user_id = manager_profile.user_id;
    profile.manager_profile_id = manager_profile.user_manager_profile_id;
    profile.department_id = manager_profile.user_manager_profile_department_id;
    profile.position = manager_profile.user_manager_profile_position;
    profile.twitter = manager_profile.user_manager_profile_twitter;
    profile.linkedin = manager_profile.user_manager_profile_linkedin;
    
    profile.locale_id = manager_profile_details.locale_id;
    profile.about_me = manager_profile_details.user_manager_profile_details_aboutme;
    profile.accomplishment = manager_profile_details.user_manager_profile_details_proud;
    profile.branch = manager_profile_details.user_manager_profile_details_branch;
    profile.division = manager_profile_details.user_manager_profile_details_division;
    profile.lead_style = manager_profile_details.user_manager_profile_details_lead_style;
    profile.employee_learning = manager_profile_details.user_manager_profile_details_emp_learn;
    profile.expectations = manager_profile_details.user_manager_profile_details_expectations;
    profile.review_options = manager_profile_details.user_manager_profile_review_options;
    profile.stay_late = manager_profile_details.user_manager_profile_staylate;
    profile.engagement = manager_profile_details.user_manager_profile_engage;
    profile.development_opportunities = manager_profile_details.user_manager_profile_devops;
    profile.low_value_work_requests = manager_profile_details.user_manager_profile_lvwrequests;
    profile.work_experience = manager_profile_details.user_manager_profile_work_experience;
    profile.education = manager_profile_details.user_manager_profile_education;
    
    profile.firstname = manager_user.firstname;
    profile.lastname = manager_user.lastname;
    
    return profile;
};

ManagerProfileAPI.showManagerProfile = function(user_id) {
    var stateInfo = {pageInfo: 'manager_profile', pageTitle: 'Talent Cloud: Manager Profile'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#ManagerProfile/' + user_id);
    
    // focus top of page
    window.scrollTo(0,0);
    
    TalentCloudAPI.hideAllContent();
    var managerProfileSection = document.getElementById('managerProfileSection');
    managerProfileSection.classList.remove('hidden');
    
    //DataAPI.getUser(user_id, ManagerProfileAPI.populateManagerProfileName);
    DataAPI.getManagerProfile(user_id, ManagerProfileAPI.populateManagerProfile);
    ProfilePicAPI.refreshProfilePic(user_id, document.getElementById('managerProfilePic'));
}

ManagerProfileAPI.localizeManagerProfile = function() {
    if (siteContent) {
        document.getElementById("managerProfilePositionAtLabel").innerHTML = siteContent.at;
        document.getElementById("managerProfileAboutMeTitle").innerHTML = siteContent.aLittleBitAboutMe;
        document.getElementById("managerProfileAccomplishmentTitle").innerHTML = siteContent.whatImMostProudOfInCareer;
        document.getElementById("managerProfileLeadershipStyleTitle").innerHTML = siteContent.myLeadershipStyle;
        document.getElementById("managerProfileExpectationsTitle").innerHTML = siteContent.myExpectationsOfEmployees;
        document.getElementById("managerProfileDecisionMakingTitle").innerHTML = siteContent.myApproachToDecisionMaking;
        document.getElementById("managerProfileEducationTitle").innerHTML = siteContent.education;
        document.getElementById("managerProfileExperienceTitle").innerHTML = siteContent.workExperience;
    }
}

ManagerProfileAPI.populateManagerProfileName = function(response) {
    var user = UserAPI.parseUserResponse(response);
    
    document.getElementById("managerProfileFirstName").innerHTML = user.firstname;
    document.getElementById("managerProfileLastName").innerHTML = user.lastname;
};

ManagerProfileAPI.populateManagerProfile = function(response) {
    var profile = ManagerProfileAPI.parseManagerProfileResponse(response);
    
    var user_id = document.getElementById("managerProfile_userId");
    user_id.value = profile.user_id;
    
    var manager_id = document.getElementById("managerProfile_managerProfileId");
    manager_id.value = profile.manager_profile_id;

    document.getElementById("managerProfileFirstName").innerHTML = profile.firstname;
    document.getElementById("managerProfileLastName").innerHTML = profile.lastname;

    //var last_updated = document.getElementById("profileLastUpdated");

    var position = document.getElementById("managerProfilePosition");
    position.innerHTML = profile.position;
    
    var department = document.getElementById("managerProfileDepartment");
    department.innerHTML = LookupAPI.getLocalizedLookupValue("department", profile.department_id);

    var twitter_link = document.getElementById("managerProfileTwitterLink");
    var twitter_link_wrapper = document.getElementById("managerProfileTwitterLinkWrapper");
    if (profile.twitter == null || profile.twitter == "") {
        twitter_link_wrapper.classList.add("hidden");
        twitter_link.href = "javascript:void(0)";
    } else {
        twitter_link_wrapper.classList.remove("hidden");
        twitter_link.href = ManagerProfileAPI.twitterUsernameToLink(profile.twitter);
    }

    var linkedin_link = document.getElementById("managerProfileLinkedinLink");
    var linkedin_link_wrapper = document.getElementById("managerProfileLinkedinLinkWrapper");
    if (profile.linkedin == null || profile.linkedin == "") {
        linkedin_link_wrapper.classList.add("hidden");
        linkedin_link.href = "#";
    } else {
        linkedin_link_wrapper.classList.remove("hidden");
        linkedin_link.href = ManagerProfileAPI.linkedInHandleToLink(profile.linkedin);
    } 
    
    document.getElementById("managerProfileAboutMe").innerHTML = profile.about_me;
    document.getElementById("managerProfileAccomplishment").innerHTML = profile.accomplishment;
    document.getElementById("managerProfileLeadershipStyle").innerHTML = profile.lead_style;
    document.getElementById("managerProfileExpectations").innerHTML = profile.expectations;
    
    var reviewOptions = {
            'option0':siteContent.managerProfile_review_option0,
            'option1':siteContent.managerProfile_review_option1,
            'option2':siteContent.managerProfile_review_option2,
            'option3':siteContent.managerProfile_review_option3,
            'option4':siteContent.managerProfile_review_option4
        };
    var stayLateOptions = {
            'option0':siteContent.managerProfile_stayLate_option0,
            'option1':siteContent.managerProfile_stayLate_option1,
            'option2':siteContent.managerProfile_stayLate_option2,
            'option3':siteContent.managerProfile_stayLate_option3,
            'option4':siteContent.managerProfile_stayLate_option4
        };
    var engagementOptions = {
            'option0':siteContent.managerProfile_engagement_option0,
            'option1':siteContent.managerProfile_engagement_option1,
            'option2':siteContent.managerProfile_engagement_option2,
            'option3':siteContent.managerProfile_engagement_option3,
            'option4':siteContent.managerProfile_engagement_option4
        };
    var developmentOpportunityOptions = {
            'option0':siteContent.managerProfile_developmentOpportunities_option0,
            'option1':siteContent.managerProfile_developmentOpportunities_option1,
            'option2':siteContent.managerProfile_developmentOpportunities_option2,
            'option3':siteContent.managerProfile_developmentOpportunities_option3,
            'option4':siteContent.managerProfile_developmentOpportunities_option4
        };

    var acceptLowValueWorkRequestsOptions = {
            'option0':siteContent.managerProfile_acceptLowValueWorkRequests_option0,
            'option1':siteContent.managerProfile_acceptLowValueWorkRequests_option1,
            'option2':siteContent.managerProfile_acceptLowValueWorkRequests_option2,
            'option3':siteContent.managerProfile_acceptLowValueWorkRequests_option3,
            'option4':siteContent.managerProfile_acceptLowValueWorkRequests_option4
        };
          
    document.getElementById('managerProfile_review').innerHTML = reviewOptions[profile.review_options];
    document.getElementById('managerProfile_stayLate').innerHTML = stayLateOptions[profile.stay_late];
    document.getElementById('managerProfile_engagement').innerHTML = engagementOptions[profile.engagement];
    document.getElementById('managerProfile_developmentOpportunities').innerHTML = developmentOpportunityOptions[profile.development_opportunities];
    document.getElementById('managerProfile_acceptLowValueWorkRequests').innerHTML =acceptLowValueWorkRequestsOptions[profile.low_value_work_requests];
    
    //SliderAPI.selectOptionByValue("managerProfile_staylate_groupName", profile.stay_late, "staylate");
    //SliderAPI.selectOptionByValue("managerProfile_engagement_groupName", profile.engagement, "engage");
    //SliderAPI.selectOptionByValue("managerProfile_developmentOpportunities_groupName", profile.development_opportunities, "devops");
    
    //TODO: treat education and work history as lists
    document.getElementById('managerProfileEducation').innerHTML = profile.education;
    document.getElementById('managerProfileExperience').innerHTML = profile.work_experience;
};

ManagerProfileAPI.twitterUsernameToLink = function(twitterUsername) {
    if (twitterUsername.startsWith('@')) {
        return "https://twitter.com/" + twitterUsername.substring(1);
    } else {
        return "https://twitter.com/" + twitterUsername;
    }
};

ManagerProfileAPI.linkedInHandleToLink = function(linkedInHandle) {
    return "https://www.linkedin.com/in/"+linkedInHandle;
}

