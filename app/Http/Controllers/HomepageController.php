<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\Controller;

class HomepageController extends Controller
{
    /**
     * Show the applicant home page.
     * @return \Illuminate\Http\Response
     */
    public function applicant()
    {
        return view('applicant/home', [
            'home' => Lang::get('applicant/home'),
            'hero' => Lang::get('common/hero')
        ]);
    }

    /**
     * Show the manager home page.
     * @return \Illuminate\Http\Response
     */
    public function manager()
    {
        return view('manager/home', [
            'home_l10n' => Lang::get('manager/home'),
        ]);
    }
}
