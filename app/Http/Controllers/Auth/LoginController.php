<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Facades\App\Services\WhichPortal;

class LoginController extends AuthController
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * The maximum number of login attempts to allow.
     *
     * @var string
     */
    protected $maxAttempts = 5;

    /**
     * The number of minutes to throttle for.
     *
     * @var string
     */
    protected $decayMinutes = 5;

    /**
     * Where to redirect users after login.
     *
     * @return string
     */
    protected function redirectTo()
    {
        if (WhichPortal::isManagerPortal()) {
            $redirectTo = route('manager.home');
        } elseif (WhichPortal::isHrPortal()) {
            $redirectTo = route('hr_advisor.home');
        } else {
            $redirectTo = route('home');
        }
        return $redirectTo;
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * OVERRIDE
     * Show the application's login form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLoginForm()
    {
        $home_url = WhichPortal::isManagerPortal() ? route('manager.home') : route('home');

        return view('auth/login', [
            'routes' => $this->auth_routes(),
            'login' => Lang::get('common/auth/login'),
            'home_url' => $home_url,
        ]);
    }

    /**
     * OVERRIDE
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request $request Incoming Request object.
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        // This causes logout to redirect to the same page as login.
        return redirect($this->redirectPath());
    }
}
