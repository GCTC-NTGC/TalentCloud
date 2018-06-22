/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TalentCloudAPI = {};
var siteContent;
var href;
TalentCloudAPI.roles = {jobseeker: "jobseeker", manager: "manager", admin: "administrator"};

TalentCloudAPI.pages = {
    home: {
        url: "#",
        state: function () {
            TalentCloudAPI.loadPublic();
            TalentCloudAPI.setNav("navigationHomeLinkWrapper");
        }
    },
    adminhome: {
        url: "#",
        state: function () {
            TalentCloudAPI.loadAdmin();
            TalentCloudAPI.setNav("navigationHomeLinkWrapper");
        }
    },
    AdminDashboard: {
        url: "#AdminDashboard",
        state: function () {
            AdminDashboardAPI.showDashboard();
            TalentCloudAPI.setNav("navigationAdminDashboardLink");

        }
    },
    ViewApplication: {
        url: "#ViewApplication",
        state: function (data) {
            JobApplicationPreviewAPI.showJobApplicationPreviewById(data);
            TalentCloudAPI.setNav("navigationAdminDashboardLink");
        }
    },
    ViewApplicationProfile: {
        url: "#ViewApplicationProfile",
        state: function (data) {
            AdminDashboardAPI.showProfileForApplication(data);
            TalentCloudAPI.setNav("navigationAdminDashboardLink");
        }
    },
    BrowseJobs: {
        url: "#BrowseJobs",
        state: function () {
            JobPostAPI.showBrowseJobs();
            TalentCloudAPI.setNav("navigationBrowseLinkWrapper");
            AccessibilityAPI.focusElement("topPage");
        }
    },
    Login: {
        url: "#Login",
        state: function () {
            TalentCloudAPI.setNav("navigationLoginLinkWrapper");
            var login = document.getElementById("navigationLoginLinkWrapper");
            if (login) {
                login.click();
            }
        }
    },
    Register: {
        url: "#Register",
        state: function () {
            //UserAPI.showRegisterForm();
            document.getElementById("navigationRegisterLinkWrapper");
            var registerLink = document.getElementById("navigationRegisterLink");
            if (registerLink) {
                registerLink.click();
            }
        }
    },
    MyProfile: {
        url: "#MyProfile",
        state: function () {
            JobSeekerAPI.showMyJobSeekerProfile();
            TalentCloudAPI.setNav("navigationProfileLinkWrapper");
            AccessibilityAPI.focusElement("myProfilePic");
        }
    },
    Job: {
        url: "#Job",
        state: function (jobPostId) {
            JobPostAPI.viewJobPoster(jobPostId);
            TalentCloudAPI.setNav("navigationBrowseLinkWrapper");
        }
    },
    CreateEditProfile: {
        url: "#CreateEditProfile",
        state: function () {
            CreateEditProfileAPI.showCreateEditProfile();
            TalentCloudAPI.setNav("navigationProfileLinkWrapper");
        }
    },
    Dashboard: {
        url: "#Dashboard",
        state: function () {
            DashboardAPI.showDashboard();
            TalentCloudAPI.setNav("navigationDashboardLinkWrapper");
        }
    },
    CreateJobPoster: {
        url: "#CreateJobPoster",
        state: function () {
            CreateJobPosterAPI.showCreateJobPosterForm();
            TalentCloudAPI.setNav("navigationPosterLinkWrapper");
        }
    },
    ManagerProfile: {
        url: "#ManagerProfile",
        state: function (managerProfileId) {
            ManagerProfileAPI.showManagerProfile(managerProfileId);
        }
    },
    JobApplication: {
        url: "#JobApplication",
        state: function (jobPosterId) {
            JobApplicationAPI.showCreateJobApplication(jobPosterId);
            TalentCloudAPI.setNav("navigationBrowseLinkWrapper");
        }
    },
    JobApplicationPreview: {
        url: "#JobApplicationPreview",
        state: function (jobApplicationId) {
            JobApplicationPreviewAPI.showJobApplicationPreviewById(jobApplicationId);
            TalentCloudAPI.setNav("navigationBrowseLinkWrapper");
        }
    },
    FAQ: {
        url: "#FAQ",
        state: function (anchor) {
            FAQAPI.showFAQ(anchor);
            // TalentCloudAPI.setNav("navigationBrowseLinkWrapper");
        }
    }
};

/**
 *
 * @returns {undefined}
 */
TalentCloudAPI.load = function () {
    var pageToReload;
    var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    var managerView = false;
    var adminView = false;
    var location = document.location.hash;
    //console.log(location);
    //event.preventDefault();
    var location_elements = location.split('\/');
    // alert(location_elements);
    //console.log(location_elements[0]);
    var data = location_elements[1];
    //console.log(window.location.href.indexOf("/"+TalentCloudAPI.roles.admin));
    if (window.location.href.indexOf("/admin") > -1) {
        adminView = true;
        if (location_elements[0] !== "") {
            pageToReload = TalentCloudAPI.pages[location_elements[0].substring(1, location_elements[0].length)]
        } else {
            pageToReload = TalentCloudAPI.pages["adminhome"];
        }
        TalentCloudAPI.loadAdmin();
        console.log(adminView);
        if (pageToReload !== undefined) {
            pageToReload.state(data);
        } else {
            window.history.replaceState(stateInfo, stateInfo.pageInfo, "/admin/#");
        }
    } else {
        TalentCloudAPI.loadPublic();
        if (location_elements[0] !== "") {
            pageToReload = TalentCloudAPI.pages[location_elements[0].substring(1, location_elements[0].length)]
        } else {
            pageToReload = TalentCloudAPI.pages["home"];
        }
        if (pageToReload !== undefined) {
            pageToReload.state(data);
        } else {
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
TalentCloudAPI.loadPublic = function () {

    if (TalentCloudAPI.getLanguageFromCookie() !== undefined) {
        locale = TalentCloudAPI.getLanguageFromCookie();
    } else {
        locale = "en_CA";
        TalentCloudAPI.setLanguageCookie(locale);
    }
    LookupAPI.loadLookupData();
    DataAPI.getStaticContent(locale, function (request) {
        if (request.status === 200) {
            var content = JSON.parse(request.response);
            TalentCloudAPI.setContent(content.content, false);
        } else {
            window.alert("Unable to load site content.");
        }
    });

    //Check if user is logged in with proper user role
    if (UserAPI.hasSessionUser()
            && UserAPI.getSessionUserAsJSON().user_role ===
            TalentCloudAPI.roles.jobseeker) {
        //If logged in, adjust visible nav items
        var loggedIn = document.getElementById("navigationLogoutLinkWrapper");
        loggedIn.classList.remove("hidden");

        var loggedOut = document.getElementById("navigationLoginLinkWrapper");
        loggedOut.classList.add("hidden");

        var registerLink = document.getElementById("navigationRegisterLinkWrapper");
        registerLink.classList.add("hidden");

        var myProfileLink = document.getElementById("navigationProfileLinkWrapper");
        myProfileLink.classList.remove("hidden");
        myProfileLink.setAttribute("aria-hidden", "false");

        //jobseeker specifc items
        var dashBoardLink = document.getElementById("navigationDashboardLinkWrapper");
        dashBoardLink.classList.remove("hidden");
        //TODO: is there a reason this has aria-hidden and others don't?
        dashBoardLink.setAttribute("aria-hidden", "false");
    }
};



/**
 *
 * @returns {undefined}
 */
TalentCloudAPI.loadAdmin = function () {

    if (TalentCloudAPI.getLanguageFromCookie() !== undefined) {
        locale = TalentCloudAPI.getLanguageFromCookie();
    } else {
        locale = "en_CA";
    }
    LookupAPI.loadLookupData();
    DataAPI.getStaticContent(locale, function (request) {
        if (request.status === 200) {
            var content = JSON.parse(request.response);
            TalentCloudAPI.setContent(content.content, true);
        } else {
            window.alert("Unable to load site content.");
        }
    });

    //Check if user is logged in with proper user role
    if (UserAPI.hasSessionUser()
            && UserAPI.getSessionUserAsJSON().user_role ===
            TalentCloudAPI.roles.admin) {
        //If logged in, adjust visible nav items
        var loggedIn = document.getElementById("navigationLogoutLinkWrapper");
        loggedIn.classList.remove("hidden");

        var loggedOut = document.getElementById("navigationLoginLinkWrapper");
        loggedOut.classList.add("hidden");

        var registerLink = document.getElementById("navigationRegisterLinkWrapper");
        registerLink.classList.add("hidden");

        var myProfileLink = document.getElementById("navigationProfileLinkWrapper");
        myProfileLink.classList.remove("hidden");
        myProfileLink.setAttribute("aria-hidden", "false");

        //admin specific items

        var adminDashBoardLink = document.getElementById("navigationAdminDashboardLinkWrapper");
        adminDashBoardLink.classList.remove("hidden");
        //TODO: is there a reason this has aria-hidden and others don't?
        adminDashBoardLink.setAttribute("aria-hidden", "false");

        var jobPostersLink = document.getElementById("navigationPosterLinkWrapper");
        jobPostersLink.classList.remove("hidden");
        jobPostersLink.setAttribute("aria-hidden", "false");
    }
};

/**
 *
 * @param {type} locale
 * @returns {undefined}
 */
TalentCloudAPI.setLanguageCookie = function (locale) {
    var name = "locale";
    var currentDate = new Date();
    currentDate = Utilities.addDays(currentDate, 1);
    var path = "/";

    Utilities.debug ? console.log("cookieDateString=" + currentDate) : null;
    Utilities.setCookie(name, locale, currentDate, path);
};

/**
 *
 * @returns {unresolved}
 */
TalentCloudAPI.getLanguageFromCookie = function () {
    var localeCookie = Utilities.getCookieByName("locale");
    Utilities.debug ? console.log("localeCookie=" + localeCookie) : null;
    return localeCookie;
};

/**
 *
 * @param {type} locale
 * @returns {undefined}
 */
TalentCloudAPI.setLanguage = function (locale) {
    var currentLocale = TalentCloudAPI.getLanguageFromCookie();
    if (currentLocale !== undefined) {
        //Utilities.debug?console.log("currentLocale=" + currentLocale):null;
        //var feedbackLinkFrench = document.querySelector(".alert-banner__copy--francais");
        //var feedbackLinkEnglish = document.querySelector(".alert-banner__copy--english");

        var skipNavTextFrench = document.querySelector(".skipNavTextFrench");
        var skipNavTextEnglish = document.querySelector(".skipNavTextEnglish");

        if (currentLocale === "en_CA") {
            currentLocale = "fr_CA";
            TalentCloudAPI.setLanguageCookie("fr_CA");
            //document.getElementById("emailFeedback").href = "mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca?subject=Soumettez%20des%20Commentaires%20au%20Nuage%20de%20Talents&body=Nous%20vous%20remercions%20de%20votre%20int%C3%A9r%C3%AAt%20au%20nuage%20de%20talents!%20Votre%20disposition%20%C3%A0%20fournir%20des%0Acommentaires%20est%20tr%C3%A8s%20importante%20pour%20nous.%20Veuillez%20fournir%20le%20plus%20de%20renseignements%0Apossible%20%3A%0A%0AType%20de%20commentaires%20%3A%20%5Bp.%20ex.%2C%20suggestion%20ou%20bogue%5D%0A%0AVotre%20message%20%3A%20%5BTapez%20ici.%5D%0A%0APage%20actuelle%20%3A%20%5BHyperlien%20de%20la%20page%20ici%5D%0A%0AEncore%20une%20fois%2C%20merci!";
            //feedbackLinkFrench.classList.remove("hidden");
            //feedbackLinkEnglish.classList.add("hidden");
            skipNavTextFrench.classList.remove("hidden");
            skipNavTextEnglish.classList.add("hidden");
        } else {
            currentLocale = "en_CA";
            TalentCloudAPI.setLanguageCookie("en_CA");
            //document.getElementById("emailFeedback").href = "mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca?subject=Submit%20Feedback%20to%20Talent%20Cloud&body=Thanks%20for%20your%20interest%20in%20Talent%20Cloud!%20Your%20willingness%20to%20submit%20feedback%20is%20incredibly%0Aimportant%20to%20us.%20Please%20supply%20as%20much%20information%20as%20possible%3A%0A%0AType%20of%20Feedback%3A%20%5Be.g.%20Suggestion%2C%20Bug%2C%20etc.%5D%0A%0AYour%20Message%3A%20%5BType%20here.%5D%0A%0ACurrent%20Page%3A%20%5BPage%20Link%20Here%5D%0A%0AThanks%20again!";
            //feedbackLinkFrench.classList.add("hidden");
            //feedbackLinkEnglish.classList.remove("hidden");
            skipNavTextFrench.classList.add("hidden");
            skipNavTextEnglish.classList.remove("hidden");
        }
    } else {
        TalentCloudAPI.setLanguageCookie(locale);
    }
    TalentCloudAPI.load();
};

/**
 * Hides all overlays/dialogs and all main sections
 * @returns {undefined}
 */
TalentCloudAPI.hideAllContent = function () {
    var overlays = document.getElementById("overlays").children;
    var sections = document.getElementsByTagName("main")[0].children;


    for (var i = 0; i < overlays.length; i++) {
        overlays[i].classList.add("hidden");
    }

    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.add("hidden");
    }
};

/**
 * Hides the circular GC Talent Cloud logo
 * @returns {undefined}
 */
TalentCloudAPI.hideLogo = function () {
    var logo = document.getElementById("logo-container");
    logo.classList.add("hidden");
};

TalentCloudAPI.Content = function (response) {
    var data = JSON.parse(response);
    var content = data.content;

    // Navigation Links
    this.navigationLoginLink = content.navigationLoginLink;
    this.navigationLogoutLink = content.navigationLogoutLink;
    this.navigationRegisterLink = content.navigationRegisterLink;
    this.navigationHomeLink = content.navigationHomeLink;
    this.navigationProfileLink = content.navigationProfileLink;
    this.navigationBrowseLink = content.navigationBrowseLink;
    this.navigationDashboardLink = content.navigationDashboardLink;
    this.navigationPosterLink = content.navigationPosterLink;
    // Subpage Titles
    this.browseHeroTitle = content.browseHeroTitle;
    this.dashboardHeroTitle = content.dashboardHeroTitle;
    this.profileHeroTitle = content.profileHeroTitle;
    this.applicationHeroTitle = content.applicationHeroTitle;
    this.managerProfileHeroTitle = content.managerProfileHeroTitle;
    this.posterHeroTitle = content.posterHeroTitle;
    this.faqHeroTitle = content.faqHeroTitle;
    // Job Poster Content
    this.jobPosterSubnavLabel = content.jobPosterSubnavLabel;
    this.jobPosterSubnavItemBasics = content.jobPosterSubnavItemBasics;
    this.jobPosterSubnavItemImpact = content.jobPosterSubnavItemImpact;
    this.jobPosterSubnavItemWork = content.jobPosterSubnavItemWork;
    this.jobPosterSubnavItemCriteria = content.jobPosterSubnavItemCriteria;
    this.jobPosterSubnavItemCulture = content.jobPosterSubnavItemCulture;
    this.jobPosterSubnavItemKnow = content.jobPosterSubnavItemKnow;
    this.jobPosterSubnavItemApply = content.jobPosterSubnavItemApply;
    this.jobPosterContentTitleBasics = content.jobPosterContentTitleBasics;
    this.jobPosterContentTitleImpact = content.jobPosterContentTitleImpact;
    this.jobPosterContentTitleWork = content.jobPosterContentTitleWork;
    this.jobPosterContentTitleCriteria = content.jobPosterContentTitleCriteria;
    this.jobPosterContentTitleCulture = content.jobPosterContentTitleCulture;
    this.jobPosterContentTitleKnow = content.jobPosterContentTitleKnow;
    this.jobPosterContentTitleApply = content.jobPosterContentTitleApply;
    this.jobPosterTimeRemaining = content.jobPosterTimeRemaining;
    // Job Application
    this.essentialCriteria = content.essentialCriteria;
    this.assetCriteria = content.assetCriteria;
    this.microReference = content.microReference;
    this.skillSample = content.skillSample;
    this.applicationPositionLabel = content.applicationPositionLabel;

    // Evidence - QF
    this.applicantionProgressInformationAssessment = content.applicantionProgressInformationAssessment;
    this.applicationEvidenceExpertiseItemLabel = content.applicationEvidenceExpertiseItemLabel;
    this.applicationProgressMyYearsOfExperience = content.applicationProgressMyYearsOfExperience;

    // Job Application Progress Tracking - QF
    this.applicationProgressMyInformation = content.applicationProgressMyInformation;
    this.applicationProgressEssentialCriteria = content.applicationProgressEssentialCriteria;
    this.applicationProgressNonEssentialCriteria = content.applicationProgressNonEssentialCriteria;
    this.applicationProgressReviewMyApplication = content.applicationProgressReviewMyApplication;

    // Application Preview
    this.editApplication = content.editApplication;
    this.applicationPreviewProfilePhotoTitle = content.applicationPreviewProfilePhotoTitle;
    this.applicationPreviewProfileAlert = content.applicationPreviewProfileAlert;
    this.applicationPreviewDeclarationStoryTitle = content.applicationPreviewDeclarationStoryTitle;
    this.applicationPreviewMicroReferenceTitle = content.applicationPreviewMicroReferenceTitle;
    this.applicationPreviewReferenceMissing = content.applicationPreviewReferenceMissing;
    this.applicationPreviewSkillSampleStoryLabel = content.applicationPreviewSkillSampleStoryLabel;
    this.applicationPreviewSkillSampleLink = content.applicationPreviewSkillSampleLink;
    this.applicationPreviewSkillSampleMissing = content.applicationPreviewSkillSampleMissing;

    // Others
    this.title = content.title;
    this.helpLearn = content.helpLearn;
    this.languageSelect = content.languageSelect;
    this.applyNow = content.applyNow;
    this.jobPostersLink = content.jobPostersLink;
    this.teamsLink = content.teamsLink;
    this.jobNumber = content.jobNumber;
    this.jobTitle = content.jobTitle;
    this.jobLocation = content.jobLocation;
    this.jobCity = content.jobCity;
    this.jobProvince = content.jobProvince;
    this.jobApplicantsSoFar = content.jobApplicantsSoFar;
    this.jobUnitsToCloseHours = content.jobUnitsToCloseHours;
    this.jobUnitsToCloseDays = content.jobUnitsToCloseDays;
    this.jobUnitsToCloseMonths = content.jobUnitsToCloseMonths;
    this.jobUntilClose = content.jobUntilClose;
    this.jobTerm = content.jobTerm;
    this.viewButton = content.viewButton;
    this.jobSalaryRange = content.jobSalaryRange;
    this.submitApplication = content.submitApplication;
    this.step1 = content.step1;
    this.step2 = content.step2;
    this.step3 = content.step3;
    this.review = content.review;
    this.goToStep2 = content.goToStep2;
    this.goToStep1 = content.goToStep1;
    this.goToStep3 = content.goToStep3;
    this.goToReview = content.goToReview;
    this.createJobPosterWindowTitle = content.createJobPosterWindowTitle;
    this.createProfileWindowTitle = content.createProfileWindowTitle;
    this.required = content.required;
    this.submit = content.submit;
    this.generalInformation = content.generalInformation;
    this.aboutMe = content.aboutMe;
    this.aLittleBitAboutMe = content.aLittleBitAboutMe;
    this.whatImMostProudOfInCareer = content.whatImMostProudOfInCareer;
    this.position = content.position;
    this.department = content.department;
    this.branch = content.branch;
    this.division = content.division;
    this.leadershipStyle = content.leadershipStyle;
    this.myLeadershipStyle = content.myLeadershipStyle;
    this.myApproachToEmployee = content.myApproachToEmployee;
    this.myExpectationsOfEmployees = content.myExpectationsOfEmployees;
    this.myApproachToDecisionMaking = content.myApproachToDecisionMaking;
    this.workExperience = content.workExperience;
    this.education = content.education;
    this.howOftenDoYouReview = content.howOftenDoYouReview;
    this.howOftenDoYouStayLate = content.howOftenDoYouStayLate;
    this.howOftenDoYouEngage = content.howOftenDoYouEngage;
    this.howOftenDoYouApproveDevelopment = content.howOftenDoYouApproveDevelopment;
    this.almostNever = content.almostNever;
    this.rarely = content.rarely;
    this.sometimes = content.sometimes;
    this.usually = content.usually;
    this.almostAlways = content.almostAlways;
    this.name = content.name;
    this.gctc = content.gctc;
    this.at = content.at;
    this.readMore = content.readMore;
    this.canadaLink = content.canadaLink;
    this.canadaLinkHref = content.canadaLinkHref;
    this.taglineMain = content.taglineMain;
    this.taglineSecondary = content.taglineSecondary;
    this.taglineTertiary = content.taglineTertiary;
    this.howItWorksHeading = content.howItWorksHeading;
    this.howItWorksLead = content.howItWorksLead;
    this.logoSrc = content.logoSrc;
    this.ownYourStory = content.ownYourStory;
    this.ownYourStoryText = content.ownYourStoryText;
    this.getFound = content.getFound;
    this.getFoundText = content.getFoundText;
    this.contribute = content.contribute;
    this.contributeText = content.contributeText;
    this.howItWorksLeadOut = content.howItWorksLeadOut;
    this.howItWorksLast = content.howItWorksLast;
    this.contactUs = content.contactUs;
    this.transcript = content.transcript;
    this.ourTeam = content.ourTeam;
    this.ourTeamText = content.ourTeamText;
    this.browseTitle = content.browseTitle;
    this.createJobApplicationWindowTitle = content.createJobApplicationWindowTitle;
    this.createJobApplicationJobTitleLabel = content.createJobApplicationJobTitleLabel;
    this.createJobApplicationConfirmationPositionLabel = content.createJobApplicationConfirmationPositionLabel;
    this.jobApplicationConfirmationTrackingReminder = content.jobApplicationConfirmationTrackingReminder;
    this.continueToDashboard = content.continueToDashboard;
    this.announcement = content.announcement;
    this.adminPortal = content.adminPortal;
    this.applicantPortal = content.applicantPortal;
    this.yourApplicationsTitle = content.yourApplicationsTitle;
    this.workEnvironment = content.workEnvironment;
    this.remoteLocationAllowed = content.remoteLocationAllowed;
    this.teleworkAllowed = content.teleworkAllowed;
    this.flexHoursAllowed = content.flexHoursAllowed;
    this.yes = content.yes;
    this.no = content.no;
    this.physicalEnvironment = content.physicalEnvironment;
    this.teamCulture = content.teamCulture;
    this.teamSize = content.teamSize;
    this.gcDirectoryLink = content.gcDirectoryLink;
    this.teamSizePrompt = content.teamSizePrompt;
    this.gcDirectoryLinkPrompt = content.gcDirectoryLinkPrompt;
    this.teamNarrativePrompt = content.teamNarrativePrompt;
    this.adminTagline = content.adminTagline;
    this.adminAboutMe = content.adminAboutMe;
    this.adminProfilePositionLabel = content.adminProfilePositionLabel;
    this.adminProfileDepartmentLabel = content.adminProfileDepartmentLabel;
    this.adminProfileBranchLabel = content.adminProfileBranchLabel;
    this.jobReferenceId = content.jobReferenceId;
    this.openEndedQuestions = content.openEndedQuestions;
    this.skipNavText = content.skipNavtext;
    this.managerProfile_review_option0 = content.managerProfile_review_option0;
    this.managerProfile_review_option1 = content.managerProfile_review_option1;
    this.managerProfile_review_option2 = content.managerProfile_review_option2;
    this.managerProfile_review_option3 = content.managerProfile_review_option3;
    this.managerProfile_review_option4 = content.managerProfile_review_option4;
    this.managerProfile_stayLate_option0 = content.managerProfile_stayLate_option0;
    this.managerProfile_stayLate_option1 = content.managerProfile_stayLate_option1;
    this.managerProfile_stayLate_option2 = content.managerProfile_stayLate_option2;
    this.managerProfile_stayLate_option3 = content.managerProfile_stayLate_option3;
    this.managerProfile_stayLate_option4 = content.managerProfile_stayLate_option4;
    this.managerProfile_engagement_option0 = content.managerProfile_engagement_option0;
    this.managerProfile_engagement_option1 = content.managerProfile_engagement_option1;
    this.managerProfile_engagement_option2 = content.managerProfile_engagement_option2;
    this.managerProfile_engagement_option3 = content.managerProfile_engagement_option3;
    this.managerProfile_engagement_option4 = content.managerProfile_engagement_option4;
    this.managerProfile_developmentOpportunities_option0 = content.managerProfile_developmentOpportunities_option0;
    this.managerProfile_developmentOpportunities_option1 = content.managerProfile_developmentOpportunities_option1;
    this.managerProfile_developmentOpportunities_option2 = content.managerProfile_developmentOpportunities_option2;
    this.managerProfile_developmentOpportunities_option3 = content.managerProfile_developmentOpportunities_option3;
    this.managerProfile_developmentOpportunities_option4 = content.managerProfile_developmentOpportunities_option4;
    this.managerProfile_acceptLowValueWorkRequests_option0 = content.managerProfile_acceptLowValueWorkRequests_option0;
    this.managerProfile_acceptLowValueWorkRequests_option1 = content.managerProfile_acceptLowValueWorkRequests_option1;
    this.managerProfile_acceptLowValueWorkRequests_option2 = content.managerProfile_acceptLowValueWorkRequests_option2;
    this.managerProfile_acceptLowValueWorkRequests_option3 = content.managerProfile_acceptLowValueWorkRequests_option3;
    this.managerProfile_acceptLowValueWorkRequests_option4 = content.managerProfile_acceptLowValueWorkRequests_option4;
    this.managerDecisions_tipWhatis = content.managerDecisions_tipWhatis;
    this.managerDecisions_tipSummary = content.managerDecisions_tipSummary;
    this.profileBasicInfoEditTitle = content.profileBasicInfoEditTitle;
    this.changeDisplayPic = content.changeDisplayPic;
    this.updateProfilePhotoTitle = content.updateProfilePhotoTitle;
    this.updateProfilePhotoDraggableAreaLabel = content.updateProfilePhotoDraggableAreaLabel;
    this.updateProfilePhotoDraggableAreaErrorSize = content.updateProfilePhotoDraggableAreaErrorSize;
    this.updateProfilePhotoDraggableAreaErrorType = content.updateProfilePhotoDraggableAreaErrorType;
    this.updateProfileOrCopy = content.updateProfileOrCopy;
    this.updateProfileChoosePhotoButtonLabelSpan = content.updateProfileChoosePhotoButtonLabelSpan;
    this.updateProfileChoosePhotoButton = content.updateProfileChoosePhotoButton;
    this.updateProfileChooseAltPhotoButtonLabelSpan = content.updateProfileChooseAltPhotoButtonLabelSpan;
    this.updateProfileChooseAltPhotoButton = content.updateProfileChooseAltPhotoButton;
    this.updateProfilePhotoCancelButton = content.updateProfilePhotoCancelButton;
    this.profileBasicInfoEditCancel = content.profileBasicInfoEditCancel;
    this.updateProfileApplicantProfileFormNameLabelSpan = content.updateProfileApplicantProfileFormNameLabelSpan;
    this.profileEditName = content.profileEditName;
    this.updateProfileApplicantProfileFormTaglineLabelSpan = content.updateProfileApplicantProfileFormTaglineLabelSpan;
    this.profileEditTagline = content.profileEditTagline;
    this.updateProfileApplicantProfileFormTwitterLabelSpan = content.updateProfileApplicantProfileFormTwitterLabelSpan;
    this.profileEditTwitter = content.profileEditTwitter;
    this.updateProfileApplicantProfileFormLinkedinLabelSpan = content.updateProfileApplicantProfileFormLinkedinLabelSpan;
    this.profileEditLinkedin = content.profileEditLinkedin;
    this.profileBasicInfoEditCancel = content.profileBasicInfoEditCancel;
    this.profileBasicInfoEditSave = content.profileBasicInfoEditSave;
    this.profilePicUploadBtn = content.profilePicUploadBtn;
    this.loginFormTitle = content.loginFormTitle;
    this.loginModalCopySpan = content.loginModalCopySpan;
    this.switchToRegister = content.switchToRegister;
    this.loginModalEmailLabelSpan = content.loginModalEmailLabelSpan;
    this.login_email = content.login_email;
    this.loginModalPasswordLabelSpan = content.loginModalPasswordLabelSpan;
    this.login_password = content.login_password;
    this.loginFormCancelBtn = content.loginFormCancelBtn;
    this.loginFormLoginBtn = content.loginFormLoginBtn;
    this.registerFormTitle = content.registerFormTitle;
    this.profileAboutMeEditTitle = content.profileAboutMeEditTitle;
    this.updateAboutTextareaLabelSpan = content.updateAboutTextareaLabelSpan;
    this.profileEditAboutMe = content.profileEditAboutMe;
    this.profileAboutMeEditCancel = content.profileAboutMeEditCancel;
    this.profileAboutMeEditSave = content.profileAboutMeEditSave;
    this.managerDecisions_tipWhatis = content.managerDecisions_tipWhatis;
    this.managerDecisions_tipSummary = content.managerDecisions_tipSummary;
    this.accommodationTextStart = content.accommodationTextStart;
    this.accommodationTextEnd = content.accommodationTextEnd;
    this.jobPosterKeyTasksLabel = content.jobPosterKeyTasksLabel;
    this.jobPosterCoreCompetenciesLabel = content.jobPosterCoreCompetenciesLabel;
    this.jobPosterDevelopingCompetenciesLabel = content.jobPosterDevelopingCompetenciesLabel;
    this.jobPosterHiringManagerLabel = content.jobPosterHiringManagerLabel;
    this.jobPosterClearanceLevelLabel = content.jobPosterClearanceLevelLabel;
    this.jobPosterStartDateLabel = content.jobPosterStartDateLabel;
    this.jobPosterJobLevelLabel = content.jobPosterJobLevelLabel;
    this.jobPosterLanguageLabel = content.jobPosterLanguageLabel;
    this.jobPosterTermLabel = content.jobPosterTermLabel;
    this.save = content.save;
    this.cancel = content.cancel;
    this.editYour = content.editYour;
    this.jobPosterTeamNarrativeText_label = content.jobPosterTeamNarrativeText_label;
    this.jobPosterOperatingContext_label = content.jobPosterOperatingContext_label;
    this.jobPosterWhatWeValue_label = content.jobPosterWhatWeValue_label;
    this.jobPosterHowWeWork_label = content.jobPosterHowWeWork_label;
    this.years = content.years;
    this.status = content.status;
    this.jobPosterBackButtonText = content.jobPosterBackButtonText;
    this.termsAndConditions = content.termsAndConditions;
    this.privacy = content.privacy;
    this.jobPosterApplicants = content.jobPosterApplicants;
};

/**
 *
 * @param {type} content
 * @param {type} isManager
 * @returns {undefined}
 */
TalentCloudAPI.setContent = function (content, isManager) {

    console.log(content);

    siteContent = content;
    document.title = siteContent.title;
    window.title = siteContent.title;

    var logoSource = document.getElementById("logoSrc");
    logoSource.src = siteContent.logoSrc;

    for (var i = 0; i < Object.keys(siteContent).length; i++) {
        var key = Object.keys(siteContent)[i];
        var value = siteContent[key];
        //Seach for id matching the base_content key
        var element = document.getElementById(key);
        if (element) {
            element.innerHTML = value;
        }
        var selector = "." + key; //Search for classes matching the base_content key
        var classElements = document.querySelectorAll(selector);
        for (var j = 0; j < classElements.length; j++) {
            classElements[j].innerHTML = value;
            classElements[j].placeholder = value;
        }
    }


    if (isManager) {

        //console.log(isManager);


        //TODO: make sure spreadsheet and loop replace this functionality
        //CreateWorkEnvironmentAPI.localizeCreateWorkEnvironment();
        //EditTeamCultureAPI.localizeEditTeamCulture();
        CreateJobPosterAPI.localizeCreateJobPosterForm(siteContent);
        CreateEditProfileAPI.localizeCreateEditProfile(siteContent);

        try {

        } catch (e) {
            (console.error || console.log).call(console, e.stack || e);
        }
    }

};

TalentCloudAPI.setNav = function (navItemToHighlightId) {
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

    // Set scroll / focus to top of page
    window.scrollTo(0,0);
    AccessibilityAPI.focusElement("topPage");
    document.getElementById("topPage").focus();
};
