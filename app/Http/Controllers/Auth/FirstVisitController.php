<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\AuthController;
use App\Models\HrAdvisor;
use App\Models\Lookup\Department;
use App\Models\Manager;
use Facades\App\Services\WhichPortal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class FirstVisitController extends AuthController
{
    /**
     * Show the form for completing Manager registration on first visit.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function showFirstVisitManagerForm(Request $request)
    {
        $routes = [
            'return' => route(WhichPortal::prefixRoute('home')),
            'continue' => route(WhichPortal::prefixRoute('finish_registration')),
        ];

        return view('auth.first_visit_manager', [
            'routes' => $routes,
            'first_visit' => Lang::get('common/auth/first_manager_visit'),
            'departments' => Department::all(),
            'not_in_gov_option' => ['value' => 0, 'name' => Lang::get('common/auth/register.not_in_gov')],
            'is_manager_view' => WhichPortal::isManagerPortal(),
            'user' => $request->user(),
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
        $user = $request->user();

        $data = $request->validate([
            'department' => 'required|integer',
            'gov_email' => 'nullable|required_unless:department,0|string|email|max:255',
            Rule::unique('users', 'gov_email')->ignore($user->id)
        ]);

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
        $user->department_id = $department_id;
        $user->save();

        $user->refresh();
        return redirect(route(WhichPortal::prefixRoute('home')));
    }

    /**
     * Show the form for completing HR Advisor registration on first visit.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function showFirstVisitHrForm(Request $request)
    {
        $routes = [
            'return' => route(WhichPortal::prefixRoute('home')),
            'continue' => route(WhichPortal::prefixRoute('finish_registration')),
        ];

        return view('auth.first_visit_manager', [
            'routes' => $routes,
            'first_visit' => Lang::get('common/auth/first_hr_visit'),
            'departments' => Department::all(),
            'is_manager_view' => WhichPortal::isManagerPortal(),
            'user' => $request->user(),
        ]);
    }

    /**
     * Process the final data required for HR.
     *
     * @param Request $request
     * @return void
     */
    public function finishHrRegistration(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'department' => 'required|integer',
            'gov_email' => 'nullable|required_unless:department,0|string|email|max:255',
            Rule::unique('users', 'gov_email')->ignore($user->id)
        ]);

        // Save manager specific fields to user
        $hrDepartment = Department::find($data['department']);
        $inGovernment = ($hrDepartment !== null);
        $user->gov_email = $inGovernment ? $data['gov_email'] : null;

        $user->save();
        $user->refresh();

        $department_id = $inGovernment ? $hrDepartment->id : null;
        if ($user->hr_advisor === null) {
            $user->hr_advisor()->save(new HrAdvisor());
            $user->refresh();
        }
        $user->department_id = $department_id;
        $user->save();
        $user->hr_advisor->user_id === $user->id;
        $user->hr_advisor->save();

        $user->refresh();
        return redirect(route(WhichPortal::prefixRoute('home')));
    }
}
