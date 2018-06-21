<?php

require_once __DIR__ . '/../config/php.config.inc';

/* set api path */
set_include_path(get_include_path() . PATH_SEPARATOR);
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once __DIR__ . '/../config/constants.config.inc';
require_once __DIR__ . '/../model/User.php';
require_once __DIR__ . '/../controller/EmailConfirmationController.php';
require_once __DIR__ . '/../controller/ManagerProfileController.php';
require_once __DIR__ . '/../controller/JobSeekerController.php';
require_once __DIR__ . '/../dao/UserDAO.php';

use Lcobucci\JWT\Parser;
use Jumbojett\OpenIDConnectClient;

class UserController {

    //TO-DO : remove - should not be used
    /**
     * 
     * @global type $dbResourcesArray
     * @return type
     */
    public static function getUserByCredentials($username, $password) {
        $authUser = UserDAO::getUserByCredentials($username, $password);
        $authUser->setPassword($password);
        return $authUser;
    }

    /**
     * 
     * @param User $user
     * @return type
     */
    public static function getUserById(User $user) {
        $existingUser = UserDAO::getUserById($user);
        return $existingUser;
    }

    public static function getUserByOpenIdTokens($idToken, $accessToken = null) {
        //Parse the token from idToken string
        $token = (new Parser())->parse((string) $idToken);

        //Get user from database
        $user = self::getUserByOpenId($token->getClaim("sub"));
        if (!$user && $accessToken !== null) {
            //if $user is null, then the user is not registered and we should register them now
            $user = self::registerOpenIdUser($idToken, $accessToken);
        }
        return $user;
    }

    public static function registerOpenIdUser($idToken, $accessToken) {
        //Parse the token from idToken string
        $token = (new Parser())->parse((string) $idToken);

        //Check if user already exists in database
        $user = self::getUserByOpenId($token->getClaim("sub"));
        if ($user) {
            //User already exists, does not need to be registered
            //TODO: ensure proper profile exists
            self::registerUserProfile($user);

            return $user;
        }

        //Get user info from openId server
        $oidc = new OpenIDConnectClient(OPENID_URI);
        $oidc->addScope(array('openid', 'profile', 'email'));
        $oidc->setVerifyPeer(false);
        $oidc->setAccessToken($accessToken);
        $userInfo = $oidc->requestUserInfo();
        if ($userInfo) {
            $newUser = new User();
            $newUser->setName($userInfo->name); 
            $newUser->setEmail($userInfo->email); 
            $newUser->setOpen_id($userInfo->sub); 

            //TODO: allow manager role depending on source of login
            $newUser->setUser_role(ROLE_APPLICANT);
            $newUser->setIs_confirmed(true);
            $user = UserController::registerUser($newUser);
        } else {
            throw Exception("Unable to access openId userInfo");
        }
        return $user;
    }

    /**
     * 
     * @param User $user
     * @return type
     */
    public static function getUserByOpenId($openId) {
        //get existing user by openId
        $existingUser = UserDAO::getUserByOpenId($openId);
        //var_dump($existingUser);
        //get user_id from existing user
        //if user_id is not null, then log the user in automatically
        if ($existingUser) {
            return $existingUser;
        } else {
            return null;
            /*
              //if user_id is null, then the user is not registered and we should register them automatically
              //register new user
              $newUser = UserController::registerUser($user);
              return $newUser;
             * 
             */
        }
    }

    public static function registerUser(User $newUser) {
        //$newUser->setUser_role('jobseeker');
        //This is a temporary automatic confirmation until the mail server is setup
        //var_dump($newUser);
        $newUser->setIs_confirmed(true);
        $userRegistered = false;
        $confEmailSent = true;
        $registeredUser = UserDAO::registerUser($newUser);
        if ($registeredUser instanceof User && $registeredUser->getUser_id() !== null) {
            $userRegistered = true;
            self::registerUserProfile($registeredUser);
        }
        return $registeredUser;
    }

    private static function registerUserProfile($user) {
        if ($user->getUser_role() === ROLE_APPLICANT) {
            //Create an empty jobseeker profile

            $userId = $user->getUser_id();

            //Ensure profile doesn't already exist before creating new one
            if (!JobSeekerController::getJobSeekerProfileByUserId($userId)) {
                $jobSeekerProfile = new JobSeekerProfile();
                JobSeekerController::addJobSeekerProfile($jobSeekerProfile, $userId);
            }
        } else if ($user->getUser_role() === ROLE_ADMIN) {

            $userId = $user->getUser_id();

            //Ensure profile doesn't already exist before creating new one
            if (!ManagerProfileController::getManagerProfileByUser($userId)) {
                $managerProfile = new ManagerProfile();
                $managerProfile->setUser_id($userId);

                $managerProfileDetails = new ManagerProfileDetailsNonLocalized();

                ManagerProfileController::putManagerProfile($managerProfile, $managerProfileDetails);
            }
        }
    }

    public static function confirmEmail($user) {
        return EmailConfirmationController::sendConfirmationEmail($user);
    }

    /**
     * 
     * @param User $updatedUser
     * 
     * If a user with the same id as $user already exists, update the email,
     * password, firstname, lastname, and is_confirmed entries with values form
     * $user. Note that user_id and user_role_id will be unaffected.
     */
    public static function updateUser(User $updatedUser) {
        $updateSuccessful = false;
        $confEmailSent = false;
        $oldUser = new User();
        $oldUser->setUser_id($updatedUser->getUser_id());
        $oldUser = UserController::getUserById($oldUser);
        //Only update if user with this id already exists
        if ($oldUser) {
            //Don't change password
            $updatedUser->setPassword($oldUser->getPassword());

            //Confirm email if it has changed
            if ($oldUser->getEmail() != $updatedUser->getEmail()) {
                $confEmailSent = UserController::confirmEmail($updatedUser);
                $updatedUser->setIs_confirmed(false);
            } else {
                $updatedUser->setIs_confirmed($oldUser->getIs_confirmed());
            }
            $updateSuccessful = UserDAO::updateUser($updatedUser); //do updates
        }
        return array("userUpdated" => $updateSuccessful,
            "oldUser" => $oldUser,
            "updatedUser" => UserController::getUserById($updatedUser),
            "confEmailSent" => $confEmailSent);
    }

    /**
     * 
     * @param int $managerProfileId
     */
    public static function getUserByManagerProfileId($managerProfileId) {
        $user = UserDAO::getUserByManagerProfileId($managerProfileId);
        return $user;
    }

    /**
     * 
     * @param int $jobSeekerProfileId
     */
    public static function getUserByJobSeekerProfileId($jobSeekerProfileId) {
        $user = UserDAO::getUserByJobSeekerProfileId($jobSeekerProfileId);
        return $user;
    }

}
