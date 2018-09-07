<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ViewComposerServiceProvider extends ServiceProvider
{
    /**
     * Register bindings in the container.
     *
     * @return void
     */
    public function boot()
    {
        //Site Under Construction header bar
        View::composer(
            'common/alert', 'App\Http\ViewComposers\AlertComposer'
        );

        //Governement of Canada header bar
        View::composer(
            'common/goc', 'App\Http\ViewComposers\GocComposer'
        );

        //Nav menu
        View::composer(
            '*', 'App\Http\ViewComposers\MenuComposer'
        );

        //Sitewide Footer
        View::composer(
            'common/footer', 'App\Http\ViewComposers\FooterComposer'
        );

        View::composer(
            'applicant/profile/menu', 'App\Http\ViewComposers\ApplicantProfileMenuComposer'
        );

        View::composer(
            ['common/skill', 'common/relatives'], 'App\Http\ViewComposers\SkillComposer'
        );


    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
