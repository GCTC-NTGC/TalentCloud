<?php

namespace App\Services;

use Illuminate\Support\Facades\Route;

class WhichPortal {

    public function isApplicantPortal() {
        return !$this->isManagerPortal();
    }

    public function isManagerPortal() {
        $routeName = Route::currentRouteName();
        return str_is('manager.*',$routeName);
    }

}
