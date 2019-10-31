<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\RatingGuideAnswer;
use App\Models\RatingGuideQuestion;
use App\Services\Validation\Rules\ValidIdRule;
use App\Models\Criteria;

class StoreRatingGuideAnswer extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // Ensure the user can make answers, question exists, and user is the owner of the question it answers.
        if ($this->user()->can('create', RatingGuideAnswer::class)) {
            $questionId = (int) $this->input('rating_guide_question_id');
            if ($questionId) {
                $question = RatingGuideQuestion::find($questionId);
                return $this->user()->can('update', $question);
            }
        }

        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'rating_guide_question_id' => ['required', new ValidIdRule(RatingGuideQuestion::class)],
            'criterion_id' => ['nullable', new ValidIdRule(Criteria::class)],
            'expected_answer' => 'nullable|string',
        ];
    }
}
