<?php

namespace App\Services\Validation;

use App\Models\JobApplication;
use App\Models\JobApplicationAnswer;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class JobApplicationAnswerValidator{

    protected $application;
    protected $questionIds;

    public function __construct(JobApplication $application){
        $this->application = $application;
        $this->questionIds = $application->job_poster->job_poster_questions->pluck('id')->toArray();
    }

    public function rules(){
        $rules = [
            'answer' => 'required|string',
            'job_poster_question_id' => [
                'required',
                Rule::in($this->questionIds),
            ],
            'job_application_id' => [
                'required',
                Rule::in([$this->application->id]),
            ]
        ];
        return $rules;
    }

    public function validator(JobApplicationAnswer $answer){


        return Validator::make($answer->toArray(), $this->rules());
    }

    public function validate(JobApplicationAnswer $answer){
        return $this->validator($answer)->validate();
    }

    public function isComplete(JobApplicationAnswer $answer){
        return $this->validator($answer)->passes();
    }
}
