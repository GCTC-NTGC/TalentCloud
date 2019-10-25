<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Facades\App\Services\WhichPortal;

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

        return redirect()->back();
    }

    public function confirm(Request $request)
    {
        $user = $request->user();
        $secret = $request->input('secret');
        if (!empty($secret) && empty($user->google2fa_secret)) {
            $user->google2fa_secret = $secret;
            $user->save();
            $user->refresh();
        }

        return redirect(route('otp'));
    }

    public function otp(Request $request)
    {
        $user = $request->user();
        if (!empty($user->recovery_codes) && !empty($user->google2fa_secret)) {
            $expectedUrl = session()->get('url.expected');
            session()->remove('url.expected');
            return redirect($expectedUrl);
        }

        $recovery_codes_url = '';
        if (WhichPortal::isApplicantPortal()) {
            $recovery_codes_url = route('recovery_codes.show');
        } elseif (WhichPortal::isManagerPortal()) {
            // TODO: add Manager specific route
            $recovery_codes_url = route('recovery_codes.show');
        } elseif (WhichPortal::isAdminPortal()) {
            $recovery_codes_url = route('admin.recovery_codes.show');
        }

         return redirect($recovery_codes_url);
    }
}
