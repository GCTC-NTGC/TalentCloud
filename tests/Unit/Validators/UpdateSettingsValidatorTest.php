<?php

namespace Tests\Unit\Validators;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use App\Models\Applicant;
use App\Services\Validation\Requests\UpdateSettingsValidator;

class UpdateSettingsValidatorTest extends TestCase
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
        $this->otherApplicant = factory(Applicant::class)->create();
    }

    /**
     * Ensure profiles can be updated with valid data.
     *
     * @return void
     */
    public function testUpdatingSettingsIsValid() : void
    {
        $data = [
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
            'email_address' => $this->user->email,
        ];
        $validator = new UpdateSettingsValidator($this->user);
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
            'first_name' => '',
            'last_name' => '',
            'email_address' => $this->user->email,
        ];
        $validator = new UpdateSettingsValidator($this->user);
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
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
            'email_address' => '',
        ];
        $validator = new UpdateSettingsValidator($this->user);
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
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
            'email_address' => $this->otherApplicant->user->email,
        ];
        $validator = new UpdateSettingsValidator($this->user);
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
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
            'email_address' => $this->user->email,
            'password' => $this->user->password,
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_password_confirmation' => 'NewPassword123!',
        ];
        $this->be($this->user);
        $validator = new UpdateSettingsValidator($this->user);
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
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
            'email_address' => $this->user->email,
            'current_password' => $this->password,
            'new_password' => 'NewPassword123!',
        ];
        $this->be($this->user);
        $validator = new UpdateSettingsValidator($this->user);
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
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
            'email_address' => $this->user->email,
            'current_password' => $this->password,
            'new_password' => 'NewPassword123!',
            'new_password_confirmation' => 'DifferentPassword123!',
        ];
        $this->be($this->user);
        $validator = new UpdateSettingsValidator($this->user);
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
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
            'email_address' => $this->user->email,
            'current_password' => $this->password,
            'new_password' => 'NewPassword',
            'new_password_confirmation' => 'NewPassword',
        ];
        $this->be($this->user);
        $validator = new UpdateSettingsValidator($this->user);
        $this->assertFalse($validator->isValid($data));
    }

    /**
     * Ensure old password mismatch is invalid.
     *
     * @return void
     */
    public function testUpdatePasswordFailsWithBadOldPassword() : void
    {
        $data = [
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
            'email_address' => $this->user->email,
            'current_password' => 'NotTheRightPassword123!',
            'new_password' => 'NewPassword123!',
            'new_password_confirmation' => 'NewPassword123!',
        ];
        $this->be($this->user);
        $validator = new UpdateSettingsValidator($this->user);
        $this->assertFalse($validator->isValid($data));
    }
}
