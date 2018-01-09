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
    
    public static function getUserById($user_id){
        
    }
    
    public static function registerUser(User $newUser){
        //$newUser->setUser_role('jobseeker');
        //This is a temporary automatic confirmation until the mail server is setup
        $newUser->setIs_confirmed(true);
        $userRegistered = false;
        $confEmailSent = false;
        $registeredUser = UserDAO::registerUser($newUser);
        if($registeredUser->getUser_id() !== null){
            $userRegistered = true;
            if(EmailConfirmationController::sendConfirmationEmail($registeredUser)){
                $confEmailSent = true;
            }
        }
        return array("userRegistered"=>$userRegistered,"confEmailSent"=>$confEmailSent);
        
    }
}