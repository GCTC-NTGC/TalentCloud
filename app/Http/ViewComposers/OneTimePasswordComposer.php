<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use Facades\App\Services\WhichPortal;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OneTimePasswordComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        if (WhichPortal::isManagerPortal()) {
            $logout_link = route('manager.logout');
        } elseif (WhichPortal::isAdminPortal()) {
            $logout_link = backpack_url('logout');
        } else {
            $logout_link = route('logout');
        }
        $view->with('otp', Lang::get('one_time_password'))
            ->with([
                'logout_link' => $logout_link,
            ]);
    }
}
