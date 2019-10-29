<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Facades\App\Services\WhichPortal;
use Illuminate\Support\Facades\Session;

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
            'secret' => $secret
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
        $secret = $request->input('secret');
        if (!empty($secret) && empty($user->google2fa_secret)) {
            Session::put('url.secret', $secret);
        }

        return redirect(route('otp'));
    }

    public function saveAndRedirect(Request $request)
    {
        // If user has 2FA setup, and passes OTP validation then return to expected url.
        if (!empty($user->recovery_codes) && !empty($user->google2fa_secret)) {
            $expectedUrl = session()->get('url.expected');
            session()->remove('url.expected');
            return redirect($expectedUrl);
        }

        // Check if secret is empty (first time setting up 2FA). If true then save to user.
        $user = $request->user();
        if (empty($user->google2fa_secret)) {
            $user->google2fa_secret = session()->get('url.secret');
            $user->save();
            $user->refresh();
            session()->remove('url.secret');
        }

        // Send first time 2FA users to receive recovery codes.
        $recovery_codes_url = '';
        if (WhichPortal::isApplicantPortal()) {
            $recovery_codes_url = route('recovery_codes.show');
        } elseif (WhichPortal::isManagerPortal()) {
            $recovery_codes_url = route('manager.recovery_codes.show');
        } elseif (WhichPortal::isAdminPortal()) {
            $recovery_codes_url = route('admin.recovery_codes.show');
        }

         return redirect($recovery_codes_url);
    }
}
