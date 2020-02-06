<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Applicant;
use App\Models\HrAdvisor;
use App\Models\Manager;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;

class InitializeUser
{
    /**
     * Ensure that a logged in user is initialized correctly according to its UserRole
     * (ie has an associated Applicant or Manager profile)
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();

            // If running in a local environment, and FORCE_ADMIN is true,
            // automatically set any logged in user to (temporarilly) be an admin
            if (App::environment() == 'local' && Config::get('app.force_admin')) {
                $user->setRole('admin');
                $user->save();
            }

            // Ensure the user has a proper profile associated with it
            // If no profile exists yet create one.
            // Admins should be given an applicant and manager profile
            if ($user->isApplicant() ||
                    $user->isAdmin()) {
                $applicantProfile = $user->applicant;
                if ($applicantProfile === null) {
                    $applicantProfile = new Applicant();
                    $applicantProfile->user_id = $user->id;
                    $applicantProfile->save();
                    $user->refresh();
                }
            }
            if ($user->isManager() ||
                    $user->isAdmin()) {
                $managerProfile = $user->manager;
                if ($managerProfile === null) {
                    $managerProfile = new Manager();
                    $managerProfile->user_id = $user->id;
                    $managerProfile->save();
                    $user->refresh();
                }
            }
            if ($user->isHrAdvisor() ||
                    $user->isAdmin()) {
                $hrAdvisorProfile = $user->hr_advisor;
                if ($hrAdvisorProfile === null) {
                    $hrAdvisorProfile = new HrAdvisor();
                    $hrAdvisorProfile->user_id = $user->id;
                    $hrAdvisorProfile->save();
                    $user->refresh();
                }
            }
        }

        return $next($request);
    }
}
