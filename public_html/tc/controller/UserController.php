<?php

date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if(!isset($_SESSION)){
    session_start();
}

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../model/User.php';
require_once '../controller/UserController.php';
require_once '../controller/EmailConfirmationController.php';
require_once '../dao/UserDAO.php';

class UserController{
    
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
    
    public static function getUserById(User $user){
        $user = UserDAO::getUserById($user);
        return $user;
    }
    
    public static function registerUser(User $newUser){
        //$newUser->setUser_role('jobseeker');
        //This is a temporary automatic confirmation until the mail server is setup
        $newUser->setIs_confirmed(true);
        $userRegistered = false;
        $confEmailSent = false;
        $registeredUser = UserDAO::registerUser($newUser);
        if($registeredUser instanceof User && $registeredUser->getUser_id() !== null){
            $userRegistered = true;
            $confEmailSent = UserController::confirmEmail($registeredUser);
        }
        return array("userRegistered"=>$userRegistered,"confEmailSent"=>$confEmailSent);
        
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
        return array("userUpdated"=>$updateSuccessful,
            "oldUser"=>$oldUser,
            "updatedUser"=>UserController::getUserById($updatedUser),
            "confEmailSent"=>$confEmailSent);   
    }
    
    /**
     * 
     * @param int $managerProfileId
     */
    public static function getUserByManagerProfileId($managerProfileId) {
        $user = UserDAO::getUserByManagerProfileId($managerProfileId);
        return $user;
    }
}
