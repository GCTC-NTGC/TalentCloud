<?php

namespace App\Services\Validation;

use App\Models\ExperienceSkill;
use App\Models\JobApplication;
use App\Models\Lookup\CriteriaType;
use App\Models\Lookup\LanguageRequirement;
use App\Services\Validation\JobApplicationAnswerValidator;
use App\Services\Validation\Rules\ContainsArrayWithAttributeRule;
use App\Services\Validation\Rules\ContainsObjectWithAttributeRule;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Validator;

class ApplicationTimelineValidator
{
    /**
     * @var mixed $backendRules Rule array shared by validator()
     * and detailedValidationErrors(). Requires a Job Poster ID,
     * an Application Status ID, and an Applicant ID
     */
    public $backendRules = [
        'job_poster_id' => 'required',
        'application_status_id' => 'required',
        'applicant_id' => 'required',
    ];

    /* Step 1 ------------------------------------------------------------------------------------------------------- */

    /**
     * Validation rules for the Basic Info step.
     *
     * @return mixed[]
     */
    protected function basicInfoSimpleRules()
    {
        // Field 'language_test_confirmed' needs to be validated conditionally.
        return [
            'language_requirement_confirmed' => ['required', 'boolean', 'accepted'],
            'citizenship_declaration_id' => ['required', 'exists:citizenship_declarations,id'],
            'veteran_status_id' => ['required', 'exists:veteran_statuses,id'],
            'preferred_language_id' => ['required', 'exists:preferred_languages,id'],
            'education_requirement_confirmed' => ['required', 'boolean', 'accepted'],
        ];
    }

    /**
     * Validator instance for the Basic Info step.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function basicsValidator(JobApplication $application)
    {
        $application->loadMissing('job_poster');

        // Check to see if this application is related to a Job Poster with
        // a bilingual requirement.
        $langRequirement = $application->job_poster->language_requirement_id;
        $langTestRequirement = LanguageRequirement::where('name', 'bilingual_intermediate')
            ->orWhere('name', 'bilingual_advanced')
            ->pluck('id');

        $validator = Validator::make($application->toArray(), $this->basicInfoSimpleRules());

        // Conditionally check for 'language_test_confirmed' if the
        // closure returns true.
        $validator->sometimes(
            'language_test_confirmed',
            'required|boolean|accepted',
            function ($input) use ($langRequirement, $langTestRequirement) {
                return in_array($langRequirement, $langTestRequirement->toArray());
            }
        );

        return $validator;
    }

    /**
     * Helper function to return completeness for the Basic Info step.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return boolean
     */
    public function basicsComplete(JobApplication $application)
    {
        $validator = $this->basicsValidator($application);
        return $validator->passes();
    }

    /* End Step 1 --------------------------------------------------------------------------------------------------- */

    /* Step 2 ------------------------------------------------------------------------------------------------------- */

    /**
     * Validator instance for the Experience step.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function experienceValidator(JobApplication $application)
    {
        $application->loadMissing('job_poster', 'job_poster.criteria');

        $essentialCriteriaType = CriteriaType::where('name', 'essential')->first()->id;

        $jobCriteria = $application->job_poster->criteria;
        $requiredCriteria = $jobCriteria->filter(function ($criterion) use ($essentialCriteriaType) {
            return $criterion->criteria_type_id === $essentialCriteriaType;
        });

        $experienceSkillRules = array();

        foreach ($requiredCriteria as $criterion) {
            // Validate that every essential skill has a corresponding experience.
            $experienceSkillRules[] = [
                'skill_id' => new ContainsArrayWithAttributeRule('skill_id', $criterion->skill_id)
            ];
        }

        // Get all Experiences belonging to the current application, that are assigned to required Criteria.
        $experiences = ExperienceSkill::whereHasMorph(
            'experience',
            '*',
            function (Builder $query) use ($application): void {
                $query->where([
                    ['experienceable_type', 'application'],
                    ['experienceable_id', $application->id]
                ]);
            }
        )
        ->whereIn('skill_id', $requiredCriteria->pluck('skill_id')->all())
        ->get();

        $validator = Validator::make($experiences->toArray(), $experienceSkillRules);

        return $validator;
    }

    /**
     * Helper function to return completeness for the Experience step.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return boolean
     */
    public function experienceComplete(JobApplication $application)
    {
        $validator = $this->experienceValidator($application);
        return $validator->passes();
    }

    /* End Step 2 --------------------------------------------------------------------------------------------------- */

    /* Step 3 ------------------------------------------------------------------------------------------------------- */

    /**
     * Validator instance for the Skills step.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function skillsValidator(JobApplication $application)
    {
        $application->loadMissing('job_poster', 'job_poster.criteria');

        $essentialCriteriaType = CriteriaType::where('name', 'essential')->first()->id;

        $jobCriteria = $application->job_poster->criteria;
        $requiredCriteria = $jobCriteria->filter(function ($criterion) use ($essentialCriteriaType) {
            return $criterion->criteria_type_id === $essentialCriteriaType;
        });

        // Validate that every experience has a justification.
        $experienceSkillRules = array('*.justification' => 'required|max:100');

        foreach ($requiredCriteria as $criterion) {
            // Validate that every essential skill has a corresponding experience.
            $experienceSkillRules[] = [
                'skill_id' => new ContainsArrayWithAttributeRule('skill_id', $criterion->skill_id),
            ];
        }

        // Get all Experiences belonging to the current application, that are assigned to required Criteria.
        $experiences = ExperienceSkill::whereHasMorph(
            'experience',
            '*',
            function (Builder $query) use ($application): void {
                $query->where([
                    ['experienceable_type', 'application'],
                    ['experienceable_id', $application->id]
                ]);
            }
        )
        ->whereIn('skill_id', $requiredCriteria->pluck('skill_id')->all())
        ->get();

        $validator = Validator::make($experiences->toArray(), $experienceSkillRules);

        return $validator;
    }

    /**
     * Helper function to return completeness for the Skills step.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return boolean
     */
    public function skillsComplete(JobApplication $application)
    {
        $validator = $this->skillsValidator($application);
        return $validator->passes();
    }

    /* End Step 3 --------------------------------------------------------------------------------------------------- */

    /* Step 4 ------------------------------------------------------------------------------------------------------- */

    /**
     * Validator instance for the Fit step.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function fitValidator(JobApplication $application)
    {
        // Load application answers so they are included in application->toArray().
        $application->load('job_application_answers');

        // Start with Answer rules, that ensure each answer is complete.
        $answerValidator = new JobApplicationAnswerValidator($application);

        $rules = $this->addNestedValidatorRules(
            'job_application_answers.*',
            $answerValidator->rules(),
            []
        );

        // Validate that each question has been answered.
        $jobPosterQuestionRules = [];
        foreach ($application->job_poster->job_poster_questions as $question) {
            $jobPosterQuestionRules[] = new ContainsObjectWithAttributeRule('job_poster_question_id', $question->id);
        }
        $rules['job_application_answers'] = $jobPosterQuestionRules;

        $validator = Validator::make($application->toArray(), $rules);

        return $validator;
    }

    /**
     * Helper function to return completeness for the Fit step.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return boolean
     */
    public function fitComplete(JobApplication $application)
    {
        $validator = $this->fitValidator($application);
        return $validator->passes();
    }

    /* End Step 4 --------------------------------------------------------------------------------------------------- */

    /* Step 5 ------------------------------------------------------------------------------------------------------- */

    /**
     * Validator instance for the entire Application process.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(JobApplication $application)
    {
        $data = $application->toArray();

        $rules = $this->backendRules;

        // Combining and simplifying error messages.
        $rules = array_merge(
            $rules,
            ['timeline_step_1' => 'required|boolean|accepted'],
            ['timeline_step_2' => 'required|boolean|accepted'],
            ['timeline_step_3' => 'required|boolean|accepted'],
            ['timeline_step_4' => 'required|boolean|accepted'],
            ['timeline_step_5' => 'required|boolean|accepted']
        );
        $data = array_merge(
            $data,
            ['timeline_step_1' => $this->basicsComplete($application)],
            ['timeline_step_2' => $this->experienceComplete($application)],
            ['timeline_step_3' => $this->skillsComplete($application)],
            ['timeline_step_4' => $this->fitComplete($application)],
            ['timeline_step_5' => $this->affirmationComplete($application)]
        );

        // Validate basic data is filled in.
        return Validator::make($data, $rules);
    }

    public function validate(JobApplication $application)
    {
        $this->validator($application)->validate();
    }

    public function validateComplete(JobApplication $application)
    {
        $validator = $this->validator($application);
        return $validator->passes();
    }

    /* End Step 5 --------------------------------------------------------------------------------------------------- */

    /* Step 6 ------------------------------------------------------------------------------------------------------- */

    /**
     * Validator instance for the Final Submit step.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function affirmationValidator(JobApplication $application)
    {
        return Validator::make($application->toArray(), [
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
        ]);
    }

    /**
     * Helper function to return completeness for the Final Submit step.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return boolean
     */
    public function affirmationComplete(JobApplication $application)
    {
        return $this->affirmationValidator($application)->passes();
    }

    /* End Step 6 --------------------------------------------------------------------------------------------------- */

    /* Helpers ------------------------------------------------------------------------------------------------------ */

    /**
     * Helper function to return detailed error messages for each step.
     *
     * @param JobApplication $application Job Application object.
     *
     * @return mixed
     */
    public function detailedValidatorErrors(JobApplication $application)
    {
        return array_merge(
            Validator::make($application->toArray(), $this->backendRules)->errors()->all(),
            $this->basicsValidator($application)->errors()->all(),
            $this->experienceValidator($application)->errors()->all(),
            $this->skillsValidator($application)->errors()->all(),
            $this->fitValidator($application)->errors()->all(),
            $this->affirmationValidator($application)->errors()->all()
        );
    }

    /**
     * Return a copy of $array, with function $fn applied to each key, but values left unchanged.
     *
     * @param function $fn    Function applied to each key.
     * @param mixed    $array Array to operate on.
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

    /**
     * Return a copy of $array, with function $fn applied to each key, but values left unchanged.
     *
     * @param string $nestedAttribute Attribute name to apply to each rule.
     * @param mixed  $validatorRules  Rules array that requires an attribute name to be prepended.
     * @param mixed  $rules           Optional existing validation rules to merge with.
     *
     * @return array
     */
    protected function addNestedValidatorRules($nestedAttribute, $validatorRules, $rules = [])
    {
        // Prepend the attribute name of each validator rule with the nested attribute name.
        $newRules = $this->arrayMapKeys(
            function ($key) use ($nestedAttribute) {
                return implode('.', [$nestedAttribute, $key]);
            },
            $validatorRules
        );
        // Merge new rules with old rules.
        $rules = array_merge($rules, $newRules);
        return $rules;
    }
    /* End Helpers -------------------------------------------------------------------------------------------------- */
}
