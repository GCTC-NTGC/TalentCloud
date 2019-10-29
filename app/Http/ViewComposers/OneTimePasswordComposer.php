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
        // Check if user has 2fa setup.
        $user = Auth::user();
        if (!empty($user->recovery_codes) && !empty($user->google2fa_secret)) {
            $has2faSetup = true;
        } else {
            $has2faSetup = false;
        }

        if (WhichPortal::isManagerPortal()) {
            $logout_link = route('manager.logout');
            $deactivate_link = route('two_factor.deactivate');
        } elseif (WhichPortal::isAdminPortal()) {
            $deactivate_link = route('admin.two_factor.deactivate');
            $logout_link = backpack_url('logout');
        } else {
            $deactivate_link = route('two_factor.deactivate');
            $logout_link = route('logout');
        }
        $view->with('otp', Lang::get('one_time_password'))
            ->with([
                'logout_link' => $logout_link,
                'deactivate_link' => $deactivate_link,
                'has2faSetup' => $has2faSetup,
            ]);
    }
}
