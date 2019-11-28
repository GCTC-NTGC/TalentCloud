<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use App\Services\Validation\Rules\PasswordCorrectRule;
use App\Services\Validation\Rules\PasswordFormatRule;
use Facades\App\Services\WhichPortal;

class SettingsController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, User $user)
    {
        $user = $request->user();
        $routePrefix = $this->getRoutePrefix();

        $data = [
            // Localized strings.
            'settings' => Lang::get('common/settings'),
            // User data.
            'user' => $user,
            // Update routes.
            'submit_personal' => route($routePrefix . 'settings.personal.update'),
            'submit_password' => route($routePrefix . 'settings.password.update'),
            'submit_government' => route($routePrefix . 'settings.government.update'),
            'activate_two_factor' => route($routePrefix . 'two_factor.activate'),
            'deactivate_two_factor' => route($routePrefix . 'two_factor.deactivate'),
            'generate_recovery_codes' => route($routePrefix . 'recovery_codes.show')
        ];

        return view(
            'common/settings',
            $data
        );
    }

    /**
     * Update personal information
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function updatePersonal(Request $request)
    {
        $routePrefix = $this->getRoutePrefix();

        $validData = $request->validate([
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'email' => [
                'required',
                'email:dns',
                'max:191',
                // Email may match existing email for this user, must be unique if changed.
                Rule::unique('users', 'email')->ignore(User::find(auth()->user()->id))
            ]
        ]);

        if ($validData) {
            User::find(auth()->user()->id)->update([
                'first_name' => $validData['first_name'],
                'last_name' => $validData['last_name'],
                'email' => $validData['email'],
            ]);
        }

        return redirect()->route($routePrefix . 'settings.edit')->withSuccess(Lang::get('success.update_personal'));
    }

    /**
     * Update password.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request)
    {
        $routePrefix = $this->getRoutePrefix();

        $validData = $request->validate([
            'current_password' => ['required', new PasswordCorrectRule],
            'new_password' => ['required', new PasswordFormatRule],
            'new_confirm_password' => ['required', 'same:new_password']
        ]);

        if ($validData) {
            User::find(auth()->user()->id)->update(['password'=> Hash::make($validData['new_password'])]);
        }

        return redirect()->route($routePrefix . 'settings.edit')->withSuccess(Lang::get('success.update_password'));
    }

    /**
     * Update government information.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function updateGovernment(Request $request)
    {
        $routePrefix = $this->getRoutePrefix();

        $validData = $request->validate([
            'gov_email' => 'nullable|required_unless:department,0|email:dns|max:191',
                            Rule::unique('users', 'gov_email')->ignore(User::find(auth()->user()->id))
        ]);

        if ($validData) {
            User::find(auth()->user()->id)->update(['gov_email' => $validData['gov_email']]);
        }

        return redirect()->route($routePrefix . 'settings.edit')->withSuccess(Lang::get('success.update_government'));
    }

    /**
     * @return string
     */
    public function getRoutePrefix(): string
    {
        if (WhichPortal::isApplicantPortal()) {
            $routePrefix = '';
        } else {
            $routePrefix = 'manager.';
        }
        return $routePrefix;
    }
}
