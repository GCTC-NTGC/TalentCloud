<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

use App\Services\Auth\BaseOidcUserProvider;
use App\Services\Auth\OidConnectGuard;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::provider('oidconnect', function ($app, array $config) {
            // Return an instance of Illuminate\Contracts\Auth\UserProvider...
            $model = $config['model'];
            $defaultRole = $config['default_role'];
            return new BaseOidcUserProvider($model, $defaultRole);
        });
        
        Auth::extend('oidconnect', function ($app, $name, array $config) {
            // Return an instance of Illuminate\Contracts\Auth\Guard...
            $userProvider = Auth::createUserProvider($config['provider']);
            $validRoles = $config['valid_roles'];
            return new OidConnectGuard($userProvider, $validRoles, $app['request']);
        });
    }
}
