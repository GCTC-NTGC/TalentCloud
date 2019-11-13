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
    protected function auth_routes() //phpcs:ignore
    {
        if (WhichPortal::isManagerPortal()) {
            $routes = [
                'home' => route('manager.home'),
                'login' => route('manager.login'),
                'register' => route('manager.register'),
                'password' => [
                    'email' => route('manager.password.email'),
                    'request' => route('manager.password.request'),
                ],
                // 'passwords.reset' => route('manager.password.reset'),
            ];
        } elseif (WhichPortal::isHrPortal()) {
            $routes = [
                'home' => route('hr_advisor.home'),
                'login' => route('hr_advisor.login'),
                'register' => route('hr_advisor.register'),
                'password' => [
                    'email' => route('hr_advisor.password.email'),
                    'request' => route('hr_advisor.password.request'),
                ],
                // 'passwords.reset' => route('hr_advisor.password.reset'),
            ];
        } else {
            $routes = [
                'home' => route('home'),
                'login' => route('login'),
                'register' => route('register'),
                'password' => [
                    'email' => route('password.email'),
                    'request' => route('password.request'),
                ],
                // 'passwords.reset' => route('password.reset'),
            ];
        }
        return $routes;
    }
}
