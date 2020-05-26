<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;

use Jenssegers\Date\Date;

class FooterComposer
{
    /**
     * @var string Shown in the footer as the date the site was last modified.
     */
    const DATE_MODIFIED = '2020-02-03';

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $tos_url = route('tos');
        $privacy_url = route('privacy');
        $logo_image_url = asset('/images/logo_canada_colour.png');
        $data = array_merge(Lang::get('common/footer'), [
            'tos_url' => $tos_url,
            'privacy_url' => $privacy_url,
            'logo_image_url' =>  $logo_image_url,
        ]);
        $view->with('footer', $data)
            ->with('date_modified', humanizeDate(new Date(self::DATE_MODIFIED, Config::get('app.local_timezone'))));
    }
}
