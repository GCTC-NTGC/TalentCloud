var JobApplicationAPI = {};

JobApplicationAPI.ApplicationQuestionAnswer = function(
        jobApplicationId,
        jobPosterQuestionId,
        question,
        answer) {
    this.job_poster_application_id = jobApplicationId;
    this.job_poster_question_id = jobPosterQuestionId;
    this.question = question;
    this.answer = answer;
};

/*
 * It's recommended to use the costructor for this object, to avoid dealing
 * directly with multilevel JSON
 * 
 * @return {JobApplicationAPI.JobApplication}
 */
JobApplicationAPI.JobApplication = function(
        jobApplicationId, 
        jobPosterId, 
        jobSeekerProfileId,
        applicationQuestionAnswers) {
    this.job_poster_application = {};
    this.job_poster_application.job_poster_application_id = jobApplicationId;
    this.job_poster_application.application_job_poster_id = jobPosterId;
    this.job_poster_application.application_job_seeker_profile_id = jobSeekerProfileId;
    
    this.application_question_answers = applicationQuestionAnswers;
};

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
};

JobApplicationAPI.localizeCreateJobApplication = function() {
    if (siteContent) {
        document.getElementById('createJobApplicationTitle').innerHTML = siteContent.createJobApplicationWindowTitle;
        document.getElementById('createJobApplicationPositionLabel').innerHTML = siteContent.createJobApplicationJobTitleLabel;
        document.getElementById('createJobApplicationSubmitButton').innerHTML = siteContent.submitApplication;

        //Localize confirmation page at same time
        document.getElementById('createJobApplicationConfirmationPositionLabel').innerHTML = siteContent.createJobApplicationConfirmationPositionLabel;
        document.getElementById('createJobApplicationConfirmationTrackingReminder').innerHTML = siteContent.jobApplicationConfirmationTrackingReminder;
        document.getElementById('createJobApplicationConfirmationContinueButton').innerHTML = siteContent.continueToDashboard;
    }
}

JobApplicationAPI.populateApplicationWithJobPosterContent = function(jobPosterResponse) {
    var jobPoster = JobPostAPI.populateJobObject(JSON.parse(jobPosterResponse));
    
    document.getElementById('createJobApplicationPostition').innerHTML = jobPoster.title;
    JobApplicationAPI.populateApplicationWithQuestionContent(jobPoster.questions);
};

JobApplicationAPI.populateApplicationWithUserContent = function(user) {
    document.getElementById('createJobApplicationFirstName').innerHTML = user.firstname;
    document.getElementById('createJobApplicationLastName').innerHTML = user.lastname;
};

JobApplicationAPI.populateApplicationWithJobSeekerProfileContent = function(jobSeekerProfileResponse) {
    var jobSeeker = JobSeekerAPI.populateJobSeekerObject(JSON.parse(jobSeekerProfileResponse));
    
    document.getElementById('createJobApplicationJobSeekerId').value = jobSeeker.id;
};

/**
 * 
 * @param {JobPostAPI.JobPosterQuestion} jobPosterQuestions
 * @return {undefined}
 */
JobApplicationAPI.populateApplicationWithQuestionContent = function(jobPosterQuestions) {
    
    var questionSectionWrapper = document.getElementById('createJobApplicationOpenEndedQuestionsWrapper');
    
    //REMOVE existing children (from previous application)
    questionSectionWrapper.innerHTML = '';
    
    for (var i=0; i < jobPosterQuestions.length; i++) {
        
        var element = JobApplicationAPI.makeQuestionAnswerHtmlElement(jobPosterQuestions[i], i);
        questionSectionWrapper.appendChild(element);
    }
};

/**
 * 
 * @param {JobPostAPI.JobPosterQuestion} jobPosterQuestion
 * @param {int} questionNumber - this is the nth question on the page
 * @return {Element} Job Application Question Answer Wrapper element
 */
JobApplicationAPI.makeQuestionAnswerHtmlElement = function(jobPosterQuestion, questionNumber) {
    var wrapper = document.createElement("div");
    wrapper.setAttribute("class", "jobApplicationQuestionAnswerWrapper");
    
    var label = document.createElement('label');
    label.setAttribute('class', 'full-width');
    
    var question = document.createElement('p');
    question.setAttribute('class', 'jobApplicationQuestion');
    var questionTextNode = document.createTextNode(jobPosterQuestion.question);
    question.appendChild(questionTextNode);
    
    var answerField = document.createElement('textarea');
    var answerId = "jobApplicationAnswerField_number_" + questionNumber;
    answerField.setAttribute("id", answerId);
    answerField.setAttribute('name', 'answer');
    answerField.setAttribute('class', 'jobApplicationAnswerField full-width');
    //answerField.value = jobPosterQuestion.answer;
    
    var questionId = document.createElement('input');
    questionId.setAttribute('name','job_poster_question_id');
    questionId.setAttribute('type', 'hidden');
    questionId.value = jobPosterQuestion.id;
    
    label.appendChild(question);
    label.appendChild(answerField);
    
    wrapper.appendChild(label);
    wrapper.appendChild(questionId);
    
    return wrapper;
};

JobApplicationAPI.submitNewJobApplication = function() {
    var jobApplicationId = document.getElementById('createJobApplicationJobApplicationId').value;
    var jobPosterId = document.getElementById('createJobApplicationJobPosterId').value;
    var jobSeekerId = document.getElementById('createJobApplicationJobSeekerId').value;
    
    //get all Question answers
    var applicationQuestionAnswers = [];
    var questionAnswerSection = document.getElementById('createJobApplicationOpenEndedQuestionsWrapper');
    var questionAnswerWrappers = questionAnswerSection.getElementsByClassName('jobApplicationQuestionAnswerWrapper');
    for (var i=0; i<questionAnswerWrappers.length; i++) {
        var questionId = questionAnswerWrappers[i].querySelector('input[name="job_poster_question_id"]').value;
        var answer = questionAnswerWrappers[i].getElementsByTagName('textarea')[0].value;
        var question = questionAnswerWrappers[i].getElementsByClassName('jobApplicationQuestion')[0].innerHTML; 
        
        var questionAnswer = new JobApplicationAPI.ApplicationQuestionAnswer(
                null, questionId, question, answer);
        applicationQuestionAnswers.push(questionAnswer);
    }
    
    var jobApplication = new JobApplicationAPI.JobApplication(jobApplicationId, jobPosterId, jobSeekerId, applicationQuestionAnswers);
    
    DataAPI.createJobApplication(jobApplication, function(response) {
      
       Utilities.debug?console.log("New Job Application Submitted"):null;
       
       //TODO: less hacky way of getting job title? Is it worth re-requesting it?
       var jobTitle = document.getElementById('createJobApplicationPostition').innerHTML;
       JobApplicationAPI.showCreateJobConfirmation(jobTitle);        
    });
};

JobApplicationAPI.showCreateJobConfirmation = function(jobTitle) {
    var stateInfo = {pageInfo: 'create_job_application_confirmation', pageTitle: 'Talent Cloud: New Job Application Confirmed'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#CreateJobApplicationConfirmation/' + encodeURI(jobTitle));
    
    TalentCloudAPI.hideAllContent();
    
    document.getElementById('createJobApplicationConfirmationPostition').innerHTML = jobTitle;
    
    var createJobApplicationSection = document.getElementById('createJobApplicationConfirmationSection');
    createJobApplicationSection.classList.remove('hidden');
}

