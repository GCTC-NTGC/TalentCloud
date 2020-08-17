<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\Api\BadUrlException;
use App\Http\Controllers\Controller;
use App\Http\Resources\User as UserResource;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
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
     * @param Request $request Incoming request object.
     *
     * @throws AuthorizationException Handled by App\Exceptions\Handler.php.
     * @throws BadUrlException Handles unexpected query parameters.
     *
     * @return mixed
     */
    public function index(Request $request)
    {
        $queryParams = $request->query();
        if (array_key_exists('id', $queryParams)) {
            try {
                $ids = $queryParams['id'];
                $ids = explode(',', $ids);
                if ($ids) {
                    array_map(function ($v) {
                        return (int) $v;
                    }, $ids);
                    $users = User::whereIn('id', $ids)->with(['applicant', 'manager', 'hr_advisor'])->get();
                }
            } catch (\Exception $e) {
                throw new BadUrlException();
            }
        } else {
            $users = User::with(['applicant', 'manager', 'hr_advisor'])->get();
        }
        $viewableUsers = $users->filter(function ($user) {
            return Gate::allows('view-user', $user);
        })->values();
        if (empty($viewableUsers)) {
            throw new AuthorizationException();
        }
        return UserResource::collection($viewableUsers);
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
        return new UserResource($user);
    }
}
