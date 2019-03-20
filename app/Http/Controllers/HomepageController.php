<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\Controller;

class HomepageController extends Controller
{
    /**
     * Show the applicant home page
     * @return \Illuminate\View\View
     */
    public function applicant(): \Illuminate\View\View
    {
        return view('applicant/home', [
            'home' => Lang::get('applicant/home'),
            'hero' => Lang::get('common/hero')
        ]);
    }

    /**
     * Show the manager home page
     * @return \Illuminate\View\View
     */
    public function manager(): \Illuminate\View\View
    {
        return view('manager/home', [
            "hero" => [
                "hero_logo" => "/images/logo_tc_colour.png",
                "hero_logo_alt" => Lang::get('manager/home_hero')['logo_alt_text'],
                "hero_tagline" => Lang::get('manager/home_hero')['tagline']
            ]
        ]);
    }
}
