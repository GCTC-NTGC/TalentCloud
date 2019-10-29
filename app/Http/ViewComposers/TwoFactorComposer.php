<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use Facades\App\Services\WhichPortal;

class TwoFactorComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $confirm_url = '';
        if (WhichPortal::isApplicantPortal()) {
            $confirm_url = route('two_factor.confirm');
        } elseif (WhichPortal::isManagerPortal()) {
            $confirm_url = route('manager.two_factor.confirm');
        } elseif (WhichPortal::isAdminPortal()) {
            $confirm_url = route('admin.two_factor.confirm');
        }
        $view->with('two_factor', Lang::get('two_factor'))
            ->with('confirm_url', $confirm_url);
    }
}
