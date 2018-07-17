<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ComposerServiceProvider extends ServiceProvider
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
            '*', 'App\Http\ViewComposers\AlertComposer'
        );
        
        //Governement of Canada header bar
        View::composer(
            '*', 'App\Http\ViewComposers\GocComposer'
        );
        
        //Sitewide Footer
        View::composer(
            '*', 'App\Http\ViewComposers\FooterComposer'
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