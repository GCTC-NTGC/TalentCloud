<?php

class JobSeekerProfileAnswer implements JsonSerializable{
    
    private $job_seeker_profile_question_id;
    private $answer;
    
    public function __construct($job_seeker_profile_question_id=null,$answer=null) {
        $this->job_seeker_profile_question_id = $job_seeker_profile_question_id;
        $this->answer = $answer;
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

    public function getJob_seeker_profile_question_id() {
        return $this->job_seeker_profile_question_id;
    }

    public function getAnswer() {
        return $this->answer;
    }

    public function setJob_seeker_profile_question_id($job_seeker_profile_question_id) {
        $this->job_seeker_profile_question_id = $job_seeker_profile_question_id;
        return $this;
    }

    public function setAnswer($answer) {
        $this->answer = $answer;
        return $this;
    }
}