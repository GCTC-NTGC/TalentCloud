<?php

namespace Tests\Unit\ValidationRules;

use Tests\TestCase;
use App\Services\Validation\Rules\IncludesAllRule;
use Illuminate\Support\Facades\Validator;

class IncludesAllRuleTest extends TestCase
{
    public function testPasses()
    {
        $exact = array(
            12,
            15,
            56,
            88,
            'this is a string',
        );

        $rules = [
            new IncludesAllRule([
                56,
                'this is a string',
                88,
                12,
                15
            ])
        ];

        $validator = Validator::make([$exact], $rules);
        $this->assertTrue($validator->passes());

        $extra = array(
            12,
            15,
            12,
            56,
            88,
            'this is a string',
            'this is another string'
        );

        $validator = Validator::make([$extra], $rules);
        $this->assertTrue($validator->passes());
    }

    public function testFails()
    {
        $empty = array();

        $rules = [
            new IncludesAllRule([
                56,
                'this is a string',
                88,
                12,
                15
            ])
        ];

        $validator = Validator::make([$empty], $rules);
        $this->assertFalse($validator->passes());

        $missingOne = array(
            12,
            15,
            88,
            'this is a string',
        );

        $validator = Validator::make([$missingOne], $rules);
        $this->assertFalse($validator->passes());
    }
}
