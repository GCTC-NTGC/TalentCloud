<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Services\Validation\Requests\UpdateSettingsValidator;
use App\Services\Validation\PersonalInfoValidator;

class SettingsController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, User $user)
    {
        $user = $request->user();

        return view(
            'common/settings',
            [
                // Localized strings.
                'settings' => Lang::get('common/settings'),
                // User data.
                'user' => $user,
                // Update route.
                'form_submit_action_personal' => route('settings.updatePersonal', $user),
                'form_submit_action_password' => route('settings.updatePassword', $user),
                // 'form_submit_action_goc' => route('settings.update', $user)
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request, User $user)
    {
        $validator = new UpdateSettingsValidator($user);
        $validator->validate($request->all());
        $input = $request->input();

        if ($input['new_password']) {
            $user->password = Hash::make($input['new_password']);
        }
        $user->save();

        return redirect()->route('settings.show', $user);
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
        $validator = new PersonalInfoValidator($user);
        $validator->validate($request->all());
        $input = $request->input();

        $user->fill(
            [
                'first_name' => $input['first_name'],
                'last_name' => $input['last_name'],
                'email' => $input['email_address'], // TODO make changing email harder!
            ]
        );

        $user->save();

        return redirect()->route('settings.show', $user);
    }
}
