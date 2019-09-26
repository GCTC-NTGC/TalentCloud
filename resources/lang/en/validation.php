<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => 'The :attribute must be accepted.',
    'active_url'           => 'The :attribute is not a valid URL.',
    'after'                => 'The :attribute must be a date after :date.',
    'after_or_equal'       => 'The :attribute must be a date after or equal to :date.',
    'alpha'                => 'The :attribute may only contain letters.',
    'alpha_dash'           => 'The :attribute may only contain letters, numbers, dashes and underscores.',
    'alpha_num'            => 'The :attribute may only contain letters and numbers.',
    'array'                => 'The :attribute must be an array.',
    'before'               => 'The :attribute must be a date before :date.',
    'before_or_equal'      => 'The :attribute must be a date before or equal to :date.',
    'between'              => [
        'numeric' => 'The :attribute must be between :min and :max.',
        'file'    => 'The :attribute must be between :min and :max kilobytes.',
        'string'  => 'The :attribute must be between :min and :max characters.',
        'array'   => 'The :attribute must have between :min and :max items.',
    ],
    'boolean'              => 'The :attribute field must be true or false.',
    'confirmed'            => 'The :attribute confirmation does not match.',
    'date'                 => 'The :attribute is not a valid date.',
    'date_format'          => 'The :attribute does not match the format :format.',
    'different'            => 'The :attribute and :other must be different.',
    'digits'               => 'The :attribute must be :digits digits.',
    'digits_between'       => 'The :attribute must be between :min and :max digits.',
    'dimensions'           => 'The :attribute has invalid image dimensions.',
    'distinct'             => 'The :attribute field has a duplicate value.',
    'email'                => 'The :attribute must be a valid email address.',
    'exists'               => 'The selected :attribute is invalid.',
    'file'                 => 'The :attribute must be a file.',
    'filled'               => 'The :attribute field must have a value.',
    'gt'                   => [
        'numeric' => 'The :attribute must be greater than :value.',
        'file'    => 'The :attribute must be greater than :value kilobytes.',
        'string'  => 'The :attribute must be greater than :value characters.',
        'array'   => 'The :attribute must have more than :value items.',
    ],
    'gte'                  => [
        'numeric' => 'The :attribute must be greater than or equal :value.',
        'file'    => 'The :attribute must be greater than or equal :value kilobytes.',
        'string'  => 'The :attribute must be greater than or equal :value characters.',
        'array'   => 'The :attribute must have :value items or more.',
    ],
    'image'                => 'The :attribute must be an image.',
    'in'                   => 'The selected :attribute is invalid.',
    'in_array'             => 'The :attribute field does not exist in :other.',
    'integer'              => 'The :attribute must be an integer.',
    'ip'                   => 'The :attribute must be a valid IP address.',
    'ipv4'                 => 'The :attribute must be a valid IPv4 address.',
    'ipv6'                 => 'The :attribute must be a valid IPv6 address.',
    'json'                 => 'The :attribute must be a valid JSON string.',
    'lt'                   => [
        'numeric' => 'The :attribute must be less than :value.',
        'file'    => 'The :attribute must be less than :value kilobytes.',
        'string'  => 'The :attribute must be less than :value characters.',
        'array'   => 'The :attribute must have less than :value items.',
    ],
    'lte'                  => [
        'numeric' => 'The :attribute must be less than or equal :value.',
        'file'    => 'The :attribute must be less than or equal :value kilobytes.',
        'string'  => 'The :attribute must be less than or equal :value characters.',
        'array'   => 'The :attribute must not have more than :value items.',
    ],
    'max'                  => [
        'numeric' => 'The :attribute may not be greater than :max.',
        'file'    => 'The :attribute may not be greater than :max kilobytes.',
        'string'  => 'The :attribute may not be greater than :max characters.',
        'array'   => 'The :attribute may not have more than :max items.',
    ],
    'mimes'                => 'The :attribute must be a file of type: :values.',
    'mimetypes'            => 'The :attribute must be a file of type: :values.',
    'min'                  => [
        'numeric' => 'The :attribute must be at least :min.',
        'file'    => 'The :attribute must be at least :min kilobytes.',
        'string'  => 'The :attribute must be at least :min characters.',
        'array'   => 'The :attribute must have at least :min items.',
    ],
    'not_in'               => 'The selected :attribute is invalid.',
    'not_regex'            => 'The :attribute format is invalid.',
    'numeric'              => 'The :attribute must be a number.',
    'present'              => 'The :attribute field must be present.',
    'regex'                => 'The :attribute format is invalid.',
    'required'             => 'The :attribute field is required.',
    'required_if'          => 'The :attribute field is required when :other is :value.',
    'required_unless'      => 'The :attribute field is required unless :other is in :values.',
    'required_with'        => 'The :attribute field is required when :values is present.',
    'required_with_all'    => 'The :attribute field is required when :values is present.',
    'required_without'     => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'same'                 => 'The :attribute and :other must match.',
    'size'                 => [
        'numeric' => 'The :attribute must be :size.',
        'file'    => 'The :attribute must be :size kilobytes.',
        'string'  => 'The :attribute must be :size characters.',
        'array'   => 'The :attribute must contain :size items.',
    ],
    'string'               => 'The :attribute must be a string.',
    'timezone'             => 'The :attribute must be a valid zone.',
    'unique'               => 'The :attribute has already been taken.',
    'uploaded'             => 'The :attribute failed to upload.',
    'url'                  => 'The :attribute format is invalid.',

    /*
    |--------------------------------------------------------------------------
    | Custom Rule Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify validation messages for custom rules and validtors.
    */
    'applicant_has_relation' => 'Applicant must own this :attribute',
    'contains_object_with_attribute' => ':attribute doesn\'t contain required :relation equal to :attributeValue',
    'user_skill_unique' => 'You may only add each skill once',
    'password_correct' => 'Current password isn\'t correct',
    'user_owns_skill_declaration' => ':attribute must specify a Skill Declaration that belongs to the current user.',
    'invalid_id' => ":attribute is not a valid id.",

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'password' => 'The password must contain at least one character from each of the following categories: lower-case characters (a-z), upper-case characters (A-Z), digits (0-9), and non-alphanumeric symbols (%, $, !, etc.).',
        'experience_saved' => [
            'accepted' => 'You must review and save Step 2.',
        ],
        'application_step_1' => [
            'accepted' => 'Step 1 must be completed',
        ],
        'application_step_3' => [
            'accepted' => 'Step 3 must be completed',
        ],
        'published' => [
            'in' => 'You cannot edit a Job Poster that has been published'
        ],
        'twitter_handle' => 'This is not a valid twitter handle.',
        'linkedin_url' => 'This is not a valid linkedIn url.',
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [
        'submisstion_signature' => 'signature',
        'submission_date'       => 'date',
        'skill_declaration_id'  => 'skill declaration',
        'name'                  => 'name',
        'username'              => "username",
        'email'                 => 'email address',
        'first_name'            => 'first name',
        'last_name'             => 'last name',
        'password'              => 'password',
        'password_confirmation' => 'password confirmation',
        'new_password'          => 'new password',
        'new_password_confirmation' => 'new password confirmation',
        'city'                  => 'city',
        'country'               => 'country',
        'address'               => 'address',
        'phone'                 => 'phone',
        'mobile'                => 'mobile',
        'age'                   => 'age',
        'sex'                   => 'sex',
        'gender'                => 'gender',
        'day'                   => 'day',
        'month'                 => 'month',
        'year'                  => 'year',
        'hour'                  => 'hour',
        'minute'                => 'minute',
        'second'                => 'second',
        'title'                 => 'title',
        'content'               => 'content',
        'description'           => 'description',
        'excerpt'               => 'excerpt',
        'date'                  => 'date',
        'time'                  => 'time',
        'available'             => 'available',
        'size'                  => 'size',
        'courses.new.*.name' => 'course/certification name',
        'courses.new.*.institution' => 'course/certification institution',
        'courses.new.*.course_status_id' => 'course/certification status',
        'courses.new.*.start_date' => 'course/certification start date',
        'courses.new.*.end_date' => 'course/certification end date',
        'degrees.new.*.degree_type_id' => 'diploma/degree type',
        'degrees.new.*.area_of_study' => 'diploma/degree area of study',
        'degrees.new.*.institution' => 'diploma/degree institution',
        'degrees.new.*.start_date' => 'diploma/degree start date',
        'degrees.new.*.end_date' => 'diploma/degree end date',
        'work_experiences.new.*.role' => 'equivalent experience role',
        'work_experiences.new.*.company' => 'equivalent experience company',
        'work_experiences.new.*.description' => 'equivalent experience description',
        'work_experiences.new.*.start_date' => 'equivalent experience start date',
        'work_experiences.new.*.end_date' => 'equivalent experience end date',
    ],
];
