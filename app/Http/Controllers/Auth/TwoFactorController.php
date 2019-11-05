<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Facades\App\Services\WhichPortal;
use Illuminate\Support\Facades\Lang;
use PragmaRX\Google2FALaravel\Support\Authenticator;

class TwoFactorController extends AuthController
{
    public function activate(Request $request)
    {
        $user = $request->user();
        $google2fa = app('pragmarx.google2fa');
        $secret = $google2fa->generateSecretKey();
        $qrImage = $google2fa->getQRCodeInline(
            config('app.name'),
            $user->email,
            $secret
        );

        return view('auth.two_factor', [
            'qr_image' => $qrImage,
            'secret' => $secret,
        ]);
    }

    public function deactivate(Request $request)
    {
        $user = $request->user();
        $user->google2fa_secret = null;
        $user->recovery_codes = null;
        $user->save();
        $user->refresh();

        $profile_url = '';
        if (WhichPortal::isApplicantPortal()) {
            $profile_url = route('profile');
        } elseif (WhichPortal::isManagerPortal()) {
            $profile_url = route('manager.profile');
        } elseif (WhichPortal::isAdminPortal()) {
            $profile_url = backpack_url('2fa');
        }

        return redirect($profile_url);
    }

    public function confirm(Request $request)
    {
        $user = $request->user();
        $validatedData = $request->validate([
            'secret' => 'required|string',
            'one_time_password' => 'required|string',
        ]);
        $secret = $validatedData['secret'];
        $one_time_password = $validatedData['one_time_password'];

        // A 2fa secret is already set up, no need to do anything.
        if (!empty($user->google2fa_secret)) {
            return redirect()->route('home');
        }

        // Check that the one time password matches the secret.
        $authenticator = app(Authenticator::class)->boot($request);
        $isCorrect = $authenticator->verifyGoogle2FA($secret, $one_time_password);

        if ($isCorrect) {
            // The password matched the secret! Save the secret, and authenticate.
            $user->google2fa_secret = $secret;
            $user->save();
            $user->refresh();
            $authenticator->login();

            $this->rememberDevice($request);

            $recovery_codes_url = '';
            if (WhichPortal::isApplicantPortal()) {
                $recovery_codes_url = route('recovery_codes.show');
            } elseif (WhichPortal::isManagerPortal()) {
                $recovery_codes_url = route('manager.recovery_codes.show');
            } elseif (WhichPortal::isAdminPortal()) {
                $recovery_codes_url = route('admin.recovery_codes.show');
            }

            return redirect($recovery_codes_url);
        } else {
            $activation_url = '';
            if (WhichPortal::isApplicantPortal()) {
                $activation_url = route('two_factor.activate');
            } elseif (WhichPortal::isManagerPortal()) {
                $activation_url = route('manager.two_factor.activate');
            } elseif (WhichPortal::isAdminPortal()) {
                $activation_url = backpack_url('admin.two_factor.activate');
            }

            return redirect($activation_url)
                ->withErrors(['otp' => Lang::get('two_factor.activation_otp_error')]);
        }
    }

    public function redirectToExpected(Request $request)
    {
        $this->rememberDevice($request);
        // Assuming 2fa passes, redirect to the expected url and remove it from session.
        // NOTE: the url.expected is set in app\Http\Middleware\Google2FA.php.
        $expectedUrl = session()->get('url.expected');
        session()->remove('url.expected');

        return redirect($expectedUrl);
    }

    protected function rememberDevice(Request $request)
    {
        $remember = $request->input('remember_device');
        if ($remember) {
            Cookie::queue(
                'remember_device',
                'yes',
                config('google2fa.lifetime')
            );
        }
    }
}
