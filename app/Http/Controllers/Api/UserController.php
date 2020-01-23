<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * @var Response
     */
    protected $unauthorized;

    /**
     * Class constructor
     */
    public function __construct()
    {
        $this->unauthorized = response()->json(['status' => 'unauthorized'], 403);

        // Only accept logged in Users.
        $this->middleware(function ($request, $next) {
            if ($request->user() === null) {
                return $this->unauthorized;
            }
            return $next($request);
        });
    }

    /**
     * Return all users as an array
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
            return $this->unauthorized;
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
        if (Gate::allows('view-user', $user)) {
            return $user->toJson();
        }
        return $this->unauthorized;
    }
}
