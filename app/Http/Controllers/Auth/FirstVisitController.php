<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Models\Manager;
use App\Models\HrAdvisor;
use App\Models\Lookup\Department;
use App\Services\Validation\RegistrationValidator;

class FirstVisitController extends AuthController
{
    /**
     * Show the form for completing Manager registration on first visit.
     *
     * @return \Illuminate\Http\Response
     */
    public function showFirstVisitManagerForm()
    {
        $routes = [
            'return' => route('home'),
            'continue' => route('manager.finish_registration'),
        ];

        return view('auth.first_visit_manager', [
            'routes' => $routes,
            'first_visit' => Lang::get('common/auth/first_manager_visit'),
            'departments' => Department::all(),
            'not_in_gov_option' => ['value' => 0, 'name' => Lang::get('common/auth/register.not_in_gov')],
        ]);
    }

    /**
     * Process the final data required for Managers.
     *
     * @param Request $request
     * @return void
     */
    public function finishManagerRegistration(Request $request)
    {
        $data = $request->all();
        $validator = RegistrationValidator::finalizeManagerValidator($data);
        $validator->validate();

        $user = $request->user();

        // Save manager specific fields to user
        $managerDepartment = Department::find($data['department']);
        $inGovernment = ($managerDepartment !== null);
        $user->not_in_gov = !$inGovernment;
        $user->gov_email = $inGovernment ? $data['gov_email'] : null;
        $user->save();
        $user->refresh();

        // Add (or update) manager profile
        // NOTE: modifying a field in $user, and saving it, appears to create Manager object. I don't know how. -- Tristan
        // That means that after setting not_in_gov or gov_email, a manager already exists here. Adding a new one will throw an exception.
        $department_id = $inGovernment ? $managerDepartment->id : null;
        if ($user->manager === null) {
            $user->applicant()->save(new Manager());
            $user->refresh();
        }
        $user->manager->department_id = $department_id;
        $user->manager->save();

        $user->refresh();
        return redirect(route('manager.home'));
    }

    /**
     * Show the form for completing HR Advisor registration on first visit.
     *
     * @return \Illuminate\Http\Response
     */
    public function showFirstVisitHrForm()
    {
        $routes = [
            'return' => route('hr_advisor.home'),
            'continue' => route('hr_advisor.finish_registration'),
        ];

        return view('auth.first_visit_manager', [
            'routes' => $routes,
            'first_visit' => Lang::get('common/auth/first_hr_visit'),
            'departments' => Department::all(),
            'not_in_gov_option' => ['value' => 0, 'name' => Lang::get('common/auth/register.not_in_gov')],
        ]);
    }

    /**
     * Process the final data required for Managers.
     *
     * @param Request $request
     * @return void
     */
    public function finishHrRegistration(Request $request)
    {
        $data = $request->all();
        $validator = RegistrationValidator::finalizeManagerValidator($data);
        $validator->validate();

        $user = $request->user();

        // Save manager specific fields to user
        $hrDepartment = Department::find($data['department']);
        $inGovernment = ($hrDepartment !== null);
        $user->not_in_gov = !$inGovernment;
        $user->gov_email = $inGovernment ? $data['gov_email'] : null;

        $user->save();
        $user->refresh();

        $department_id = $inGovernment ? $hrDepartment->id : null;
        if ($user->hr_advisor === null) {
            $user->hr_advisor()->save(new HrAdvisor());
            $user->refresh();
        }
        $user->hr_advisor->department_id = $department_id;
        $user->hr_advisor->user_id === $user->id;
        $user->hr_advisor->save();

        $user->refresh();
        return redirect(route('hr_advisor.home'));
    }
}
