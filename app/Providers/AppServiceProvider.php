<?php

namespace App\Providers;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\Resource;
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
        // Prevent resource responses from being wrapped in a top
        // level 'data' key.
        // https://laravel.com/docs/eloquent-resources#data-wrapping.
        JsonResource::withoutWrapping();
        Resource::withoutWrapping();

        // A lower default string length for migrations is required for
        // versions of MySQL < 5.7.7.
        Schema::defaultStringLength(191);

        // Force all routes and requests to use HTTPS.
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
