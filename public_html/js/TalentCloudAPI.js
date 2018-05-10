/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TalentCloudAPI = {};
var siteContent;
TalentCloudAPI.roles = {jobseeker:"jobseeker", manager:"manager", admin:"administrator"};

TalentCloudAPI.Content = function(
    // Navigation Links
    navigationLoginLink,
    navigationLogoutLink,
    navigationRegisterLink,
    navigationHomeLink,
    navigationProfileLink,
    navigationBrowseLink,
    navigationDashboardLink,
    navigationPosterLink,
    // Subpage Titles
    browseHeroTitle,
    dashboardHeroTitle,
    profileHeroTitle,
    applicationHeroTitle,
    managerProfileHeroTitle,
    posterHeroTitle,
    faqHeroTitle,
    // Job Poster Content
    jobPosterSubnavLabel,
    jobPosterSubnavItemBasics,
    jobPosterSubnavItemImpact,
    jobPosterSubnavItemWork,
    jobPosterSubnavItemCriteria,
    jobPosterSubnavItemCulture,
    jobPosterSubnavItemKnow,
    jobPosterSubnavItemApply,
    jobPosterContentTitleBasics,
    jobPosterContentTitleImpact,
    jobPosterContentTitleWork,
    jobPosterContentTitleCriteria,
    jobPosterContentTitleCulture,
    jobPosterContentTitleKnow,
    jobPosterContentTitleApply,
    // Job Application
    essentialCriteria,
    assetCriteria,
    microReference,
    skillSample,
    applicationPositionLabel,
    // Application Preview
    editApplication,
    editApplication,
    applicationPreviewProfilePhotoTitle,
    applicationPreviewProfileAlert,
    applicationPreviewDeclarationStoryTitle,
    applicationPreviewMicroReferenceTitle,
    applicationPreviewReferenceMissing,
    applicationPreviewSkillSampleStoryLabel,
    applicationPreviewSkillSampleLink,
    applicationPreviewSkillSampleMissing,
    // Others
    title,
    helpLearn,
    languageSelect,
    applyNow,
    jobPostersLink,
    teamsLink,
    jobNumber,
    jobTitle,
    jobLocation,
    jobCity,
    jobProvince,
    jobApplicantsSoFar,
    jobUnitsToCloseHours,
    jobUnitsToCloseDays,
    jobUnitsToCloseMonths,
    jobUntilClose,
    jobTerm,
    viewButton,
    jobSalaryRange,
    submitApplication,
    step1,
    step2,
    step3, 
    review, 
    goToStep2, 
    goToStep1, 
    goToStep3, 
    goToReview, 
    createJobPosterWindowTitle, 
    createProfileWindowTitle, 
    required,
    createJobPosterSubmitInstructions,
    generalInformation, 
    aboutMe, 
    aLittleBitAboutMe, 
    whatImMostProudOfInCareer, 
    position,
    department,
    branch,
    division,
    leadershipStyle,
    myLeadershipStyle,
    myApproachToEmployee,
    myExpectationsOfEmployees,
    myApproachToDecisionMaking,
    workExperience,
    education,
    howOftenDoYouReview,
    howOftenDoYouStayLate,
    almostNever,
    rarely,
    sometimes,
    usually,
    almostAlways,
    name,
    gctc,
    at,
    howOftenDoYouEngage,
    howOftenDoYouApproveDevelopment,
    readMore,
    canadaLink,
    canadaLinkHref,
    taglineMain,
    taglineSecondary,
    taglineTertiary,
    howItWorksHeading,
    howItWorksLead,
    logoSrc,
    logoAlt,
    ownYourStory,
    ownYourStoryText,
    getFound,
    getFoundText,
    contribute,
    contributeText,
    howItWorksLeadOut,
    howItWorksLast,
    contactUs,
    transcript,
    ourTeam,
    ourTeamText,
    browseTitle,
    createJobApplicationWindowTitle,
    createJobApplicationJobTitleLabel,
    createJobApplicationConfirmationPositionLabel,
    jobApplicationConfirmationTrackingReminder,
    continueToDashboard,
    announcement,
    applicantPortal,
    adminPortal,
    yourApplicationsTitle,
    adminTagline,
    adminAboutMe,
    adminProfilePositionLabel,
    adminProfileDepartmentLabel,
    adminProfileBranchLabel,
    workEnvironment,
    remoteLocationAllowed,
    teleworkAllowed,
    flexHoursAllowed,
    yes,
    no,
    physicalEnvironment,
    yourApplicationsTitle,
    teamCulture,
    teamSize,
    gcDirectoryLink,
    teamSizePrompt,
    gcDirectoryLinkPrompt,
    teamNarrativePrompt,
    openEndedQuestions,
    jobReferenceId,
    skipNavText,
    profileBasicInfoEditTitle,
    workEnvironment,
    remoteLocationAllowed,
    teleworkAllowed,
    flexHoursAllowed,
    yes,
    no,
    physicalEnvironment,
    yourApplicationsTitle,
    teamCulture,
    teamSize,
    gcDirectoryLink,
    teamSizePrompt,
    gcDirectoryLinkPrompt,
    teamNarrativePrompt,
    skipNavText,
    managerProfile_review_option0,
    managerProfile_review_option1,
    managerProfile_review_option2,
    managerProfile_review_option3,
    managerProfile_review_option4,
    managerProfile_stayLate_option0,
    managerProfile_stayLate_option1,
    managerProfile_stayLate_option2,
    managerProfile_stayLate_option3,
    managerProfile_stayLate_option4,
    managerProfile_engagement_option0,
    managerProfile_engagement_option1,
    managerProfile_engagement_option2,
    managerProfile_engagement_option3,
    managerProfile_engagement_option4,
    managerProfile_acceptLowValueWorkRequests_option0,
    managerProfile_acceptLowValueWorkRequests_option1,
    managerProfile_acceptLowValueWorkRequests_option2,
    managerProfile_acceptLowValueWorkRequests_option3,
    managerProfile_acceptLowValueWorkRequests_option4,
    managerDecisions_tipWhatis,
    managerDecisions_tipSummary,
    changeDisplayPic,
    managerProfile_developmentOpportunities_option0,
    managerProfile_developmentOpportunities_option1,
    managerProfile_developmentOpportunities_option2,
    accommodationTextStart,
    accommodationTextEnd,
    jobPosterKeyTasksLabel,
    jobPosterCoreCompetenciesLabel,
    jobPosterHiringManagerLabel,
    jobPosterClearanceLevelLabel,
    jobPosterStartDateLabel,
    jobPosterJobLevelLabel,
    jobPosterLanguageLabel,
    jobPosterTermLabel,
    managerProfile_developmentOpportunities_option3,
    managerProfile_developmentOpportunities_option4,
    updateProfilePhotoTitle,
    updateProfilePhotoDraggableAreaLabel,
    updateProfilePhotoDraggableAreaErrorSize,
    updateProfilePhotoDraggableAreaErrorType,
    updateProfileOrCopy,
    updateProfileChoosePhotoButtonLabelSpan,
    updateProfileChoosePhotoButton,
    updateProfileChooseAltPhotoButtonLabelSpan,
    updateProfileChooseAltPhotoButton,
    updateProfilePhotoCancelButton,
    updateProfileApplicantProfileFormTaglineLabelSpan,
    profileEditTagline,
    updateProfileApplicantProfileFormTwitterLabelSpan,
    profileEditTwitter,
    updateProfileApplicantProfileFormLinkedinLabelSpan,
    profileEditLinkedin,
    profileBasicInfoEditCancel,
    profileBasicInfoEditSave,
    profilePicUploadBtn,
    loginFormTitle,
    loginModalCopySpan,
    switchToRegister,
    loginModalEmailLabelSpan,
    login_email,
    loginModalPasswordLabelSpan,
    login_password,
    loginFormCancelBtn,
    loginFormLoginBtn,
    registerFormTitle,
    profileAboutMeEditTitle,
    updateAboutTextareaLabelSpan,
    profileEditAboutMe,
    profileAboutMeEditCancel,
    profileAboutMeEditSave,
    cancel,
    save,
    editYour,
    jobPosterTeamNarrativeText_label,
    jobPosterOperatingContext_label,
    jobPosterWhatWeValue_label,
    jobPosterHowWeWork_label,
    updateProfileApplicantProfileFormNameLabelSpan,
    profileEditName,
    years,
    status) {
        // Navigation Links
        this.navigationLoginLink = navigationLoginLink;
        this.navigationLogoutLink = navigationLogoutLink;
        this.navigationRegisterLink = navigationRegisterLink;
        this.navigationHomeLink = navigationHomeLink;
        this.navigationProfileLink = navigationProfileLink;
        this.navigationBrowseLink = navigationBrowseLink;
        this.navigationDashboardLink = navigationDashboardLink;
        this.navigationPosterLink = navigationPosterLink;
        // Subpage Titles
        this.browseHeroTitle = browseHeroTitle;
        this.dashboardHeroTitle = dashboardHeroTitle;
        this.profileHeroTitle = profileHeroTitle;
        this.applicationHeroTitle = applicationHeroTitle;
        this.managerProfileHeroTitle = managerProfileHeroTitle;
        this.posterHeroTitle = posterHeroTitle;
        this.faqHeroTitle = faqHeroTitle;
        // Job Poster Content
        this.jobPosterSubnavLabel = jobPosterSubnavLabel;
        this.jobPosterSubnavItemBasics = jobPosterSubnavItemBasics;
        this.jobPosterSubnavItemImpact = jobPosterSubnavItemImpact;
        this.jobPosterSubnavItemWork = jobPosterSubnavItemWork;
        this.jobPosterSubnavItemCriteria = jobPosterSubnavItemCriteria;
        this.jobPosterSubnavItemCulture = jobPosterSubnavItemCulture;
        this.jobPosterSubnavItemKnow = jobPosterSubnavItemKnow;
        this.jobPosterSubnavItemApply = jobPosterSubnavItemApply;
        this.jobPosterContentTitleBasics = jobPosterContentTitleBasics;
        this.jobPosterContentTitleImpact = jobPosterContentTitleImpact;
        this.jobPosterContentTitleWork = jobPosterContentTitleWork;
        this.jobPosterContentTitleCriteria = jobPosterContentTitleCriteria;
        this.jobPosterContentTitleCulture = jobPosterContentTitleCulture;
        this.jobPosterContentTitleKnow = jobPosterContentTitleKnow;
        this.jobPosterContentTitleApply = jobPosterContentTitleApply;
        // Job Application
        this.essentialCriteria = essentialCriteria;
        this.assetCriteria = assetCriteria;
        this.microReference = microReference;
        this.skillSample = skillSample;
        this.applicationPositionLabel = applicationPositionLabel;
        // Application Preview
        this.editApplication = editApplication;
        this.applicationPreviewProfilePhotoTitle = applicationPreviewProfilePhotoTitle;
        this.applicationPreviewProfileAlert = applicationPreviewProfileAlert;
        this.applicationPreviewDeclarationStoryTitle = applicationPreviewDeclarationStoryTitle;
        this.applicationPreviewMicroReferenceTitle = applicationPreviewMicroReferenceTitle;
        this.applicationPreviewReferenceMissing = applicationPreviewReferenceMissing;
        this.applicationPreviewSkillSampleStoryLabel = applicationPreviewSkillSampleStoryLabel;
        this.applicationPreviewSkillSampleLink = applicationPreviewSkillSampleLink;
        this.applicationPreviewSkillSampleMissing = applicationPreviewSkillSampleMissing;    
        // Others
        this.title = title;
        this.helpLearn = helpLearn;
        this.languageSelect = languageSelect;
        this.applyNow = applyNow;
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
        this.yourApplicationsTitle = yourApplicationsTitle;
        this.adminTagline = adminTagline;
        this.adminAboutMe = adminAboutMe;
        this.adminProfilePositionLabel = adminProfilePositionLabel;
        this.adminProfileDepartmentLabel = adminProfileDepartmentLabel;
        this.adminProfileBranchLabel = adminProfileBranchLabel;
        this.teamCulture = teamCulture;
        this.teamSize = teamSize;
        this.gcDirectoryLink = gcDirectoryLink;
        this.teamSizePrompt = teamSizePrompt;
        this.gcDirectoryLinkPrompt = gcDirectoryLinkPrompt;
        this.teamNarrativePrompt = teamNarrativePrompt;
        this.openEndedQuestions = openEndedQuestions;
        this.jobReferenceId = jobReferenceId;
        this.skipNavText = skipNavText;
        this.profileBasicInfoEditTitle = profileBasicInfoEditTitle;
        this.managerProfile_review_option0 = managerProfile_review_option0;
        this.managerProfile_review_option1 = managerProfile_review_option1;
        this.managerProfile_review_option2 = managerProfile_review_option2;
        this.managerProfile_review_option3 = managerProfile_review_option3;
        this.managerProfile_review_option4 = managerProfile_review_option4;
        this.managerProfile_stayLate_option0 = managerProfile_stayLate_option0;
        this.managerProfile_stayLate_option1 = managerProfile_stayLate_option1;
        this.managerProfile_stayLate_option2 = managerProfile_stayLate_option2;
        this.managerProfile_stayLate_option3 = managerProfile_stayLate_option3;
        this.managerProfile_stayLate_option4 = managerProfile_stayLate_option4;
        this.managerProfile_engagement_option0 = managerProfile_engagement_option0;
        this.managerProfile_engagement_option1 = managerProfile_engagement_option1;
        this.managerProfile_engagement_option2 = managerProfile_engagement_option2;
        this.managerProfile_engagement_option3 = managerProfile_engagement_option3;
        this.managerProfile_engagement_option4 = managerProfile_engagement_option4;
        this.managerProfile_developmentOpportunities_option0 = managerProfile_developmentOpportunities_option0;
        this.managerProfile_developmentOpportunities_option1 = managerProfile_developmentOpportunities_option1;
        this.managerProfile_developmentOpportunities_option2 = managerProfile_developmentOpportunities_option2;
        this.managerProfile_developmentOpportunities_option3 = managerProfile_developmentOpportunities_option3;
        this.managerProfile_developmentOpportunities_option4 = managerProfile_developmentOpportunities_option4;
        this.managerProfile_acceptLowValueWorkRequests_option0 = managerProfile_acceptLowValueWorkRequests_option0;
        this.managerProfile_acceptLowValueWorkRequests_option1 = managerProfile_acceptLowValueWorkRequests_option1;
        this.managerProfile_acceptLowValueWorkRequests_option2 = managerProfile_acceptLowValueWorkRequests_option2;
        this.managerProfile_acceptLowValueWorkRequests_option3 = managerProfile_acceptLowValueWorkRequests_option3;
        this.managerProfile_acceptLowValueWorkRequests_option4 = managerProfile_acceptLowValueWorkRequests_option4;
        this.managerDecisions_tipWhatis = managerDecisions_tipWhatis;
        this.managerDecisions_tipSummary = managerDecisions_tipSummary;
        this.changeDisplayPic = changeDisplayPic;
        this.updateProfilePhotoTitle = updateProfilePhotoTitle;
        this.updateProfilePhotoDraggableAreaLabel = updateProfilePhotoDraggableAreaLabel;
        this.updateProfilePhotoDraggableAreaErrorSize = updateProfilePhotoDraggableAreaErrorSize;
        this.updateProfilePhotoDraggableAreaErrorType = updateProfilePhotoDraggableAreaErrorType;
        this.updateProfileOrCopy = updateProfileOrCopy;
        this.updateProfileChoosePhotoButtonLabelSpan = updateProfileChoosePhotoButtonLabelSpan;
        this.updateProfileChoosePhotoButton = updateProfileChoosePhotoButton;
        this.updateProfileChooseAltPhotoButtonLabelSpan = updateProfileChooseAltPhotoButtonLabelSpan;
        this.updateProfileChooseAltPhotoButton = updateProfileChooseAltPhotoButton;
        this.updateProfilePhotoCancelButton = updateProfilePhotoCancelButton;
        this.updateProfileApplicantProfileFormNameLabelSpan = updateProfileApplicantProfileFormNameLabelSpan;
        this.profileEditName = profileEditName;
        this.updateProfileApplicantProfileFormTaglineLabelSpan = updateProfileApplicantProfileFormTaglineLabelSpan;
        this.profileEditTagline = profileEditTagline;
        this.updateProfileApplicantProfileFormTwitterLabelSpan = updateProfileApplicantProfileFormTwitterLabelSpan;
        this.profileEditTwitter = profileEditTwitter;
        this.updateProfileApplicantProfileFormLinkedinLabelSpan = updateProfileApplicantProfileFormLinkedinLabelSpan;
        this.profileEditLinkedin = profileEditLinkedin;
        this.profileBasicInfoEditCancel = profileBasicInfoEditCancel;
        this.profileBasicInfoEditSave = profileBasicInfoEditSave;
        this.profilePicUploadBtn = profilePicUploadBtn;
        this.loginFormTitle = loginFormTitle;
        this.loginModalCopySpan = loginModalCopySpan;
        this.switchToRegister = switchToRegister;
        this.loginModalEmailLabelSpan = loginModalEmailLabelSpan;
        this.login_email = login_email;
        this.loginModalPasswordLabelSpan = loginModalPasswordLabelSpan;
        this.login_password = login_password;
        this.loginFormCancelBtn = loginFormCancelBtn;
        this.loginFormLoginBtn = loginFormLoginBtn;
        this.registerFormTitle = registerFormTitle;
        this.profileAboutMeEditTitle = profileAboutMeEditTitle;
        this.updateAboutTextareaLabelSpan = updateAboutTextareaLabelSpan;
        this.profileEditAboutMe = profileEditAboutMe;
        this.profileAboutMeEditCancel = profileAboutMeEditCancel;
        this.profileAboutMeEditSave = profileAboutMeEditSave;
        this.accommodationTextStart = accommodationTextStart;
        this.accommodationTextEnd = accommodationTextEnd;
        this.jobPosterKeyTasksLabel = jobPosterKeyTasksLabel;
        this.jobPosterCoreCompetenciesLabel = jobPosterCoreCompetenciesLabel;
        this.jobPosterHiringManagerLabel = jobPosterHiringManagerLabel;
        this.jobPosterClearanceLevelLabel = jobPosterClearanceLevelLabel;
        this.jobPosterStartDateLabel = jobPosterStartDateLabel;
        this.jobPosterJobLevelLabel = jobPosterJobLevelLabel;
        this.jobPosterLanguageLabel = jobPosterLanguageLabel;
        this.jobPosterTermLabel = jobPosterTermLabel;
        this.cancel = cancel;
        this.save = save;
        this.editYour = editYour;
        this.jobPosterTeamNarrativeText_label = jobPosterTeamNarrativeText_label;
        this.jobPosterOperatingContext_label = jobPosterOperatingContext_label;
        this.jobPosterWhatWeValue_label = jobPosterWhatWeValue_label;
        this.jobPosterHowWeWork_label = jobPosterHowWeWork_label;
        this.years = years;
        this.status = status;
    };

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
        Utilities.debug?console.log("currentLocale=" + currentLocale):null;
        var feedbackLinkFrench = document.querySelector(".alert-banner__copy--francais");
        var feedbackLinkEnglish = document.querySelector(".alert-banner__copy--english");
        if(currentLocale === "en_CA"){
            currentLocale = "fr_CA";
            TalentCloudAPI.setLanguageCookie("fr_CA");
            feedbackLinkFrench.classList.remove("hidden");
            feedbackLinkEnglish.classList.add("hidden");
        }else{
            currentLocale = "en_CA";
            TalentCloudAPI.setLanguageCookie("en_CA");
            feedbackLinkFrench.classList.add("hidden");
            feedbackLinkEnglish.classList.remove("hidden");
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
    var skipNavText = document.getElementById("skipNavText");
    skipNavText.innerHTML = siteContent.skipNavText;

    var announcement = document.getElementById("announcement");
    announcement.innerHTML = siteContent.announcement;

    var gctc = document.getElementById("gctc");
    gctc.innerHTML = siteContent.gctc;

    var languageLink = document.getElementById("languageSelect");
    languageLink.innerHTML = siteContent.languageSelect;

    var logoSrc = document.getElementById("logoSrc");
    logoSrc.src = siteContent.logoSrc;
    logoSrc.alt = siteContent.logoAlt;

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

        // var taglineSecondary = document.getElementById("taglineSecondary");
        // taglineSecondary.innerHTML = siteContent.taglineSecondary;

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
