<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
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
        //Site Under Construction header bar
        View::composer(
            'common/alert', 'App\Http\ViewComposers\AlertComposer'
        );

        //Governement of Canada header bar
        View::composer(
            'common/goc', 'App\Http\ViewComposers\GocComposer'
        );

        //Nav menu
        View::composer(
            '*', 'App\Http\ViewComposers\MenuComposer'
        );

        //Sitewide Footer
        View::composer(
            'common/footer', 'App\Http\ViewComposers\FooterComposer'
        );

        View::composer(
            'applicant/profile/menu', 'App\Http\ViewComposers\ApplicantProfileMenuComposer'
        );

        View::composer(
            ['common/skill', 'common/relatives', 'applicant/job_post/criteria',
            'manager/job_create/criteria'], 'App\Http\ViewComposers\SkillComposer'
        );

        View::composer(
            ['common/reference', 'common/modals/create_reference'], 'App\Http\ViewComposers\ReferenceComposer'
        );

        View::composer(
            ['common/sample', 'common/modals/create_sample'], 'App\Http\ViewComposers\WorkSampleComposer'
        );

        View::composer(
            ['common/relatives','common/reference','common/relatives-projects',
             'common/sample', 'common/skill', 'common/modals/create_reference'],
             'App\Http\ViewComposers\RelativeComposer'
        );

        View::composer(
            'common/lang_menu', 'App\Http\ViewComposers\LangMenuComposer'
        );

        View::composer(
            'applicant/application_post/common/tracker', 'App\Http\ViewComposers\ApplicationTrackerComposer'
        );

        View::composer(
            'common/degree', 'App\Http\ViewComposers\DegreeComposer'
        );

        View::composer(
            'common/course', 'App\Http\ViewComposers\CourseComposer'
        );

        View::composer(
            'common/work', 'App\Http\ViewComposers\WorkExperienceComposer'
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
