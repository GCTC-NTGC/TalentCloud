<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;
use Facades\App\Services\WhichPortal;
use Illuminate\Support\Facades\Lang;

class JWTLoginController extends Controller
{
  public function __construct()
  {
    $this->middleware('guest')->except('logout');
    $this->middleware('guest:jwt')->except('logout');
    $this->middleware('guest:jwt')->except('logout');
  }

  public function showLoginForm()
  {
    if (WhichPortal::isManagerPortal()) {
      $home_url = route('manager.home');
    } elseif (WhichPortal::isHrPortal()) {
      $home_url = route('hr_advisor.home');
    } else {
      $home_url = route('home');
    };

    return view('auth/login', [
      'routes' => $this->auth_routes(),
      'login' => Lang::get('common/auth/login'),
      'home_url' => $home_url,
    ]);
  }

  public function adminLogin(Request $request)
  {
    $this->validate($request, [
      'email'   => 'required|email',
      'password' => 'required|min:6'
    ]);

    if (Auth::guard('jwtusers')->attempt(['email' => $request->email, 'password' => $request->password], $request->get('remember'))) {

      return redirect()->intended('/admin');
    }
    return back()->withInput($request->only('email', 'remember'));
  }
}
