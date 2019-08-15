<?php

namespace App\Providers;

use App\Services\WhichPortal;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

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
        $this->app->singleton(WhichPortal::class, function ($app) {
            return new WhichPortal();
        });
    }
}
