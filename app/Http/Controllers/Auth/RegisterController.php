<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Applicant;
use App\Models\Manager;
use App\Models\HrAdvisor;
use App\Models\Lookup\Department;
use App\Services\Validation\RegistrationValidator;
use Facades\App\Services\WhichPortal;
use Illuminate\Auth\Events\Registered;

class RegisterController extends AuthController
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @return string
     */
    protected function redirectTo()
    {
        if (WhichPortal::isManagerPortal()) {
            $redirectTo = route('manager.home');
        } elseif (WhichPortal::isHrPortal()) {
            $redirectTo = route('hr_advisor.home');
        } else {
            $redirectTo = route('home');
        }
        return $redirectTo;
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Show the application registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm()
    {
        return view('auth.register', [
            'routes' => $this->auth_routes(),
            'register' => Lang::get('common/auth/register'),
            'home_url' => route('home'),
        ]);
    }

    /**
     * Show the manager registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showManagerRegistrationForm()
    {
        return view('auth.register_manager', [
            'routes' => $this->auth_routes(),
            'register' => Lang::get('common/auth/register'),
            'not_in_gov_option' => ['value' => 0, 'name' => Lang::get('common/auth/register.not_in_gov')],
            'departments' => Department::all(),
            'home_url' => route('manager.home'),
        ]);
    }

    /**
     * Show the hr_advisor registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showHrRegistrationForm()
    {
        return view('auth.register_manager', [
            'routes' => $this->auth_routes(),
            'register' => Lang::get('common/auth/register'),
            'not_in_gov_option' => ['value' => 0, 'name' => Lang::get('common/auth/register.not_in_gov')],
            'departments' => Department::all(),
            'home_url' => route('hr_advisor.home'),
        ]);
    }

    /**
     * OVERRIDE
     * Get a validator for an incoming registration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return RegistrationValidator::userValidator($data);
    }

    /**
     * Get a validator for an incoming Manager registration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function managerValidator(array $data)
    {
        return RegistrationValidator::managerValidator($data);
    }

    /**
     * Get a validator for an incoming HR Advisor registration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function hrValidator(array $data)
    {
        return RegistrationValidator::hrValidator($data);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data Incoming User data.
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        $user = new User();
        $user->first_name = $data['first_name'];
        $user->last_name = $data['last_name'];
        $user->email = $data['email'];
        $user->password = Hash::make($data['password']);

        // Default to basic user.
        $user->setRole('basic');

        $user->save();

        $user->applicant()->save(new Applicant());

        return $user->fresh();
    }

    /**
     * Create a new Manager user instance after a valid registration.
     *
     * @param  array $data Incoming User data.
     * @return \App\Models\User
     */
    protected function createManager(array $data)
    {
        // Create basic user.
        $user = $this->create($data);

        // Save manager specific fields.
        $managerDepartment = Department::find($data['department']);
        $inGovernment = ($managerDepartment !== null);
        $user->not_in_gov = !$inGovernment;
        $user->gov_email = $inGovernment ? $data['gov_email'] : null;
        $user->save();
        $user->refresh();

        // Add (or update) manager profile.
        // NOTE: modifying a field in $user, and saving it, appears to create Manager object. I don't know how. -- Tristan
        // That means that after setting not_in_gov or gov_email, a manager already exists here. Adding a new one will throw an exception.
        $department_id = $inGovernment ? $managerDepartment->id : null;
        if ($user->manager === null) {
            $user->applicant()->save(new Manager());
            $user->refresh();
        }
        $user->manager->department_id = $department_id;
        $user->manager->save();

        return $user->fresh();
    }

    /**
     * Create a new HR Advisor user instance after a valid registration.
     *
     * @param  array $data Incoming User data.
     * @return \App\Models\User
     */
    protected function createHrAdvisor(array $data)
    {
        // Create basic user.
        $user = $this->create($data);

        // Save hr_advisor specific fields (same as manager).
        $hrDepartment = Department::find($data['department']);
        $inGovernment = ($hrDepartment !== null);
        $user->not_in_gov = !$inGovernment;
        $user->gov_email = $inGovernment ? $data['gov_email'] : null;
        $user->setRole('hr_advisor');

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

        return $user->fresh();
    }

    /**
     * OVERRIDE
     * The user has been registered.
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @param  mixed                    $user    Incoming User data.
     * @return \Illuminate\Http\Response
     */
    protected function registered(Request $request, $user)
    {
        return redirect()->intended($this->redirectTo());
    }

    /**
     * Handle a Manager registration request for the application.
     * This function is based off RegistersUsers->register
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registerManager(Request $request)
    {
        $this->managerValidator($request->all())->validate();

        event(new Registered($user = $this->createManager($request->all())));

        $this->guard()->login($user);

        return $this->registered($request, $user)
            ?: redirect($this->redirectPath());
    }

    /**
     * Handle a HR Advisor registration request for the application.
     * This function is based off RegistersUsers->register
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registerHrAdvisor(Request $request)
    {
        $this->hrValidator($request->all())->validate();

        event(new Registered($user = $this->createHrAdvisor($request->all())));

        $this->guard()->login($user);

        return redirect(route('hr_advisor.home'));
    }
}
