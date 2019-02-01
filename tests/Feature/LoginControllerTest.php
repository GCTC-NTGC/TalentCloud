<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Lang;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Doctrine\Common\Cache\VoidCache;
use App\Models\User;

class LoginControllerTest extends TestCase
{

    use RefreshDatabase;
    /**
     * Ensure an unauthorized user can view the login page.
     *
     * @return void
     */
    public function testGuestLoginView() : void
    {
        $response = $this->get(route('login'));
        $response->assertStatus(200);
        $response->assertViewIs('auth.login');
        $response->assertSee(Lang::get('common/auth/login.title'));
    }

    /**
     * Ensure a user can log in.
     *
     * @return void
     */
    public function testLoginSubmit() : void
    {
        $user = factory(User::class)->create();
        $credentials = [
            'email' => $user->email,
            'password' => 'password',
        ];
        $response = $this->post(route('login'), $credentials);
        $response->assertRedirect(route('home'));
        $this->assertAuthenticatedAs($user);
    }

    /**
     * Ensure a user can log in, with capital letters in email.
     *
     * @return void
     */
    public function testLoginSubmitWithCapitalizedEmail() : void
    {
        $user = factory(User::class)->create([
            'email' => 'TEST@test.com'
        ]);
        $credentials = [
            'email' => $user->email,
            'password' => 'password',
        ];
        $response = $this->post(route('login'), $credentials);
        $response->assertRedirect(route('home'));
        $this->assertAuthenticatedAs($user);
    }

    /**
     * Ensure login fails with wrong credentials.
     *
     * @return void
     */
    public function testLoginFailure() : void
    {
        $user = factory(User::class)->create();
        $credentials = [
            'email' => $user->email,
            'password' => 'WRONG_PASSWORD',
        ];
        $response = $this->post(route('login'), $credentials);
        $response->assertStatus(200);
        $response->assertViewIs('auth.login');
        $this->assertGuest();
    }
}
