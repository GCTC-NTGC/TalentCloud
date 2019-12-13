<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Facades\App\Services\WhichPortal;
use App\Services\Validation\Rules\PasswordFormatRule;
use Illuminate\Support\Facades\Lang;

class ResetPasswordController extends AuthController
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
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
        $this->middleware('guest');
    }

    /**
     * Display the password reset view for the given token.
     *
     * If no token is present, display the link request form.
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @param  string|null              $token   Validation token.
     * @return \Illuminate\Http\Response
     */
    public function showResetForm(Request $request, $token = null)
    {
        return view('auth.passwords.reset')->with([
            'token' => $token,
            'email' => $request->email,
            'routes' => $this->auth_routes(),
            'reset_password' => Lang::get('common/auth/reset_password'),
        ]);
    }

    /**
     * OVERRIDE
     * Get the password reset validation rules.
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'token' => 'required',
            'email' => 'required|email',
            'password' => [
                'required',
                'min:8',
                new PasswordFormatRule,
                'confirmed'
            ],
        ];
    }

    /**
     * OVERRIDE
     * Get the password reset validation error messages.
     *
     * @return array
     */
    protected function validationErrorMessages()
    {
        return [];
    }
}
