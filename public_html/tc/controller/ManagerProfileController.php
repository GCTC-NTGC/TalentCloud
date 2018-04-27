<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../model/ManagerProfile.php';
require_once '../model/ManagerProfileDetails.php';
require_once '../model/ManagerProfileDetailsNonLocalized.php';
require_once '../model/ManagerProfileWithDetails.php';
require_once '../model/User.php';
require_once '../controller/UserController.php';
require_once '../dao/ManagerProfileDAO.php';

class ManagerProfileController{

    public static function createManagerProfile(ManagerProfile $managerProfile, ManagerProfileDetailsNonLocalized $managerProfileDetails){
        //var_dump("manager profile id = ".$managerProfile->getUser_manager_profile_id());
        $response = ManagerProfileDAO::createManagerProfile($managerProfile, $managerProfileDetails);

        return $response;

    }

    public static function getManagerProfile($managerProfile){

        $response = ManagerProfileDAO::getManagerProfile($managerProfile);

        return $response;

    }

    public static function getManagerProfileDetailsByLocale($managerProfile, $locale) {

        $response = ManagerProfileDAO::getManagerProfileDetailsByLocale($managerProfile, $locale);

        return $response;
    }

    public static function getManagerProfileWithDetails(ManagerProfile $managerProfile){

        $user = new User();
        $user->setUser_id($managerProfile->getUser_id());

        $managerUser = UserController::getUserById($user);
        $managerUser->setIs_confirmed(null);
        $managerUser->setUser_role(null);

        $profile = ManagerProfileController::getManagerProfile($managerProfile);

        $details = ManagerProfileController::getManagerProfileDetailsByLocale($profile, $locale);

        $managerProfileWithDetails = new ManagerProfileWithDetails($profile,$details,$managerUser);

        $response = $managerProfileWithDetails;

        return $response;

    }
}
?>
