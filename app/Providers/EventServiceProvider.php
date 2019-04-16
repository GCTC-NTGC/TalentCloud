<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'Illuminate\Auth\Events\Login' => [
            'App\Listeners\LogSuccessfulLogin',
        ],
        'App\Events\UserCreated' => [
            'App\Listeners\LogUserCreated',
        ],
        'App\Events\UserUpdated' => [
            'App\Listeners\CheckUserRole',
            'App\Listeners\LogUserUpdated',
        ],
        'App\Events\JobSaved' => [
            'App\Listeners\JobPublished',
        ],
        'App\Events\ApplicationRetrieved' => [
                'App\Listeners\LogApplicationRetrieved',
        ],
        'App\Events\ApplicationSaved' => [
            'App\Listeners\ApplicationStatusChanged',
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot(): void
    {
        parent::boot();

        //
    }
}
