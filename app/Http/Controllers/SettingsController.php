<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Services\Validation\Requests\UpdateSettingsValidator;

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
        return view(
            'common/settings',
            [
                // Localized strings.
                // 'profile' => Lang::get('common/settings'),
                // User data.
                'user' => $user,
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
     * Show the form for editing user settings
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, User $user)
    {
        return view(
            'common/settings',
            [
                // Localized strings.
                // 'profile' => Lang::get('common/settings'),
                // User data.
                'user' => $user,
                // Update route.
                'form_submit_action' => route('settings.update', $user)
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
    public function update(Request $request, User $user)
    {
        $this->user = $user;

        $validator = new UpdateSettingsValidator($user);
        $validator->validate($request->all());

        $input = $request->input();

        $user->fill(
            [
                'first_name' => $input['first_name'],
                'last_name' => $input['last_name'],
                'email' => $input['email_address'], // TODO make changing email harder!
            ]
        );

        if ($input['new_password']) {
            $user->password = Hash::make($input['new_password']);
        }
        $user->save();

        return redirect()->route('settings.edit', $user);
    }
}
