<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

use GuzzleHttp\Client;
use Lcobucci\JWT\Parsing\Decoder;
use Lcobucci\JWT\Parser;
use App\Services\Auth\Contracts\JSONGetter;
use App\Services\Auth\Contracts\JSONPoster;
use App\Services\Auth\Contracts\TokenRefresher;
use App\Services\Auth\Contracts\TokenStorage;
use App\Services\Auth\RequestTokenParser;
use App\Services\Auth\BaseOidcUserProvider;
use App\Services\Auth\OidConnectGuard;
use App\Services\Auth\JSONFetcher;
use App\Services\Auth\JwtKeysFetcher;
use App\Services\Auth\JwtValidator;
use App\Services\Auth\JumboJettTokenRefresher;
use App\Services\Auth\SessionTokenStorage;
use App\Models\Applicant;
use App\Models\Manager;
use App\Models\JobPoster;
use App\Models\JobApplication;
use App\Policies\JobPolicy;
use App\Policies\ManagerPolicy;
use App\Policies\ApplicantPolicy;
use App\Policies\ApplicationPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Applicant::class => ApplicantPolicy::class,
        Manager::class => ManagerPolicy::class,
        JobPoster::class => JobPolicy::class,
        JobApplication::class => ApplicationPolicy::class,
    ];

    public function register() {
        $this->app->singleton(Parser::class, function ($app) {
            return new Parser();
        });

        $this->app->singleton(Decoder::class, function ($app) {
            return new Decoder();
        });

        $this->app->singleton(RequestTokenParser::class, function ($app) {
            return new RequestTokenParser($app[Parser::class]);
        });

        $this->app->singleton(JSONFetcher::class, function ($app) {
            $config = $app['config']['oidconnect']['guzzle'];
            $cl = new Client($config);
            return new JSONFetcher($cl);
        });
        $this->app->bind(JSONGetter::class, JSONFetcher::class);
        $this->app->bind(JSONPoster::class, JSONFetcher::class);

        $this->app->singleton(JwtKeysFetcher::class, function ($app) {
            $config = $app['config']['oidconnect'];
            return new JwtKeysFetcher(
                $app[JSONGetter::class],
                $app['cache.store'],
                $app[Decoder::class],
                $config['keys_url'],
                $config['key_cache_hour_limit']
            );
        });

        $this->app->singleton(JwtValidator::class, function ($app) {
            $config = $app['config']['oidconnect'];
            return new JwtValidator(
                    $app[JwtKeysFetcher::class],
                    [$config['iss'] => $config['client_id']]
            );
        });

        $this->app->singleton(SessionTokenStorage::class, function ($app) {
            return new SessionTokenStorage();
        });
        $this->app->bind(TokenStorage::class, SessionTokenStorage::class);

        $this->app->singleton(JumboJettTokenRefresher::class, function ($app) {
            $config = $app['config']['oidconnect'];
            return new JumboJettTokenRefresher(
                    $app[TokenStorage::class],
                    $app[Parser::class],
                    $config['auth_url'],
                    $config['client_id'],
                    $config['client_secret']
            );
        });
        $this->app->bind(TokenRefresher::class, JumboJettTokenRefresher::class);

        $this->app->bind(BaseOidcUserProvider::class, function ($app) {
            $config = $app['config']['auth']['providers']['oidc_make_applicant'];
            $model = $config['model'];
            $defaultRole = $config['default_role'];
            return new BaseOidcUserProvider($model, $defaultRole);
        });

    }

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
            return new OidConnectGuard(
                    $userProvider,
                    $app[RequestTokenParser::class],
                    $app[JwtValidator::class],
                    $app[TokenRefresher::class],
                    $app['request']);
        });
    }
}
