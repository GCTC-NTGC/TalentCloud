<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\App;
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
        // Site Under Construction header bar.
        View::composer(
            'common/alert',
            'App\Http\ViewComposers\AlertComposer'
        );

        // Pass App locale to all views.
        View::share('appLocale', App::getLocale());

        // Pass User Agent Internet Explorer to all views.
        View::share('is_internet_explorer', detectInternetExplorer());

        // Internet Explorer banner.
        View::composer(
            ['common/h2-ie-banner'],
            'App\Http\ViewComposers\InternetExplorerComposer'
        );

        // Government of Canada header bar.
        View::composer(
            ['common/goc', 'common/header', 'response/header'],
            'App\Http\ViewComposers\GocComposer'
        );

        // Nav menu.
        View::composer(
            ['common/menu', 'response/menu'],
            'App\Http\ViewComposers\MenuComposer'
        );

        // Sitewide Footer.
        View::composer(
            'common/footer',
            'App\Http\ViewComposers\FooterComposer'
        );

        View::composer(
            'applicant/profile/menu',
            'App\Http\ViewComposers\ApplicantProfileMenuComposer'
        );

        View::composer(
            ['common/skill', 'common/relatives', 'applicant/job_post/criteria', 'common/modals/skills_need_help'],
            'App\Http\ViewComposers\SkillComposer'
        );

        View::composer(
            ['common/reference', 'common/modals/create_reference'],
            'App\Http\ViewComposers\ReferenceComposer'
        );

        View::composer(
            ['common/sample', 'common/modals/create_sample'],
            'App\Http\ViewComposers\WorkSampleComposer'
        );

        View::composer(
            [
                'common/relatives', 'common/reference', 'common/relatives-projects',
                'common/sample', 'common/skill', 'common/modals/create_reference'
            ],
            'App\Http\ViewComposers\RelativeComposer'
        );

        View::composer(
            'common/lang_menu',
            'App\Http\ViewComposers\LangMenuComposer'
        );

        View::composer(
            [
                'applicant/application_post/common/tracker',
                'applicant/application_post/common/tracker-ajax',
                'applicant/strategic_response_application/common/tracker',
                'applicant/strategic_response_application/common/tracker-ajax',

            ],
            'App\Http\ViewComposers\ApplicationTrackerComposer'
        );

        View::composer(
            'common/degree',
            'App\Http\ViewComposers\DegreeComposer'
        );

        View::composer(
            'common/course',
            'App\Http\ViewComposers\CourseComposer'
        );

        View::composer(
            'common/work',
            'App\Http\ViewComposers\WorkExperienceComposer'
        );

        View::composer(
            'manager/notification',
            'App\Http\ViewComposers\DemoNotificationComposer'
        );

        View::composer(
            'auth/two_factor',
            'App\Http\ViewComposers\TwoFactorComposer'
        );

        View::composer(
            'auth/one_time_password',
            'App\Http\ViewComposers\OneTimePasswordComposer'
        );

        View::composer(
            'manager/*',
            'App\Http\ViewComposers\ManagerPortalComposer'
        );

        // Breadcrumb composer
        View::composer(
            'common/breadcrumbs',
            'App\Http\ViewComposers\BreadcrumbsComposer'
        );

        View::composer(
            'response/menu',
            'App\Http\ViewComposers\StrategicResponseMenuComposer'
        );

        View::composer(
            'response/beta-banner',
            'App\Http\ViewComposers\StrategicResponseBannerComposer'
        );

        View::composer(
            'applicant/profile/archived',
            'App\Http\ViewComposers\ArchivedComposer'
        );

        View::composer(
            'applicant/profile/updated',
            'App\Http\ViewComposers\UpdatedComposer'
        );
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register(): void
    {
        $this->app->singleton(\App\Http\ViewComposers\CourseComposer::class);
        $this->app->singleton(\App\Http\ViewComposers\DegreeComposer::class);
        $this->app->singleton(\App\Http\ViewComposers\ReferenceComposer::class);
        $this->app->singleton(\App\Http\ViewComposers\SkillComposer::class);
        $this->app->singleton(\App\Http\ViewComposers\WorkSampleComposer::class);
    }
}
