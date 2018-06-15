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
require_once '../model/LocalizedValues.php';
require_once '../controller/UserController.php';
require_once '../controller/TeamCultureController.php';
require_once '../controller/WorkEnvironmentController.php';
require_once '../dao/ManagerProfileDAO.php';

class ManagerProfileController {

    public static function putManagerProfile(ManagerProfile $managerProfile, ManagerProfileDetailsNonLocalized $managerProfileDetails) {
        //Check if previious manager profile exists
        $oldProfile = self::getManagerProfileByUser($managerProfile->getUser_id());
        if ($oldProfile) {
            $oldProfileId = $oldProfile->getUser_manager_profile_id();
            
            //Get Team Culture and Work Environment associated with old profile
            $teamCulture = TeamCultureController::getTeamCultureNonLocalizedByManagerProfileId($oldProfileId);
            $workEnvironment = WorkEnvironmentController::getWorkEnivronmentByManagerProfile($oldProfileId);
            
            $profileId = ManagerProfileDAO::createManagerProfile($managerProfile, $managerProfileDetails);
            
            //Add old teamCulture and WorkEnviornment to new profile as well
            if ($teamCulture) {
                TeamCultureController::addManagerProfileIdForTeamCulture($profileId, $teamCulture->getTeam_culture_id());
            }
            if ($workEnvironment && $workEnvironment->getBasic_work_environment()) {
                WorkEnvironmentController::addManagerProfileIdForWorkEnvironment($profileId, $workEnvironment->getBasic_work_environment()->getId());
            }
            
            return ["manager_profile_id"=>$profileId];
        }else {
            $profileId = ManagerProfileDAO::createManagerProfile($managerProfile, $managerProfileDetails);
            return ["manager_profile_id"=>$profileId];
        }
    }

    public static function getManagerProfileByUser($userId) {

        $response = ManagerProfileDAO::getManagerProfileByUser($userId);
        
        return $response;

    }

    public static function getManagerProfileDetailsByLocale($managerProfile, $locale) {

        $response = ManagerProfileDAO::getManagerProfileDetailsByLocale($managerProfile, $locale);

        return $response;
    }

    public static function getManagerProfileWithDetails(ManagerProfile $managerProfile) {

        $user = new User();
        $user->setUser_id($managerProfile->getUser_id());

        $managerUser = UserController::getUserById($user);
        $profile = ManagerProfileController::getManagerProfileByUser($managerProfile->getUser_id());
        
        if (!$profile) {
            //No profile exists
            return false;
        }

        $details_en = ManagerProfileController::getManagerProfileDetailsByLocale($profile, "en_CA");
        $details_fr = ManagerProfileController::getManagerProfileDetailsByLocale($profile, "fr_CA");

        $localizedDetails = new LocalizedValues($details_en, $details_fr);

        $managerProfileWithDetails = new ManagerProfileWithDetails($profile, $localizedDetails, $managerUser);

        $response = $managerProfileWithDetails;

        return $response;

    }
}
?>
