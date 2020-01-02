<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;

class DemoNotificationComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $show_demo_notification = Auth::user() !== null && Auth::user()->isDemoManager();
        $view->with([
            'notification' => Lang::get('manager/notification'),
            'show_demo_notification' => $show_demo_notification,
        ]);
    }
}
