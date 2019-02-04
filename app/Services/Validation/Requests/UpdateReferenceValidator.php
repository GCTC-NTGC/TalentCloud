<?php

namespace App\Services\Validation\Requests;

use App\Services\Validation\BaseDataValidator;
use App\Services\Validation\Contracts\DataValidator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Lookup\Relationship;
use App\Models\Skill;

class UpdateReferenceValidator extends BaseDataValidator implements DataValidator
{

    /**
     * Array of all possible relationship ids.
     *
     * @var int[]
     */
    protected $relationshipIds;

    /**
     * Array of all possible skill ids.
     *
     * @var int[]
     */
    protected $skillIds;

    /**
     * Construct a new UpdateReferenceValidator
     */
    public function __construct()
    {
        $this->relationshipIds = Relationship::all()->pluck('id')->toArray();
        $this->skillIds = Skill::all()->pluck('id')->toArray();
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return mixed[]
     */
    public function rules() : array
    {
        return [
            // Name validation
            'name' => 'required|string|max:191',

            // Email validation
            'email' => [
                'required',
                'string',
                'max:191',
                'email',
            ],

            //Relationship Id validation
            'relationship_id' => [
                'required',
                Rule::in($this->relationshipIds)
            ],

            'description' => 'required|string',

            'relatives.skills.*.id' => [
                Rule::in($this->skillIds)
            ],
        ];
    }

    /**
     * Returns a validator made with this data
     *
     * @param  mixed[] $data Data to validate.
     * @return Validator
     */
    public function validator(array $data) : \Illuminate\Validation\Validator
    {
        return Validator::make($data, $this->rules());
    }
}
