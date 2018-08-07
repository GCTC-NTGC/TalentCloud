<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

use GuzzleHttp\Client;
use Lcobucci\JWT\Token\Parser;
use Lcobucci\JWT\Validation\Validator;
use App\Services\Auth\RequestTokenParser;
use App\Services\Auth\BaseOidcUserProvider;
use App\Services\Auth\OidConnectGuard;
use App\Services\Auth\JSONFetcher;
use App\Services\Auth\Contracts\JSONGetter;
use App\Services\Auth\Contracts\JSONPoster;


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

    public function register() {
        $this->app->singleton(Parser::class, function ($app) {
            return new Parser($app[Decoder::class]);
        });
        
        $this->app->singleton(Validator::class, function ($app) {
            return new Validator();
        });
        
        $this->app->singleton(RequestTokenParser::class, function ($app) {
            return new RequestTokenParser();            
        });
        
        $this->app->singleton(JSONFetcher::class, function ($app) {
            $config = $app['config']['oidconnect']['guzzle'];
            $cl = new Client($config);
            return new JSONFetcher($cl);
        });        
        $this->app->singleton(JSONGetter::class, function ($app) {
            return $app[JSONFetcherAdapter::class];
        });
        $this->app->singleton(JSONPoster::class, function ($app) {
            return $app[JSONFetcherAdapter::class];
        });
        
        $this->app->bind(KeysFetcher::class, function ($app) {
            $config = $app['config']['opidconnect'];
            return new KeysFetcher(
                $app[JSONGetter::class],
                $app['cache.store'],
                $app[Decoder::class],
                $config['keys_url'],
                $config['key_cache_hour_limit']
            );
        });

    }
    
    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot(Parser $parser, 
            Validator $jwtValidator, 
            RequestTokenParser $requestTokenParser)
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
            return new OidConnectGuard($userProvider, $requestTokenParser, 
                    $jwtValidator, $validRoles, $app['request']);
        });
    }
}
