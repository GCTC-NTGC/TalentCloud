<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\Services\WhichPortal;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // A lower default string length for migrations is required for
        // versions of MySQL < 5.7.7
        Schema::defaultStringLength(191);

        //Force all routes and requests to use HTTPS
        $this->app['request']->server->set('HTTPS', config('app.force_https'));
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        /* Browser testing

        if ($this->app->environment() !== 'production') {
            $this->app->register(\Laravel\Dusk\DuskServiceProvider::class);
        } */

        $this->app->singleton(WhichPortal::class, function ($app) {
            return new WhichPortal();
        });
    }
}
