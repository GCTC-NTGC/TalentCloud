<?php

namespace App\Services\Validation;

use App\Models\JobApplication;
use App\Models\Lookup\CriteriaType;
use App\Services\Validation\JobApplicationAnswerValidator;
use App\Services\Validation\Rules\ContainsObjectWithAttributeRule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ApplicationValidator
{

    public $backendRules =  [
        'job_poster_id' => 'required',
        'application_status_id' => 'required',
        'applicant_id' => 'required',
    ];
    public function validator(JobApplication $application)
    {
        $data = $application->toArray();

        $rules = array_merge(
            $this->backendRules,
            $this->experienceRules,
            $this->affirmationRules
        );

        // Combining and simplifying error messages
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
        return Validator::make($data, $rules);
    }

    public function validate(JobApplication $application)
    {
        $this->validator($application)->validate();
    }

    public function validateComplete(JobApplication $application)
    {
        return $this->validator($application)->passes();
    }

    public function detailedValidatorErrors(JobApplication $application)
    {
        return array_merge(
            Validator::make($application->toArray(), $this->backendRules)->errors()->all(),
            $this->basicsValidator($application)->errors()->all(),
            $this->experienceValidator($application)->errors()->all(),
            $this->essentialSkillsValidator($application)->errors()->all(),
            $this->affirmationValidator($application)->errors()->all()
        );
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
        $newRules = $this->arrayMapKeys(
            function ($key) use ($nestedAttribute) {
                return implode('.', [$nestedAttribute, $key]);
            },
            $validatorRules
        );
        // Merge new rules with old rules
        $rules = array_merge($rules, $newRules);
        return $rules;
    }

    protected function basicInfoSimpleRules()
    {
        return [
            'language_requirement_confirmed' => ['required', 'boolean'],
            'citizenship_declaration_id' => ['required', 'exists:citizenship_declarations,id'],
            'veteran_status_id' => ['required', 'exists:veteran_statuses,id'],
            'preferred_language_id' => ['required', 'exists:preferred_languages,id'],
            'language_test_confirmed' => ['required', 'boolean'],
            'education_requirement_confirmed' => ['required', 'boolean']
        ];
    }

    protected function questionAnswerRules(JobApplication $application)
    {
        // Start with Answer rules, that ensure each answer is complete
        $answerValidator = new JobApplicationAnswerValidator($application);
        $rules = $this->addNestedValidatorRules(
            'job_application_answers.*',
            $answerValidator->rules(),
            []
        );

        // Validate that each question has been answered
        $jobPosterQuestionRules = [];
        foreach ($application->job_poster->job_poster_questions as $question) {
            $jobPosterQuestionRules[] = new ContainsObjectWithAttributeRule('job_poster_question_id', $question->id);
        }
        $rules['job_application_answers'] = $jobPosterQuestionRules;

        return $rules;
    }

    public function basicsValidator(JobApplication $application)
    {
        $validator = Validator::make($application->toArray(), $this->basicInfoSimpleRules($application));
        return $validator;
    }

    public function basicsComplete(JobApplication $application)
    {
        $validator = $this->basicsValidator($application);
        return $validator->passes();
    }

    public function questionAnswerValidator(JobApplication $application)
    {
        // Load application answers so they are included in application->toArray().
        $application->load('job_application_answers');
        $validator = Validator::make($application->toArray(), $this->questionAnswerRules($application));
        return $validator;
    }

    public function questionAnswerComplete(JobApplication $application)
    {
        $validator = $this->questionAnswerValidator($application);
        return $validator->passes();
    }

    public $experienceRules = ['experience_saved' => 'required|boolean|accepted'];
    public function experienceValidator(JobApplication $application)
    {
        return Validator::make($application->attributesToArray(), $this->experienceRules);
    }

    public function experienceComplete(JobApplication $application)
    {
        return $this->experienceValidator($application)->passes();
    }

    protected function skillsValidator(JobApplication $application, $criteria_type)
    {
        $rules = [];

        // If application is still a draft, check skills attached to applicant profile. If submitted, use application itself.
        $skillDeclarationsAttribute = $application->isDraft() ? 'applicant.skill_declarations' : 'skill_declarations';
        $application->load($skillDeclarationsAttribute);
        $skillDeclarations = $application->isDraft()
            ? $application->applicant->skill_declarations
            : $application->skill_declarations;

        $skillDeclarationRules = [];
        $criteriaTypeId = CriteriaType::where('name', $criteria_type)->firstOrFail()->id;
        $criteria = $application->job_poster->criteria
            ->where('criteria_type_id', $criteriaTypeId)
            ->filter(function ($value, $key) {
                // Only hard skills need to be part of the application.
                return $value->skill->skill_type->name == 'hard';
            });
        foreach ($criteria as $criterion) {
            // Validate that every essential skill has a corresponding declaration.
            $skillDeclarationRules[] = new ContainsObjectWithAttributeRule('skill_id', $criterion->skill_id);
        }
        $rules[$skillDeclarationsAttribute] = $skillDeclarationRules;

        // Validate that those declarations are complete
        $skillDeclarationValidatorFactory = new SkillDeclarationValidator();
        $relevantSkillIds = $criteria->pluck('skill_id');
        foreach ($skillDeclarations as $key => $declaration) {
            if ($relevantSkillIds->contains($declaration->skill_id)) {
                $attribute = implode('.', [$skillDeclarationsAttribute, $key]);
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

    public $affirmationRules = [
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
    public function affirmationValidator(JobApplication $application)
    {
        return Validator::make($application->toArray(), $this->affirmationRules);
    }

    public function affirmationComplete(JobApplication $application)
    {
        return $this->affirmationValidator($application)->passes();
    }
}
