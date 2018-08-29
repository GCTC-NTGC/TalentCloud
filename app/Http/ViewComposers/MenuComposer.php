<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Facades\App\Services\WhichPortal;

class MenuComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        if (WhichPortal::isApplicantPortal()) {
            $menuItems = Lang::get('applicant/menu');

            //Set active on the proper item
            switch(Route::currentRouteName()) {
                case 'home':
                    $menuItems['home']['active'] = true;
                    break;
                case 'jobs.index':
                case 'jobs.show':
                case 'managers.show':
                    $menuItems['jobs']['active'] = true;
                    break;
                case 'applications.index':
                case 'applications.edit':
                case 'applications.edit.1':
                case 'applications.edit.2':
                case 'applications.edit.3':
                case 'applications.edit.4':
                case 'applications.edit.5':
                    $menuItems['applications']['active'] = true;
                    break;
                case 'profile':
                case 'profile.edit':
                case 'profile.show':
                    $menuItems['profile']['active'] = true;
                    break;
                case 'register':
                    $menuItems['register']['active'] = true;
                    break;
                case 'login':
                    $menuItems['login']['active'] = true;
                    break;
                case 'logout':
                    $menuItems['logout']['active'] = true;
                    break;
                default:
                    //No menu item will be active
                    break;
            }

            //Check if use is logged in, and remove invalid menu items
            if (Auth::check()) {
                unset($menuItems['login']);
                unset($menuItems['register']);
                //TODO set profile like using user slug
            } else {
                unset($menuItems['logout']);
                unset($menuItems['applications']);
                unset($menuItems['profile']);
            }
        } else if (WhichPortal::isManagerPortal()) {
            $menuItems = Lang::get('manager/menu');

            //Set active on the proper item
            switch(Route::currentRouteName()) {
                case 'manager.home':
                    $menuItems['home']['active'] = true;
                    break;
                case 'manager.jobs.index':
                case 'manager.jobs.show':
                    $menuItems['jobs']['active'] = true;
                    break;
                case 'manager.jobs.create':
                case 'manager.jobs.edit':
                case 'manager.jobs.update':
                    $menuItems['create_job']['active'] = true;
                    break;
                case 'manager.profile':
                case 'manager.profile.edit':
                case 'manager.profile.show':
                    $menuItems['profile']['active'] = true;
                    break;
                case 'register':
                    $menuItems['register']['active'] = true;
                    break;
                case 'login':
                    $menuItems['login']['active'] = true;
                    break;
                case 'logout':
                    $menuItems['logout']['active'] = true;
                    break;
                default:
                    //No menu item will be active
                    break;
            }

            //Check if use is logged in, and remove invalid menu items
            if (Auth::check()) {
                unset($menuItems['login']);
                unset($menuItems['register']);
                //TODO set profile like using user slug
            } else {
                unset($menuItems['logout']);
                unset($menuItems['jobs']);
                unset($menuItems['create_job']);
                unset($menuItems['profile']);
            }
        }
        if (WhichPortal::isManagerPortal()) {
            $loginModals = [
                'modals' => Lang::get('common/login_modals'),
                'register_link' => route('manager.register'),
                'login_link' => route('manager.login'),
                'logout_link' => route('manager.logout'),
            ];
        } else {
            $loginModals = [
                'modals' => Lang::get('common/login_modals'),
                'register_link' => route('register'),
                'login_link' => route('login'),
                'logout_link' => route('logout'),
            ];
        }

        $view->with('menu', $menuItems)
            ->with('login_modals', $loginModals);
    }
}
