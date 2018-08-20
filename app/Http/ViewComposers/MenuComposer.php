<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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
        $menuItems = Lang::get('common/menu');

        //Check if use is logged in, and remove invalid menu items
        if (Auth::check()) {
            unset($menuItems['login']);
            unset($menuItmes['register']);
            //TODO set profile like using user slug
        } else {
            unset($menuItems['logout']);
            unset($menuItmes['applications']);
            unset($menuItmes['profile']);
        }

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

        $view->with('menu', $menuItems);
    }
}
