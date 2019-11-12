<?php

namespace App\Services\Validation;

use App\Models\JobApplication;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator as BaseValidator;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\CriteriaType;
use App\Models\Lookup\VeteranStatus;
use App\Models\Lookup\PreferredLanguage;
use App\Services\Validation\Rules\ContainsObjectWithAttributeRule;
use App\Services\Validation\JobApplicationAnswerValidator;

class ApplicationValidator
{

    public function validate(JobApplication $application)
    {

        $backendRules = [
            'job_poster_id' => 'required',
            'application_status_id' => 'required',
            'applicant_id' => 'required'
        ];
        $data = $application->toArray();

        $rules = array_merge(
            $backendRules,
            // $this->basicsValidator($application)->getRules(),
            $this->experienceValidator($application)->getRules(),
            // $this->essentialSkillsValidator($application)->getRules(),
            $this->affirmationValidator($application)->getRules()
        );


        // Combining and simplifiying error messages
        $rules = array_merge(
            $rules,
            ['application_step_1' => 'required|boolean|accepted'],
            ['application_step_3' => 'required|boolean|accepted']
        );
        $data = array_merge(
            $data,
            ['application_step_1' => $this->basicsComplete($application)],
            ['application_step_3' => $this->essentialSkillsComplete($application)]
        );

        // Validate basic data is filled in
        Validator::make($data, $rules)->validate();
    }

    /**
     * Return a copy of $array, with function $fn applied to each key, but values left unchanged.
     *
     * @param function $fn    Function applied to each key.
     * @param array    $array Array to operate on.
     * @return array
     */
    protected function arrayMapKeys($fn, $array): array
    {
        $newArray = [];
        foreach ($array as $key => $value) {
            $newArray[$fn($key)] = $value;
        }
        return $newArray;
    }

    protected function addNestedValidatorRules($nestedAttribute, $validatorRules, $rules = [])
    {
        // prepend the attribute name of each validator rule with the nested attribute name
        $newRules = $this->arrayMapKeys(function ($key) use ($nestedAttribute) {
                return implode('.', [$nestedAttribute, $key]);
        },
            $validatorRules);
        // Merge new rules with old rules
        $rules = array_merge($rules, $newRules);
        return $rules;
    }

    public function basicsValidator(JobApplication $application)
    {
        // Validate the fields common to every application
        $rules = [
            'language_requirement_confirmed' => ['required', 'boolean'],
            'citizenship_declaration_id' => ['required', 'exists:citizenship_declarations,id'],
            'veteran_status_id' => ['required', 'exists:veteran_statuses,id'],
            'preferred_language_id' => ['required', 'exists:preferred_languages,id'],
        ];

        // Load application answers so they are included in application->toArray()
        $application->load('job_application_answers');

        // Validate that each question has been answered
        $jobPosterQuestionRules = [];
        foreach ($application->job_poster->job_poster_questions as $question) {
            $jobPosterQuestionRules[] = new ContainsObjectWithAttributeRule('job_poster_question_id', $question->id);
        }
        $rules['job_application_answers'] = $jobPosterQuestionRules;
        $answerValidatorFactory = new JobApplicationAnswerValidator($application);

        // Validate that each answer is complete
        foreach ($application->job_application_answers as $key => $answer) {
            $attribute = implode('.', ['job_application_answers', $key]);
            $rules = $this->addNestedValidatorRules($attribute, $answerValidatorFactory->rules(), $rules);
        }

        $validator = Validator::make($application->toArray(), $rules);
        return $validator;
    }

    public function basicsComplete(JobApplication $application)
    {
        $validator = $this->basicsValidator($application);
        return $validator->passes();
    }

    public function experienceValidator(JobApplication $application)
    {
        $rules = ['experience_saved' => 'required|boolean|accepted'];
        return Validator::make($application->toArray(), $rules);
    }

    public function experienceComplete(JobApplication $application)
    {
        return $this->experienceValidator($application)->passes();
    }

    protected function skillsValidator(JobApplication $application, $criteria_type)
    {
        $rules = [];

        $skillDeclarationRules = [];
        $criteriaTypeId = CriteriaType::where('name', $criteria_type)->firstOrFail()->id;
        foreach ($application->job_poster->criteria->where('criteria_type_id', $criteriaTypeId) as $criteria) {
            // Validate that every essential skill has a corresponding declaration
            $skillDeclarationRules[] = new ContainsObjectWithAttributeRule('skill_id', $criteria->skill_id);
        }
        $rules['skill_declarations'] = $skillDeclarationRules;
        $application->load('skill_declarations');

        // Validate that those declarations are complete
        $skillDeclarationValidatorFactory = new SkillDeclarationValidator();
        $relevantSkillIds = $application->job_poster->criteria->where('criteria_type_id', $criteriaTypeId)->pluck('skill_id');
        foreach ($application->skill_declarations as $key => $declaration) {
            if ($relevantSkillIds->contains($declaration->skill_id)) {
                $attribute = implode('.', ['skill_declarations', $key]);
                $skillDeclarationValidator = $skillDeclarationValidatorFactory->validator($declaration);
                $rules = $this->addNestedValidatorRules($attribute, $skillDeclarationValidator->getRules(), $rules);
            }
        }

        $validator = Validator::make($application->toArray(), $rules);
        return $validator;
    }

    public function essentialSkillsValidator(JobApplication $application)
    {
        return $this->skillsValidator($application, 'essential');
    }

    public function essentialSkillsComplete(JobApplication $application)
    {
        return $this->essentialSkillsValidator($application)->passes();
    }

    public function assetSkillsValidator(JobApplication $application)
    {
        return $this->skillsValidator($application, 'asset');
    }

    public function assetSkillsComplete(JobApplication $application)
    {
        return $this->assetSkillsValidator($application)->passes();
    }

    public function affirmationValidator(JobApplication $application)
    {
        $rules = [
            'submission_signature' => [
                'required',
                'string',
                'max:191',
            ],
            'submission_date' => [
                'required',
                'string',
                'max:191',
            ]
        ];
        return Validator::make($application->toArray(), $rules);
    }

    public function affirmationComplete(JobApplication $application)
    {
        return $this->affirmationValidator($application)->passes();
    }
}
