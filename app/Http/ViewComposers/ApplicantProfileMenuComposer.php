<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;

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
            "00" => [
                "active" => true,
                "link" => route('profile.about.edit', Auth::user()->applicant),
                "title" => "Go to the About Me section of your profile.",
                "label" => "About Me"
            ],
            "01" => [
                "active" => false,
                "link" => "/profile/experience",
                "title" => "Go to the Experience section of your profile.",
                "label" => "My Experience"
            ],
            "02" => [
                "active" => false,
                "link" => "/profile/skills",
                "title" => "Go to the Skills section of your profile.",
                "label" => "My Skills"
            ],
            "03" => [
                "active" => false,
                "link" => "/profile/references",
                "title" => "Go to the References section of your profile.",
                "label" => "My References"
            ],
            "04" => [
                "active" => false,
                "link" => "/profile/portfolio",
                "title" => "Go to the Portfolio section of your profile.",
                "label" => "My Portfolio"
            ]
        ];

        $view->with('profile_menu', $profileMenu);
    }
}
