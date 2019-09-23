<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Lang;

class FaqController extends Controller
{
    /**
     * Show the FAQ page.
     *
     * @return View
     */
    public function __invoke()
    {
        return view(
            'applicant/static_faq',
            [
                'faq' => Lang::get('applicant/faq'),
                'breadcrumb_home' => route('home')
            ]
        );
    }
}
