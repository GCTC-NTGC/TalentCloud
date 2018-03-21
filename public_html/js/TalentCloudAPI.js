/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TalentCloudAPI = {};
var siteContent;
TalentCloudAPI.roles = {jobseeker:"jobseeker", manager:"manager", admin:"admin"};

TalentCloudAPI.Content = function(title,helpLearn,languageSelect,applyNow,loginLink,logoutLink,registerLink,homeLink,profileLink,
jobPostersLink,teamsLink,jobNumber,jobTitle,jobLocation,jobCity,jobProvince,jobApplicantsSoFar,jobUnitsToCloseHours,
jobUnitsToCloseDays,jobUnitsToCloseMonths,jobUntilClose,jobTerm,viewButton,jobSalaryRange, submitApplication, step1, step2, 
step3, review, goToStep2, goToStep1, goToStep3, goToReview, createJobPosterWindowTitle, createProfileWindowTitle, required, 
createJobPosterSubmitInstructions, generalInformation, aboutMe, aLittleBitAboutMe, whatImMostProudOfInCareer, position,
department, branch, division, leadershipStyle, myLeadershipStyle, myApproachToEmployee, myExpectationsOfEmployees,
myApproachToDecisionMaking, workExperience, education, howOftenDoYouReview, howOftenDoYouStayLate, almostNever,
rarely, sometimes, usually, almostAlways, name, browseLink, gctc, at, howOftenDoYouEngage, howOftenDoYouApproveDevelopment,
readMore, canadaLink, canadaLinkHref, taglineMain, taglineSecondary, taglineTertiary, howItWorksHeading, howItWorksLead, //howItWorksMainHtml,
logoSrc, logoAlt, ownYourStory, ownYourStoryText, getFound, getFoundText, contribute, contributeText, howItWorksLeadOut,
howItWorksLast, contactUs, transcript, ourTeam, ourTeamText, browseTitle, createJobApplicationWindowTitle, createJobApplicationJobTitleLabel,
createJobApplicationConfirmationPositionLabel, jobApplicationConfirmationTrackingReminder,continueToDashboard, announcement, applicantPortal, adminPortal,
workEnvironment, remoteLocationAllowed, teleworkAllowed, flexHoursAllowed, yes, no, physicalEnvironment,
dashBoardLink,yourApplicationsTitle) {
    this.title = title;
    this.helpLearn = helpLearn;
    this.languageSelect = languageSelect;
    this.loginLink = loginLink;
    this.logoutLink = logoutLink;
    this.registerLink = registerLink;
    this.applyNow = applyNow;
    this.homeLink = homeLink;
    this.profileLink = profileLink;
    this.jobPostersLink = jobPostersLink;
    this.teamsLink = teamsLink;
    this.jobNumber = jobNumber;
    this.jobTitle = jobTitle;
    this.jobLocation = jobLocation;
    this.jobCity = jobCity;
    this.jobProvince = jobProvince;
    this.jobApplicantsSoFar = jobApplicantsSoFar;
    this.jobUnitsToCloseHours = jobUnitsToCloseHours;
    this.jobUnitsToCloseDays = jobUnitsToCloseDays;
    this.jobUnitsToCloseMonths = jobUnitsToCloseMonths;
    this.jobUntilClose = jobUntilClose;
    this.jobTerm = jobTerm;
    this.viewButton = viewButton;
    this.jobSalaryRange = jobSalaryRange;
    this.submitApplication = submitApplication;
    this.step1 = step1;
    this.step2 = step2;
    this.step3 = step3;
    this.review = review;
    this.goToStep2 = goToStep2;
    this.goToStep1 = goToStep1;
    this.goToStep3 = goToStep3;
    this.goToReview = goToReview;
    this.createJobPosterWindowTitle = createJobPosterWindowTitle;
    this.createProfileWindowTitle = createProfileWindowTitle;
    this.required = required;
    this.createJobPosterSubmitInstructions = createJobPosterSubmitInstructions;
    this.generalInformation = generalInformation;
    this.aboutMe = aboutMe;
    this.aLittleBitAboutMe = aLittleBitAboutMe;
    this.whatImMostProudOfInCareer = whatImMostProudOfInCareer;
    this.position = position;
    this.department = department;
    this.branch = branch;
    this.division = division;
    this.leadershipStyle = leadershipStyle;
    this.myLeadershipStyle = myLeadershipStyle;
    this.myApproachToEmployee = myApproachToEmployee;
    this.myExpectationsOfEmployees = myExpectationsOfEmployees;
    this.myApproachToDecisionMaking = myApproachToDecisionMaking;
    this.workExperience = workExperience;
    this.education = education;
    this.howOftenDoYouReview = howOftenDoYouReview;
    this.howOftenDoYouStayLate = howOftenDoYouStayLate;
    this.howOftenDoYouEngage = howOftenDoYouEngage;
    this.howOftenDoYouApproveDevelopment = howOftenDoYouApproveDevelopment;
    this.almostNever = almostNever;
    this.rarely = rarely;
    this.sometimes = sometimes;
    this.usually = usually;
    this.almostAlways = almostAlways;
    this.name = name;
    this.browseLink = browseLink;
    this.gctc = gctc;
    this.at = at;
    this.readMore = readMore;
    this.canadaLink = canadaLink;
    this.canadaLinkHref = canadaLinkHref;
    this.taglineMain = taglineMain;
    this.taglineSecondary = taglineSecondary;
    this.taglineTertiary = taglineTertiary;
    this.howItWorksHeading = howItWorksHeading;
    this.howItWorksLead = howItWorksLead;
    //this.howItWorksMainHtml = howItWorksMainHtml;
    this.logoSrc = logoSrc;
    this.logoAlt = logoAlt;
    this.ownYourStory = ownYourStory;
    this.ownYourStoryText = ownYourStoryText;
    this.getFound = getFound;
    this.getFoundText = getFoundText;
    this.contribute = contribute;
    this.contributeText = contributeText;
    this.howItWorksLeadOut = howItWorksLeadOut;
    this.howItWorksLast = howItWorksLast;
    this.contactUs = contactUs;
    this.transcript = transcript;
    this.ourTeam = ourTeam;
    this.ourTeamText = ourTeamText;
    this.browseTitle = browseTitle;
    this.createJobApplicationWindowTitle = createJobApplicationWindowTitle;
    this.createJobApplicationJobTitleLabel = createJobApplicationJobTitleLabel;
    this.createJobApplicationConfirmationPositionLabel = createJobApplicationConfirmationPositionLabel;
    this.jobApplicationConfirmationTrackingReminder = jobApplicationConfirmationTrackingReminder;
    this.continueToDashboard = continueToDashboard;
    this.announcement = announcement;
    this.applicantPortal = applicantPortal;
    this.adminPortal = adminPortal;
    this.workEnvironment = workEnvironment;
    this.remoteLocationAllowed = remoteLocationAllowed;
    this.teleworkAllowed = teleworkAllowed;
    this.flexHoursAllowed = flexHoursAllowed;
    this.yes = yes;
    this.no = no;
    this.physicalEnvironment = physicalEnvironment;
    this.dashBoardLink = dashBoardLink;
    this.yourApplicationsTitle = yourApplicationsTitle;
};

TalentCloudAPI.pages = {
            home: {
                url: "#",
                state: function(){
                    TalentCloudAPI.loadPublic();
                    TalentCloudAPI.setNav("homeLinkListItem");
                }
            },
            adminhome: {
                url: "#",
                state: function(){
                    TalentCloudAPI.loadAdmin();
                    TalentCloudAPI.setNav("homeLinkListItem");
                }
            },
            BrowseJobs: {
                url: "#BrowseJobs",
                state: function(){
                    JobPostAPI.showBrowseJobs();
                    TalentCloudAPI.setNav("browseLinkListItem");
                    AccessibilityAPI.focusElement("browseTitle");
                }
            },
            Login: {
                url: "#Login",
                state: function(){
                    UserAPI.showLogin();
                    TalentCloudAPI.setNav("loginLinkListItem");
                }
            },
            Register: {
                url: "#Register",
                state: function(){
                    UserAPI.showRegisterForm();
                    document.getElementById("registerLinkListItem");
                }
            },
            MyProfile: {
                url: "#MyProfile",
                state: function(){
                    JobSeekerAPI.showJobSeekerProfile();
                    TalentCloudAPI.setNav("profileLinkListItem");
                    AccessibilityAPI.focusElement("myProfilePic");
                }
            },
            Job:{
                url: "#Job",
                state: function(jobPostId){
                    JobPostAPI.viewJobPoster(jobPostId);
                    TalentCloudAPI.setNav("browseLinkListItem");
                }
            },
            CreateEditProfile:{
                url:"#CreateEditProfile",
                state: function(){
                    CreateEditProfileAPI.showCreateEditProfile();
                    TalentCloudAPI.setNav("profileLinkListItem");
                }
            },
            Dashboard:{
                url:"#Dashboard",
                state: function(){
                    DashboardAPI.showDashboard();
                    TalentCloudAPI.setNav("dashBoardLinkListItem");
                }
            },
            CreateJobPoster:{
                url:"#CreateJobPoster",
                state: function(){
                    CreateJobPosterAPI.showCreateJobPosterForm();
                    TalentCloudAPI.setNav("jobPostersLinkListItem");
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
    console.log(location_elements[0]);
    data = location_elements[1];
    //console.log(window.location.href.indexOf("/"+TalentCloudAPI.roles.admin));
    if(window.location.href.indexOf("/"+TalentCloudAPI.roles.admin) > -1) {
        adminView = true;
        location_elements[0] !== ""?pageToReload = TalentCloudAPI.pages[location_elements[0].substring(1, location_elements[0].length)]:pageToReload = TalentCloudAPI.pages["adminhome"];
        TalentCloudAPI.loadAdmin();
        console.log(pageToReload);
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
    DataAPI.getTalentCloudUI(locale,false);
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthToken();
        if(UserAPI.hasSessionUser()){
            var credentials = {};
            sessionUser = UserAPI.getSessionUserAsJSON();
            //console.log(sessionUser);
            credentials.email = sessionUser.email;
            //credentials.password = sessionUser.password;
            credentials.authToken = authToken;
            UserAPI.login(credentials);
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
    DataAPI.getTalentCloudUI(locale,true);
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthToken();
        //console.log(authToken);
        //if(!UserAPI.hasAuthTokenExpired()){
            if(UserAPI.hasSessionUser()){
                var credentials = {};
                sessionUser = UserAPI.getSessionUserAsJSON();
                //console.log(sessionUser);
                credentials.email = sessionUser.email;
                //credentials.password = sessionUser.password;
                credentials.authToken = authToken;
                //console.log(credentials);
                UserAPI.login(credentials);
                DataAPI.getJobSeekers(locale);
                DepartmentAPI.getDepartments(locale);
                DivisionAPI.getDivisions(locale);
                //Add log user in automatically
            }else{
                DataAPI.getJobSeekers(locale);
            }
        /*}else{
            DataAPI.getJobSeekers(locale);
        }*/
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
                CreateJobPosterAPI.loadLookupData();
                CreateEditProfileAPI.loadLookupData();
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
        Utilities.debug?console.log("currentLocale=" + currentLocale):null;
        if(currentLocale === "en_CA"){
            currentLocale = "fr_CA";
            TalentCloudAPI.setLanguageCookie("fr_CA");
        }else{
            currentLocale = "en_CA";
            TalentCloudAPI.setLanguageCookie("en_CA");
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
    
    // Common headers (both Applicant and Admin)
    document.title = siteContent.title;
    window.title = siteContent.title;
    
    var announcement = document.getElementById("announcement");
    announcement.innerHTML = siteContent.announcement;
    
    var gctc = document.getElementById("gctc");
    gctc.innerHTML = siteContent.gctc;
    
    var languageLink = document.getElementById("languageSelect");
    languageLink.innerHTML = siteContent.languageSelect;
    
    var loginLink = document.getElementById("loginLink");
    loginLink.innerHTML = siteContent.loginLink;
    
    var logoutLink = document.getElementById("logoutLink");
    logoutLink.innerHTML = siteContent.logoutLink;
    
    var registerLink = document.getElementById("registerLink");
    registerLink.innerHTML = siteContent.registerLink;
    
    var browseLink = document.getElementById("browseLink");
    browseLink.innerHTML = siteContent.browseLink;
    
    var homeLink = document.getElementById("homeLink");
    homeLink.innerHTML = siteContent.homeLink;

    var profileLink = document.getElementById("profileLink");
    profileLink.innerHTML = siteContent.profileLink;
    
    var logoSrc = document.getElementById("logoSrc");
    logoSrc.src = siteContent.logoSrc;
    logoSrc.alt = siteContent.logoAlt;
    
    var taglineMain = document.getElementById("taglineMain");
    taglineMain.innerHTML = siteContent.taglineMain;

    var canadaLink = document.getElementById("canadaLink");
    canadaLink.innerHTML = siteContent.canadaLink;
    canadaLink.href = siteContent.canadaLinkHref;

    if(isManager){
        console.log(isManager);
        
        CreateWorkEnvironmentAPI.localizeCreateWorkEnvironment();
        
        //Admin side only headers
        var profileLink = document.getElementById("profileLink");
        profileLink.innerHTML = siteContent.profileLink;

        var jobPostersLink = document.getElementById("jobPostersLink");
        jobPostersLink.innerHTML = siteContent.jobPostersLink;
        
        var adminPortal = document.getElementById("adminPortal");
        adminPortal.innerHTML = siteContent.adminPortal;

        //var teamsLink = document.getElementById("teamsLink");
        //teamsLink.innerHTML = siteContent.teamsLink;
        
        //Create Job Poster
        //TODO: fix localization of terms for Create Job Poster
        /*
        var createJobPosterWindowTitle = document.getElementById("createJobPosterWindowTitle");
        createJobPosterWindowTitle.innerHTML = siteContent.createJobPosterWindowTitle;
        
        for(var i = 1;i < 4;i++){
            var stepOne = document.getElementById("createJobPosterTabLabel_" + i);
            stepOne.innerHTML = siteContent.step1;
        }
        
        for(var i = 1;i < 4;i++){
            var stepTwo = document.getElementById("createJobPosterTabLabel_" + i);
            stepTwo.innerHTML = siteContent.step2;
        }
        
        for(var i = 1;i < 4;i++){
            var stepThree = document.getElementById("createJobPosterStep3Label_" + i);
            stepThree.innerHTML = siteContent.step3;
        }
        
        for(var i = 1;i < 5;i++){
            var stepFour = document.getElementById("createJobPosterStep4Label_" + i);
            stepFour.innerHTML = siteContent.review;
        }
        
        var goToStep2 = document.getElementById("createJobPoster_goToStep2_1");
        goToStep2.setAttribute("value", siteContent.goToStep2);
        
        var goToStep2_2 = document.getElementById("createJobPoster_goToStep2_2");
        goToStep2_2.setAttribute("value", siteContent.goToStep2);
        
        var goToStep1 = document.getElementById("createJobPoster_goToStep1");
        goToStep1.setAttribute("value", siteContent.goToStep1);
        
        var goToStep3 = document.getElementById("createJobPoster_goToStep3_1");
        goToStep3.setAttribute("value", siteContent.goToStep3);
        
        var goToStep3_2 = document.getElementById("createJobPoster_goToStep3_2");
        goToStep3_2.setAttribute("value", siteContent.goToStep3);
        
        var goToReview = document.getElementById("createJobPoster_goToReview");
        goToReview.setAttribute("value", siteContent.goToReview);
        
        var createJobPoster_submit = document.getElementById("createJobPosterSubmitButton");
        createJobPoster_submit.setAttribute("value", content.submit);
        
        var createJobPosterSubmitInst = document.getElementById("createJobPosterSubmitInstructions");
        createJobPosterSubmitInst.innerHTML = content.createJobPosterSubmitInstructions;
        */
        
        //Create Edit Profile
        var createEditProfile_goToStep2 = document.getElementById("createEditProfile_goToStep2_1");
        createEditProfile_goToStep2.setAttribute("value", content.goToStep2);
        
        var createEditProfile_goToStep1 = document.getElementById("createEditProfile_goToStep1_1");
        createEditProfile_goToStep1.setAttribute("value", content.goToStep1);
        
        var createEditProfile_goToStep3 = document.getElementById("createEditProfile_goToStep3_1");
        createEditProfile_goToStep3.setAttribute("value", content.goToStep3);
        
        var createEditProfile_goToStep2_1 = document.getElementById("createEditProfile_goToStep2_2");
        createEditProfile_goToStep2_1.setAttribute("value", content.goToStep2);
        
        for(var i = 1;i < 4;i++){
            var stepOne = document.getElementById("createEditProfileStep1Label_" + i);
            stepOne.innerHTML = content.step1;
        }
        
        for(var i = 1;i < 4;i++){
            var stepTwo = document.getElementById("createEditProfileStep2Label_" + i);
            stepTwo.innerHTML = content.step2;
        }
        
        for(var i = 1;i < 4;i++){
            var stepThree = document.getElementById("createEditProfileStep3Label_" + i);
            stepThree.innerHTML = content.step3;
        }
        
        //var createEditProfile_title = document.getElementById("createProfileWindowTitle");
        //createEditProfile_title.innerHTML = content.createProfileWindowTitle;
        
        var createEditProfile_required2 = document.getElementById("createEditProfile_requiredStep2");
        createEditProfile_required2.innerHTML = content.required;
        
        var createEditProfile_required1 = document.getElementById("createEditProfile_requiredStep1");
        createEditProfile_required1.innerHTML = content.required;
        
        var createEditProfile_submit = document.getElementById("createEditProfileSubmitButton");
        createEditProfile_submit.setAttribute("value", content.submit);
        
        var createEditProfile_how_often_review_label = document.getElementById("createEditProfile_how_often_review_label");
        createEditProfile_how_often_review_label.innerHTML = content.howOftenDoYouReview + ' *';
        
        var createEditProfile_how_often_early_label = document.getElementById("createEditProfile_how_often_early_label");
        createEditProfile_how_often_early_label.innerHTML = content.howOftenDoYouStayLate + ' *';
        
    }
    
    if(!isManager){
        //Applicant side only headers
        ManagerProfileAPI.localizeManagerProfile();
        JobPostAPI.localizeJobPoster();
        JobApplicationAPI.localizeCreateJobApplication();
        WorkEnvironmentAPI.localizeWorkEnvironment();
        
    
        var dashBoardLink = document.getElementById("dashBoardLink");
        dashBoardLink.innerHTML = siteContent.dashBoardLink;

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
        
        var browseTitle = document.getElementById("browseTitle");
        browseTitle.innerHTML = siteContent.browseTitle;
        
        var dashBoardTitle = document.getElementById("dashBoardTitle");
        dashBoardTitle.innerHTML = siteContent.dashBoardLink;
        
        var yourApplicationsTitle = document.getElementById("yourApplicationsTitle");
        yourApplicationsTitle.innerHTML = siteContent.yourApplicationsTitle;
        
        var howItWorksLast = document.getElementById("howItWorksLast");
        howItWorksLast.innerHTML = siteContent.howItWorksLast;
        
        var transcript = document.getElementById("transcript");
        transcript.innerHTML = siteContent.transcript;
        
        var almostNeverElements = document.getElementsByClassName("option0Label");
        for (var i = 0; i < almostNeverElements.length; i++) {
            almostNeverElements[i].innerHTML = siteContent.almostNever;
        }
        
        var rarelyElements = document.getElementsByClassName("option1Label");
        for (var i = 0; i < rarelyElements.length; i++) {
            rarelyElements[i].innerHTML = siteContent.rarely;
        }
        
        var sometimesElements = document.getElementsByClassName("option2Label");
        for (var i = 0; i < sometimesElements.length; i++) {
            sometimesElements[i].innerHTML = siteContent.sometimes;
        }
        
        var usuallyElements = document.getElementsByClassName("option3Label");
        for (var i = 0; i < usuallyElements.length; i++) {
            usuallyElements[i].innerHTML = siteContent.usually;
        }
        
        var almostAlwaysElements = document.getElementsByClassName("option4Label");
        for (var i = 0; i < almostAlwaysElements.length; i++) {
            almostAlwaysElements[i].innerHTML = siteContent.almostAlways;
        }
        
        //not working yet
        

    }
    
};
    
TalentCloudAPI.setNav = function(navItemToHighlightId){
    var navItems = document.getElementsByClassName("top-nav--link active");
    if(navItems.length > 0){
        navItems[0].classList.remove("active");
    }
    var navItemToHighlight = document.getElementById(navItemToHighlightId);
    navItemToHighlight.classList.add("active");
};
