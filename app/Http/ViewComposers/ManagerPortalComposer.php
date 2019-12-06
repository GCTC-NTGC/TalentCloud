<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;

class ManagerPortalComposer
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
            'show_demo_notification' => $show_demo_notification,
        ]);
    }
}
