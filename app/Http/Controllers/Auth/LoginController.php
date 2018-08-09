<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Auth\Contracts\TokenStorage;
use App\Services\Auth\BaseOidcUserProvider;
use App\Services\Auth\RequestTokenParser;
use Jumbojett\OpenIDConnectClient;
use Jumbojett\OpenIDConnectClientException;
use Lcobucci\JWT\Parser;

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
    
    protected $scopes = ['openid', 'profile', 'email'];

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(TokenStorage $tokenStorage, 
            RequestTokenParser $requestTokenParser,
            Parser $tokenParser,
            BaseOidcUserProvider $userProvider)
    {
        $this->middleware('guest', ['except' => 'logout']);
        
        $this->tokenStorage = $tokenStorage;
        $this->tokenParser = $tokenParser;
        $this->userProvider = $userProvider;
        $this->requestTokenParser = $requestTokenParser;
        
        $config = Config::get('oidconnect');        
        $this->authUrl = $config['auth_url'];
        $this->callbackUrl = $config['redirect'];
        $this->clientId = $config['client_id'];
        $this->clientSecret = $config['client_secret'];
        
        $this->oidcClient = new OpenIDConnectClient($this->authUrl, $this->clientId, $this->clientSecret);
        $this->oidcClient->addScope($this->scopes);
        $this->oidcClient->setVerifyPeer(false);
        $this->oidcClient->setRedirectURL($this->callbackUrl);        
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
            $response = redirect()->intended(route('home'));
            
            return $response;
        } else {
            return redirect()->home();
        }   
    }
    
    /**
     * Log the user out.
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request) {
        $idToken = $this->requestTokenParser->parse($request);
        $iss = $idToken->getClaim('iss');
        $sub = $idToken->getClaim('sub');
        
        //Forget id token to log out
        $this->requestTokenParser->forget();
        
        //Forget access and storage tokens
        $this->tokenStorage->forgetAccess($iss, $sub);
        $this->tokenStorage->forgetRefresh($iss, $sub);
               
        $request->session()->flush();
        
        //echo('Session has id_token = ' . $request->session()->has('id_token') );
        
        //TODO: Right now the gccollab end_session_end_point doesnt redirect
        //back to us, and therefore the id_token is never removed, and logout
        //is incomplete. For now, just redirect home.
        //$this->oidcClient->signOut((string)$idToken, route('home'));        
        
        return redirect()->home();
    }        
}
