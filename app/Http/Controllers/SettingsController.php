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

        return view(
            'common/settings',
            [
                // Localized strings.
                'settings' => Lang::get('common/settings'),
                // User data.
                'user' => $user
            ]
        );
    }

    /**
     * Update personal information
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function updatePersonal(Request $request, User $user)
    {
        $user = $request->user();

        $validData = $request->validate([
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'email' => [
                'required',
                'string',
                'max:191',
                'email:dns',
                // Email may match existing email for this user, must be unique if changed.
                Rule::unique('users', 'email')->ignore($user->id)
            ]
        ]);

        User::find(auth()->user()->id)->update([
            'first_name' => $validData['first_name'],
            'last_name' => $validData['last_name'],
            'email' => $validData['email'],
        ]);

        return redirect()->route('settings.edit')->withSuccess(Lang::get('success.update_personal'));
    }

    /**
     * Update password.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request, User $user)
    {
        $request->validate([
            'current_password' => ['required', new PasswordCorrectRule],
            'new_password' => ['required', new PasswordFormatRule],
            'new_confirm_password' => ['required', 'same:new_password']
        ]);

        User::find(auth()->user()->id)->update(['password'=> Hash::make($request->new_password)]);

        return redirect()->route('settings.edit')->withSuccess(Lang::get('success.update_password'));
    }

    /**
     * Update government information.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function updateGovernment(Request $request, User $user)
    {
        $validData = $request->validate([
            'gov_email' => 'nullable|required_unless:department,0|email:dns|unique:users|max:191'
        ]);

        User::find(auth()->user()->id)->update(['gov_email' => $validData['gov_email']]);

        return redirect()->route('settings.edit')->withSuccess(Lang::get('success.update_government'));
    }
}
