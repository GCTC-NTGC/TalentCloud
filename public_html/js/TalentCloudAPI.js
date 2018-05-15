/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TalentCloudAPI = {};
var siteContent;
TalentCloudAPI.roles = {jobseeker:"jobseeker", manager:"manager", admin:"administrator"};

TalentCloudAPI.pages = {
            home: {
                url: "#",
                state: function(){
                    TalentCloudAPI.loadPublic();
                    TalentCloudAPI.setNav("navigationHomeLinkWrapper");
                }
            },
            adminhome: {
                url: "#",
                state: function(){
                    TalentCloudAPI.loadAdmin();
                    TalentCloudAPI.setNav("navigationHomeLinkWrapper");
                }
            },
            BrowseJobs: {
                url: "#BrowseJobs",
                state: function(){
                    JobPostAPI.showBrowseJobs();
                    TalentCloudAPI.setNav("navigationBrowseLinkWrapper");
                    AccessibilityAPI.focusElement("browseHeroTitle");
                }
            },
            Login: {
                url: "#Login",
                state: function(){
                    UserAPI.showLogin();
                    TalentCloudAPI.setNav("navigationnavigationLoginLinkWrapper");
                }
            },
            Register: {
                url: "#Register",
                state: function(){
                    UserAPI.showRegisterForm();
                    document.getElementById("navigationRegisterLinkWrapper");
                }
            },
            MyProfile: {
                url: "#MyProfile",
                state: function(){
                    JobSeekerAPI.showJobSeekerProfile();
                    TalentCloudAPI.setNav("navigationProfileLinkWrapper");
                    AccessibilityAPI.focusElement("myProfilePic");
                }
            },
            Job:{
                url: "#Job",
                state: function(jobPostId){
                    JobPostAPI.viewJobPoster(jobPostId);
                    TalentCloudAPI.setNav("navigationBrowseLinkWrapper");
                }
            },
            CreateEditProfile:{
                url:"#CreateEditProfile",
                state: function(){
                    CreateEditProfileAPI.showCreateEditProfile();
                    TalentCloudAPI.setNav("navigationProfileLinkWrapper");
                }
            },
            Dashboard:{
                url:"#Dashboard",
                state: function(){
                    DashboardAPI.showDashboard();
                    TalentCloudAPI.setNav("navigationDashboardLinkWrapper");
                }
            },
            CreateJobPoster:{
                url:"#CreateJobPoster",
                state: function(){
                    CreateJobPosterAPI.showCreateJobPosterForm();
                    TalentCloudAPI.setNav("navigationPosterLinkWrapper");
                }
            },
            ManagerProfile:{
                url:"#ManagerProfile",
                state:function(managerProfileId){
                    ManagerProfileAPI.showManagerProfile(managerProfileId);
                }
            },
            JobApplication:{
                url:"#JobApplication",
                state:function(jobPosterId) {
                    JobApplicationAPI.showCreateJobApplication(jobPosterId);
                    TalentCloudAPI.setNav("navigationBrowseLinkWrapper");
                }
            },
            JobApplicationPreview:{
                url:"JobApplicationPreview",
                state:function(jobPosterId) {
                    JobApplicationPreviewAPI.showJobApplicationPreview(jobPosterId);
                    TalentCloudAPI.setNav("navigationBrowseLinkWrapper");
                }
            }
        };

/**
 *
 * @returns {undefined}
 */
TalentCloudAPI.load = function(){
    var pageToReload;
    var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    var managerView = false;
    var adminView = false;
    var location = document.location.hash;
    //console.log(location);
    //event.preventDefault();
    location_elements = location.split('\/');
    //console.log(location_elements[0]);
    data = location_elements[1];
    //console.log(window.location.href.indexOf("/"+TalentCloudAPI.roles.admin));
    if(window.location.href.indexOf("/admin") > -1) {
        adminView = true;
        location_elements[0] !== ""?pageToReload = TalentCloudAPI.pages[location_elements[0].substring(1, location_elements[0].length)]:pageToReload = TalentCloudAPI.pages["adminhome"];
        TalentCloudAPI.loadAdmin();
        console.log(adminView);
        if(pageToReload !== undefined){
            pageToReload.state(data);
        }else{
            window.history.replaceState(stateInfo, stateInfo.pageInfo, "/admin/#");
        }
    }else{
        TalentCloudAPI.loadPublic();
        location_elements[0] !== ""?pageToReload = TalentCloudAPI.pages[location_elements[0].substring(1, location_elements[0].length)]:pageToReload = TalentCloudAPI.pages["home"];
        if(pageToReload !== undefined){
            pageToReload.state(data);
        }else{
            window.history.replaceState(stateInfo, stateInfo.pageInfo, "/#");
        }
    }
    /*if(window.location.href.indexOf("/"+TalentCloudAPI.roles.manager) > -1) {

        managerView = true;
        TalentCloudAPI.loadManager();
        if(pageToReload !== undefined){
            pageToReload.state(data);
        }else{
            window.history.replaceState(stateInfo, stateInfo.pageInfo, "/manager/#");
        }
    }*/

};

/**
 *
 * @returns {undefined}
 */
TalentCloudAPI.loadPublic = function(){

    if(TalentCloudAPI.getLanguageFromCookie() !== undefined){
        locale = TalentCloudAPI.getLanguageFromCookie();
    }else{
        locale = "en_CA";
        TalentCloudAPI.setLanguageCookie(locale);
    }
    LookupAPI.loadLookupData();
    DataAPI.getTalentCloudUI(locale,false);
    //console(UserAPI.hasAuthToken());
    if(UserAPI.hasAuthToken()){
        if(UserAPI.hasSessionUser()){
            UserAPI.login();
        }
    }

};

/**
 *
 * @returns {undefined}
 */
TalentCloudAPI.loadManager = function(){

    if(TalentCloudAPI.getLanguageFromCookie() !== undefined){
        locale = TalentCloudAPI.getLanguageFromCookie();
    }else{
        locale = "en_CA";
    }
    //console.log(UserAPI.hasAuthToken());
    LookupAPI.loadLookupData();
    DataAPI.getTalentCloudUI(locale,true);
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthToken();
        if(UserAPI.hasSessionUser()){
            UserAPI.login(true);
            DataAPI.getJobSeekers(locale);
            DepartmentAPI.getDepartments(locale);
            DivisionAPI.getDivisions(locale);
            //Add log user in automatically
        }else{
            DataAPI.getJobSeekers(locale);
        }
    }else{
        DataAPI.getJobSeekers(locale);
    }
};


/**
 *
 * @returns {undefined}
 */
TalentCloudAPI.loadAdmin = function(){

    if(TalentCloudAPI.getLanguageFromCookie() !== undefined){
        locale = TalentCloudAPI.getLanguageFromCookie();
    }else{
        locale = "en_CA";
    }
    //console.log(UserAPI.hasAuthToken());
    LookupAPI.loadLookupData();
    DataAPI.getTalentCloudUI(locale,true);
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthTokenAsJSON();
        //console.log(authToken);
        //if(!UserAPI.hasAuthTokenExpired()){
            if(UserAPI.hasSessionUser()){
                var credentials = {};
                sessionUser = UserAPI.getSessionUserAsJSON();
                //console.log(sessionUser);
                credentials.email = sessionUser.email;
                //credentials.password = sessionUser.password;
                credentials.authToken = authToken;
                UserAPI.login(credentials);
                //Add log user in automatically
            }else{
                //DataAPI.getJobSeekers(locale);
            }
        /*}else{
            //DataAPI.getJobSeekers(locale);
        }*/
    }else{
        //DataAPI.getJobSeekers(locale);
    }
};

/**
 *
 * @param {type} locale
 * @returns {undefined}
 */
TalentCloudAPI.setLanguageCookie = function(locale){
    var name = "locale";
    var currentDate = new Date();
    currentDate = Utilities.addDays(currentDate, 1);
    var path = "/";

    Utilities.debug?console.log("cookieDateString=" + currentDate):null;
    Utilities.setCookie(name,locale,currentDate,path);
};

/**
 *
 * @returns {unresolved}
 */
TalentCloudAPI.getLanguageFromCookie = function(){
    var localeCookie = Utilities.getCookieByName("locale");
    Utilities.debug?console.log("localeCookie=" + localeCookie):null;
    return localeCookie;
};

/**
 *
 * @param {type} locale
 * @returns {undefined}
 */
TalentCloudAPI.setLanguage = function(locale){
    var currentLocale = TalentCloudAPI.getLanguageFromCookie();
    if(currentLocale !== undefined){
        //Utilities.debug?console.log("currentLocale=" + currentLocale):null;
        var feedbackLinkFrench = document.querySelector(".alert-banner__copy--francais");
        var feedbackLinkEnglish = document.querySelector(".alert-banner__copy--english");

        var skipNavTextFrench = document.querySelector(".skipNavTextFrench");
        var skipNavTextEnglish = document.querySelector(".skipNavTextEnglish");

        if(currentLocale === "en_CA"){
            currentLocale = "fr_CA";
            TalentCloudAPI.setLanguageCookie("fr_CA");
            feedbackLinkFrench.classList.remove("hidden");
            feedbackLinkEnglish.classList.add("hidden");
            skipNavTextFrench.classList.remove("hidden");
            skipNavTextEnglish.classList.add("hidden");
        }else{
            currentLocale = "en_CA";
            TalentCloudAPI.setLanguageCookie("en_CA");
            feedbackLinkFrench.classList.add("hidden");
            feedbackLinkEnglish.classList.remove("hidden");
            skipNavTextFrench.classList.add("hidden");
            skipNavTextEnglish.classList.remove("hidden");
        }
    }else{
        TalentCloudAPI.setLanguageCookie(locale);
    }
    TalentCloudAPI.load();
};

/**
 * Hides all overlays/dialogs and all main sections
 * @returns {undefined}
 */
TalentCloudAPI.hideAllContent = function(){
    var overlays = document.getElementById("overlays").children;
    var sections = document.getElementsByTagName("main")[0].children;


    for(var i = 0;i < overlays.length;i++){
        overlays[i].classList.add("hidden");
    }

    for(var i = 0;i < sections.length;i++){
        sections[i].classList.add("hidden");
    }
};

/**
 * Hides the circular GC Talent Cloud logo
 * @returns {undefined}
 */
TalentCloudAPI.hideLogo = function(){
    var logo = document.getElementById("logo-container");
    logo.classList.add("hidden");
};

/**
 *
 * @param {type} content
 * @param {type} isManager
 * @returns {undefined}
 */
TalentCloudAPI.setContent = function(content, isManager){

    //console.log(content);

    siteContent = content;
    document.title = siteContent.title;
    window.title = siteContent.title;

    // Common Navigation =======================================================
    var navigationLoginLink = document.getElementById("navigationLoginLink");
    navigationLoginLink.innerHTML = siteContent.navigationLoginLink;

    var navigationLogoutLink = document.getElementById("navigationLogoutLink");
    navigationLogoutLink.innerHTML = siteContent.navigationLogoutLink;

    var navigationRegisterLink = document.getElementById("navigationRegisterLink");
    navigationRegisterLink.innerHTML = siteContent.navigationRegisterLink;

    var navigationHomeLink = document.getElementById("navigationHomeLink");
    navigationHomeLink.innerHTML = siteContent.navigationHomeLink;

    var navigationProfileLink = document.getElementById("navigationProfileLink");
    navigationProfileLink.innerHTML = siteContent.navigationProfileLink;

    // Common Subpage Titles ===================================================
    var browseHeroTitle = document.getElementById("browseHeroTitle");
    browseHeroTitle.innerHTML = siteContent.browseHeroTitle;

    var dashboardHeroTitle = document.getElementById("dashboardHeroTitle");
    dashboardHeroTitle.innerHTML = siteContent.dashboardHeroTitle;

    var profileHeroTitle = document.getElementById("profileHeroTitle");
    profileHeroTitle.innerHTML = siteContent.profileHeroTitle;

    var applicationHeroTitle = document.getElementById("applicationHeroTitle");
    applicationHeroTitle.innerHTML = siteContent.applicationHeroTitle;

    var managerProfileHeroTitle = document.getElementById("managerProfileHeroTitle");
    managerProfileHeroTitle.innerHTML = siteContent.managerProfileHeroTitle;

    var posterHeroTitle = document.getElementById("posterHeroTitle");
    posterHeroTitle.innerHTML = siteContent.posterHeroTitle;

    var faqHeroTitle = document.getElementById("faqHeroTitle");
    faqHeroTitle.innerHTML = siteContent.faqHeroTitle;

    // Others ==================================================================


    var announcement = document.getElementById("announcement");
    announcement.innerHTML = siteContent.announcement;

    var gctc = document.getElementById("gctc");
    gctc.innerHTML = siteContent.gctc;

    var languageLink = document.getElementById("languageSelect");
    languageLink.innerHTML = siteContent.languageSelect;

    var logoSrc = document.getElementById("logoSrc");
    logoSrc.src = siteContent.logoSrc;

    var taglineMain = document.getElementById("taglineMain");
    taglineMain.innerHTML = siteContent.taglineMain;

    var canadaLink = document.getElementById("canadaLink");
    canadaLink.innerHTML = siteContent.canadaLink;
    canadaLink.href = siteContent.canadaLinkHref;

    var profileBasicInfoEditTitle = document.getElementById("profileBasicInfoEditTitle");
    profileBasicInfoEditTitle.innerHTML = siteContent.profileBasicInfoEditTitle;

    // Profile Photo Modal
    var updateProfilePhotoTitle = document.getElementById("updateProfilePhotoTitle");
    updateProfilePhotoTitle.innerHTML = siteContent.updateProfilePhotoTitle;

    var updateProfilePhotoDraggableAreaLabel = document.getElementById("updateProfilePhotoDraggableAreaLabel");
    updateProfilePhotoDraggableAreaLabel.innerHTML = siteContent.updateProfilePhotoDraggableAreaLabel;

    var updateProfilePhotoDraggableAreaErrorType = document.getElementById("updateProfilePhotoDraggableAreaErrorType");
    updateProfilePhotoDraggableAreaErrorType.innerHTML = siteContent.updateProfilePhotoDraggableAreaErrorType;

    var updateProfileOrCopy = document.getElementById("updateProfileOrCopy");
    updateProfileOrCopy.innerHTML = siteContent.updateProfileOrCopy;

    var updateProfileChoosePhotoButtonLabelSpan = document.getElementById("updateProfileChoosePhotoButtonLabelSpan");
    updateProfileChoosePhotoButtonLabelSpan.innerHTML = siteContent.updateProfileChoosePhotoButtonLabelSpan;

    var updateProfileChoosePhotoButton = document.getElementById("updateProfileChoosePhotoButton");
    updateProfileChoosePhotoButton.name = siteContent.updateProfileChoosePhotoButton;

    var updateProfileChooseAltPhotoButtonLabelSpan = document.getElementById("updateProfileChooseAltPhotoButtonLabelSpan");
    updateProfileChooseAltPhotoButtonLabelSpan.innerHTML = siteContent.updateProfileChooseAltPhotoButtonLabelSpan;

    var updateProfileChooseAltPhotoButton = document.getElementById("updateProfileChooseAltPhotoButton");
    updateProfileChooseAltPhotoButton.name = siteContent.updateProfileChooseAltPhotoButton;

    var updateProfilePhotoCancelButton = document.getElementById("updateProfilePhotoCancelButton");
    updateProfilePhotoCancelButton.innerHTML = siteContent.updateProfilePhotoCancelButton;

    var profileBasicInfoEditCancel = document.getElementById("profileBasicInfoEditCancel");
    profileBasicInfoEditCancel.value = siteContent.profileBasicInfoEditCancel;

    var updateProfilePhotoDraggableAreaErrorSize = document.getElementById("updateProfilePhotoDraggableAreaErrorSize");
    updateProfilePhotoDraggableAreaErrorSize.innerHTML = siteContent.updateProfilePhotoDraggableAreaErrorSize;

    // Manager Specific Content ================================================

    if(isManager){

        //console.log(isManager);

        CreateWorkEnvironmentAPI.localizeCreateWorkEnvironment();
        EditTeamCultureAPI.localizeEditTeamCulture();
        CreateJobPosterAPI.localizeCreateJobPosterForm(siteContent);
        CreateEditProfileAPI.localizeCreateEditProfile(siteContent);

        // Admin Navigation ====================================================
        var navigationPosterLink = document.getElementById("navigationPosterLink");
        navigationPosterLink.innerHTML = siteContent.navigationPosterLink;

        // Admin Subpage Titles ================================================

        // Others ==============================================================
        var adminPortal = document.getElementById("adminPortal");
        adminPortal.innerHTML = siteContent.adminPortal;

        var adminTagline = document.getElementById("adminTagline");
        adminTagline.innerHTML = siteContent.adminTagline;

        var adminAboutMe = document.getElementById("adminAboutMe");
        adminAboutMe.innerHTML = siteContent.adminAboutMe;

        var adminProfilePositionLabel = document.getElementById("createEditProfile_position_labelName");
        //adminProfilePositionLabel.innerHTML = siteContent.adminProfilePositionLabel;

        var adminProfileDepartmentLabel = document.getElementById("createEditProfile_department_labelName");
        //adminProfileDepartmentLabel.innerHTML = siteContent.adminProfileDepartmentLabel;

        //var createEditProfile_title = document.getElementById("createProfileWindowTitle");
        //createEditProfile_title.innerHTML = createProfileWindowTitle;

        var createEditProfile_required2 = document.getElementById("createEditProfile_requiredStep2");
        createEditProfile_required2.innerHTML = siteContent.required;

        var createEditProfile_required1 = document.getElementById("createEditProfile_requiredStep1");
        createEditProfile_required1.innerHTML = siteContent.required;

        var createEditProfile_submit = document.getElementById("createEditProfileSubmitButton");
        createEditProfile_submit.setAttribute("value", siteContent.submit);

        var createEditProfile_how_often_review_label = document.getElementById("createEditProfile_how_often_review_label");
        createEditProfile_how_often_review_label.innerHTML = siteContent.howOftenDoYouReview + ' *';

        var createEditProfile_how_often_early_label = document.getElementById("createEditProfile_how_often_early_label");
        createEditProfile_how_often_early_label.innerHTML = siteContent.howOftenDoYouStayLate + ' *';

        var profilePicUploadBtn = document.getElementById("profilePicUploadBtn");
        profilePicUploadBtn.innerHTML = siteContent.profilePicUploadBtn;

    }

    // Applicant Specific Content ==============================================

    if(!isManager){

        ManagerProfileAPI.localizeManagerProfile();
        JobPostAPI.localizeJobPoster();
        JobApplicationAPI.localizeCreateJobApplication();
        WorkEnvironmentAPI.localizeWorkEnvironment();
        TeamCultureAPI.localizeTeamCulture();
        JobSeekerAPI.localizeJobSeekerProfile();
        JobApplicationPreviewAPI.localizeJobApplicationPreview();

        // Applicant Navigation ================================================
        var navigationDashboardLink = document.getElementById("navigationDashboardLink");
        navigationDashboardLink.innerHTML = siteContent.navigationDashboardLink;

        var navigationBrowseLink = document.getElementById("navigationBrowseLink");
        navigationBrowseLink.innerHTML = siteContent.navigationBrowseLink;

        // Applicant Subpage Titles ============================================

        // Applicant Job Poster Content ========================================
        var jobPosterSubnavLabel = document.getElementById("jobPosterSubnavLabel");
        jobPosterSubnavLabel.innerHTML = siteContent.jobPosterSubnavLabel;

        var jobPosterSubnavItemBasics = document.getElementById("jobPosterSubnavItemBasics");
        jobPosterSubnavItemBasics.innerHTML = siteContent.jobPosterSubnavItemBasics;

        var jobPosterSubnavItemImpact = document.getElementById("jobPosterSubnavItemImpact");
        jobPosterSubnavItemImpact.innerHTML = siteContent.jobPosterSubnavItemImpact;

        var jobPosterSubnavItemWork = document.getElementById("jobPosterSubnavItemWork");
        jobPosterSubnavItemWork.innerHTML = siteContent.jobPosterSubnavItemWork;

        var jobPosterSubnavItemCriteria = document.getElementById("jobPosterSubnavItemCriteria");
        jobPosterSubnavItemCriteria.innerHTML = siteContent.jobPosterSubnavItemCriteria;

        var jobPosterSubnavItemCulture = document.getElementById("jobPosterSubnavItemCulture");
        jobPosterSubnavItemCulture.innerHTML = siteContent.jobPosterSubnavItemCulture;

        var jobPosterSubnavItemKnow = document.getElementById("jobPosterSubnavItemKnow");
        jobPosterSubnavItemKnow.innerHTML = siteContent.jobPosterSubnavItemKnow;

        var jobPosterSubnavItemApply = document.getElementById("jobPosterSubnavItemApply");
        jobPosterSubnavItemApply.innerHTML = siteContent.jobPosterSubnavItemApply;

        var jobPosterContentTitleBasics = document.getElementById("jobPosterContentTitleBasics");
        jobPosterContentTitleBasics.innerHTML = siteContent.jobPosterContentTitleBasics;

        var jobPosterContentTitleImpact = document.getElementById("jobPosterContentTitleImpact");
        jobPosterContentTitleImpact.innerHTML = siteContent.jobPosterContentTitleImpact;

        var jobPosterContentTitleWork = document.getElementById("jobPosterContentTitleWork");
        jobPosterContentTitleWork.innerHTML = siteContent.jobPosterContentTitleWork;

        var jobPosterContentTitleCriteria = document.getElementById("jobPosterContentTitleCriteria");
        jobPosterContentTitleCriteria.innerHTML = siteContent.jobPosterContentTitleCriteria;

        var jobPosterContentTitleCulture = document.getElementById("jobPosterContentTitleCulture");
        jobPosterContentTitleCulture.innerHTML = siteContent.jobPosterContentTitleCulture;

        var jobPosterContentTitleKnow = document.getElementById("jobPosterContentTitleKnow");
        jobPosterContentTitleKnow.innerHTML = siteContent.jobPosterContentTitleKnow;

        var jobPosterContentTitleApply = document.getElementById("jobPosterContentTitleApply");
        jobPosterContentTitleApply.innerHTML = siteContent.jobPosterContentTitleApply;

        // Others ==============================================================
        var applicantPortal = document.getElementById("applicantPortal");
        applicantPortal.innerHTML = siteContent.applicantPortal;

        var taglineSecondary = document.getElementById("taglineSecondary");
        taglineSecondary.innerHTML = siteContent.taglineSecondary;

        var taglineTertiary = document.getElementById("taglineTertiary");
        taglineTertiary.innerHTML = siteContent.taglineTertiary;

        var howItWorksHeading = document.getElementById("howItWorksHeading");
        howItWorksHeading.innerHTML = siteContent.howItWorksHeading;

        var howItWorksLead = document.getElementById("howItWorksLead");
        howItWorksLead.innerHTML = siteContent.howItWorksLead;

        var ownYourStory = document.getElementById("ownYourStory");
        ownYourStory.innerHTML = siteContent.ownYourStory;

        var ownYourStoryText = document.getElementById("ownYourStoryText");
        ownYourStoryText.innerHTML = siteContent.ownYourStoryText;

        var getFound = document.getElementById("getFound");
        getFound.innerHTML = siteContent.getFound;

        var getFoundText = document.getElementById("getFoundText");
        getFoundText.innerHTML = siteContent.getFoundText;

        var contribute = document.getElementById("contribute");
        contribute.innerHTML = siteContent.contribute;

        var contributeText = document.getElementById("contributeText");
        contributeText.innerHTML = siteContent.contributeText;

        var howItWorksLeadOut = document.getElementById("howItWorksLeadOut");
        howItWorksLeadOut.innerHTML = siteContent.howItWorksLeadOut;

        var ourTeam = document.getElementById("ourTeam");
        ourTeam.innerHTML = siteContent.ourTeam;

        var ourTeamText = document.getElementById("ourTeamText");
        ourTeamText.innerHTML = siteContent.ourTeamText;

        var contactUs = document.getElementById("contactUs");
        contactUs.innerHTML = siteContent.contactUs;

        var howItWorksLast = document.getElementById("howItWorksLast");
        howItWorksLast.innerHTML = siteContent.howItWorksLast;

        // var transcript = document.getElementById("transcript");
        // transcript.innerHTML = siteContent.transcript;

        var profileBasicInfoEditTitle = document.getElementById("profileBasicInfoEditTitle");
        profileBasicInfoEditTitle.innerHTML = siteContent.profileBasicInfoEditTitle;

        var managerDecisions_tipWhatis = document.getElementById("managerDecisions_tipWhatis");
        managerDecisions_tipWhatis.innerHTML = siteContent.managerDecisions_tipWhatis;

        var managerDecisions_tipSummary = document.getElementById("managerDecisions_tipSummary");
        managerDecisions_tipSummary.innerHTML = siteContent.managerDecisions_tipSummary;

        // Profile Photo Modal
        var updateProfilePhotoTitle = document.getElementById("updateProfilePhotoTitle");
        updateProfilePhotoTitle.innerHTML = siteContent.updateProfilePhotoTitle;

        var updateProfilePhotoDraggableAreaLabel = document.getElementById("updateProfilePhotoDraggableAreaLabel");
        updateProfilePhotoDraggableAreaLabel.innerHTML = siteContent.updateProfilePhotoDraggableAreaLabel;

        var updateProfilePhotoDraggableAreaErrorType = document.getElementById("updateProfilePhotoDraggableAreaErrorType");
        updateProfilePhotoDraggableAreaErrorType.innerHTML = siteContent.updateProfilePhotoDraggableAreaErrorType;

        var updateProfileOrCopy = document.getElementById("updateProfileOrCopy");
        updateProfileOrCopy.innerHTML = siteContent.updateProfileOrCopy;

        var updateProfileChoosePhotoButtonLabelSpan = document.getElementById("updateProfileChoosePhotoButtonLabelSpan");
        updateProfileChoosePhotoButtonLabelSpan.innerHTML = siteContent.updateProfileChoosePhotoButtonLabelSpan;

        var updateProfileChoosePhotoButton = document.getElementById("updateProfileChoosePhotoButton");
        updateProfileChoosePhotoButton.name = siteContent.updateProfileChoosePhotoButton;

        var updateProfileChooseAltPhotoButtonLabelSpan = document.getElementById("updateProfileChooseAltPhotoButtonLabelSpan");
        updateProfileChooseAltPhotoButtonLabelSpan.innerHTML = siteContent.updateProfileChooseAltPhotoButtonLabelSpan;

        var updateProfileChooseAltPhotoButton = document.getElementById("updateProfileChooseAltPhotoButton");
        updateProfileChooseAltPhotoButton.name = siteContent.updateProfileChooseAltPhotoButton;

        var updateProfilePhotoCancelButton = document.getElementById("updateProfilePhotoCancelButton");
        updateProfilePhotoCancelButton.innerHTML = siteContent.updateProfilePhotoCancelButton;

        var updateProfileApplicantProfileFormNameLabelSpan = document.getElementById("updateProfileApplicantProfileFormNameLabelSpan");
        updateProfileApplicantProfileFormNameLabelSpan.innerHTML = siteContent.updateProfileApplicantProfileFormNameLabelSpan;

        var profileEditName = document.getElementById("profileEditName");
        profileEditName.name = siteContent.profileEditName;

        var updateProfileApplicantProfileFormTaglineLabelSpan = document.getElementById("updateProfileApplicantProfileFormTaglineLabelSpan");
        updateProfileApplicantProfileFormTaglineLabelSpan.innerHTML = siteContent.updateProfileApplicantProfileFormTaglineLabelSpan;

        var profileEditTagline = document.getElementById("profileEditTagline");
        profileEditTagline.name = siteContent.profileEditTagline;

        var updateProfileApplicantProfileFormTwitterLabelSpan = document.getElementById("updateProfileApplicantProfileFormTwitterLabelSpan");
        updateProfileApplicantProfileFormTwitterLabelSpan.innerHTML = siteContent.updateProfileApplicantProfileFormTwitterLabelSpan;

        var profileEditTwitter = document.getElementById("profileEditTwitter");
        profileEditTwitter.name = siteContent.profileEditTwitter;

        var updateProfileApplicantProfileFormLinkedinLabelSpan = document.getElementById("updateProfileApplicantProfileFormLinkedinLabelSpan");
        updateProfileApplicantProfileFormLinkedinLabelSpan.innerHTML = siteContent.updateProfileApplicantProfileFormLinkedinLabelSpan;

        var profileEditLinkedin = document.getElementById("profileEditLinkedin");
        profileEditLinkedin.name = siteContent.profileEditLinkedin;

        var profileBasicInfoEditCancel = document.getElementById("profileBasicInfoEditCancel");
        profileBasicInfoEditCancel.value = siteContent.profileBasicInfoEditCancel;

        var profileBasicInfoEditSave = document.getElementById("profileBasicInfoEditSave");
        profileBasicInfoEditSave.value = siteContent.profileBasicInfoEditSave;

        var loginFormTitle = document.getElementById("loginFormTitle");
        loginFormTitle.innerHTML = siteContent.loginFormTitle;

        var loginModalCopySpan = document.getElementById("loginModalCopySpan");
        loginModalCopySpan.innerHTML = siteContent.loginModalCopySpan;

        var switchToRegister = document.getElementById("switchToRegister");
        switchToRegister.innerHTML = siteContent.switchToRegister;
        switchToRegister.title = siteContent.switchToRegister;

        var loginModalEmailLabelSpan = document.getElementById("loginModalEmailLabelSpan");
        loginModalEmailLabelSpan.innerHTML = siteContent.loginModalEmailLabelSpan;

        var login_email = document.getElementById("login_email");
        login_email.name = siteContent.login_email;

        var loginModalPasswordLabelSpan = document.getElementById("loginModalPasswordLabelSpan");
        loginModalPasswordLabelSpan.innerHTML = siteContent.loginModalPasswordLabelSpan;

        var login_password = document.getElementById("login_password");
        login_password.name = siteContent.login_password;

        var loginFormCancelBtn = document.getElementById("loginFormCancelBtn");
        loginFormCancelBtn.value = siteContent.loginFormCancelBtn;

        var loginFormLoginBtn = document.getElementById("loginFormLoginBtn");
        loginFormLoginBtn.value = siteContent.loginFormLoginBtn;

        var registerFormTitle = document.getElementById("registerFormTitle");
        registerFormTitle.innerHTML = siteContent.registerFormTitle;

        var managerDecisions_tipWhatis = document.getElementById("managerDecisions_tipWhatis");
        //managerDecisions_tipWhatis.innerHTML = siteContent.managerDecisions_tipWhatis;

        var managerDecisions_tipSummary = document.getElementById("managerDecisions_tipSummary");
        //managerDecisions_tipSummary.innerHTML = siteContent.managerDecisions_tipSummary;

        // var accommodationTextStart = document.getElementById("accommodationTextStart");
        // accommodationTextStart.innerHTML = siteContent.accommodationTextStart;

        // var accommodationTextEnd = document.getElementById("accommodationTextEnd");
        // accommodationTextEnd.innerHTML = siteContent.accommodationTextEnd;

        // var jobPosterKeyTasksLabel = document.getElementById("jobPosterKeyTasksLabel");
        // jobPosterKeyTasksLabel.innerHTML = siteContent.jobPosterKeyTasksLabel;

        var jobPosterCoreCompetenciesLabel = document.getElementById("jobPosterCoreCompetenciesLabel");
        jobPosterCoreCompetenciesLabel.innerHTML = siteContent.jobPosterCoreCompetenciesLabel;

        var jobPosterDevelopingCompetenciesLabel = document.getElementById("jobPosterDevelopingCompetenciesLabel");
        jobPosterDevelopingCompetenciesLabel.innerHTML = siteContent.jobPosterDevelopingCompetenciesLabel;

        var jobPosterHiringManagerLabel = document.getElementById("jobPosterHiringManagerLabel");
        jobPosterHiringManagerLabel.innerHTML = siteContent.jobPosterHiringManagerLabel;

        var jobPosterClearanceLevelLabel = document.getElementById("jobPosterClearanceLevelLabel");
        jobPosterClearanceLevelLabel.innerHTML = siteContent.jobPosterClearanceLevelLabel;

        var jobPosterStartDateLabel = document.getElementById("jobPosterStartDateLabel");
        jobPosterStartDateLabel.innerHTML = siteContent.jobPosterStartDateLabel;

        var jobPosterJobLevelLabel = document.getElementById("jobPosterJobLevelLabel");
        jobPosterJobLevelLabel.innerHTML = siteContent.jobPosterJobLevelLabel;

        var jobPosterLanguageLabel = document.getElementById("jobPosterLanguageLabel");
        jobPosterLanguageLabel.innerHTML = siteContent.jobPosterLanguageLabel;

        var jobPosterTermLabel = document.getElementById("jobPosterTermLabel");
        jobPosterTermLabel.innerHTML = siteContent.jobPosterTermLabel;

        var jobPosterTeamNarrativeText_label = document.getElementById("jobPosterTeamNarrativeText_label");
        jobPosterTeamNarrativeText_label.innerHTML = siteContent.jobPosterTeamNarrativeText_label;

        var jobPosterOperatingContext_label = document.getElementById("jobPosterOperatingContext_label");
        jobPosterOperatingContext_label.innerHTML = siteContent.jobPosterOperatingContext_label;

        var jobPosterWhatWeValue_label = document.getElementById("jobPosterWhatWeValue_label");
        jobPosterWhatWeValue_label.innerHTML = siteContent.jobPosterWhatWeValue_label;

        var jobPosterHowWeWork_label = document.getElementById("jobPosterHowWeWork_label");
        jobPosterHowWeWork_label.innerHTML = siteContent.jobPosterHowWeWork_label;

        var termsAndConditions = document.getElementById("termsAndConditions");
        termsAndConditions.innerHTML = siteContent.termsAndConditions;

        var privacy = document.getElementById("privacy");
        privacy.innerHTML = siteContent.privacy;

        var jobPosterBackButtonText = document.getElementById("jobPosterBackButtonText");
        jobPosterBackButtonText.innerHTML = siteContent.jobPosterBackButtonText;

        var jobPosterBackButtonText2 = document.getElementById("jobPosterBackButtonText2");
        jobPosterBackButtonText2.innerHTML = siteContent.jobPosterBackButtonText;

    }

};

TalentCloudAPI.setNav = function(navItemToHighlightId){
    var navItems = document.querySelectorAll(".page-hero__navigation-item"), i;
    for (i = 0; i < navItems.length; ++i) {
        navItems[i].classList.remove("active");
    }
    var navItemToHighlight = document.getElementById(navItemToHighlightId);
    navItemToHighlight.classList.add("active");
    var mobileMenuTrigger = document.getElementById("pageHeroMobileTrigger");
    var mainMenu = document.getElementById("pageHeroNavigationMenu");
    mobileMenuTrigger.classList.remove("active");
    mainMenu.classList.remove("active");
};
