<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * Class constructor.
     *
     * @throws AuthorizationException Handled by App\Exceptions\Handler.php.
     */
    public function __construct()
    {
        // Only accept logged in Users.
        $this->middleware(function ($request, $next) {
            if ($request->user() === null) {
                throw new AuthorizationException();
            }
            return $next($request);
        });
    }

    /**
     * Return all users as an array
     *
     * @throws AuthorizationException Handled by App\Exceptions\Handler.php.
     *
     * @return mixed
     */
    public function index()
    {
        $users = User::with(['applicant', 'manager', 'hr_advisor'])->get();
        $viewableUsers = $users->filter(function ($user) {
            return Gate::allows('view-user', $user);
        })->values();
        if (empty($viewableUsers)) {
            throw new AuthorizationException();
        }
        return $viewableUsers->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User $user Incoming User.
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $this->authorize('view-user', $user);
        return $user->toJson();
    }
}
