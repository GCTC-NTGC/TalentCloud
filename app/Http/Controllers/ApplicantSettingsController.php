<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Applicant;
use App\Services\Validation\Rules\PasswordCorrectRule;
use App\Services\Validation\Rules\PasswordFormatRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ApplicantSettingsController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $user = $request->user();
        $data = [
            // Localized strings.
            'settings' => Lang::get('common/settings'),
            // Applicant data.
            'user' => $user,
            // Update routes.
            'submit_personal' => route('settings.personal.update', $user->applicant),
            'submit_password' => route('settings.password.update', $user->applicant),
            'submit_government' => route('settings.government.update', $user->applicant),
            'activate_two_factor' => route('two_factor.activate'),
            'deactivate_two_factor' => route('two_factor.deactivate'),
            'generate_recovery_codes' => route('recovery_codes.show')
        ];

        return view(
            'common/settings',
            $data
        );
    }

    /**
     * Update personal information
     *
     * @param  \Illuminate\Http\Request $request   Incoming request.
     * @param  \App\Models\Applicant    $applicant Incoming Applicant.
     * @return \Illuminate\Http\Response
     */
    public function updatePersonal(Request $request, Applicant $applicant)
    {
        $validData = $request->validate([
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'email' => [
                'required',
                'email:dns',
                'max:191',
                // Email may match existing email for this user, must be unique if changed.
                Rule::unique('users', 'email')->ignore($applicant->user->id)
            ]
        ]);

        if ($validData) {
            $applicant->user->update([
                'first_name' => $validData['first_name'],
                'last_name' => $validData['last_name'],
                'email' => $validData['email'],
            ]);
        }

        return redirect()->route('settings.edit')->withSuccess(Lang::get('success.update_personal'));
    }

    /**
     * Update password.
     *
     * @param  \Illuminate\Http\Request $request   Incoming request.
     * @param  \App\Models\Applicant    $applicant Incoming Applicant.
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request, Applicant $applicant)
    {
        $validData = $request->validate([
            'current_password' => ['required', new PasswordCorrectRule],
            'new_password' => ['required', new PasswordFormatRule],
            'new_confirm_password' => ['required', 'same:new_password']
        ]);

        if ($validData) {
            $applicant->user->update(['password'=> Hash::make($validData['new_password'])]);
        }

        return redirect()->route('settings.edit')->withSuccess(Lang::get('success.update_password'));
    }

    /**
     * Update government information.
     *
     * @param  \Illuminate\Http\Request $request   Incoming request.
     * @param  \App\Models\Applicant    $applicant Incoming Applicant.
     * @return \Illuminate\Http\Response
     */
    public function updateGovernment(Request $request, Applicant $applicant)
    {
        $validData = $request->validate([
            'gov_email' => 'nullable|required_unless:department,0|email:dns|max:191',
                            Rule::unique('users', 'gov_email')->ignore($applicant->user->id)
        ]);

        if ($validData) {
            $applicant->user->update(['gov_email' => $validData['gov_email']]);
        }

        return redirect()->route('settings.edit')->withSuccess(Lang::get('success.update_government'));
    }
}
