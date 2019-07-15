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
        return $this->urlIsManagerPortal($url);
    }

    public function urlIsManagerPortal($url): bool
    {
        $baseUrl = config('app.url');
        $managerPrefix = config('app.manager_prefix');
        $managerPattern = "#^$baseUrl/(\w+/)?$managerPrefix(/.*)?$#";
        return preg_match($managerPattern, $url);
    }
}
