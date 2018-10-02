<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Auth\Contracts\TokenStorage;
use App\Services\Auth\Contracts\JSONGetter;
use App\Services\Auth\BaseOidcUserProvider;
use App\Services\Auth\RequestTokenParser;
use Jumbojett\OpenIDConnectClient;
use Jumbojett\OpenIDConnectClientException;
use Lcobucci\JWT\Parser;
use Facades\App\Services\WhichPortal;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

use Illuminate\Support\Facades\Config;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen.
    |
    */

    protected $authUrl;
    protected $callbackUrl;
    protected $clientId;
    protected $clientSecret;

    /**
     *
     * @var OpenIDConnectClient
     */
    protected $oidcClient;
    /**
     *
     * @var Parser
     */
    protected $tokenParser;
    /**
     *
     * @var TokenStorage
     */
    protected $tokenStorage;
    /**
     *
     * @var RequestTokenParser
     */
    protected $requestTokenParser;
    /**
     *
     * @var BaseOidcUserProvider
     */
    protected $userProvider;
    /**
     * @var JSONGetter
     */
    protected $jsonGetter;

    protected $scopes = ['openid', 'profile', 'email'];

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(TokenStorage $tokenStorage,
            RequestTokenParser $requestTokenParser,
            Parser $tokenParser,
            BaseOidcUserProvider $userProvider,
            JSONGetter $jsonGetter)
    {
        //$this->middleware('guest', ['only' => 'logout']);

        $this->tokenStorage = $tokenStorage;
        $this->tokenParser = $tokenParser;
        $this->userProvider = $userProvider;
        $this->requestTokenParser = $requestTokenParser;
        $this->jsonGetter = $jsonGetter;

        $config = Config::get('oidconnect');
        $this->authUrl = $config['auth_url'];
        $this->clientId = $config['client_id'];
        $this->clientSecret = $config['client_secret'];
        $this->callbackUrl = WhichPortal::isManagerPortal() ?
                LaravelLocalization::getNonLocalizedURL(route('manager.login')) :
                LaravelLocalization::getNonLocalizedURL(route('login'));

        $this->oidcClient = new OpenIDConnectClient($this->authUrl, $this->clientId, $this->clientSecret);
        $this->oidcClient->addScope($this->scopes);
        $this->oidcClient->setVerifyPeer(false);
        $this->oidcClient->setRedirectURL($this->callbackUrl);
        //$this->oidcClient->addAuthParam(['prompt'=>'select_account']);
    }

    /**
     * Begin the the log in process.
     * @return \Illuminate\Http\Response
     */
    public function login() {
        //The authenticate function will cause a redirect to the OpenID provider
        // unless the current url contains a code parameter. In that case, the
        // code will be used to aquire tokens from the api endpoint.

        try {
            $success = $this->oidcClient->authenticate();
        } catch (OpenIDConnectClientException $exception) {
            if (App::environment('local')) {
                throw $exception;
            }
            abort(400);
        }

        if ($success) {
            //Request user info from the endpoint. This will be used below.
            $userInfo = $this->oidcClient->requestUserInfo();

            //Retrieve (or create) user that matches token
            $token = $this->tokenParser->parse($this->oidcClient->getIdToken());
            $user = $this->userProvider->retrieveByCredentials($token->getClaims());

            //Store refresh token
            $iss = $token->getClaim('iss');
            $sub = $token->getClaim('sub');
            $this->tokenStorage->saveRefresh($iss, $sub, $this->oidcClient->getRefreshToken());

            //Update user model if it differs from openid user
            if($user->name !== $userInfo->name ||
                    $user->email !== $userInfo->email) {
                $user->name = $userInfo->name;
                $user->email = $userInfo->email;
                $user->save();
            }

            //Set user in guard
            Auth::setUser($user);


            //Save id token stateless log-in
            $this->requestTokenParser->save($token);

            //Create a response redirecting user to intended route or home page
            $response = redirect()->intended(route($this->homeRoute()));

            return $response;
        } else {
            Session::forget('url.intented');
            return redirect()->route($this->homeRoute());
        }
    }

    /**
     * Log the user out.
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request) {
        $idToken = $this->requestTokenParser->parse($request);

        //This will cause a redirect
        $this->oidcClient->signOut((string)$idToken, route($this->logoutCallbackRoute()));

        //This is a fallback, but don't expect this line to ever execute
        throw new AuthenticationException('Redirect to end_session_endpoint failed');
        //return redirect()->route('logout.callback');
    }

    /**
     * Log the user out.
     * @return \Illuminate\Http\Response
     */
    public function logoutCallback(Request $request) {
        $idToken = $this->requestTokenParser->parse($request);
        $iss = $idToken->getClaim('iss');
        $sub = $idToken->getClaim('sub');

        //Forget id token to log out
        $this->requestTokenParser->forget();

        //Forget access and storage tokens
        $this->tokenStorage->forgetAccess($iss, $sub);
        $this->tokenStorage->forgetRefresh($iss, $sub);

        //Reset the session
        $request->session()->flush();

        return redirect()->route($this->homeRoute());
    }

    protected function homeRoute() {
        if (WhichPortal::isManagerPortal()) {
            return 'manager.home';
        } else {
            return 'home';
        }
    }

    protected function logoutCallbackRoute() {
        if (WhichPortal::isManagerPortal()) {
            return 'manager.logout.callback';
        } else {
            return 'logout.callback';
        }
    }
}
