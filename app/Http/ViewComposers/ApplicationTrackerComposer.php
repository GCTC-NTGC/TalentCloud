<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use App\Models\JobApplication;

class ApplicationTrackerComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $app_tracker = Lang::get('applicant/application_tracker');


        $app_tracker['items']['basics']['url'] = route('job.application.edit.1', $view->getData()['job']);
        $app_tracker['items']['experience']['url'] = route('job.application.edit.2', $view->getData()['job']);
        $app_tracker['items']['essential_skills']['url'] = route('job.application.edit.3', $view->getData()['job']);
        $app_tracker['items']['asset_skills']['url'] = route('job.application.edit.4', $view->getData()['job']);
        $app_tracker['items']['preview']['url'] = route('job.application.edit.5', $view->getData()['job']);
        $app_tracker['items']['confirm']['url'] = route('job.application.edit.6', $view->getData()['job']);

        // TODO: all these checks shouldn't be neccessary when controllers are properly set up
        if (isset($view->getData()['job_application'])) {
            $job_application = $view->getData()['job_application'];
            if ($job_application != null && $job_application instanceof JobApplication) {
                foreach ($app_tracker['items'] as $key => $value) {
                    $app_tracker['items'][$key]['status'] = $job_application->getSectionStatus($key);
                }
            }
        }
        $view->with('application_tracker', $app_tracker);
    }
}
