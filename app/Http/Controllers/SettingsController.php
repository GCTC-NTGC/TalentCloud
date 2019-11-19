<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
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
     * Show the form for editing the logged-in user's settings
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function editAuthenticated(Request $request)
    {
        $user = $request->user();
        return redirect(route('settings.edit', $user));
    }

    /**
     * Update personal information
     *
     * @param    \Illuminate\Http\Request $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function updatePersonal(Request $request, User $user)
    {
        $user = $request->user();

        $validData = $request->validate([
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'email_address' => [
                'required',
                'string',
                'max:191',
                // 'email',
                // Email may match existing email for this user, must be unique if changed.
                Rule::unique('users', 'email')->ignore($user->id)
            ],
        ]);

        User::find(auth()->user()->id)->update([
            'first_name' => $validData['first_name'],
            'last_name' => $validData['last_name'],
            'email' => $validData['email_address'],
        ]);

        // dd('Update personal information successful.');
        return redirect()->route('settings.edit');
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
            'new_confirm_password' => ['same:new_password'],
        ]);

        User::find(auth()->user()->id)->update(['password'=> Hash::make($request->new_password)]);

        // dd('Update password successful.');
        return redirect()->route('settings.edit');
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
            'gov_email' => 'nullable|required_unless:department,0|string|email|unique:users'
        ]);

        User::find(auth()->user()->id)->update(['gov_email' => $validData['gov_email']]);

        // dd('Update government information successful.');
        return redirect()->route('settings.edit');
    }
}
