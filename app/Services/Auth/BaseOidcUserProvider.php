<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Auth\Authenticatable;
use App\Services\Auth\Contracts\OidcAuthenticatable;
use App\Services\Auth\Contracts\OidcUserValidator;
use App\Models\Manager;
use App\Models\UserRole;
use App\Models\Applicant;

class BaseOidcUserProvider implements UserProvider {

    /**
     * The Eloquent user model.
     *
     * @var string
     */
    protected $model;

    /**
     * The role new users should be created with
     *
     * @var string
     */
    protected $defaultRole;



    /**
     * Create a new user provider.
     *
     * @param  string  $model
     * @param  string  $defaultRole
     * @return void
     */
    public function __construct($model, $defaultRole) {
        $this->model = $model;
        $this->defaultRole = $defaultRole;
    }

    /**
     * Retrieve a user by their unique identifier.
     *
     * @param  mixed  $identifier
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveById($identifier) {
        $model = $this->createModel();

        return $model->newQuery()
                        ->where($model->getAuthIdentifierName(), $identifier)
                        ->first();
    }

    /**
     * Retrieve a user by their unique identifier and "remember me" token.
     *
     * @param  mixed  $identifier
     * @param  string  $token
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByToken($identifier, $token) {
        //TODO: Should we implement "remember me" tokens?
        return null;
    }

    /**
     * Update the "remember me" token for the given user in storage.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  string  $token
     * @return void
     */
    public function updateRememberToken(Authenticatable $user, $token) {
        //TODO: Should we implement "remember me" tokens?
    }

    /**
     * Retrieve a user by the given credentials.
     *
     * @param  array  $credentials
     * @return App\Services\Auth\Contracts\OidcAuthenticatable|null
     */
    public function retrieveByCredentials(array $credentials) {
        if (empty($credentials)) {
            return;
        }
        if (isset($credentials['iss']) && isset($credentials['sub'])) {
            // First we will try to find a user that matches the openid issuer
            // and sub code.

            $model = $this->createModel();

            $user = $model->findByOidcSub($credentials['iss'], $credentials['sub']);

            debugbar()->info("in Provider.retrieveByCredentials()");
            if ($user) {
                debugbar()->info("Provider found user:");
                debugbar()->info($user);
            }

            // If no user was found, use the provided credentials to create a
            // new user
            if ($user === null) {

                $user = $this->createUserFromCredentials($credentials);
                if ($user) {
                    //If a user was created successfully, save it to database
                    $user->save();
                }

                debugbar()->info("Provider created user:");
                debugbar()->info($user);
            }

            //If running in a local environment, and FORCE_ADMIN is true,
            //automatically set any logged in user to (temporarilly) be an admin
            if (App::environment() == 'local' && Config::get('app.force_admin')) {
                $adminRole = UserRole::where('name', 'admin')->firstOrFail();
                $user->user_role_id = $adminRole->id;
                // $user->user_role = $adminRole;
                $user->save();
            }

            //Ensure the user has a proper profile associated with it
            //If now profile exists yet create one.
            //Admins should be givven an applicant and manager profile
            if ($user->user_role->name == 'applicant' ||
                $user->user_role->name == 'admin') {
                $applicantProfile = Applicant::where(['user_id' => $user->id])->first();
                if (!$applicantProfile) {
                    $applicantProfile = new Applicant();
                    $applicantProfile->user_id = $user->id;
                    $applicantProfile->save();
                }

            }
            if ($user->user_role->name == 'manager' ||
                $user->user_role->name == 'admin') {
                $managerProfile = Manager::where(['user_id' => $user->id])->first();
                if (!$managerProfile) {
                    $managerProfile = new Manager();
                    $managerProfile->user_id = $user->id;
                    $managerProfile->save();
                }
            }

            return $user;
        } else {
            return;
        }
    }

    /**
     * Create a new user object using the given credentials.
     *
     * @param  array  $credentials
     * @return App\Services\Auth\Contracts\OidcAuthenticatable|null
     */
    public function createUserFromCredentials(array $credentials) {
        //At a minimum, email, iss and sub codes must be available.
        if (!isset($credentials['email']) || !isset($credentials['iss']) ||
                !isset($credentials['sub'])) {
            return null;
        }

        $model = $this->createModel();

        $name = isset($credentials['name']) ? $credentials['name'] : "";

        return $model->createWithOidcCredentials($name, $credentials['email'],
                $credentials['iss'], $credentials['sub'], $this->defaultRole);
    }

    /**
     * Validate a user against the given credentials.
     *
     * @param  App\Services\Auth\Contracts\OidcAuthenticatable  $user
     * @param  array  $credentials
     * @return bool
     */
    public function validateCredentials(Authenticatable $user, array $credentials) {
        debugbar()->info("in Provider.validateCredentials()");

        return $user instanceof Authenticatable;
        //$subMatches = $credentials['sub'] === $user->getSub($credentials['iss']);
        //return $subMatches;
    }

    /**
     * Create a new instance of the model.
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function createModel() {
        $class = '\\' . ltrim($this->model, '\\');

        return new $class;
    }

    /**
     * Gets the name of the Eloquent user model.
     *
     * @return string
     */
    public function getModel() {
        return $this->model;
    }

    /**
     * Sets the name of the Eloquent user model.
     *
     * @param  string  $model
     * @return $this
     */
    public function setModel($model) {
        $this->model = $model;

        return $this;
    }

}
