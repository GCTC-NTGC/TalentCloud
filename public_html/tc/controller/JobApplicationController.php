<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../model/JobPosterApplication.php';
require_once '../model/ApplicationQuestionAnswer.php';
require_once '../model/JobApplicationWIthAnswers.php';
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
}