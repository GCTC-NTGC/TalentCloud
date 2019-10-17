<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;

use App\Models\Applicant;

class TwoFactorController extends AuthController
{
    public function activate(Applicant $applicant)
    {
        $google2fa = app('pragmarx.google2fa');
        $secret = $google2fa->generateSecretKey();
        $qrImage = $google2fa->getQRCodeInline(
            config('app.name'),
            $applicant->user->email,
            $secret
        );

        return view('auth.two_factor', [
            'applicant' => $applicant,
            'qr_image' => $qrImage,
            'secret' => $secret
        ]);
    }

    public function confirm(Request $request, Applicant $applicant)
    {
        $secret = $request->input('secret');
        if (!empty($secret) && empty($applicant->user->google2fa_secret)) {
            $applicant->user->google2fa_secret = $secret;
            $applicant->user->save();
            $applicant->user->refresh();
        }

        return redirect(route('recovery_codes.show'));
    }
}
