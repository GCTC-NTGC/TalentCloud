<?php

namespace App\Http\ViewComposers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Illuminate\View\View;

use Jenssegers\Date\Date;

class FooterComposer
{
    /**
     * @var string Shown in the footer as the date the site was last modified.
     */
    const DATE_MODIFIED = '2020-03-18';

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('footer', Lang::get('common/footer'))
            ->with('date_modified', humanizeDate(new Date(self::DATE_MODIFIED, Config::get('app.local_timezone'))));
    }
}
