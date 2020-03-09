<?php

namespace App\Http\Requests;

class UpdateResourceCrudRequest extends StoreResourceCrudRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return string[]
     */
    public function rules() : array
    {
        return [
            'name' => 'required|string',
            'file' => 'file',
        ];
    }
}
