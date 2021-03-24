<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class ApplicantProfileMenuComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $profileMenu = Lang::get('applicant/applicant_profile_menu');

        $profileMenu['items']['about']['link'] = route('profile.about.edit', $view->getData()['applicant']);
        $profileMenu['items']['experience']['link'] = route('profile.experience.edit', $view->getData()['applicant']);
        $profileMenu['items']['skills']['link'] = route('profile.skills.edit', $view->getData()['applicant']);
        $profileMenu['items']['skills-old']['link'] = route('profile.skills-old.edit', $view->getData()['applicant']);
        $profileMenu['items']['references']['link'] = route('profile.references.edit', $view->getData()['applicant']);
        $profileMenu['items']['portfolio']['link'] = route('profile.work_samples.edit', $view->getData()['applicant']);

        // Set archive variable to group sidebar
        $profileMenu['items']['about']['archive'] = true;
        $profileMenu['items']['experience']['archive'] = false;
        $profileMenu['items']['skills-old']['archive'] = true;
        $profileMenu['items']['references']['archive'] = true;
        $profileMenu['items']['portfolio']['archive'] = true;

        // Set active on the proper item
        switch (Route::currentRouteName()) {
            case ('profile.about'):
            case ('profile.about.edit'):
                $profileMenu['items']['about']['active'] = true;
                break;
            case ('profile.experience'):
            case ('profile.experience.edit'):
                $profileMenu['items']['experience']['active'] = true;
                break;
            case ('profile.skills'):
            case ('profile.skills.edit'):
                $profileMenu['items']['skills']['active'] = true;
                break;
            case ('profile.skills-old'):
            case ('profile.skills-old.edit'):
                $profileMenu['items']['skills-old']['active'] = true;
                break;
            case ('profile.references'):
            case ('profile.references.edit'):
                $profileMenu['items']['references']['active'] = true;
                break;
            case ('profile.portfolio'):
            case ('profile.work_samples.edit'):
                $profileMenu['items']['portfolio']['active'] = true;
                break;
            default:
                // No active menu item
                break;
        }

        $view->with('profile_menu', $profileMenu);
    }
}
