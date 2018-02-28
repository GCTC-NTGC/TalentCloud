<?php

class ApplicationQuestionAnswer implements JsonSerializable{
    
    private $application_question_answer_id;
    private $job_poster_application_id;
    private $question;
    private $answer;
    
    public function __construct($application_question_answer_id=null,$job_poster_application_id=null,$question=null,$answer=null) {
        $this->application_question_answer_id = $application_question_answer_id;
        $this->job_poster_application_id = $job_poster_application_id;
        $this->question = $question;
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
    
    public function getApplication_question_answer_id() {
        return $this->application_question_answer_id;
    }

    public function getJob_poster_application_id() {
        return $this->job_poster_application_id;
    }

    public function getQuestion() {
        return $this->question;
    }

    public function getAnswer() {
        return $this->answer;
    }

    public function setApplication_question_answer_id($application_question_answer_id) {
        $this->application_question_answer_id = $application_question_answer_id;
        return $this;
    }

    public function setJob_poster_application_id($job_poster_application_id) {
        $this->job_poster_application_id = $job_poster_application_id;
        return $this;
    }

    public function setQuestion($question) {
        $this->question = $question;
        return $this;
    }

    public function setAnswer($answer) {
        $this->answer = $answer;
        return $this;
    }
}