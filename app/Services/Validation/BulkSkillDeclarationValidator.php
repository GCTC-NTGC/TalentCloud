<?php

namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as BaseValidator;
use Illuminate\Validation\Rule;
use App\Models\Lookup\SkillLevel;
use App\Models\Skill;
use App\Models\Applicant;
use App\Services\Validation\Rules\UniqueApplicantSkillRule;
use App\Services\Validation\Rules\ApplicantHasRelationRule;

class BulkSkillDeclarationValidator {

    protected $applicant;
    protected $data;
    protected $rules = [];
    protected $messages = [];
    protected $customAttributes = [];

    /**
     * Create a new validator instance.
     *
     * @param  App\Models\Applicant  $user
     * @return void
     */
    public function __construct(Applicant $applicant, $data)
    {
        $this->applicant = $applicant;
        $this->data = $data;
        $this->initializeRules($data, $applicant);
    }

    protected function initializeRules($data, $applicant) {
        $rules = [];
        $customAttributes = [];

        $ages = ['new', 'old'];
        $types = ['soft', 'hard'];

        $skill_level_ids = SkillLevel::all()->pluck('id');
        $skill_ids = Skill::all()->pluck('id');
        $uniqueSkillRule = new UniqueApplicantSkillRule($applicant);
        $applicantHasSkillRule = new ApplicantHasRelationRule($applicant, 'skill_declarations');

        if (isset($data['skill_declarations'])) {
            $skill_data = $data['skill_declarations'];
            foreach($ages as $age) {
                if (isset($skill_data[$age])) {
                    $age_data = $skill_data[$age];

                    foreach($types as $type) {
                        if (isset($age_data[$type])) {
                            $type_data = $age_data[$type];

                            foreach($type_data as $id=>$declaration) {

                                //add description validation rule
                                $description_field = implode('.', ['skill_declarations', $age, $type,$id,'description']);
                                $description_rule = 'required|string';
                                $rules[$description_field] = $description_rule;
                                $customAttributes[$description_field] = 'description';

                                //add skill_level validation rule
                                $skill_level_field = implode('.', ['skill_declarations', $age, $type,$id,'skill_level_id']);
                                $skill_level_rule = [
                                    'required',
                                    Rule::in($skill_level_ids->toArray()),
                                ];
                                $rules[$skill_level_field] = $skill_level_rule;
                                $customAttributes[$skill_level_field] = 'skill level';

                                //If age is new, add skill_id validation rule
                                if ($age == 'new') {
                                    $skill_id_field = implode('.', ['skill_declarations', $age, $type,$id,'skill_id']);
                                    $skill_id_rule = [
                                        'required',
                                        Rule::in($skill_ids->toArray()),
                                        $uniqueSkillRule,
                                    ];
                                    $rules[$skill_id_field] = $skill_id_rule;
                                    $customAttributes[$skill_id_field] = 'skill id';
                                }
                                //If age is old, add skill_declaration_id validation rule
                                else if ($age == 'old') {
                                    $skill_declaration_field = implode('.', ['skill_declarations', $age, $type,$id,'skill_declaration_id']);
                                    $skill_declaration_rule = [
                                        'required',
                                        $applicantHasSkillRule,
                                    ];
                                    $rules[$skill_declaration_field] = $skill_declaration_rule;
                                    $customAttributes[$skill_declaration_field] = 'skill declaration id';
                                }
                            }
                        }
                    }
                }
            }
        }

        $this->rules = $rules;
        $this->customAttributes = $customAttributes;
    }

    public function getRules() {
        return $this->rules;
    }

    public function validate($data) {
        Validator::make($data, $this->getRules(), $this->messages, $this->customAttributes)->validate();
    }
}
