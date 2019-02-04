<?php

namespace App\Services\Validation\Contracts;

interface DataValidator
{
    /**
     * Runs the validator, redirecting back, with errors, if validation fails.
     *
     * @param mixed[] $data The data to validate.
     * @return void
     */
    public function validate(array $data): void;

    /**
     * Returns a laravel validator object made with this data.
     *
     * @param mixed[] $data Data to validate.
     * @return \Illuminate\Validation\Validator
     */
    public function validator(array $data): \Illuminate\Validation\Validator;

    /**
     * Returns true if the validator passes.
     *
     * @param mixed[] $data Data to validate.
     * @return boolean
     */
    public function isValid(array $data): bool;
}
