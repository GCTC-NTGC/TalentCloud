<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use Illuminate\Database\Eloquent\Relations\Relation;

class PolyExistsRule implements Rule
{

    /**
     * The value in the the _type column, sepecifying the type of a polymorphic relationship.
     * eg 'applicant' or 'application'
     *
     * @var string
     */
    protected $poly_type;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($poly_type)
    {
        $this->poly_type = $poly_type;
    }

    /**
     * Determine if $value is a valid id of the model specified in the _type polymorphic relation column.
     * An example of how to use this rule:
     *    'commentable_id' => [new PolyTypeRule('user')]
     *
     */
    public function passes($attribute, $value)
    {
        $type = $this->poly_type;

        if (Relation::getMorphedModel($type)) {
            $type = Relation::getMorphedModel($type);
        }

        if (! class_exists($type)) {
            return false;
        }

        return ! empty(resolve($type)->find($value));
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return Lang::get('validation.invalid_id');
    }
}
