<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../model/JobPosterApplication.php';
require_once '../model/ApplicationQuestionAnswer.php';
require_once '../model/JobApplicationWithAnswers.php';
require_once '../dao/JobApplicationDAO.php';

class JobApplicationController{
        
    public static function getApplicationQuestionAnswers($jobPosterApplicationId){
        
        $questionAnswers = JobApplicationDAO::getApplicationQuestionAnswersByApplicationId($jobPosterApplicationId);
        
        return $questionAnswers;
        
    }
    
    public static function getJobPosterApplicationById($jobPosterApplicationId){
        
        $jobPosterApplication = JobApplicationDAO::getJobPosterApplicationByApplicationId($jobPosterApplicationId);
        
        return $jobPosterApplication;
        
    }
    
    public static function getJobApplicationWithAnswersById($jobPosterApplicationId) {
        
        $jobPosterApplication = self::getJobPosterApplicationById($jobPosterApplicationId);
        $questionAnswers = self::getApplicationQuestionAnswers($jobPosterApplicationId);
        $jobApplication = new JobApplicationWithAnswers($jobPosterApplication, $questionAnswers);
        
        return $jobApplication;
    }
    
    /**
     * 
     * @param JobApplicationWithAnswers $jobApplicationWithAnswers
     * @return rowsModified 
     */
    public static function updateJobApplicationWithAnswers($jobApplicationWithAnswers) {
        $rowsModified = JobApplicationDAO::updateJobPosterApplication($jobApplicationWithAnswers->getJob_poster_application());
        $applicationId = $jobApplicationWithAnswers->getJob_poster_application()->getJob_poster_application_id();
        foreach($jobApplicationWithAnswers->getApplication_question_answers() as $questionAnswer) {
            $questionAnswer->setJob_poster_application_id($applicationId); //Just to ensure id is correct
            $rowsModified = $rowsModified + JobApplicationDAO::putApplicationQuestionAnswer($questionAnswer);
        }
        return $rowsModified;
    }
    
    /**
     * 
     * @param int $jobPosterId
     * @param int $userId
     * @return JobApplicationWithAnswers $jobApplicationWithAnswers
     */
    public static function getJobApplicationWithAnswersByJobAndUser($jobPosterId, $userId) {    
        $jobPosterApplication = JobApplicationDAO::getJobApplicationByJobAndUser($jobPosterId, $userId);
        if ($jobPosterApplication) {
            $questionAnswers = self::getApplicationQuestionAnswers($jobPosterApplication->getJob_poster_application_id());
            $jobApplicationWithAnswers = new JobApplicationWithAnswers($jobPosterApplication, $questionAnswers);
            return $jobApplicationWithAnswers;
        } else {
            return false;
        }
    }
    
    public static function getJobApplicationsWithAnswersForJobPosterApplications($jobPosterApplications) {
        $jobApplicationsWithAnswers = [];
        
        foreach($jobPosterApplications as $jpa) {
            $questionAnswers = self::getApplicationQuestionAnswers($jpa->getJob_poster_application_id());
            $jobApplication = new JobApplicationWithAnswers($jpa, $questionAnswers);
            array_push($jobApplicationsWithAnswers, $jobApplication);
        }
        
        return $jobApplicationsWithAnswers;
    }
    
    public static function getJobApplictionsWithAnswersByJobPoster($jobPosterId) {
        
        $jobPosterApplications = JobApplicationDAO::getJobPosterApplicationsByJobPosterId($jobPosterId);
        
        return self::getJobApplicationsWithAnswersForJobPosterApplications($jobPosterApplications);
    }
    
    public static function getJobApplictionsWithAnswersByJobSeekerProfile($jobSeekerProfileId) {
        
        $jobPosterApplications = JobApplicationDAO::getJobPosterApplicationsByJobSeekerProfileId($jobSeekerProfileId);
        
        return self::getJobApplicationsWithAnswersForJobPosterApplications($jobPosterApplications);
    }
    
    /**
     * 
     * @param JobApplicationWithAnswers $jobApplicationWithAnswers
     * @return int @jobPosterApplicationId
     */
    public static function createJobApplicationWithAnswers($jobApplicationWithAnswers) {
        //When creating a new job poster, ensure its in draft status
        $jobApplicationWithAnswers->getJob_poster_application()->setJob_poster_application_status_id(1);
        
        $jobPosterApplicationId = JobApplicationDAO::createJobPosterApplication($jobApplicationWithAnswers->getJob_poster_application());
        
        foreach($jobApplicationWithAnswers->getApplication_question_answers() as $questionAnswer) {
            $questionAnswer->setJob_poster_application_id($jobPosterApplicationId);
        }
        JobApplicationDAO::createApplicationQuestionAnswers($jobApplicationWithAnswers->getApplication_question_answers());
        
        return $jobPosterApplicationId;
    }
    
    /**
     * Returns true if the application status is "Draft"
     * 
     * @param type $jobPosterApplicationId
     * @return boolean
     */
    public static function jobApplicationIsDraft($jobPosterApplicationId) {
        return JobApplicationDAO::jobApplicationIsDraft($jobPosterApplicationId);
    }
    
    /**
     * Returns the user_id of the creator of the job application
     * 
     * @param type $jobPosterApplicationId
     */
    public static function getJobApplicationUserId($jobPosterApplicationId) {
        return JobApplicationDAO::getJobApplicationCreatorUserId($jobPosterApplicationId);
    }
}