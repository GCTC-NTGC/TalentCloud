<?php

namespace Tests\Unit\Validators;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Applicant;
use App\Services\Validation\Requests\UpdateApplicationProfileValidator;

class UpdateApplicationProfileValidatorTest extends TestCase
{

    use RefreshDatabase;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp() : void
    {
        parent::setUp();

        $this->applicant = factory(Applicant::class)->create([
            'user_id' => $this->user->id
        ]);
    }

    /**
     * Ensure profiles can be updated with valid data.
     *
     * @return void
     */
    public function testUpdatingBasicProfileIsValid() : void
    {
        $data = [
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $validator = new UpdateApplicationProfileValidator($this->applicant);
        $this->assertTrue($validator->isValid($data));
    }
}
