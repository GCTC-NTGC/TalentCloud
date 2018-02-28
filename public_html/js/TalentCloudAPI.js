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
rarely, sometimes, usually, almostAlways, name, browseLink, gctc, at){
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
};

/**
 * 
 * @returns {undefined}
 */
TalentCloudAPI.load = function(){
    
    var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    var managerView = false;
    var adminView = false;
    if(window.location.href.includes("/"+TalentCloudAPI.roles.admin)) {
        stateInfo.pageInfo = 'talent_cloud_admin';
        window.history.replaceState(stateInfo, stateInfo.pageInfo, "/admin/#");
        adminView = true;
    }else if(window.location.href.includes("/"+TalentCloudAPI.roles.manager)) {
        stateInfo.pageInfo = 'talent_cloud_manager';
        window.history.replaceState(stateInfo, stateInfo.pageInfo, "/manager/#");
        managerView = true;
    } else {
        window.history.replaceState(stateInfo, stateInfo.pageInfo, "/#");
    }
    
    if(adminView === true){
        TalentCloudAPI.loadAdmin();
    }else if(managerView === true){
        TalentCloudAPI.loadManager();
    }else{
        TalentCloudAPI.loadPublic();
    }
    
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
        authToken = UserAPI.getAuthTokenAsJSON();
        //console.log(authToken);
        if(!UserAPI.hasAuthTokenExpired()){
            if(UserAPI.hasSessionUser()){
                var credentials = {};
                sessionUser = UserAPI.getSessionUserAsJSON();
                //console.log(sessionUser);
                credentials.email = sessionUser.email;
                credentials.password = sessionUser.password;
                credentials.authToken = authToken;
                UserAPI.authenticate(credentials);
                
            }else{
                
            }
        }else{
            
        }
    }else{
        
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
    console.log(UserAPI.hasAuthToken());
    DataAPI.getTalentCloudUI(locale,true);
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthTokenAsJSON();
        //console.log(authToken);
        if(!UserAPI.hasAuthTokenExpired()){
            if(UserAPI.hasSessionUser()){
                var credentials = {};
                sessionUser = UserAPI.getSessionUserAsJSON();
                //console.log(sessionUser);
                credentials.email = sessionUser.email;
                credentials.password = sessionUser.password;
                credentials.authToken = authToken;
                UserAPI.authenticate(credentials);
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
    console.log(UserAPI.hasAuthToken());
    DataAPI.getTalentCloudUI(locale,true);
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthTokenAsJSON();
        //console.log(authToken);
        if(!UserAPI.hasAuthTokenExpired()){
            if(UserAPI.hasSessionUser()){
                var credentials = {};
                sessionUser = UserAPI.getSessionUserAsJSON();
                console.log(sessionUser);
                credentials.email = sessionUser.email;
                credentials.password = sessionUser.password;
                credentials.authToken = authToken;
                UserAPI.authenticate(credentials);
                
                DivisionAPI.getDivisions(locale);
                BranchAPI.getBranches(locale);
                CreateJobPosterAPI.loadLookupData();
                //Add log user in automatically
            }else{
                //DataAPI.getJobSeekers(locale);
            }
        }else{
            //DataAPI.getJobSeekers(locale);
        }
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
    console.log(content);
    siteContent = content;
    document.title = siteContent.title;
    window.title = siteContent.title;
    
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
    
    if(isManager){
        var profileLink = document.getElementById("profileLink");
        profileLink.innerHTML = siteContent.profileLink;

        var jobPostersLink = document.getElementById("jobPostersLink");
        jobPostersLink.innerHTML = siteContent.jobPostersLink;

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
    } else {
        //is job seeker
        ManagerProfileAPI.localizeManagerProfile();
    }
    
};
