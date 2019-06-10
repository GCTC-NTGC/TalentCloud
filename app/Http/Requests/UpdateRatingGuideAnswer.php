<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Validation\Rules\ValidIdRule;
use App\Models\Criteria;

class UpdateRatingGuideAnswer extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // originalParameter avoids type hinting that automagically transforms the id into the RatingGuideAnswer object
        //$answer = RatingGuideAnswer::find($this->route()->originalParameter('ratingGuideAnswer'));

        // The id parameter in the route is typehinted to magically become a RatingGuideAnswer object.
        $answer = $this->route('ratingGuideAnswer');
        return $answer && $this->user()->can('update', $answer);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            // RatingGuideQUestionId shouldn't be updated after creation
            //'rating_guide_question_id' => ['required', new RatingGuideQuestionRule()],
            'criterion_id' => ['nullable', new ValidIdRule(Criteria::class)],
            'expected_answer' => 'nullable|string',
        ];
    }
}
