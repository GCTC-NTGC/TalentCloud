<?php

namespace Tests\Unit\ValidationRules;

use Tests\TestCase;
use App\Services\Validation\Rules\ValidClassificationRule;
use Illuminate\Support\Facades\Validator;

class ValidClassificationRuleTest extends TestCase
{
    public function testPassesForRealClassificationString()
    {
        $rules = [
            'test' => new ValidClassificationRule(),
        ];
        $validator = Validator::make(['test' => 'CS-02'], $rules);
        $this->assertTrue($validator->passes());
    }

    public function testFailsForEmptyString()
    {
        $rules = [
            'test' => new ValidClassificationRule(),
        ];
        $validator = Validator::make(['test' => ''], $rules);
        $this->assertFalse($validator->passes());
    }
}
