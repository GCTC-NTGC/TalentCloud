<?php

namespace Tests\Unit\ValidationRules;

use App\Models\Classification;
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

    public function testPassesForComblexKnownClassification()
    {
        $exEng = new Classification(['key' => 'EX-ENG']);
        $exEng->save();
        $rules = [
            'test' => new ValidClassificationRule(),
        ];
        $validator = Validator::make(['test' => 'EX-ENG-02'], $rules);
        $this->assertTrue($validator->passes());
    }

    public function testFailsWithoutDigits()
    {
        $rules = [
            'test' => new ValidClassificationRule(),
        ];
        $validator = Validator::make(['test' => 'EX-CS'], $rules);
        $this->assertFalse($validator->passes());

        $validator = Validator::make(['test' => 'EX-'], $rules);
        $this->assertFalse($validator->passes());
    }

    public function testFailsWithUnknownClassification()
    {
        $rules = [
            'test' => new ValidClassificationRule(),
        ];
        $validator = Validator::make(['test' => 'QX-01'], $rules);
        $this->assertFalse($validator->passes());
    }
}
