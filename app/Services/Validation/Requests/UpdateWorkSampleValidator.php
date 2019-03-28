<?php

namespace App\Services\Validation\Requests;

use App\Services\Validation\BaseDataValidator;
use App\Services\Validation\Contracts\DataValidator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Lookup\FileType;
use App\Services\Validation\Rules\SkillDeclarationBelongsToUserRule;

class UpdateWorkSampleValidator extends BaseDataValidator implements DataValidator
{

    /**
     * Array of all possible FileType ids.
     *
     * @var int[]
     */
    protected $fileTypeIds;

    /**
     * Construct a new UpdateWorkSampleValidator
     */
    public function __construct()
    {
        $this->fileTypeIds = FileType::all()->pluck('id')->toArray();
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
            'file_type_id' => [
                'required',
                Rule::in($this->fileTypeIds)
            ],
            'url' => 'required|url',
            'description' => 'required|string',
            'relatives.skills.*.id' => [
                'required',
                new SkillDeclarationBelongsToUserRule
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
