<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\AuthController;
use App\Models\User;
use Jenssegers\Date\Date;

class ForgotPasswordController extends AuthController
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails {
        sendResetLinkEmail as protected sendResetLinkEmailOverridden;
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
     * OVERRIDE
     *
     * Display the form to request a password reset link.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLinkRequestForm()
    {
        return view('auth.passwords.email', [
            'routes' => $this->auth_routes(),
            'forgot_password' => Lang::get('common/auth/forgot_password'),
        ]);
    }

    /**
     * Log information for reset password request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function sendResetLinkEmail(Request $request) {
        if( User::where('email', $request->input('email'))->exists() ){ // Check if user exists.
            Log::notice('Reset Password email requested by ' . $request->input('email') . ' at ' . Date::now()->format('c'));
        }
        return $this->sendResetLinkEmailOverridden($request);
    }
}
