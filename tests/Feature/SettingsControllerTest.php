<?php

namespace Tests\Feature;

use App\Models\Applicant;
use App\Models\Manager;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Lang;
use Tests\TestCase;

class SettingsControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->user = factory(User::class)->create([
            'password' => Hash::make('Testing123!')
        ]);

        $this->applicant = factory(Applicant::class)->create([
            'user_id' => $this->user->id
        ]);

        $this->managerUser = factory(User::class)->states('upgradedManager')->create([
            'password' => Hash::make('Manager123!')
        ]);


        $this->manager = factory(Manager::class)->create([
            'user_id' => $this->managerUser->id
        ]);
    }

    /**
     * Ensure an unauthorized user is redirected to the login screen.
     *
     * @return void
     */
    public function testGuestCannotView(): void
    {
        // Redirects to login screen of current portal.
        $response = $this->get(route('settings.edit'));
        $response->assertRedirect('login');
        $response = $this->get(route('manager.settings.edit'));
        $response->assertRedirect('manager/login');
    }

    /**
     * Ensure update personal information succeeds with valid data.
     *
     * @return void
     */
    public function testUpdatePersonalInfoWithValidData(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $data = [
            'first_name' => 'Joe',
            'last_name' => 'Blow',
            'email' => 'joeblow@test.com'
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.personal.update', $this->applicant->user), $data);
        $response->assertOk();
        // Success notification visible.
        $response->assertSee(Lang::get('success.update_personal'));
        // Data was updated.
        $this->assertDatabaseHas('users', $data);
    }

    /**
     * Ensure missing name is invalid.
     *
     * @return void
     */
    public function testPersonalInfoNotValidWhenNameIsEmpty(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $data = [
            'first_name' => '',
            'last_name' => '',
            'email' => $this->applicant->user->email,
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.personal.update', $this->applicant->user), $data);
        $response->assertOk();
        // Error message visible.
        $response->assertSee(Lang::get('forms.alert'));
        // Data was not updated.
        $this->assertDatabaseMissing('users', $data);
    }

    /**
     * Ensure missing email is invalid.
     *
     * @return void
     */
    public function testPersonalInfoNotValidWhenEmailIsEmpty(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $data = [
            'first_name' => $this->applicant->user->first_name,
            'last_name' => $this->applicant->user->last_name,
            'email' => '',
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.personal.update', $this->applicant->user), $data);
        $response->assertOk();
        // Error message visible.
        $response->assertSee(Lang::get('forms.alert'));
        // Data was not updated.
        $this->assertDatabaseMissing('users', $data);
    }

    /**
     * Ensure duplicate email is invalid.
     *
     * @return void
     */
    public function testPersonalInfoNotValidWhenEmailSameAsAnotherUser(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $data = [
            'first_name' => $this->applicant->user->first_name,
            'last_name' => $this->applicant->user->last_name,
            'email' => $this->manager->user->email,
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.personal.update', $this->applicant->user), $data);
        $response->assertOk();
        // Error message visible.
        $response->assertSee(Lang::get('forms.alert'));
        // Data was not updated.
        $this->assertDatabaseMissing('users', $data);
    }

    /**
     * Ensure update contact preferences succeeds with valid data.
     *
     * @return void
     */
    public function testUpdateContactPreferencesWithValidData(): void
    {
        $response = $this->actingAs($this->applicant->user)->get(route('settings.edit'));
        $response->assertOk();
        $data = [
            'contact_language' => 'fr',
            'job_alerts' => true,
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.contact_preferences.update', $this->applicant->user), $data);
        $response->assertOk();
        // Success notification visible.
        $response->assertSee(Lang::get('success.update_contact_preferences'));
        // Data was updated.
        $this->assertDatabaseHas('users', $data);
    }

    /**
     * Ensure missing contact language is invalid.
     *
     * @return void
     */
    public function testContactPreferencesNotValidWhenContactLanguageIsEmpty(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $data = [
            'contact_language' => '',
            'job_alerts' => true,
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.contact_preferences.update', $this->applicant->user), $data);
        $response->assertOk();
        // Error message visible.
        $response->assertSee(Lang::get('forms.alert'));
        // Data was not updated.
        $this->assertDatabaseMissing('users', $data);
    }

    /**
     * Ensure update password succeeds with valid data.
     *
     * @return void
     */
    public function testUpdatePasswordWithValidData(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $password = ['password' => $this->applicant->user->password];
        $data = [
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => 'NewPassword123!',
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.password.update', $this->applicant->user), $data);
        $response->assertOk();
        // Success notification visible.
        $response->assertSee(Lang::get('success.update_password'));
        // Password was updated.
        $this->assertDatabaseMissing('users', $password);
    }

    /**
     * Ensure password update is invalid without new password confirmation.
     *
     * @return void
     */
    public function testUpdatePasswordFailsWithoutConfirm(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $password = ['password' => $this->applicant->user->password];
        $data = [
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => ''
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.password.update', $this->applicant->user), $data);
        $response->assertOk();
        // Error message visible.
        $response->assertSee(Lang::get('forms.alert'));
        // Password was not updated.
        $this->assertDatabaseHas('users', $password);
    }

    /**
     * Ensure new password and confirmation mismatch is invalid.
     *
     * @return void
     */
    public function testUpdatePasswordFailsWithBadConfirm(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $password = ['password' => $this->applicant->user->password];
        $data = [
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => 'DifferentPassword123!',
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.password.update', $this->applicant->user), $data);
        $response->assertOk();
        // Error message visible.
        $response->assertSee(Lang::get('forms.alert'));
        // Password was not updated.
        $this->assertDatabaseHas('users', $password);
    }

    /**
     * Ensure illegal new password is invalid.
     *
     * @return void
     */
    public function testUpdatePasswordFailsWithIllegalPassword(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $password = ['password' => $this->applicant->user->password];
        $data = [
            'current_password' => 'Testing123!',
            'new_password' => 'NewPassword',
            'new_confirm_password' => 'NewPassword',
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.password.update', $this->applicant->user), $data);
        $response->assertOk();
        // Error message visible.
        $response->assertSee(Lang::get('forms.alert'));
        // Password was not updated.
        $this->assertDatabaseHas('users', $password);
    }

    /**
     * Ensure illegal new password (too few characters) is invalid.
     *
     * @return void
     */
    public function testUpdatePasswordFailsWithIllegalMinPassword(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $password = ['password' => $this->applicant->user->password];
        $data = [
            'current_password' => 'Testing123!',
            'new_password' => 'Test123!',
            'new_confirm_password' => 'Test123!',
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.password.update', $this->applicant->user), $data);
        $response->assertOk();
        // Error message visible.
        $response->assertSee(Lang::get('forms.alert'));
        // Password was not updated.
        $this->assertDatabaseHas('users', $password);
    }

    /**
     * Ensure illegal new password (too many characters) is invalid.
     *
     * @return void
     */
    public function testUpdatePasswordFailsWithIllegalMaxPassword(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $password = ['password' => $this->applicant->user->password];
        $data = [
            'current_password' => 'Testing123!',
            'new_password' => 'Test!012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345', // 101 characters
            'new_confirm_password' => 'Test!012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345', // 101 characters
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.password.update', $this->applicant->user), $data);
        $response->assertOk();
        // Error message visible.
        $response->assertSee(Lang::get('forms.alert'));
        // Password was not updated.
        $this->assertDatabaseHas('users', $password);
    }

    /**
     * Ensure old password mismatch is invalid.
     *
     * @return void
     */
    public function testUpdatePasswordFailsWithBadOldPassword(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $password = ['password' => $this->applicant->user->password];
        $data = [
            'current_password' => 'NotTheRightPassword123!',
            'new_password' => 'NewPassword123!',
            'new_confirm_password' => 'NewPassword123!',
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.password.update', $this->applicant->user), $data);
        $response->assertOk();
        // Error message visible.
        $response->assertSee(Lang::get('forms.alert'));
        // Password was not updated.
        $this->assertDatabaseHas('users', $password);
    }

    /**
     * Ensure government email not visible if field is null.
     *
     * @return void
     */
    public function testViewGovernmentInfo(): void
    {
        // Applicant, not visible (without gov_email).
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $response->assertDontSee(Lang::get('common/settings.heading.government'));
        // Manager, visible (with gov_email).
        $response = $this->actingAs($this->manager->user)->get(route('manager.settings.edit', $this->manager->user));
        $response->assertOk();
        $response->assertSee(Lang::get('common/settings.heading.government'));
        // Applicant, visible (with gov_email).
        $this->applicant->user->gov_email = 'applicant@tbs-sct.gc.ca';
        $response = $this->actingAs($this->applicant->user)->get(route('settings.edit'));
        $response->assertOk();
        $response->assertSee(Lang::get('common/settings.heading.government'));
    }

    /**
     * Ensure government email succeeds with valid data.
     *
     * @return void
     */
    public function testUpdateGovernmentInfoWithValidData(): void
    {
        $this->applicant->user->gov_email = 'applicant@test.com';
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $data = [
            'gov_email' => 'applicant@tbs-sct.gc.ca'
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.government.update', $this->applicant->user), $data);
        $response->assertOk();
        // Success notification visible.
        $response->assertSee(Lang::get('success.update_government'));
        // Government info was updated.
        $this->assertDatabaseHas('users', $data);
    }

    /**
     * Ensure missing government email is invalid.
     *
     * @return void
     */
    public function testGovernmentInfoNotValidWhenEmpty(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();
        $data = [
            'gov_email' => ''
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.government.update', $this->applicant->user), $data);
        $response->assertOk();
        // Error message visible.
        $response->assertSee(Lang::get('forms.alert'));
        // Password was not updated.
        $this->assertDatabaseMissing('users', $data);
    }

    /**
     * Ensure update personal information succeeds with valid data, manager routes.
     *
     * @return void
     */
    public function testManagerUpdatePersonalInfoWithValidData(): void
    {
        $response = $this->actingAs($this->manager->user)->get(route('manager.settings.edit', $this->manager->user));
        $response->assertOk();
        $data = [
            'first_name' => 'Sally',
            'last_name' => 'Jones',
            'email' => 'sallyjones@test.com'
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->manager->user)
            ->post(route('manager.settings.personal.update', $this->manager->user), $data);
        $response->assertOk();
        // Success notification visible.
        $response->assertSee(Lang::get('success.update_personal'));
        // Data was updated.
        $this->assertDatabaseHas('users', $data);
    }

    /**
     * Ensure update password succeeds with valid data, manager routes.
     *
     * @return void
     */
    public function testManagerUpdatePasswordWithValidData(): void
    {
        $response = $this->actingAs($this->manager->user)
            ->get(route('manager.settings.edit', $this->manager->user));
        $response->assertOk();
        $password = ['password' => $this->manager->user->password];
        $data = [
            'current_password' => 'Manager123!',
            'new_password' => 'NewManager123!',
            'new_confirm_password' => 'NewManager123!',
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->manager->user)
            ->post(route('manager.settings.password.update', $this->manager->user), $data);
        $response->assertOk();
        // Success notification visible.
        $response->assertSee(Lang::get('success.update_password'));
        // Password was updated.
        $this->assertDatabaseMissing('users', $password);
    }

    /**
     * Ensure government email succeeds with valid data, manager routes.
     *
     * @return void
     */
    public function testManagerUpdateGovernmentInfoWithValidData(): void
    {
        // Applicant, not visible (without gov_email).
        $response = $this->actingAs($this->manager->user)
            ->get(route('manager.settings.edit', $this->manager->user));
        $response->assertOk();
        $data = [
            'gov_email' => 'manager@tbs-sct.gc.ca'
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->manager->user)
            ->post(route('manager.settings.government.update', $this->manager->user), $data);
        $response->assertOk();
        // Success notification visible.
        $response->assertSee(Lang::get('success.update_government'));
        // Government info was updated.
        $this->assertDatabaseHas('users', $data);
    }

    /**
     * Ensure update personal information succeeds with valid data.
     *
     * @return void
     */
    public function testSoftDeleteApplicant(): void
    {
        $response = $this->actingAs($this->applicant->user)
            ->get(route('settings.edit'));
        $response->assertOk();

        $data = ['confirm_delete' => $this->applicant->user->email];
        $userData = [
            'id' => $this->applicant->user->id,
            'first_name' => $this->applicant->user->first_name,
            'last_name' => $this->applicant->user->last_name,
            'email' => $this->applicant->user->email,
        ];
        $response = $this->followingRedirects()
            ->actingAs($this->applicant->user)
            ->post(route('settings.account.delete', $this->applicant->user), $data);
        $response->assertOk();
        // Success notification visible.
        $response->assertSee(Lang::get('success.delete_account'));
        // Data was scrambled.
        $this->assertDatabaseMissing('users', $userData);
    }
}
