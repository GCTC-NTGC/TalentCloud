<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Lookup\Department;
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
                'breadcrumb_home' => route('home'),
                'applicant_sidebar_active' => 'active',
                'partner_departments' => Department::where('is_partner', true)
                ->orderBy('lft', 'asc')
                ->select('name', 'is_host')
                ->get(),
            ]
        );
    }
}
