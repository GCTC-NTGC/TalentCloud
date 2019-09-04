<?php

namespace App\Services;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

class WhichPortal
{

    public function isApplicantPortal()
    {
        return !$this->isManagerPortal() && !$this->isAdminPortal();
    }

    public function isManagerPortal()
    {
        $url = URL::current();
        return $this->urlIsManagerPortal($url);
    }

    public function isAdminPortal()
    {
        $url = URL::current();
        return $this->urlIsAdminPortal($url);
    }

    public function urlIsManagerPortal($url): bool
    {
        $baseUrl = config('app.url');
        $managerPrefix = config('app.manager_prefix');
        $managerPattern = "#^$baseUrl/(\w+/)?$managerPrefix(/.*)?$#";
        return preg_match($managerPattern, $url);
    }

    public function urlIsAdminPortal($url): bool
    {
        $baseUrl = config('app.url');
        $adminPrefix = 'admin';
        $adminPattern = "#^$baseUrl/(\w+/)?$adminPrefix(/.*)?$#";
        return preg_match($adminPattern, $url);
    }
}
