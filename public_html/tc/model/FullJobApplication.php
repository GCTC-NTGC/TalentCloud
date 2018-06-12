<?php

require_once '../model/JobPosterApplication.php';
require_once '../model/JobSeekerProfile.php';
require_once '../model/ApplicationQuestionAnswer.php';
require_once '../model/SkillDeclaration.php';
require_once '../model/ApplicationMicroReference.php';
require_once '../model/ApplicationWorkSample.php';

class FullJobApplication implements JsonSerializable {
    
    private $job_poster_application;
    private $job_seeker_profile;
    private $application_question_answers;
    private $skill_declarations;
    private $application_micro_references;
    private $application_work_samples;
 
    /**
     * 
     * @param JobPosterApplication $job_poster_application
     * @param JobSeekerProfile $job_seeker_profile
     * @param ApplicationQuestionAnswer[] $application_question_answers
     * @param SkillDeclaration[] $skill_declarations
     * @param ApplicationMicroReference[] $application_micro_references
     * @param ApplicationWorkSample[] $application_work_samples
     */
    public function __construct(JobPosterApplication $job_poster_application = null,
            JobSeekerProfile $job_seeker_profile = null,
            $application_question_answers = [],
            $skill_declarations = [],
            $application_micro_references = [],
            $application_work_samples = []) {
        $this->job_poster_application = $job_poster_application;
        $this->job_seeker_profile = $job_seeker_profile;
        $this->application_question_answers = $application_question_answers;
        $this->skill_declarations = $skill_declarations;
        $this->application_micro_references = $application_micro_references;
        $this->application_work_samples = $application_work_samples;
    }

    public function jsonSerialize() {
        $getter_names = get_class_methods(get_class($this));
        $gettable_attributes = array();
        foreach ($getter_names as $key => $value) {
            if (substr($value, 0, 3) === 'get') {
                $gettable_attributes[strtolower(substr($value, 3, strlen($value)))] = $this->$value();
            }
        }
        return $gettable_attributes;
    }
    
    /**
     * 
     * @return JobPosterApplication
     */
    public function getJob_poster_application() {
        return $this->job_poster_application;
    }

    /**
     * 
     * @return JobSeekerProfile
     */
    public function getJob_seeker_profile() {
        return $this->job_seeker_profile;
    }

    /**
     * 
     * @return ApplicationQuestionAnswer[]
     */
    public function getApplication_question_answers() {
        return $this->application_question_answers;
    }

    /**
     * 
     * @return SkillDeclaration[]
     */
    public function getSkill_declarations() {
        return $this->skill_declarations;
    }

    /**
     * 
     * @return ApplicationMicroReferences[]
     */
    public function getApplication_micro_references() {
        return $this->application_micro_references;
    }

    /**
     * 
     * @return ApplicationWorkSample[]
     */
    public function getApplication_work_samples() {
        return $this->application_work_samples;
    }

    public function setJob_poster_application($job_poster_application) {
        $this->job_poster_application = $job_poster_application;
        return $this;
    }

    public function setJob_seeker_profile($job_seeker_profile) {
        $this->job_seeker_profile = $job_seeker_profile;
        return $this;
    }

    public function setApplication_question_answers($application_question_answers) {
        $this->application_question_answers = $application_question_answers;
        return $this;
    }

    public function setSkill_declarations($skill_declarations) {
        $this->skill_declarations = $skill_declarations;
        return $this;
    }

    public function setApplication_micro_references($application_micro_references) {
        $this->application_micro_references = $application_micro_references;
        return $this;
    }

    public function setApplication_work_samples($application_work_samples) {
        $this->application_work_samples = $application_work_samples;
        return $this;
    }

}