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

        $profileMenu['about']['link'] = route('profile.about.edit', $view->getData()['applicant']);
        $profileMenu['experience']['link'] = route('profile.experience.edit', $view->getData()['applicant']);
        $profileMenu['skills']['link'] = route('profile.skills.edit', $view->getData()['applicant']);
        $profileMenu['references']['link'] = route('profile.references.edit', $view->getData()['applicant']);
        $profileMenu['portfolio']['link'] = route('profile.work_samples.edit', $view->getData()['applicant']);

        //Set active on the proper item
        switch (Route::currentRouteName()) {
            case('profile.about'):
            case('profile.about.edit'):
            case('profile.about.update'):
                $profileMenu['about']['active'] = true;
                break;
            case('profile.experience'):
            case('profile.experience.edit'):
            case('profile.experience.update'):
                $profileMenu['experience']['active'] = true;
                break;
            case('profile.skills'):
            case('profile.skills.edit'):
                $profileMenu['skills']['active'] = true;
                break;
            case('profile.references'):
            case('profile.references.edit'):
                $profileMenu['references']['active'] = true;
                break;
            case('profile.portfolio'):
            case('profile.work_samples.edit'):
                $profileMenu['portfolio']['active'] = true;
                break;
            default:
                //No active menu item
                break;
        }

        $view->with('profile_menu', $profileMenu);
    }
}
