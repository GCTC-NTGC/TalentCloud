<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Facades\App\Services\WhichPortal;

class AuthController extends Controller {

    protected function auth_routes() {
        if (WhichPortal::isManagerPortal()) {
            $routes = [
                'login' => route('manager.login'),
                'register' => route('manager.register'),
                'passwords.email' => route('manager.password.email'),
                'passwords.request' => route('manager.password.request'),
                //'passwords.reset' => route('manager.password.reset'),
            ];
        } else {
            $routes = [
                'login' => route('login'),
                'register' => route('register'),
                'passwords.email' => route('password.email'),
                'passwords.request' => route('password.request'),
                //'passwords.reset' => route('password.reset'),
            ];
        }
        return $routes;
    }

}
