<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\JobApplication;
use App\Services\Validation\ApplicationValidator;
use App\Services\Validation\Rules\ContainsObjectWithAttributeRule;
use Illuminate\Support\Facades\Validator;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $this->assertTrue(true);
    }

    public function testSkillsValidator()
    {
        $application = JobApplication::find(5);
        $validator = new ApplicationValidator();
        print_r($validator->essentialSkillsValidator($application)->getRules());
        // print_r($application->toArray());
        $this->assertFalse($validator->essentialSkillsComplete($application));
    }

    public function testContainsObjectWithAttributeRule()
    {
        $array = [];
        for($i = 0; $i < 5; $i++) {
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
