<?php

class JobApplicationWithAnswers implements JsonSerializable{
    
    private $job_poster_application;
    private $application_question_answers;
    
    public function __construct($job_poster_application = null,$application_question_answers = []) {
        $this->job_poster_application = $job_poster_application;
        $this->application_question_answers = $application_question_answers;
    }

    public function jsonSerialize() {
        $getter_names = get_class_methods(get_class($this));
        $gettable_attributes = array();
        foreach ($getter_names as $key => $value) {
            if(substr($value, 0, 3) === 'get') {
                $gettable_attributes[strtolower(substr($value, 3, strlen($value)))] = $this->$value();
            }
        }
        return $gettable_attributes;
    }
    
    public function getJob_poster_application() {
        return $this->job_poster_application;
    }

    public function getApplication_question_answers() {
        return $this->application_question_answers;
    }

    public function setJob_poster_application($job_poster_application) {
        $this->job_poster_application = $job_poster_application;
        return $this;
    }

    public function setApplication_question_answers($application_question_answers) {
        $this->application_question_answers = $application_question_answers;
        return $this;
    }


}