var JobApplicationAPI = {};


JobApplicationAPI.showCreateJobApplication = function(jobPosterId) {
    var stateInfo = {pageInfo: 'create_job_application', pageTitle: 'Talent Cloud: Create Job Application'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#CreateJobApplication/' + jobPosterId);
    
    TalentCloudAPI.hideAllContent();
    
    var createJobApplicationSection = document.getElementById('createJobApplicationSection');
    createJobApplicationSection.classList.remove('hidden');
    
    locale = TalentCloudAPI.getLanguageFromCookie();
    
    document.getElementById('createJobApplicationJobPosterId').value = jobPosterId;
    
    if (UserAPI.hasSessionUser()) {
        var user = UserAPI.getSessionUserAsJSON();
        var applicantProfilePic = document.getElementById('createJobApplicationProfilePic');
        FileUploadAPI.refreshProfilePic(user.user_id, [applicantProfilePic]);
        JobApplicationAPI.populateApplicationWithUserContent(user);
        
        DataAPI.getJobSeekerProfileByUserId(user.user_id, JobApplicationAPI.populateApplicationWithJobSeekerProfileContent);
    }
    
    DataAPI.getJobPoster(locale, jobPosterId, JobApplicationAPI.populateApplicationWithJobPosterContent);
    
    JobApplicationAPI.populateApplicationWithQuestionContent();
};

JobApplicationAPI.populateApplicationWithJobPosterContent = function(jobPosterResponse) {
    var jobPoster = JobPostAPI.populateJobObject(JSON.parse(jobPosterResponse));
    
    document.getElementById('createJobApplicationPostition').innerHTML = jobPoster.title;
};

JobApplicationAPI.populateApplicationWithUserContent = function(user) {
    document.getElementById('createJobApplicationFirstName').innerHTML = user.firstname;
    document.getElementById('createJobApplicationLastName').innerHTML = user.lastname;
};

JobApplicationAPI.populateApplicationWithJobSeekerProfileContent = function(jobSeekerProfileResponse) {
    var jobSeeker = JobSeekerAPI.populateJobSeekerObject(JSON.parse(jobSeekerProfileResponse));
    
    document.getElementById('createJobApplicationJobSeekerId').value = jobSeeker.id;
};

JobApplicationAPI.populateApplicationWithQuestionContent = function() {
    
    var questions = [];
    //TODO get questions associated with Job Poster
    questions.push('How are you a good fit?');
    
    var questionSectionWrapper = document.getElementById('createJobApplicationOpenEndedQuestionsWrapper');
    
    for (var i=0; i < questions.length; i++) {
        var element = JobApplicationAPI.makeQuestionAnswerHtmlElement(questions[i]);
        questionSectionWrapper.appendChild(element);
    }
};

/**
 * 
 * @param {string} questionText
 * @return {Element} Job Application Question Answer Wrapper element
 */
JobApplicationAPI.makeQuestionAnswerHtmlElement = function(questionText) {
    var wrapper = document.createElement("div");
    wrapper.setAttribute("class", "jobApplicationQuestionAnswerWrapper");
    
    var question = document.createElement('p');
    question.setAttribute('class', 'jobApplicationQuestion');
    var questionTextNode = document.createTextNode(questionText);
    question.appendChild(questionTextNode);
    
    var answerField = document.createElement('textarea');
    answerField.setAttribute('class', 'jobApplicationAnswerField full-width');
    
    wrapper.appendChild(question);
    wrapper.appendChild(answerField);
    
    return wrapper;
};

