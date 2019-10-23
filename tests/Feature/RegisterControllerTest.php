<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Lang;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Doctrine\Common\Cache\VoidCache;
use App\Models\User;

class RegisterControllerTest extends TestCase
{

    use RefreshDatabase;

    /**
     * Ensure the register view serves correctly.
     *
     * @return void
     */
    public function testRegisterView() : void
    {
        $response = $this->get(route('register'));
        $response->assertStatus(200);
        $response->assertViewIs('auth.register');
        $response->assertSee(Lang::get('common/auth/register.title'));
    }

    /**
     * Ensure the register form submits correctly
     *
     * @return void
     */
    public function testRegisterPost() : void
    {
        $user = factory(User::class)->make();
        $credentials = [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'password' => 'Test123!',
            'password_confirmation' => 'Test123!'
        ];
        $response = $this->post(route('register'), $credentials);
        $response->assertRedirect(route('home'));
        $this->assertAuthenticated();
        $this->assertCredentials($credentials);
    }

    /**
     * Ensure the the login form works after registering a user
     *
     * @return void
     */
    public function testRegisterThenLogin() : void
    {
        $user = factory(User::class)->make();
        $credentials = [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'password' => 'Test123!',
            'password_confirmation' => 'Test123!'
        ];
        $response = $this->followingRedirects()->post(route('register'), $credentials);
        $response = $this->followingRedirects()->post(route('logout'));

        $registeredUser = User::where('email', $user->email)->first();
        $loginCredentials = [
            'email' => $registeredUser->email,
            'password' => 'Test123!',
        ];
        $response = $this->post(route('login'), $loginCredentials);
        $response->assertRedirect(route('home'));
        $this->assertAuthenticatedAs($registeredUser);
    }

    /**
     * Ensure the the login form works after registering a user with capitals in email
     *
     * @return void
     */
    public function testRegisterThenLoginWithCapitals() : void
    {
        $user = factory(User::class)->make([
            'email' => 'TEST@test.com'
        ]);
        $credentials = [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'password' => 'Test123!',
            'password_confirmation' => 'Test123!'
        ];
        $response = $this->followingRedirects()->post(route('register'), $credentials);
        $response = $this->followingRedirects()->post(route('logout'));

        $registeredUser = User::where('email', $user->email)->first();
        $loginCredentials = [
            'email' => $registeredUser->email,
            'password' => 'Test123!',
        ];
        $response = $this->post(route('login'), $loginCredentials);
        $response->assertRedirect(route('home'));
        $this->assertAuthenticatedAs($registeredUser);
    }
}
