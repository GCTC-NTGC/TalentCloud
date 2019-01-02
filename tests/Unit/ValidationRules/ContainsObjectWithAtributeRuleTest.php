<?php

namespace Tests\Unit\ValidationRules;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Services\Validation\Rules\ContainsObjectWithAttributeRule;
use Illuminate\Support\Facades\Validator;

class ContainsObjectWithAttributeRuleTest extends TestCase
{
    public function testPasses()
    {
        $array = [];
        for ($i = 0; $i < 5; $i++) {
            $object = [
                'a' => $i,
                'b' => $i*2,
                'c' => $i*3,
            ];
            $array[] = $object;
        }
        $testObj['test'] = $array;
        $rules = [
            'test' => new ContainsObjectWithAttributeRule('b', 8)
        ];
        $validator = Validator::make($testObj, $rules);
        $this->assertTrue($validator->passes());
    }
}
