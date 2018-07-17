<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Route;

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
        
        //if logged in
        //  remove login item
        //  remove register item
        //  set profile link using user slug
        //else
        //  remove applications
        //  remove profile
        //  remove logout        
        //  add redirect url parameter to register link  
        
        //Set active on the proper item
        switch(Route::currentRouteName()) {
            case 'home':
                $menuItems['home']['active'] = true;
                break;
            case 'jobs':
                $menuItems['browse']['active'] = true;
                break;
            case 'applications':
                $menuItems['applications']['active'] = true;
                break;
            case 'profile':
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