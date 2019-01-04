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
}
