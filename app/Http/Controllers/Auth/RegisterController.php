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
use App\Services\Validation\Rules\PasswordFormatRule;
use Facades\App\Services\WhichPortal;

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

        return $user;
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
}
