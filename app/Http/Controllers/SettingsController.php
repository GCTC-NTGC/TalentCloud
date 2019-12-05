<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Applicant;
use App\Models\User;
use App\Services\Validation\Rules\PasswordCorrectRule;
use App\Services\Validation\Rules\PasswordFormatRule;
use Facades\App\Services\WhichPortal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class SettingsController extends Controller
{

    /**
     * Show the form for editing the logged-in User's settings
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @return \Illuminate\Http\Response
     */
    public function editAuthenticated(Request $request)
    {
        return $this->edit($request, $request->user());
    }


    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @param  \App\Models\User    $user Incoming User.
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, User $user)
    {
        $this->authorize('view', $user);
        $this->authorize('update', $user);

        $data = [
            // Localized strings.
            'settings' => Lang::get('common/settings'),
            // Applicant data.
            'user' => $user,
            // Update routes.
            'submit_personal' => route(WhichPortal::prefixRoute('settings.personal.update'), $user),
            'submit_password' => route(WhichPortal::prefixRoute('settings.password.update'), $user),
            'submit_government' => route(WhichPortal::prefixRoute('settings.government.update'), $user),
            'activate_two_factor' => route(WhichPortal::prefixRoute('two_factor.activate')),
            'deactivate_two_factor' => route(WhichPortal::prefixRoute('two_factor.deactivate')),
            'generate_recovery_codes' => route(WhichPortal::prefixRoute('recovery_codes.show'))
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
     * @param  \App\Models\User    $user Incoming User.
     * @return \Illuminate\Http\Response
     */
    public function updatePersonal(Request $request, User $user)
    {
        $validData = $request->validate([
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'email' => [
                'required',
                'email:rfc',
                'max:191',
                // Email may match existing email for this user, must be unique if changed.
                Rule::unique('users', 'email')->ignore($user->id)
            ]
        ]);

        if ($validData) {
            $user->update([
                'first_name' => $validData['first_name'],
                'last_name' => $validData['last_name'],
                'email' => $validData['email'],
            ]);
        }

        return redirect()->route(WhichPortal::prefixRoute('settings.edit'))->withSuccess(Lang::get('success.update_personal'));
    }

    /**
     * Update password.
     *
     * @param  \Illuminate\Http\Request $request   Incoming request.
     * @param  \App\Models\User    $user Incoming User.
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request, User $user)
    {
        $validData = $request->validate([
            'current_password' => ['required', new PasswordCorrectRule],
            'new_password' => ['required', new PasswordFormatRule],
            'new_confirm_password' => ['required', 'same:new_password']
        ]);

        if ($validData) {
            $user->update(['password'=> Hash::make($validData['new_password'])]);
        }

        return redirect()->route(WhichPortal::prefixRoute('settings.edit'))->withSuccess(Lang::get('success.update_password'));
    }

    /**
     * Update government information.
     *
     * @param  \Illuminate\Http\Request $request   Incoming request.
     * @param  \App\Models\User    $user Incoming User.
     * @return \Illuminate\Http\Response
     */
    public function updateGovernment(Request $request, User $user)
    {
        $validData = $request->validate([
            'gov_email' => 'nullable|required_unless:department,0|email:rfc|max:191',
                            Rule::unique('users', 'gov_email')->ignore($user->id)
        ]);

        if ($validData) {
            $user->update(['gov_email' => $validData['gov_email']]);
        }

        return redirect()->route(WhichPortal::prefixRoute('settings.edit'))->withSuccess(Lang::get('success.update_government'));
    }
}
