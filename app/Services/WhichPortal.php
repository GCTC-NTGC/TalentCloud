<?php

namespace App\Services;

use Illuminate\Support\Facades\URL;

class WhichPortal
{

    public function home()
    {
        if ($this->isAdminPortal()) {
            return 'admin';
        } elseif ($this->isManagerPortal()) {
            return route('manager.home');
        }
        return route('home');
    }

    public function isApplicantPortal()
    {
        return !$this->isManagerPortal() && !$this->isHrPortal() && !$this->isAdminPortal();
    }

    public function isManagerPortal()
    {
        $url = URL::current();
        return $this->urlIsManagerPortal($url);
    }

    public function isHrPortal()
    {
        $url = URL::current();
        return $this->urlIsHrPortal($url);
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

    public function urlIsHrPortal($url): bool
    {
        $baseUrl = config('app.url');
        $hrPrefix = config('app.hr_prefix');
        $hrPattern = "#^$baseUrl/(\w+/)?$hrPrefix(/.*)?$#";
        return preg_match($hrPattern, $url);
    }

    public function urlIsAdminPortal($url): bool
    {
        $baseUrl = config('app.url');
        $adminPrefix = config('backpack.base.route_prefix', 'admin');
        $adminPattern = "#^$baseUrl/(\w+/)?$adminPrefix(/.*)?$#";
        return preg_match($adminPattern, $url);
    }

    public function prefixRoute($routeName): string
    {
        if (WhichPortal::isApplicantPortal()) {
            return $routeName;
        } elseif (WhichPortal::isManagerPortal()) {
            return 'manager.' . $routeName;
        } elseif (WhichPortal::isAdminPortal()) {
            return 'admin.' . $routeName;
        }
        return $routeName;
    }
}
