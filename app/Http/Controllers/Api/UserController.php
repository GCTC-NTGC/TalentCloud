<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Return all users as an array
     *
     * @return mixed
     */
    public function index()
    {
        $users = User::with(['applicant', 'manager'])->get();
        return $users->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User $user Incoming User.
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $user->toJson();
    }
}
