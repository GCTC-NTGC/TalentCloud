/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var JobPostAPI = {};
//JobPostAPI.jobPosts = [];


JobPostAPI.version = "v1";
//API url
JobPostAPI.baseURL = "/tc/api/"+JobPostAPI.version+"";

/**
 *
 * @returns {JobPostAPI.JobPost}
 */
JobPostAPI.JobPost = function(
    id,manager_user_id,title,applicants_to_date,close_date_time,department,branch,division,location_city,location_province,
    term_qty,term_units,remuneration_type,remuneration_range_low,remuneration_range_high,impact,key_tasks,core_competencies,
    developing_competencies,questions,classification,security_clearance,language_requirement,start_date){
    this.id = id;
    this.manager_user_id = manager_user_id;
    this.title = title;
    this.applicants_to_date = applicants_to_date;
    this.close_date_time = close_date_time;
    this.department = department;
    this.branch = branch;
    this.division = division;
    this.location_city = location_city;
    this.location_province = location_province;
    this.term_qty = term_qty;
    this.term_units = term_units;
    this.remuneration_type = remuneration_type;
    this.remuneration_range_low = remuneration_range_low;
    this.remuneration_range_high = remuneration_range_high;
    this.impact = impact;
    this.key_tasks = key_tasks;
    this.core_competencies = core_competencies;
    this.developing_competencies = developing_competencies;
    this.questions = questions;
    this.classification = classification;
    this.security_clearance = security_clearance;
    this.language_requirement = language_requirement;
    this.start_date = start_date;
};

JobPostAPI.JobPosterQuestion = function(id, question, description) {
    this.id = id;
    this.question = question;
    this.description = description;
};

JobPostAPI.showBrowseJobs = function() {
    var stateInfo = {pageInfo: 'browse_jobs', pageTitle: 'Talent Cloud: Browse Jobs'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#BrowseJobs');

    TalentCloudAPI.hideAllContent();
    var browseJobsSection = document.getElementById('browseJobsSection');
    browseJobsSection.classList.remove('hidden');

    var loadingJobs = document.getElementById("loadingJobs");
    loadingJobs.classList.remove("hidden");

    var locale = TalentCloudAPI.getLanguageFromCookie();
    DataAPI.getJobs(locale, JobPostAPI.populateJobObjectList);

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var browseHeroTitle = document.getElementById("browseHeroTitle");
    browseHeroTitle.classList.remove("hidden");
    browseHeroTitle.setAttribute("aria-hidden", "false");

    // Google Analytics

    ga('set', 'page', '/browse-jobs');
    ga('send', 'pageview');

};

/**
 *
 * @param {type} data
 * @returns {undefined}
 */
JobPostAPI.populateJobObjectList = function(xhr_response){
    var data = JSON.parse(xhr_response.responseText);
    Utilities.debug?console.log("populating job Objects"):null;
    Utilities.debug?console.log(data):null;

    var jobs = data.jobs;
    //var jobs = data.response.jsonBody.job;
    jobPosts = [];

    for(var job in jobs){

        Utilities.debug?console.log(jobs[job]):null;

        var job = JobPostAPI.populateJobObject(jobs[job]);

        jobPosts.push(job);
    }

    JobPostAPI.populateJobs(jobPosts);

};

/**
 *
 * @param {json} JSONJob
 * @returns JobPostAPI.JobPost
 */
JobPostAPI.populateJobObject = function(JSONJob){

    Utilities.debug?console.log("populating job Objects"):null;
    Utilities.debug?console.log(JSONJob):null;
    //console.log(JSONJob);
    var job = JSONJob;

    Utilities.debug?console.log(job):null;
    //console.log(job);
    var jobObj = new JobPostAPI.JobPost();

    jobObj.id = job.id;
    jobObj.manager_user_id = job.manager_user_id;
    jobObj.title = job.title;
    jobObj.applicants_to_date = job.applicants_to_date;
    jobObj.close_date_time = job.close_date;
    jobObj.department = job.department;
    jobObj.branch = job.branch;
    jobObj.division = job.division;
    jobObj.location_city = job.location_city;
    jobObj.location_province = job.location_province;
    jobObj.term_qty = job.term_qty;
    jobObj.term_units = job.term_units;
    jobObj.remuneration_type = job.remuneration_type;
    jobObj.remuneration_range_low = job.remuneration_range_low;
    jobObj.remuneration_range_high = job.remuneration_range_high;
    jobObj.impact = job.impact;
    jobObj.key_tasks = job.key_tasks;
    jobObj.core_competencies = job.core_competencies;
    jobObj.developing_competencies = job.developing_competencies;
    jobObj.questions = [];
    for(var i=0; i<job.questions.length; i++) {
        var jsonQuesion = job.questions[i];
        var question = new JobPostAPI.JobPosterQuestion(jsonQuesion.id, jsonQuesion.question, jsonQuesion.description);
        jobObj.questions.push(question);
    }

    // TAL-150
    jobObj.classification = job.classification;
    jobObj.security_clearance = job.security_clearance;
    jobObj.language_requirement = job.language_requirement;
    jobObj.start_date = job.start_date;


    Utilities.debug?console.log(jobObj):null;

    return jobObj;
};

/**
 *
 * @returns {undefined}
 */
JobPostAPI.populateJobs = function(jobPosts){
    Utilities.debug?console.log("populating jobs"):null;
    var jobsWrapper = document.getElementById("jobList");
    var jobsDiv = document.getElementById("browseJobsList");
    var noJobs = document.getElementById("noJobs");
    var loadingJobs = document.getElementById("loadingJobs");

    var browseJobsSection = document.getElementById("browseJobsSection");
    browseJobsSection.classList.remove("hidden");

    //Remove previously shown jobs
    while (jobsDiv.lastChild) {
        jobsDiv.removeChild(jobsDiv.lastChild);
    }
    var locale = TalentCloudAPI.getLanguageFromCookie().toString();
    for(var j = 0; j < jobPosts.length; j++){
        var job = jobPosts[j];
        jobsDiv.appendChild(JobPostAPI.populateJobSummary(job, false, locale));
    }

    loadingJobs.classList.add("hidden");
    if(jobPosts.length > 0){
        jobsWrapper.classList.remove("hidden");
        noJobs.classList.add("hidden");
    } else {
        jobsWrapper.classList.add("hidden");
        noJobs.classList.remove("hidden");
    }

    EventsAPI.hideBodyOverflow(false);
};

/** SHORT JOB DESCRIPTIONS (BROWSE JOBS AREA)
 *
 * @param {type} job
 * @param {type} demo
 * @param {type} locale
 * @returns {Element|JobPostAPI.populateJobSummary.jobCard}
 */
JobPostAPI.populateJobSummary = function(job, demo, locale){

    Utilities.debug?console.log("populating job"):null;

    // Create a job-card.
    var jobCard = document.createElement("a");
    jobCard.setAttribute("class", "job-card box med-1of2 lg-1of3");
    jobCard.setAttribute("id", "jobId_"+job.id);
    jobCard.setAttribute("title", job.title);
    jobCard.setAttribute("tabindex", 0);
    // jobCard.setAttribute("value", siteContent.viewButton);
    // jobCard.innerHTML = siteContent.viewButton;
    jobCard.setAttribute("onclick", "JobPostAPI.viewJobPoster("+job.id+")");

    var jobCardID = document.createElement("div");
    jobCardID.setAttribute("class", "jobId hidden");
    jobCardID.innerHTML = job.id;

    var jobCardWrapper = document.createElement("div");
    jobCardWrapper.setAttribute("class", "job-card__wrapper");

    // Create a job-card__title-wrapper.
    var jobCardTitleWrapper = document.createElement("div");
    jobCardTitleWrapper.setAttribute("class", "job-card__title-wrapper");

    var jobCardTitle = document.createElement("h3");
    jobCardTitle.setAttribute("class", "job-card__title");
    jobCardTitle.innerHTML = job.title;

    var jobCardDepartment = document.createElement("span");
    jobCardDepartment.setAttribute("class", "job-card__department");
    jobCardDepartment.innerHTML = job.department;

    // Create a job-card__content-wrapper.
    var jobCardContentWrapper = document.createElement("div");
    jobCardContentWrapper.setAttribute("class", "job-card__content-wrapper flex-grid");

    var jobCardContentBox1 = document.createElement("div");
    var jobCardContentBox2 = document.createElement("div");
    var jobCardContentBox3 = document.createElement("div");
    var jobCardContentBox4 = document.createElement("div");

    jobCardContentBox1.setAttribute("class", "box small-1of2");
    jobCardContentBox2.setAttribute("class", "box small-1of2");
    jobCardContentBox3.setAttribute("class", "box small-1of2");
    jobCardContentBox4.setAttribute("class", "box small-1of2");

    var jobCardLocationLabel = document.createElement("span");
    if (locale === "fr_CA" ){
        jobCardLocationLabel.innerHTML = "Emplacement";
    } else {
        jobCardLocationLabel.innerHTML = "Location";
    }
    var jobCardSalaryLabel = document.createElement("span");
    if (locale === "fr_CA" ){
        jobCardSalaryLabel.innerHTML = "Offre d'emploi";
    } else {
        jobCardSalaryLabel.innerHTML = "Salary";
    }
    var jobCardDurationLabel = document.createElement("span");
    if (locale === "fr_CA" ){
        jobCardDurationLabel.innerHTML = "Duration";
    } else {
        jobCardDurationLabel.innerHTML = "Duration";
    }
    var jobCardRemoteLabel = document.createElement("span");
    if (locale === "fr_CA" ){
        jobCardRemoteLabel.innerHTML = "Travail à distance";
    } else {
        jobCardRemoteLabel.innerHTML = "Remote Work";
    }

    var jobCardLocationWrapper = document.createElement("p");
    var jobCardLocationCity = document.createElement("span");
    jobCardLocationCity.innerHTML = job.location_city + "," + "&nbsp";
    var jobCardLocationProvince = document.createElement("span");
    jobCardLocationProvince.innerHTML = job.location_province;

    var jobCardSalary = document.createElement("p");
    jobCardSalary.setAttribute("id", "jobCardSalary"+job.id);
    if (locale === "en_CA"){
        jobCardSalary.innerHTML = "$" + job.remuneration_range_low.toLocaleString('en') + "–$" + job.remuneration_range_high.toLocaleString('en');
    } else {
        jobCardSalary.innerHTML = job.remuneration_range_low.toLocaleString('fr') + " $–" + job.remuneration_range_high.toLocaleString('fr') + " $";
    }

    var jobCardDuration = document.createElement("p");
    jobCardDuration.innerHTML = job.term_qty + " " + job.term_units + " " + siteContent.jobTerm ;

    var jobCardRemote = document.createElement("p");
    var jobCardRemoteID = "jobCardRemote" + jobCardID;
    jobCardRemote.setAttribute("id", jobCardRemoteID)
    //Load Other Hiring Manager Data
    DataAPI.getManagerProfile(job.manager_user_id, function(response) {
       var locale = TalentCloudAPI.getLanguageFromCookie();
       var managerProfile = ManagerProfileAPI.parseManagerProfileResponse(response, locale);
       WorkEnvironmentAPI.loadWorkEnvironmentBrowseJobs(managerProfile.manager_profile_id, jobCardRemoteID);
    });

    // Create a job-card__footer-wrapper.
    var jobCardFooterWrapper = document.createElement("div");
    jobCardFooterWrapper.setAttribute("class", "job-card__footer-wrapper flex-grid");

    var jobCardFooterBox1 = document.createElement("div");
    var jobCardFooterBox2 = document.createElement("div");

    jobCardFooterBox1.setAttribute("class", "box med-1of2");
    jobCardFooterBox2.setAttribute("class", "box med-1of2");

    var jobCardDayValue = document.createElement("span");
    var jobCardApplicationValue = document.createElement("span");

    jobCardDayValue.innerHTML = Utilities.timeRemaining(job.close_date_time) + " " + siteContent.jobUntilClose;
    jobCardApplicationValue.innerHTML = job.applicants_to_date + " " + siteContent.jobApplicantsSoFar;

    // Create a job-card__view-button.
    var jobCardViewButton = document.createElement("button");
    jobCardViewButton.setAttribute("class", "job-card__view-button");
    jobCardViewButton.setAttribute("tabindex", "-1");
    if (locale === "fr_CA" ){
        jobCardViewButton.innerHTML = "Voir le travail";
    } else {
        jobCardViewButton.innerHTML = "View Job";
    }

    // Build the job-card.

    // Build the job-card__title-wrapper.
    jobCardTitleWrapper.appendChild(jobCardTitle);
    jobCardTitleWrapper.appendChild(jobCardDepartment);

    // Build the job-card__content-wrapper.
    jobCardContentBox1.appendChild(jobCardLocationLabel);

    jobCardLocationWrapper.appendChild(jobCardLocationCity);
    jobCardLocationWrapper.appendChild(jobCardLocationProvince);
    jobCardContentBox1.appendChild(jobCardLocationWrapper);

    jobCardContentBox2.appendChild(jobCardSalaryLabel);
    jobCardContentBox2.appendChild(jobCardSalary);

    jobCardContentBox3.appendChild(jobCardDurationLabel);
    jobCardContentBox3.appendChild(jobCardDuration);

    jobCardContentBox4.appendChild(jobCardRemoteLabel);
    jobCardContentBox4.appendChild(jobCardRemote);

    jobCardContentWrapper.appendChild(jobCardContentBox1);
    jobCardContentWrapper.appendChild(jobCardContentBox2);
    jobCardContentWrapper.appendChild(jobCardContentBox3);
    jobCardContentWrapper.appendChild(jobCardContentBox4);

    // Build the job-card__footer-wrapper.
    jobCardFooterBox1.appendChild(jobCardDayValue);
    jobCardFooterBox2.appendChild(jobCardApplicationValue);

    jobCardFooterWrapper.appendChild(jobCardFooterBox1);
    jobCardFooterWrapper.appendChild(jobCardFooterBox2);

    // Build the job-card__wrapper.
    jobCardWrapper.appendChild(jobCardTitleWrapper);
    jobCardWrapper.appendChild(jobCardContentWrapper);
    jobCardWrapper.appendChild(jobCardFooterWrapper);
    jobCardWrapper.appendChild(jobCardViewButton);

    // Build the job-card.
    jobCard.appendChild(jobCardID);
    jobCard.appendChild(jobCardWrapper);

    return jobCard;

};



/**
 *
 * @returns {Number}
 */
JobPostAPI.getJobCount = function(){
    if(JobPostAPI.jobPosts){
        return JobPostAPI.jobPosts.length;
    }
    return 0;
};

/**
 *
 * @param {type} jobPosterId
 * @returns {Element|JobPostAPI.addFavouriteLink.jobPosterFavouriteImgWrapper}
 */
JobPostAPI.addFavouriteLink = function(jobPosterId){
    var jobPoster = document.getElementById(jobPosterId);


    //create hidden div for favourite action
    var jobPosterFavouriteImgWrapper = document.createElement("div");
    jobPosterFavouriteImgWrapper.setAttribute("class","favouriteImageWrapper");
    jobPosterFavouriteImgWrapper.setAttribute("id","fav_"+jobPosterId);

    var jobPosterFavouriteImgSrc = new Image();
    jobPosterFavouriteImgSrc.src = "/images/watch_list_off.svg";

    var jobPosterFavouriteImg = document.createElement("img");
    jobPosterFavouriteImg.setAttribute("class", "jobPosterFavouriteImg");
    jobPosterFavouriteImg.src = jobPosterFavouriteImgSrc.src;

    var jobPosterFavouriteLink = document.createElement("a");
    jobPosterFavouriteLink.setAttribute("class", "jobPosterFavouriteLink");
    jobPosterFavouriteLink.setAttribute("title", "Add to watched job posts");
    jobPosterFavouriteLink.setAttribute("href","javascript:void(0)");
    jobPosterFavouriteLink.setAttribute("onclick","JobPostAPI.toggleFavourite('"+jobPosterId+"')");

    jobPosterFavouriteLink.innerHTML = jobPosterFavouriteImg.outerHTML;
    jobPosterFavouriteImgWrapper.innerHTML = jobPosterFavouriteLink.outerHTML;

    return jobPosterFavouriteImgWrapper;
};

/**
 *
 * @param {type} responseText
 * @returns {undefined}
 */
JobPostAPI.toggleFavourite = function(jobPosterId){
    Utilities.debug?console.log(jobPosterId):null;

    if(jobPosterId !== ""){
        DataAPI.toggleFavourite(jobPosterId);
    }
};

/**
 *
 * @param {type} isFav
 * @param {type} jobPosterId
 * @returns {undefined}
 */
JobPostAPI.updateFavourite = function(isFav,jobPosterId){

    var contactToUpdate = document.getElementById(jobPosterId);

    var favImg = contactToUpdate.getElementsByClassName('favouriteImage')[0];

    var notFavouriteImage = new Image();
    notFavouriteImage.src = "images/not-favourite.svg";

    var favouriteImage = new Image();
    favouriteImage.src = "images/favourite.svg";

    if(isFav){
        favImg.src = favouriteImage.src;
    }else{
        favImg.src = notFavouriteImage.src;
    }

    Utilities.debug?console.log(favImg.src):null;
}


/**
 *
 * @returns {Boolean}
 */
JobPostAPI.viewJobPoster = function(jobId){
    DataAPI.getJobPoster(TalentCloudAPI.getLanguageFromCookie(),jobId, function(response) {
        var jobPoster = JobPostAPI.populateJobObject(JSON.parse(response));
        JobPostAPI.populateJobPoster(jobPoster);
    });

    // focus top of page
    window.scrollTo(0,0);
    document.getElementById("skipNav").focus();

    if(UserAPI.hasSessionUser()) {
        document.getElementById("jobPosterButtonWrapper").classList.add("logged-in");
    } else {
        document.getElementById("jobPosterButtonWrapper").classList.remove("logged-in");
    }

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var browseHeroTitle = document.getElementById("browseHeroTitle");
    // var browseHeroPosterMetaData = document.getElementById("browseHeroPosterMetaData");
    browseHeroTitle.classList.remove("hidden");
    browseHeroTitle.setAttribute("aria-hidden", "false");
    // browseHeroPosterMetaData.classList.remove("hidden");

    // Google Analytics

    ga('set', 'page', '/browse-jobs/'+jobId);
    ga('send', 'pageview');

};

JobPostAPI.localizeJobPoster = function() {
    if (siteContent) {
        document.getElementById('jobPosterHiringManagerPositionAtLabel').innerHTML = siteContent.at;
        // document.getElementById('accommodationRequestAt').innerHTML = siteContent.at;
        document.getElementById('jobPosterHiringManagerButton').innerHTML = siteContent.readMore;
        document.getElementById("jobPosterIdLabel").innerHTML = siteContent.jobReferenceId;

        //Set language-specific labels
        document.getElementById("jobPosterSalaryRangeLabel").innerHTML = siteContent.jobSalaryRange;
        var applyButton = document.getElementById("jobPosterApplyButton");
        if (applyButton)
            applyButton.innerHTML = siteContent.applyNow;
        var loginButton = document.getElementById("jobPosterLoginButton");
        if (loginButton)
            loginButton.innerHTML = siteContent.navigationLoginLink;
        }
};

/** LONG JOB DESCRIPTIONS (VIEW JOB POSTER)
 *
 * @param JobPostAPI.JobPost jobData
 * @returns {undefined}
 */
JobPostAPI.populateJobPoster = function(jobData){
    var stateInfo = {pageInfo: 'view_job_poster', pageTitle: 'Talent Cloud: ' + jobData.title + ' (' + jobData.id + ')', jobId: jobData.id};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#Job/' + jobData.id);
    //console.log("asdfasdfsd = "+history.state.pageInfo);

    TalentCloudAPI.hideAllContent();

    //Start requests for Hiring Manager data
    //Load Hiring Manager Name
    DataAPI.getUser(jobData.manager_user_id, function(response) {
       var managerUser = JSON.parse(response);
       document.getElementById('jobPosterHiringManagerName').innerHTML = managerUser.user.name;
       // document.getElementById('jobPosterHiringManagerNameAccommodation').innerHTML = managerUser.user.name;

       if (locale === "en_CA"){
           var subject = "?subject=TalentCloud Accommodation Request for Job ID #" + jobData.id;
       } else {
           var subject = "?subject=Demande d'hébergement TalentCloud pour le numéro d'identification du travail " + jobData.id;
       }
       // document.getElementById('jobPosterHiringManagerEmail').innerHTML = managerUser.user.email;
       // document.getElementById('jobPosterHiringManagerEmail').href = "mailto:" + managerUser.user.email + subject;
    });

    // Subnav Content
    var jobPosterSubnavJobTitle = document.getElementById("jobPosterSubnavJobTitle");
    var jobPosterSubnavDepartment = document.getElementById("jobPosterSubnavDepartment");
    jobPosterSubnavJobTitle.innerHTML = jobData.title;
    jobPosterSubnavDepartment.innerHTML = jobData.department;

    //Return to job poster from hiring manager profile
     var jobPosterBack1 = document.getElementById("jobPosterBackButton");
     jobPosterBack1.setAttribute("onclick", "JobPostAPI.viewJobPoster("+jobData.id+")");
     var jobPosterBack2 = document.getElementById("jobPosterBackButton2");
     jobPosterBack2.setAttribute("onclick", "JobPostAPI.viewJobPoster("+jobData.id+")");

    //Load Hiring Manager Image
    var hiringManagerProfilePic = document.getElementById('jobPosterCultureManagerProfilePhoto');
    ProfilePicAPI.refreshProfilePicBackground(jobData.manager_user_id, hiringManagerProfilePic);
    //Load Other Hiring Manager Data
    DataAPI.getManagerProfile(jobData.manager_user_id, function(response) {
       var locale = TalentCloudAPI.getLanguageFromCookie();
       var managerProfile = ManagerProfileAPI.parseManagerProfileResponse(response, locale);
       document.getElementById('jobPosterHiringManagerTitle').innerHTML = managerProfile.position;

       //Get department ID
       var dept_id = parseInt(managerProfile.department_id);
       //Convert to localized value
       var department_text = LookupAPI.getLocalizedLookupValue("department", dept_id);
       //Assign to HTML element
       document.getElementById("jobPosterHiringManagerDepartment").innerHTML = department_text;

       /*Truncating Manager About Me*/
        //Get rid of read more feature. User must click read profile to read all information.
       var len = 250;
       if (managerProfile.about_me !== null && managerProfile.about_me.length > 0) {
            var fullText = managerProfile.about_me;
            var id = "jobPosterHiringManagerAboutMe";
            var aboutMe = document.getElementById(id);



            if(fullText.length > len){
               var trunc = fullText.substring(0, len).replace(/\w+$/, '');
               var remainder = fullText.substring(len, fullText.length);

                aboutMe.innerHTML = trunc.concat("...");

               /*
               //Code for repurposing
               var showMoreAnchor = document.createElement("a");
               showMoreAnchor.setAttribute("id", id + "_MoreLink");
               showMoreAnchor.setAttribute("href", "javascript:void(0)");
               showMoreAnchor.setAttribute("onclick", "JobPostAPI.showMoreHiringManagerSummary(\"" + id + "\")");
               showMoreAnchor.innerHTML = "..."; // Append this to the truncating

               var showLessAnchor = document.createElement("a");
               showLessAnchor.setAttribute("id", id + "_LessLink");
               showLessAnchor.setAttribute("class", "hidden");
               showLessAnchor.setAttribute("href", "javascript:void(0)");
               showLessAnchor.setAttribute("onclick", "JobPostAPI.showLessHiringManagerSummary(\"" + id  + "\")");
               showLessAnchor.innerHTML = "Less";


               var overflowSpan = document.createElement("span");
               overflowSpan.setAttribute("class", "hidden");
               overflowSpan.setAttribute("id", id + "_Overflow");

               var remainderText = document.createTextNode(remainder);

               overflowSpan.appendChild(remainderText);

               var truncatedSpan = document.createElement("span");
               var truncateText = document.createTextNode(trunc);

               truncatedSpan.appendChild(truncateText);
               truncatedSpan.appendChild(overflowSpan);

               var space = document.createTextNode( '\u00A0' );

               aboutMe.appendChild(truncatedSpan);
               aboutMe.appendChild(space);
               aboutMe.appendChild(showMoreAnchor);
               aboutMe.appendChild(showLessAnchor);
               */

            } else {
                aboutMe.innerHTML = fullText;
            }
            /*End Truncating*/
        }

        if(managerProfile.manager_profile_id !== null){
            WorkEnvironmentAPI.loadWorkEnvironmentSummary(managerProfile.manager_profile_id);
            TeamCultureAPI.loadTeamCultureSummary(managerProfile.manager_profile_id);
        }
    });

    //TODO: add more

   //set hidden values
   document.getElementById("jobPosterJobId").value = jobData.id;
   document.getElementById('jobPosterHiringManagerUserId').value = jobData.manager_user_id;

    //Header
    if (jobData.title === "") {
        jobData.title = "No Title";
    }
    document.getElementById("jobPosterTitle").innerHTML = jobData.title;
    document.getElementById("jobPosterDepartment").innerHTML = jobData.department;
    document.getElementById("jobPosterCity").innerHTML = jobData.location_city;
    document.getElementById("jobPosterProvince").innerHTML = jobData.location_province;
    document.getElementById("jobPosterIdValue").innerHTML = jobData.id;

    //Datapoints
    if (locale === "en_CA"){
        document.getElementById("jobPosterSalaryRangeValue").innerHTML = "$" + jobData.remuneration_range_low.toLocaleString('en') + " ~ $" + jobData.remuneration_range_high.toLocaleString('en');
    } else {
        document.getElementById("jobPosterSalaryRangeValue").innerHTML = jobData.remuneration_range_low.toLocaleString('fr') + " $ ~ " + jobData.remuneration_range_high.toLocaleString('fr') + " $";
    }

    document.getElementById("jobPosterTermValue").innerHTML = jobData.term_qty + " " + jobData.term_units;
    document.getElementById("jobPosterJobLevelValue").innerHTML = jobData.classification;
    document.getElementById("jobPosterClearanceLevelValue").innerHTML = jobData.security_clearance;
    document.getElementById("jobPosterLanguageValue").innerHTML = jobData.language_requirement;



    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = jobData.start_date.split(/[- :]/);
    // Apply each element to the Date function
    var d = new Date(t[0], t[1]-1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);

    // Get localized month
    if (locale === "en_CA"){
        var month = d.toLocaleString("en", {month: "long"});
    } else {
        var month = d.toLocaleString("fr", {month: "long"});
    }
    // Formatting i.e. April, 2018
    var startDateFormatted = month + ", " + d.getFullYear();

    document.getElementById("jobPosterStartDateValue").innerHTML = startDateFormatted;

    if (jobData.impact === "")
        jobData.impact = "N/A";
    document.getElementById("jobPosterImpact").innerHTML = jobData.impact;

    var keyTaskList = document.getElementById("jobPosterKeyTasks");
    if (jobData.key_tasks.length === 0) {
        jobData.key_tasks.push("N/A");
    }
    JobPostAPI.setItemsForListElement(keyTaskList, jobData.key_tasks, "keyTaskItem");

    var coreCompetencyList = document.getElementById("jobPosterCoreCompetencies");
    var coreCompetencyValues = [];
    if (jobData.core_competencies.length === 0) {
        coreCompetencyValues.push("N/A");
    } else {
        var core_competencies = jobData.core_competencies;
        for (var i = 0; i < core_competencies.length; i++) {
            coreCompetencyValues.push(core_competencies[i].value);
        }
    }
    JobPostAPI.setItemsForListElement(coreCompetencyList, coreCompetencyValues, "coreCompetencyItem");

    var developingCompetencyList = document.getElementById("jobPosterDevelopingCompetencies");
    var devCompetencyValues = [];
    if (jobData.developing_competencies.length === 0) {
        devCompetencyValues.push("N/A");
    } else {
        var developing_competencies = jobData.developing_competencies;
        for (var i = 0; i < developing_competencies.length; i++) {
            devCompetencyValues.push(developing_competencies[i].value);
        }
    }
    JobPostAPI.setItemsForListElement(developingCompetencyList, devCompetencyValues, "developingCompetencyItem");

    /*
    Setting Apply button vs login button now done in php

    var applyNowButton = document.getElementById("jobPosterApplyButton");
    if(UserAPI.hasSessionUser()){
        applyNowButton.setAttribute("onclick", "JobApplicationAPI.showCreateJobApplication("+jobData.id+");");
    }else{
        applyNowButton.setAttribute("onclick", "UserAPI.showLogin()");
    }
    */

    // Show Time Remaining & Number of Applicants
    var jobTimeRemaining = document.getElementById("jobPosterTimeRemaining");
    jobTimeRemaining.innerHTML = Utilities.timeRemaining(jobData.close_date_time) + " " + siteContent.jobUntilClose;
    var jobApplicants = document.getElementById("jobPosterApplicants");
    jobApplicants.innerHTML = jobData.applicants_to_date + " " + siteContent.jobApplicantsSoFar;

    document.getElementById("viewJobPosterSection").classList.remove("hidden");

    //TODO: fix this when working on jobPoserApplications
    //var jobSeekerProfileId = document.getElementById("profile_id").value;
};

JobPostAPI.showMoreHiringManagerSummary = function(id){
    document.getElementById(id+'_Overflow').classList.remove("hidden");
    document.getElementById(id+'_MoreLink').classList.add("hidden");
    document.getElementById(id+'_LessLink').classList.remove("hidden");
};

JobPostAPI.showLessHiringManagerSummary = function(id){
    document.getElementById(id+'_Overflow').classList.add("hidden");
    document.getElementById(id+'_MoreLink').classList.remove("hidden");
    document.getElementById(id+'_LessLink').classList.add("hidden");
};

JobPostAPI.setItemsForListElement = function(element, items, itemClassAtribute) {
    //First, clear existing items in element
    while( element.lastChild )
        element.removeChild( element.lastChild );

    for (var i=0; i<items.length; i++) {
        if (items[i].trim()) {
            var item = document.createElement("li");
            if (itemClassAtribute)
                item.setAttribute("class", itemClassAtribute);
            var p = document.createElement("p");
            var text = document.createTextNode(items[i]);

            p.appendChild(text);
            item.appendChild(p)
            element.appendChild(item);
        }
    }
};

/**
 *
 * @returns {undefined}
 */
JobPostAPI.hideJobPoster = function(){
    var jobPosterSection = document.getElementById("viewJobPosterSection");
    jobPosterSection.classList.add("hidden");

    JobPostAPI.showBrowseJobs();
};

/**
 *
 * @param {type} jobPosterId
 * @param {type} jobTitle
 * @returns {undefined}
 */
JobPostAPI.jobPosterApplication = function(jobPosterId, jobTitle){
    //console.log(jobPosterId);
    var viewJobPosterApplicationOverlay = document.getElementById("viewJobPosterApplicationOverlay");
    viewJobPosterApplicationOverlay.classList.add("hidden");
    var jobSeekerProfileId = document.getElementById("profile_id").value;
    //var viewJobPosterApplicationCloseButton = document.getElementById("jobPosterApplicationCloseButton");
    //viewJobPosterApplicationCloseButton.setAttribute("aria-label","Close "+jobTitle + " " + jobPosterId + " application dialog");

    //var viewJobPosterApplicationWrapperWindow = document.getElementById("viewJobPosterApplicationWrapperWindow");
    //AccessibilityAPI.setARIALabelledBy(viewJobPosterApplicationWrapperWindow,"jobPosterApplicationHeader_"+jobPosterId);
    //AccessibilityAPI.setARIADescribedBy(viewJobPosterApplicationWrapperWindow,"jobPosterApplicationHeader_"+jobPosterId);

    var jobPosterApplication = document.getElementById("jobPosterApplication");

    var jobPosterApplicationHeader = document.createElement("div");
    jobPosterApplicationHeader.setAttribute("id", "jobPosterApplicationHeader_"+jobPosterId);
    jobPosterApplicationHeader.setAttribute("tabindex", "0");
    jobPosterApplicationHeader.setAttribute("class", "row jobPosterHeader");
    jobPosterApplicationHeader.innerHTML = "Application - " + jobTitle + " ("+jobPosterId+")";

    var jobPosterApplicationProfileSelect = document.createElement("div");
    jobPosterApplicationProfileSelect.setAttribute("id", "jobPosterApplicationProfileSelect");
    jobPosterApplicationProfileSelect.setAttribute("class", "jobPosterApplicationProfileSelect");
    jobPosterApplicationProfileSelect.innerHTML = "Select profile to submit with the application";


    var jobPosterSubmitApplicationButton = document.createElement("div");
    jobPosterSubmitApplicationButton.setAttribute("id", "jobPosterSubmitApplicationButton_"+jobPosterId);
    jobPosterSubmitApplicationButton.setAttribute("class", "btn_primary jobPosterSubmitApplicationButton");

    var submitApplicationButton = document.createElement("button");
    submitApplicationButton.setAttribute("id", "submitApplicationButton_"+jobPosterId);
    submitApplicationButton.setAttribute("class","btn btn-primary");
    submitApplicationButton.innerHTML = siteContent.submitApplication;
    submitApplicationButton.setAttribute("onclick", "JobPostAPI.submitJobPosterApplication('"+jobPosterId+"','"+jobSeekerProfileId+"');");
    submitApplicationButton.setAttribute("onkeydown", "AccessibilityAPI.onKeydownPreventEscapeForward();");
    jobPosterSubmitApplicationButton.appendChild(submitApplicationButton);

    jobPosterApplication.appendChild(jobPosterApplicationHeader);
    jobPosterApplication.appendChild(jobPosterApplicationProfileSelect);
    jobPosterApplication.appendChild(jobPosterSubmitApplicationButton);
    jobPosterApplication.classList.remove("hidden");
    jobPosterApplicationHeader.focus();
    //var viewJobPosterOverlay = document.getElementById("viewJobPosterOverlay");
    //viewJobPosterOverlay.classList.add("hidden");
};

/**
 *
 * @param {type} jobPosterId
 * @param {type} jobSeekerProfileId
 * @returns {undefined}
 */
JobPostAPI.submitJobPosterApplication = function(jobPosterId,jobSeekerProfileId){
    Utilities.debug?console.log("loading talent cloud UI"):null;
    Utilities.debug?console.log("loading contacts"):null;
    var jobPosterApplication_URL = JobPostAPI.baseURL+"/putJobPosterApplication/"+jobPosterId+"/"+jobSeekerProfileId;

    var authToken = "";
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthTokenAsJSON();
    }
    var jobPosterApplication_xhr = new XMLHttpRequest();
    if ("withCredentials" in jobPosterApplication_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      jobPosterApplication_xhr.open("PUT", jobPosterApplication_URL);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      jobPosterApplication_xhr = new XDomainRequest();
      jobPosterApplication_xhr.open("PUT", jobPosterApplication_URL);

    } else {

      // Otherwise, CORS is not supported by the browser.
      jobPosterApplication_xhr = null;

    }

    jobPosterApplication_xhr.open('PUT',jobPosterApplication_URL);
    jobPosterApplication_xhr.setRequestHeader("Content-Type","application/json");
    jobPosterApplication_xhr.setRequestHeader("x-access-token", authToken.access_token);

    jobPosterApplication_xhr.addEventListener("progress",
    function(evt){
        JobPostAPI.submitJobPosterApplicationProgress(evt);
    },false);
    jobPosterApplication_xhr.addEventListener("load",
    function(evt){
        JobPostAPI.submitJobPosterApplicationLoaded(jobPosterApplication_xhr.responseText);
    },false);
    jobPosterApplication_xhr.addEventListener("error",DataAPI.transferFailed,false);
    jobPosterApplication_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    jobPosterApplication_xhr.send(authToken);
    //JobPostAPI.hideJobPosterApplication();
};

JobPostAPI.submitJobPosterApplicationProgress = function(evt){

};

/**
 *
 * @param {type} jobPosterId
 * @returns {undefined}
 */
JobPostAPI.submitJobPosterApplicationLoaded = function(jobPosterId){
    //var applyNowButton = document.getElementById("applyNowButton_"+jobPosterId);
    //applyNowButton.setAttribute("disabled","");
    JobPostAPI.hideJobPosterApplication();
};

/**
 *
 * @returns {undefined}
 */
JobPostAPI.hideJobPosterApplication = function(){
    var viewJobPosterApplicationOverlay = document.getElementById("viewJobPosterApplicationOverlay");
    viewJobPosterApplicationOverlay.classList.remove("hidden");

    var jobPosterApplication = document.getElementById("jobPosterApplication");
    jobPosterApplication.innerHTML = "";

    /*var viewJobPosterOverlay = document.getElementById("viewJobPosterOverlay");
    viewJobPosterOverlay.classList.add("hidden");*/

};
