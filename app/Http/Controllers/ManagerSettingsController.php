<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Manager;
use App\Services\Validation\Rules\PasswordCorrectRule;
use App\Services\Validation\Rules\PasswordFormatRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ManagerSettingsController extends Controller
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
            // Manager data.
            'user' => $user,
            // Update routes.
            'submit_personal' => route('manager.settings.personal.update', $user->manager),
            'submit_password' => route('manager.settings.password.update', $user->manager),
            'submit_government' => route('manager.settings.government.update', $user->manager),
            'activate_two_factor' => route('manager.two_factor.activate'),
            'deactivate_two_factor' => route('manager.two_factor.deactivate'),
            'generate_recovery_codes' => route('manager.recovery_codes.show')
        ];

        return view(
            'common/settings',
            $data
        );
    }

    /**
     * Update personal information
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @param  \App\Models\Manager      $manager Incoming Manager.
     * @return \Illuminate\Http\Response
     */
    public function updatePersonal(Request $request, Manager $manager)
    {
        $validData = $request->validate([
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'email' => [
                'required',
                'email:dns',
                'max:191',
                // Email may match existing email for this user, must be unique if changed.
                Rule::unique('users', 'email')->ignore($manager->user->id)
            ]
        ]);

        if ($validData) {
            $manager->user->update([
                'first_name' => $validData['first_name'],
                'last_name' => $validData['last_name'],
                'email' => $validData['email'],
            ]);
        }

        return redirect()->route('manager.settings.edit')->withSuccess(Lang::get('success.update_personal'));
    }

    /**
     * Update password.
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @param  \App\Models\Manager      $manager Incoming Manager.
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request, Manager $manager)
    {
        $validData = $request->validate([
            'current_password' => ['required', new PasswordCorrectRule],
            'new_password' => ['required', new PasswordFormatRule],
            'new_confirm_password' => ['required', 'same:new_password']
        ]);

        if ($validData) {
            $manager->user->update(['password'=> Hash::make($validData['new_password'])]);
        }

        return redirect()->route('manager.settings.edit')->withSuccess(Lang::get('success.update_password'));
    }

    /**
     * Update government information.
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @param  \App\Models\Manager      $manager Incoming Manager.
     * @return \Illuminate\Http\Response
     */
    public function updateGovernment(Request $request, Manager $manager)
    {
        $validData = $request->validate([
            'gov_email' => 'nullable|required_unless:department,0|email:dns|max:191',
                            Rule::unique('users', 'gov_email')->ignore($manager->user->id)
        ]);

        if ($validData) {
            $manager->user->update(['gov_email' => $validData['gov_email']]);
        }

        return redirect()->route('manager.settings.edit')->withSuccess(Lang::get('success.update_government'));
    }
}
