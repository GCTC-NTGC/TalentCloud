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
            $menu = Lang::get('applicant/menu');

            // Set active on the proper item
            switch (Route::currentRouteName()) {
                case 'home':
                    $menu['items']['home']['active'] = true;
                    break;
                case 'jobs.index':
                case 'jobs.show':
                case 'managers.show':
                    $menu['items']['jobs']['active'] = true;
                    break;
                case 'applications.index':
                case 'applications.edit':
                case 'applications.edit.1':
                case 'applications.edit.2':
                case 'applications.edit.3':
                case 'applications.edit.4':
                case 'applications.edit.5':
                case 'job.application.edit.1':
                case 'job.application.edit.2':
                case 'job.application.edit.3':
                case 'job.application.edit.4':
                case 'job.application.edit.5':
                case 'job.application.complete':
                    $menu['items']['applications']['active'] = true;
                    break;
                case 'profile':
                case 'profile.edit':
                case 'profile.show':
                case 'profile.about.edit':
                case 'profile.about.show':
                case 'profile.experience.edit':
                case 'profile.experience.show':
                case 'profile.references.edit':
                case 'profile.references.show':
                case 'profile.skills.edit':
                case 'profile.skills.show':
                case 'profile.work_samples.edit':
                case 'profile.work_samples.show':
                    $menu['items']['profile']['active'] = true;
                    break;
                case 'register':
                    $menu['items']['register']['active'] = true;
                    break;
                case 'login':
                    $menu['items']['login']['active'] = true;
                    break;
                case 'logout':
                    $menu['items']['logout']['active'] = true;
                    break;
                case 'faq':
                    $menu['items']['faq']['active'] = true;
                    break;
                case 'itp':
                    $menu['items']['itp']['active'] = true;
                    break;
                default:
                    // No menu item will be active
                    break;
            }

            // Set route links
            $menu['items']['home']['link'] = route('home');
            $menu['items']['jobs']['link'] = route('jobs.index');
            $menu['items']['applications']['link'] = route('applications.index');
            $menu['items']['profile']['link'] = route('profile');
            $menu['items']['faq']['link'] = route('faq');
            $menu['items']['itp']['link'] = route('itp');

            // Check if use is logged in, and remove invalid menu items
            if (Auth::check()) {
                unset($menu['items']['login']);
                unset($menu['items']['register']);
                // TODO set profile like using user slug
            } else {
                unset($menu['items']['logout']);
                unset($menu['items']['applications']);
                unset($menu['items']['profile']);
            }
        } elseif (WhichPortal::isManagerPortal()) {
            $menu = Lang::get('manager/menu');

            // Set active on the proper item
            switch (Route::currentRouteName()) {
                case 'manager.home':
                    $menu['items']['home']['active'] = true;
                    break;
                case 'manager.jobs.index':
                case 'manager.jobs.show':
                case 'manager.jobs.applications':
                case 'manager.jobs.review':
                case 'manager.applications.show':
                case 'manager.applicants.show':
                    $menu['items']['jobs']['active'] = true;
                    break;
                case 'manager.jobs.create':
                case 'manager.jobs.edit':
                case 'admin.jobs.update':
                    // $menu['items']['create_job']['active'] = true;
                    $menu['items']['jobs']['active'] = true; // TODO: restore when job poster builder complete
                    break;
                case 'manager.profile':
                case 'manager.profile.edit':
                case 'manager.profile.show':
                    $menu['items']['profile']['active'] = true;
                    break;
                case 'register':
                    $menu['items']['register']['active'] = true;
                    break;
                case 'login':
                    $menu['items']['login']['active'] = true;
                    break;
                case 'logout':
                    $menu['items']['logout']['active'] = true;
                    break;
                case 'faq':
                    $menu['items']['faq']['active'] = true;
                    break;
                default:
                    // No menu item will be active
                    break;
            }

            // Set route links
            $menu['items']['home']['link'] = route('manager.home');
            $menu['items']['jobs']['link'] = route('manager.jobs.index');
            // TODO: restore when job poster builder complete
            // $menu['items']['create_job']['link'] = route('manager.jobs.create');
            $menu['items']['profile']['link'] = route('manager.profile');

            // Check if use is logged in, and remove invalid menu items
            if (Auth::check()) {
                unset($menu['items']['login']);
                unset($menu['items']['register']);
                // TODO set profile like using user slug
            } else {
                unset($menu['items']['logout']);
                unset($menu['items']['jobs']);
                unset($menu['items']['create_job']);
                unset($menu['items']['profile']);
            }
        } elseif (WhichPortal::isAdminPortal()) {
            // Use the manager menu, keeping only
            $menu = Lang::get('admin/menu');


            // Set active on the proper item
            switch (Route::currentRouteName()) {
                case 'admin.home':
                    $menu['items']['home']['active'] = true;
                    break;
                default:
                    // No menu item will be active
                    break;
            }

            // Set route links
            $menu['items']['home']['link'] = backpack_url();

            // Check if use is logged in, and remove invalid menu items
            if (Auth::check()) {
                unset($menu['items']['login']);
                unset($menu['items']['register']);
                // TODO set profile like using user slug
            } else {
                unset($menu['items']['logout']);
            }
        }
        // Set login modals data
        if (WhichPortal::isManagerPortal()) {
            $loginModals = [
                'modals' => Lang::get('common/login_modals'),
                'register_link' => route('manager.register'),
                'login_link' => route('manager.login'),
                'logout_link' => route('manager.logout'),
            ];
        } elseif (WhichPortal::isAdminPortal()) {
             $loginModals = [
                'modals' => Lang::get('common/login_modals'),
                'register_link' => route('register'),
                'login_link' => backpack_url('login'),
                'logout_link' => backpack_url('logout'),
             ];
        } else {
            $loginModals = [
                'modals' => Lang::get('common/login_modals'),
                'register_link' => route('register'),
                'login_link' => route('login'),
                'logout_link' => route('logout'),
            ];
        }

        $view->with('menu', $menu)
            ->with('login_modals', $loginModals);
    }
}
