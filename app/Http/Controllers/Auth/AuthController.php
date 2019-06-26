<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Facades\App\Services\WhichPortal;

class AuthController extends Controller
{
    /**
     * Sets the route namespace based on the logged in user.
     *
     * @return mixed[]
     */
    protected function auth_routes()
    {
        if (WhichPortal::isManagerPortal()) {
            $routes = [
                'login' => route('manager.login'),
                'register' => route('manager.register'),
                'password' => [
                    'email' => route('manager.password.email'),
                    'request' => route('manager.password.request'),
                ],
                //'passwords.reset' => route('manager.password.reset'),
            ];
        } else {
            $routes = [
                'login' => route('login'),
                'register' => route('register'),
                'password' => [
                    'email' => route('password.email'),
                    'request' => route('password.request'),
                ],
                //'passwords.reset' => route('password.reset'),
            ];
        }
        return $routes;
    }
}
