<?php

namespace App\Providers;

use App\Models\Applicant;
use App\Models\ExperienceAward;
use App\Models\ExperienceCommunity;
use App\Models\ExperienceEducation;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceWork;
use App\Models\JobApplication;
use App\Services\WhichPortal;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\Resource;
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

        // Used in DB for _type column of Polymorphic relationships
        Relation::morphMap([
            'applicant' => Applicant::class,
            'application' => JobApplication::class,
            'experience_work' => ExperienceWork::class,
            'experience_personal' => ExperiencePersonal::class,
            'experience_education' => ExperienceEducation::class,
            'experience_award' => ExperienceAward::class,
            'experience_community' => ExperienceCommunity::class,
        ]);
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
