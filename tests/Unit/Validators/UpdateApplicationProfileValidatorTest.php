<?php

namespace Tests\Unit\Validators;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
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

        $this->password = 'Testing123!';
        $this->badPassword = 'WrongPassword123!';

        $this->user = factory(\App\Models\User::class)->create([
            'password' => Hash::make('Testing123!')
        ]);
        $this->applicant = factory(Applicant::class)->create([
            'user_id' => $this->user->id
        ]);
        $this->otherApplicant = factory(Applicant::class)->create();
    }

    /**
     * Ensure profiles can be updated with valid data.
     *
     * @return void
     */
    public function testUpdatingBasicProfileIsValid() : void
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

    /**
     * Ensure missing name is invalid.
     *
     * @return void
     */
    public function testNotValidWhenNameIsEmpty() : void
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

    /**
     * Ensure missing email is invalid.
     *
     * @return void
     */
    public function testNotValidWhenNEmailIsEmpty() : void
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

    /**
     * Ensure duplicate email is invalid.
     *
     * @return void
     */
    public function testNotValidWhenNEmailSameAsAnotherUser() : void
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

    /**
     * Ensure old password and new password confirmation are valid FOR changing password.
     *
     * @return void
     */
    public function testUpdatePasswordValidWithOldAndConfirm() : void
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->applicant->user->email,
            'password' => $this->applicant->user->password,
            'current_password' => 'Testing123!',
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

    /**
     * Ensure password update is invalid without new password confirmation.
     *
     * @return void
     */
    public function testUpdatePasswordFailsWithoutConfirm() : void
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->applicant->user->email,
            'current_password' => $this->password,
            'new_password' => 'NewPassword123!',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $this->be($this->applicant->user);
        $validator = new UpdateApplicationProfileValidator($this->applicant);
        $this->assertFalse($validator->isValid($data));
    }

    /**
     * Ensure new password and confirmation mismatch is invalid.
     *
     * @return void
     */
    public function testUpdatePasswordFailsWithBadConfirm() : void
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->applicant->user->email,
            'current_password' => $this->password,
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

    /**
     * Ensure illegal new password is invalid.
     *
     * @return void
     */
    public function testUpdatePasswordFailsWithIllegalPassword() : void
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->applicant->user->email,
            'current_password' => $this->password,
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

    /**
     * Ensure old password mismatch is ivalid.
     *
     * @return void
     */
    public function testUpdatePasswordFailsWithBadOldPassword() : void
    {
        $data = [
            'profile_name' => $this->applicant->user->name,
            'profile_email' => $this->applicant->user->email,
            'current_password' => 'NotTheRightPassword123!',
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
