<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\Controller;

class HomepageController extends Controller {
    /**
     * Show the home page
     * @return \Illuminate\Http\Response
     */
    public function __invoke() {
        return view('applicant/home', [
            'home' => Lang::get('applicant/home'),
            'hero' => Lang::get('common/hero')
        ]);
    }
}