<?php

namespace Tests\Unit\Validators;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Services\Validation\Rules\ContainsObjectWithAttributeRule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\Applicant;
use App\Models\User;
use App\Services\Validation\Requests\UpdateApplicationProfileValidator;

class UpdateApplicationProfileValidatorTest extends TestCase
{
    public function testUpdatingBasicProfileIsValid()
    {
        $applicant = factory(Applicant::class)->create();
        $data = [
            'profile_name' => $applicant->user->name,
            'profile_email' => $applicant->user->email,
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $validator = new UpdateApplicationProfileValidator($applicant);
        $this->assertTrue($validator->isValid($data));
    }

    public function testNotValidWhenNameIsEmpty()
    {
        $applicant = factory(Applicant::class)->create();
        $data = [
            'profile_name' => '',
            'profile_email' => $applicant->user->email,
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $validator = new UpdateApplicationProfileValidator($applicant);
        $this->assertFalse($validator->isValid($data));
    }

    public function testNotValidWhenNEmailIsEmpty()
    {
        $applicant = factory(Applicant::class)->create();
        $data = [
            'profile_name' => $applicant->user->name,
            'profile_email' => '',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $validator = new UpdateApplicationProfileValidator($applicant);
        $this->assertFalse($validator->isValid($data));
    }

    public function testNotValidWhenNEmailSameAsAnotherUser()
    {
        $applicant1 = factory(Applicant::class)->create();
        $applicant2 = factory(Applicant::class)->create();
        $data = [
            'profile_name' => $applicant1->user->name,
            'profile_email' => $applicant2->user->email,
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $validator = new UpdateApplicationProfileValidator($applicant1);
        $this->assertFalse($validator->isValid($data));
    }

    public function testUpdatePasswordValidWithOldAndConfirm()
    {
        $user = factory(User::class)->create([
            'password' => Hash::make('Testing123!')
        ]);
        $applicant = factory(Applicant::class)->create(['user_id' => $user->id]);
        $data = [
            'profile_name' => $applicant->user->name,
            'profile_email' => $applicant->user->email,
            'old_password' => "Testing123!",
            'new_password' => 'NewPassword123!',
            'new_password_confirmation' => 'NewPassword123!',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $this->be($applicant->user);
        $validator = new UpdateApplicationProfileValidator($applicant);
        $this->assertTrue($validator->isValid($data));
    }

    public function testUpdatePasswordFailsWithoutConfirm()
    {
        $user = factory(User::class)->create([
            'password' => Hash::make('Testing123!')
        ]);
        $applicant = factory(Applicant::class)->create(['user_id' => $user->id]);
        $data = [
            'profile_name' => $applicant->user->name,
            'profile_email' => $applicant->user->email,
            'old_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $this->be($applicant->user);
        $validator = new UpdateApplicationProfileValidator($applicant);
        $this->assertFalse($validator->isValid($data));
    }

    public function testUpdatePasswordFailsWithBadConfirm()
    {
        $user = factory(User::class)->create([
            'password' => Hash::make('Testing123!')
        ]);
        $applicant = factory(Applicant::class)->create(['user_id' => $user->id]);
        $data = [
            'profile_name' => $applicant->user->name,
            'profile_email' => $applicant->user->email,
            'old_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_password_confirmation' => 'DifferentPassword123!',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $this->be($applicant->user);
        $validator = new UpdateApplicationProfileValidator($applicant);
        $this->assertFalse($validator->isValid($data));
    }

    public function testUpdatePasswordFailsWithIllegalPassword()
    {
        $user = factory(User::class)->create([
            'password' => Hash::make('Testing123!')
        ]);
        $applicant = factory(Applicant::class)->create(['user_id' => $user->id]);
        $data = [
            'profile_name' => $applicant->user->name,
            'profile_email' => $applicant->user->email,
            'old_password' => 'Testing123!',
            'new_password' => 'NewPassword',
            'new_password_confirmation' => 'NewPassword',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $this->be($applicant->user);
        $validator = new UpdateApplicationProfileValidator($applicant);
        $this->assertFalse($validator->isValid($data));
    }

    public function testUpdatePasswordFailsWithBadOldPassword()
    {
        $applicant = factory(Applicant::class)->create();
        $data = [
            'profile_name' => $applicant->user->name,
            'profile_email' => $applicant->user->email,
            'old_password' => 'NotTheRightPassword123!',
            'new_password' => 'NewPassword123!',
            'new_password_confirmation' => 'NewPassword123!',
            'twitter_username' => 'Test_person',
            'linkedin_url' => 'www.linkedin.com/in/test-person',
            'tagline' => 'GO FOR IT',
        ];
        $this->be($applicant->user);
        $validator = new UpdateApplicationProfileValidator($applicant);
        $this->assertFalse($validator->isValid($data));
    }
}
