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
        $profileMenu = [
            "about" => [
                "active" => false,
                "link" => route('profile.about.edit', $view->getData()['applicant']),
                "title" => "Go to the About Me section of your profile.",
                "label" => "About Me"
            ],
            "experience" => [
                "active" => false,
                "link" => route('profile.experience.edit', $view->getData()['applicant']),
                "title" => "Go to the Experience section of your profile.",
                "label" => "My Experience"
            ],
            "skills" => [
                "active" => false,
                "link" => "/profile/skills",
                "title" => "Go to the Skills section of your profile.",
                "label" => "My Skills"
            ],
            "references" => [
                "active" => false,
                "link" => "/profile/references",
                "title" => "Go to the References section of your profile.",
                "label" => "My References"
            ],
            "portfolio" => [
                "active" => false,
                "link" => "/profile/portfolio",
                "title" => "Go to the Portfolio section of your profile.",
                "label" => "My Portfolio"
            ]
        ];

        //Set active on the proper item
        switch(Route::currentRouteName()) {
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
            case('profile.skills.update'):
                $profileMenu['skills']['active'] = true;
                break;
            case('profile.references'):
            case('profile.references.edit'):
            case('profile.references.update'):
                $profileMenu['references']['active'] = true;
                break;
            case('profile.portfolio'):
            case('profile.portfolio.edit'):
            case('profile.portfolio.update'):
                $profileMenu['portfolio']['active'] = true;
                break;
            default:
                //No active menu item
                break;
        }

        $view->with('profile_menu', $profileMenu);
    }
}
