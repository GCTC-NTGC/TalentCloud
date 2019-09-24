<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Models\Manager;
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
            'departments' => Department::all()->map->toApiArray(),
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
}
