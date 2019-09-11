<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;

use Jenssegers\Date\Date;

class FooterComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('footer', Lang::get('common/footer'))
            ->with('date_modified', humanizeDate(new Date('2019-09-12', Config::get('app.local_timezone'))));
    }
}
