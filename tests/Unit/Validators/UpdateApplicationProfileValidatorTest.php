<?php

namespace Tests\Unit\Validators;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

use App\Services\Validation\Requests\UpdateApplicationProfileValidator;
use App\Models\User;
use App\Models\Applicant;

use PHPUnit\Framework\TestCase;

class UpdateApplicationProfileValidatorTest extends TestCase
{

    use RefreshDatabase;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp()
    {
        parent::setUp();

        $this->password = 'Testing123!';
        $this->badPassword = 'WrongPassword123!';
        $this->user = factory(User::class)->create([
            'password' => Hash::make('Testing123!')
        ]);
        $this->applicant = factory(Applicant::class)->create(['user_id' => $this->user->id]);

        $this->otherApplicant = factory(Applicant::class)->create();
    }

    public function testUpdatingBasicProfileIsValid()
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->applicant->user->email,
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $validator = new UpdateApplicationProfileValidator($this->applicant);
        $this->assertTrue($validator->isValid($data));
    }

    public function testNotValidWhenNameIsEmpty()
    {
        $data = [
            'profile_name' => '',
            'profile_email' => $this->applicant->user->email,
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $validator = new UpdateApplicationProfileValidator($this->applicant);
        $this->assertFalse($validator->isValid($data));
    }

    public function testNotValidWhenNEmailIsEmpty()
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => '',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $validator = new UpdateApplicationProfileValidator($this->applicant);
        $this->assertFalse($validator->isValid($data));
    }

    public function testNotValidWhenNEmailSameAsAnotherUser()
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->otherApplicant->user->email,
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $validator = new UpdateApplicationProfileValidator($this->applicant);
        $this->assertFalse($validator->isValid($data));
    }

    public function testUpdatePasswordValidWithOldAndConfirm()
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->applicant->user->email,
            'old_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_password_confirmation' => 'NewPassword123!',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $this->be($this->applicant->user);
        $validator = new UpdateApplicationProfileValidator($this->applicant);
        $this->assertTrue($validator->isValid($data));
    }

    public function testUpdatePasswordFailsWithoutConfirm()
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->applicant->user->email,
            'old_password' => $this->password,
            'new_password' => 'NewPassword123!',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $this->be($this->applicant->user);
        $validator = new UpdateApplicationProfileValidator($this->applicant);
        $this->assertFalse($validator->isValid($data));
    }


    public function testUpdatePasswordFailsWithBadConfirm()
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->applicant->user->email,
            'old_password' => $this->password,
            'new_password' => 'NewPassword123!',
            'new_password_confirmation' => 'DifferentPassword123!',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $this->be($this->applicant->user);
        $validator = new UpdateApplicationProfileValidator($this->applicant);
        $this->assertFalse($validator->isValid($data));
    }

    public function testUpdatePasswordFailsWithIllegalPassword()
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->applicant->user->email,
            'old_password' => $this->password,
            'new_password' => 'NewPassword',
            'new_password_confirmation' => 'NewPassword',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $this->be($this->applicant->user);
        $validator = new UpdateApplicationProfileValidator($this->applicant);
        $this->assertFalse($validator->isValid($data));
    }


    public function testUpdatePasswordFailsWithBadOldPassword()
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->applicant->user->email,
            'old_password' => 'NotTheRightPassword123!',
            'new_password' => 'NewPassword123!',
            'new_password_confirmation' => 'NewPassword123!',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $this->be($this->applicant->user);
        $validator = new UpdateApplicationProfileValidator($this->applicant);
        $this->assertFalse($validator->isValid($data));
    }
}
