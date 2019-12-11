<?php

namespace App\Services\Validation;

use Illuminate\Support\Facades\Lang;

class PasswordValidator
{
    public function validate($request)
    {
        abort(404, 'incomplete');
    }

    public function rules()
    {
        return [
            'password' => [
                'min:8',
                'regex:/^.*(?=.{3,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/',
            ],
        ];
    }

    public function messages(){
        return Lang::get('validation.custom.password');
    }
}
