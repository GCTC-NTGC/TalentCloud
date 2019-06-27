<?php

namespace App\Services;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

class WhichPortal
{

    public function isApplicantPortal()
    {
        return !$this->isManagerPortal();
    }

    public function isManagerPortal()
    {
        $url = URL::current();
        return str_is('*/manager/*', $url);
    }
}
