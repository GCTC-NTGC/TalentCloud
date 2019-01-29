<?php

namespace App\Services\Validation;

use App\Services\Validation\Contracts\DataValidator;

abstract class BaseDataValidator implements DataValidator
{
    /**
     * Runs the validator, redirecting back, with errors, if validation fails.
     *
     * @param mixed[] $data The data to validate.
     * @return void
     */
    public function validate(array $data): void
    {
        $this->validator($data)->validate();
    }

    /**
     * Returns true if the validator passes
     *
     * @param mixed[] $data Data to validate.
     * @return boolean
     */
    public function isValid(array $data) : bool
    {
        return $this->validator($data)->passes();
    }
}
