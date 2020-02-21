<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class LangMenuComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $locale = LaravelLocalization::getCurrentLocale();

        switch ($locale) {
            case 'en':
                $linkLocale = 'fr';
                break;
            case 'fr':
                $linkLocale = 'en';
                break;
            default:
                $linkLocale = 'fr';
                break;
        }

        $view->with('lang_menu', Lang::get('common/lang_menu'));
        $view->with('language_link', LaravelLocalization::getLocalizedURL($linkLocale));
    }
}
