<?php

namespace App\Services;

use Illuminate\Support\Facades\Route;

class WhichPortal {

    public function isApplicantPortal() : bool {
        return !$this->isManagerPortal();
    }

    public function isManagerPortal() : bool {
        $routeName = Route::currentRouteName();
        return str_is('manager.*',$routeName);
    }

}
