/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var JobSeekerAPI = {};
JobSeekerAPI.jobSeekers = [];

JobSeekerAPI.JobSeeker = function(id,firstname,lastname,link,accomplishments,experiences,superpowers){
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.link = link;
    this.accomplishments = accomplishments;
    this.experiences = experiences;
    this.superpowers = superpowers;
};

JobSeekerAPI.populateJobSeekerObjects = function(data){
    Utilities.debug?console.log("populating job seeker Objects"):null;
    Utilities.debug?console.log(data):null;
    var jobSeekers = data.jobSeeker;
    //var jobs = data.response.jsonBody.jobSeeker;
    JobSeekerAPI.jobSeekers = [];
    for(var jobSeeker in jobSeekers){
        
        Utilities.debug?console.log(jobSeekers[jobSeeker]):null;
        
        var jobSeeker = JobSeekerAPI.populateJobSeekerObject(jobSeekers[jobSeeker]);
        JobSeekerAPI.jobSeekers.push(jobSeeker);
    }
    
    JobSeekerAPI.populateJobSeekers();
};

JobSeekerAPI.populateJobSeekerObject = function(jobSeekerJSON){
    
    Utilities.debug?console.log("populating job Objects"):null;
    Utilities.debug?console.log(JSONContact):null;
    
    var jobSeeker = jobSeekerJSON;
    
    Utilities.debug?console.log(job):null;

    var jobSeekerObj = new JobSeekerAPI.JobSeeker();

    jobSeekerObj.id = jobSeeker.id;
    jobSeekerObj.firstname = jobSeeker.firstname;
    jobSeekerObj.lastname = jobSeeker.lastname;
    jobSeekerObj.link = jobSeeker.link;
    jobSeekerObj.accomplishments = jobSeeker.accomplishments;
    jobSeekerObj.experiences = jobSeeker.experiences;
    jobSeekerObj.superpowers = jobSeeker.superpowers;

    Utilities.debug?console.log(jobSeekerObj):null;

    return jobSeekerObj;
};

JobSeekerAPI.populateJobSeekers = function(){
    Utilities.debug?console.log("populating job seekers"):null;
    var jobSeekersDiv = document.getElementById("jobSeekerList");
    
    //console.log("jobsState="+jobsDiv.innerHTML);
    //jobsDiv.innerHTML = "";
    while (jobSeekersDiv.firstChild) {
        jobSeekersDiv.removeChild(jobSeekersDiv.firstChild);
    }
    
    for(var j = 0; j < JobSeekerAPI.jobSeekers.length; j++){
        var jobSeeker = JobSeekerAPI.jobSeekers[j];
        
        JobSeekerAPI.populateJobSeeker(jobSeeker);
        
    }
    jobSeekersDiv.classList.remove("hidden");
    
    //hide no contacts div
    if(JobSeekerAPI.jobSeekers.length > 0){
        var noJobSeekers = document.getElementById("noJobSeekers");
        noJobSeekers.classList.remove("visible");
        noJobSeekers.classList.add("hidden");
    }
    
    /*var addedCards = contactsDiv.getElementsByClassName('contactCardHighlighted');
    for(var cards = 0; cards < addedCards.length; cards++){
        var addedCard = addedCards[cards];
        addedCard.classList.remove("hidden");
    }*/
    
    //hide overlay
    /*var loadingJobs = document.getElementById("loadingJobs");
        
    if(loadingJobs.classList.contains("visible")){
        loadingJobs.classList.remove("visible");
        loadingJobs.classList.add("hidden");
    }*/
    EventsAPI.hideBodyOverflow(false);
    
};

JobSeekerAPI.populateJobSeeker = function(job){
    Utilities.debug?console.log("populating job seeker"):null;
    var jobSeekersDiv = document.getElementById("jobSeekerList");
    
    //Create a job card
    var jobCard = document.createElement("div");
    jobCard.setAttribute("id", "jobId_"+job.id);
    jobCard.setAttribute("class", "jobCard");
    
    //Main job table
    var jobMainTable = document.createElement("div");
    jobMainTable.setAttribute("class", "jobPostSummary");
    
    var jobIDCell = document.createElement("div");
    jobIDCell.setAttribute("class", "jobId hidden");
    jobIDCell.innerHTML = job.id;
    
    var jobTitle = document.createElement("div");
    jobTitle.setAttribute("class", "jobTitle");
    jobTitle.innerHTML = job.firstname + " " + job.lastname;

    var jobApplicants_to_date = document.createElement("div");
    jobApplicants_to_date.setAttribute("class", "jobApplicants_to_date");
    jobApplicants_to_date.innerHTML = job.applicants_to_date + " applicants so far";

    var jobClose_date_time = document.createElement("div");
    jobClose_date_time.setAttribute("class", "jobClose_date_time");
    jobClose_date_time.innerHTML = Utilities.timeRemaining(job.close_date_time) + " until close";

    var jobDepartment = document.createElement("div");
    jobDepartment.setAttribute("class", "jobDepartment");
    jobDepartment.innerHTML = job.department;
    
    var jobLocation = document.createElement("div");
    jobLocation.setAttribute("class", "jobLocation");
    jobLocation.innerHTML = job.location_city + " (" + job.location_province + ")";
    
    var jobTerm_qty = document.createElement("div");
    jobTerm_qty.setAttribute("class", "jobTerm_qty");
    jobTerm_qty.innerHTML = job.term_qty + " " + job.term_units + " term" ;
    
    var hiringManagerWrapper = document.createElement("div");
    hiringManagerWrapper.setAttribute("class", "hiringManagerWrapper");
    
    var hiringManagerProfilePicImg = new Image();
    hiringManagerProfilePicImg.src = "/images/user.svg";
    
    var hiringManagerProfilePic = document.createElement("img");
    hiringManagerProfilePic.setAttribute("class", "hiringManagerProfilePicSmall");
    hiringManagerProfilePic.src = hiringManagerProfilePicImg.src;
    
    hiringManagerWrapper.appendChild(hiringManagerProfilePic);
    
    hiringManagerLabel = document.createElement("span");
    hiringManagerLabel.setAttribute("class", "hiringManagerLabel");
    hiringManagerLabel.innerHTML = "Hiring Manager";
    
    hiringManagerWrapper.appendChild(hiringManagerLabel);
    
    var viewJobButton = document.createElement("button");
    viewJobButton.setAttribute("class","btn btn-primary");
    viewJobButton.innerHTML = "View";
    
    //out from nov 9 - Ben
    //also hid other divs because they dont make sense nov 13
    jobMainTable.appendChild(jobIDCell);
    jobMainTable.appendChild(jobTitle);
    //jobMainTable.appendChild(jobApplicants_to_date);
    //jobMainTable.appendChild(jobClose_date_time);
    //jobMainTable.appendChild(jobDepartment);
    //jobMainTable.appendChild(jobLocation);
    jobMainTable.appendChild(jobTerm_qty);
    
    
    //jobMainTable.appendChild(hiringManagerWrapper);
    
    jobMainTable.appendChild(viewJobButton);
    
    //Append job to the jobcard
    jobCard.appendChild(jobMainTable);
    //jobCard.appendChild(JobSeekerAPI.addFavouriteLink(job.id));
    //Append card to the jobs div
    jobSeekersDiv.appendChild(jobCard);
    
};

JobSeekerAPI.getJobSeekerCount = function(){
    if(JobSeekerAPI.jobSeekers){
        return JobSeekerAPI.jobSeekers.length;
    }
    return 0;
};

JobSeekerAPI.addFavouriteLink = function(jobPosterId){
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
    jobPosterFavouriteLink.setAttribute("onclick","JobSeekerAPI.toggleFavourite('"+jobPosterId+"')");

    jobPosterFavouriteLink.innerHTML = jobPosterFavouriteImg.outerHTML;
    jobPosterFavouriteImgWrapper.innerHTML = jobPosterFavouriteLink.outerHTML;
    
    return jobPosterFavouriteImgWrapper;
};

/**
 * 
 * @param {type} responseText
 * @returns {undefined}
 */
JobSeekerAPI.toggleFavourite = function(jobPosterId){
    Utilities.debug?console.log(jobPosterId):null;
    
    if(jobPosterId !== ""){
        DataAPI.toggleFavourite(jobPosterId);
    }
};

JobSeekerAPI.updateFavourite = function(isFav,jobPosterId){
    
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