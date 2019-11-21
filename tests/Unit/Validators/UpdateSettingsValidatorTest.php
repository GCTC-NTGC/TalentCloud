<?php

namespace Tests\Unit\Validators;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use App\Services\Validation\Rules\PasswordCorrectRule;
use App\Services\Validation\Rules\PasswordFormatRule;

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

        $this->user = factory(User::class)->create([
            'password' => Hash::make('Testing123!')
        ]);

        $this->otherUser = factory(User::class)->create();
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
            'email' => $this->user->email,
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => 'NewPassword123!',
        ];
        $this->be($this->user);
        $validator = Validator::make($data, $this->rules());
        $this->assertFalse($validator->fails());
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
            'email' => $this->user->email,
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => 'NewPassword123!',
        ];
        $this->be($this->user);
        $validator = Validator::make($data, $this->rules());
        $this->assertTrue($validator->fails());
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
            'email' => '',
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => 'NewPassword123!',
        ];
        $this->be($this->user);
        $validator = Validator::make($data, $this->rules());
        $this->assertTrue($validator->fails());
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
            'email' => $this->otherUser->email,
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => 'NewPassword123!',
        ];
        $this->be($this->user);
        $validator = Validator::make($data, $this->rules());
        $this->assertTrue($validator->fails());
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
            'email' => $this->user->email,
            'password' => $this->user->password,
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => 'NewPassword123!',
        ];
        $this->be($this->user);
        $validator = Validator::make($data, $this->rules());
        $this->assertFalse($validator->fails());
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
            'email' => $this->user->email,
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => ''
        ];
        $this->be($this->user);
        $validator = Validator::make($data, $this->rules());
        $this->assertTrue($validator->fails());
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
            'email' => $this->user->email,
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => 'DifferentPassword123!',
        ];
        $this->be($this->user);
        $validator = Validator::make($data, $this->rules());
        $this->assertTrue($validator->fails());
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
            'email' => $this->user->email,
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword',
            'new_confirm_password' => 'NewPassword',
        ];
        $this->be($this->user);
        $validator = Validator::make($data, $this->rules());
        $this->assertTrue($validator->fails());
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
            'email' => $this->user->email,
            'current_password' => 'NotTheRightPassword123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => 'NewPassword123!',
        ];
        $this->be($this->user);
        $validator = Validator::make($data, $this->rules());
        $this->assertTrue($validator->fails());
    }

    public function rules()
    {
        return
        [
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'email' => [
                'required',
                'string',
                'max:191',
                'email:dns',
                // Email may match existing email for this user, must be unique if changed.
                Rule::unique('users', 'email')->ignore($this->user->id)
            ],
            'current_password' => ['required', new PasswordCorrectRule],
            'new_password' => ['required', new PasswordFormatRule],
            'new_confirm_password' => ['required', 'same:new_password']
        ];
    }
}
