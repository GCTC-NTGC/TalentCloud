<?php

namespace App\Http\Requests;

use App\Models\JobPoster;
use App\Models\Lookup\CommentType;
use App\Models\User;
use App\Services\Validation\Rules\ValidIdRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreComment extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'job_poster_id' => ['nullable', new ValidIdRule(JobPoster::class)],
            'user_id' => ['nullable', new ValidIdRule(User::class)],
            'comment' => 'nullable|string',
            'location' => 'nullable|string',
            'type_id' => ['nullable', new ValidIdRule(CommentType::class)]
        ];
    }
}
