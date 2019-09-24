<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Applicant;
use App\Models\Manager;
use App\Models\Lookup\Department;
use App\Services\Validation\Rules\PasswordFormatRule;
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
        $redirectTo = WhichPortal::isManagerPortal() ? route('manager.home') : route('home');
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
            'departments' => Department::all()->map->toApiArray(),
        ]);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'min:8',
                new PasswordFormatRule,
                'confirmed'
            ],
        ]);
    }

    /**
     * Get a validator for an incoming Manager registration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function managerValidator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'min:8',
                new PasswordFormatRule,
                'confirmed'
            ],
            'department' => 'required|integer',
            'gov_email' => 'nullable|required_unless:department,0|string|email|unique:users', // gov_email is required unless department is set to 0 (Not in Goverment)
        ]);
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
        $user->name = $data['name'];
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
        // Create basic user
        $user = $this->create($data);

        // Save manager specific fields
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
}
