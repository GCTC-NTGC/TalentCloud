<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if(!isset($_SESSION)){
    session_start();
}

/*set api path*/
if(!defined('ROOT_PATH')){
    define('ROOT_PATH', dirname(__DIR__) . '/');
}

/** Model Classes */
require_once ROOT_PATH.'dao/BaseDAO.php';
require_once ROOT_PATH.'model/ManagerProfile.php';
require_once ROOT_PATH.'model/ManagerProfileDetails.php';

class ManagerProfileDAO extends BaseDAO{
    
    /**
     * 
     * @param ManagerProfile $managerProfile
     * @param ManagerProfileDetails $managerProfileDetails
     * @return type int insert_id
     */
    public static function createManagerProfile(ManagerProfile $managerProfile, ManagerProfileDetails $managerProfileDetails){
        
        $link = BaseDAO::getConnection();
        
        $user_manager_profile_department_id = $managerProfile->getUser_manager_profile_department_id();
        $user_manager_profile_position = $managerProfile->getUser_manager_profile_position();
        $user_manager_profile_twitter = $managerProfile->getUser_manager_profile_twitter();
        $user_manager_profile_linkedin = $managerProfile->getUser_manager_profile_linkedin();
        $user_id = $managerProfile->getUser_id();
        
        $sqlStr="INSERT INTO talentcloud.user_manager_profile
            (
            user_manager_profile_department_id,
            user_manager_profile_position,
            user_manager_profile_twitter,
            user_manager_profile_linkedin,
            user_id)
            VALUES
            (
            :user_manager_profile_department_id,
            :user_manager_profile_position,
            :user_manager_profile_twitter,
            :user_manager_profile_linkedin,
            :user_id
            );
        ";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':user_manager_profile_department_id', $user_manager_profile_department_id, PDO::PARAM_STR);
        $sql->bindParam(':user_manager_profile_position', $user_manager_profile_position, PDO::PARAM_STR);
        $sql->bindParam(':user_manager_profile_twitter', $user_manager_profile_twitter, PDO::PARAM_STR);
        $sql->bindParam(':user_manager_profile_linkedin', $user_manager_profile_linkedin, PDO::PARAM_STR);
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        
        $locale_id = $managerProfileDetails->getLocale_id();
        $user_manager_profile_details_aboutme = $managerProfileDetails->getUser_manager_profile_details_aboutme();
        $user_manager_profile_details_proud = $managerProfileDetails->getUser_manager_profile_details_proud();
        $user_manager_profile_details_branch = $managerProfileDetails->getUser_manager_profile_details_branch();
        $user_manager_profile_details_division = $managerProfileDetails->getUser_manager_profile_details_division();
        $user_manager_profile_details_lead_style = $managerProfileDetails->getUser_manager_profile_details_lead_style();
        $user_manager_profile_details_emp_learn = $managerProfileDetails->getUser_manager_profile_details_emp_learn();
        $user_manager_profile_details_expectations = $managerProfileDetails->getUser_manager_profile_details_expectations();
        $user_manager_profile_review_options = $managerProfileDetails->getUser_manager_profile_review_options();
        $user_manager_profile_staylate = $managerProfileDetails->getUser_manager_profile_staylate();
        $user_manager_profile_engage = $managerProfileDetails->getUser_manager_profile_engage();
        $user_manager_profile_devops = $managerProfileDetails->getUser_manager_profile_devops();
        $user_manager_profile_lvwrequests = $managerProfileDetails->getUser_manager_profile_lvwRequests();
        $user_manager_profile_work_experience = $managerProfileDetails->getUser_manager_profile_work_experience();
        $user_manager_profile_education = $managerProfileDetails->getUser_manager_profile_education();
        
        $sql2Str="INSERT INTO talentcloud.user_manager_profile_details
            (
            locale_id,
            user_manager_profile_details_aboutme,
            user_manager_profile_details_proud,
            user_manager_profile_details_branch,
            user_manager_profile_details_division,
            user_manager_profile_details_lead_style,
            user_manager_profile_details_emp_learn,
            user_manager_profile_details_expectations,
            user_manager_profile_id,
            user_manager_profile_review_options,
            user_manager_profile_staylate,
            user_manager_profile_engage,
            user_manager_profile_devops,
            user_manager_profile_lvwrequests,
            user_manager_profile_work_experience,
            user_manager_profile_education
            )
            VALUES
            (
            :locale_id,
            :user_manager_profile_details_aboutme,
            :user_manager_profile_details_proud,
            :user_manager_profile_details_branch,
            :user_manager_profile_details_division,
            :user_manager_profile_details_lead_style,
            :user_manager_profile_details_emp_learn,
            :user_manager_profile_details_expectations,
            last_insert_id(),
            :user_manager_profile_review_options,
            :user_manager_profile_staylate,
            :user_manager_profile_engage,
            :user_manager_profile_devops,
            :user_manager_profile_lvwrequests,
            :user_manager_profile_work_experience,
            :user_manager_profile_education
            );
        ";
        
        $sql2 = $link->prepare($sql2Str);
        $sql2->bindParam(':locale_id', $locale_id, PDO::PARAM_INT);
        $sql2->bindParam(':user_manager_profile_details_aboutme', $user_manager_profile_details_aboutme, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_proud', $user_manager_profile_details_proud, PDO::PARAM_STR);
        $sql2->bindParam('user_manager_profile_details_branch', $user_manager_profile_details_branch, PDO::PARAM_STR);
        $sql2->bindParam('user_manager_profile_details_division', $user_manager_profile_details_division, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_lead_style', $user_manager_profile_details_lead_style, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_emp_learn', $user_manager_profile_details_emp_learn, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_expectations', $user_manager_profile_details_expectations, PDO::PARAM_STR);
        
        $sql2->bindParam(':user_manager_profile_review_options', $user_manager_profile_review_options, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_staylate', $user_manager_profile_staylate, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_engage', $user_manager_profile_engage, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_devops', $user_manager_profile_devops, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_lvwrequests', $user_manager_profile_lvwrequests, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_work_experience', $user_manager_profile_work_experience, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_education', $user_manager_profile_education, PDO::PARAM_STR);
        
        $rowsmodified = 0;
        
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            $link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $profileId = $link->lastInsertId();
            $sql2->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));

            $link->commit();
            $rowsmodified = $sql->rowCount();
            if($rowsmodified > 0){
                $insert_id = $profileId;
            }
        } catch (PDOException $e) {
            return 'createManagerProfile failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $insert_id;
        
    }
    
    /**
     * 
     * @param ManagerProfile $managerProfile
     * @param ManagerProfileDetails $managerProfileDetails
     * @return boolean
     */
    public static function updateManagerProfile(ManagerProfile $managerProfile, ManagerProfileDetails $managerProfileDetails){
        
        //var_dump($managerProfile->getUser_manager_profile_id());
         
        $link = BaseDAO::getConnection();
        
        $user_manager_profile_id = intval($managerProfile->getUser_manager_profile_id());
        //var_dump($user_manager_profile_id);
        $user_manager_profile_department_id = $managerProfile->getUser_manager_profile_department_id();
        $user_manager_profile_position = $managerProfile->getUser_manager_profile_position();
        $user_manager_profile_twitter = $managerProfile->getUser_manager_profile_twitter();
        $user_manager_profile_linkedin = $managerProfile->getUser_manager_profile_linkedin();
        $user_id = intval($managerProfile->getUser_id());
        
        $sqlStr="UPDATE talentcloud.user_manager_profile
            SET 
                user_manager_profile_department_id = :user_manager_profile_department_id,
                user_manager_profile_position = :user_manager_profile_position,
                user_manager_profile_twitter = :user_manager_profile_twitter,
                user_manager_profile_linkedin = :user_manager_profile_linkedin,
                user_id = :user_id
            WHERE user_manager_profile_id = :user_manager_profile_id;
        ";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':user_manager_profile_department_id', $user_manager_profile_department_id, PDO::PARAM_STR);
        $sql->bindParam(':user_manager_profile_position', $user_manager_profile_position, PDO::PARAM_STR);
        $sql->bindParam(':user_manager_profile_twitter', $user_manager_profile_twitter, PDO::PARAM_STR);
        $sql->bindParam(':user_manager_profile_linkedin', $user_manager_profile_linkedin, PDO::PARAM_STR);
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $sql->bindParam(':user_manager_profile_id', $user_manager_profile_id, PDO::PARAM_INT);
        
        $locale_id = $managerProfileDetails->getLocale_id();
        $user_manager_profile_details_profile_id = $managerProfileDetails->getUser_manager_profile_id();
        $user_manager_profile_details_aboutme = $managerProfileDetails->getUser_manager_profile_details_aboutme();
        $user_manager_profile_details_proud = $managerProfileDetails->getUser_manager_profile_details_proud();
        $user_manager_profile_details_branch = $managerProfileDetails->getUser_manager_profile_details_branch();
        $user_manager_profile_details_division = $managerProfileDetails->getUser_manager_profile_details_division();
        $user_manager_profile_details_lead_style = $managerProfileDetails->getUser_manager_profile_details_lead_style();
        $user_manager_profile_details_emp_learn = $managerProfileDetails->getUser_manager_profile_details_emp_learn();
        $user_manager_profile_details_expectations = $managerProfileDetails->getUser_manager_profile_details_expectations();
        $user_manager_profile_review_options = $managerProfileDetails->getUser_manager_profile_review_options();
        $user_manager_profile_staylate = $managerProfileDetails->getUser_manager_profile_staylate();
        $user_manager_profile_engage = $managerProfileDetails->getUser_manager_profile_engage();
        $user_manager_profile_devops = $managerProfileDetails->getUser_manager_profile_devops();
        $user_manager_profile_lvwrequests = $managerProfileDetails->getUser_manager_profile_lvwRequests();
        $user_manager_profile_work_experience = $managerProfileDetails->getUser_manager_profile_work_experience();
        $user_manager_profile_education = $managerProfileDetails->getUser_manager_profile_education();
        
        $sql2Str="UPDATE talentcloud.user_manager_profile_details
            SET 
                locale_id = :locale_id,
                user_manager_profile_details_aboutme = :user_manager_profile_details_aboutme,
                user_manager_profile_details_proud = :user_manager_profile_details_proud,
                user_manager_profile_details_branch = :user_manager_profile_details_branch,
                user_manager_profile_details_division = :user_manager_profile_details_division,
                user_manager_profile_details_lead_style = :user_manager_profile_details_lead_style,
                user_manager_profile_details_emp_learn = :user_manager_profile_details_emp_learn,
                user_manager_profile_details_expectations = :user_manager_profile_details_expectations,
                user_manager_profile_review_options = :user_manager_profile_review_options,
                user_manager_profile_staylate = :user_manager_profile_staylate,
                user_manager_profile_engage = :user_manager_profile_engage,
                user_manager_profile_devops = :user_manager_profile_devops,
                user_manager_profile_lvwrequests = :user_manager_profile_lvwrequests,
                user_manager_profile_work_experience = :user_manager_profile_work_experience,
                user_manager_profile_education = :user_manager_profile_education
            WHERE user_manager_profile_id = :user_manager_profile_id;
        ";
        
        $sql2 = $link->prepare($sql2Str);
        $sql2->bindParam(':locale_id', $locale_id, PDO::PARAM_INT);
        $sql2->bindParam(':user_manager_profile_id', $user_manager_profile_details_profile_id, PDO::PARAM_INT);
        $sql2->bindParam(':user_manager_profile_details_aboutme', $user_manager_profile_details_aboutme, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_proud', $user_manager_profile_details_proud, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_branch', $user_manager_profile_details_branch, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_division', $user_manager_profile_details_division, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_lead_style', $user_manager_profile_details_lead_style, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_emp_learn', $user_manager_profile_details_emp_learn, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_expectations', $user_manager_profile_details_expectations, PDO::PARAM_STR);
        
        $sql2->bindParam(':user_manager_profile_review_options', $user_manager_profile_review_options, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_staylate', $user_manager_profile_staylate, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_engage', $user_manager_profile_engage, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_devops', $user_manager_profile_devops, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_lvwrequests', $user_manager_profile_lvwrequests, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_work_experience', $user_manager_profile_work_experience, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_education', $user_manager_profile_education, PDO::PARAM_STR);
        
        $rowsmodified = 0;
        $success = false;
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            $link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql2->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $link->commit();
            $rowsmodified = $sql->rowCount();
            if($rowsmodified > 0){
                $success = true;
            }
        } catch (PDOException $e) {
            return 'createManagerProfile failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $success;
        
    }
    
    public static function getManagerProfile(ManagerProfile $managerProfile){
        
        $link = BaseDAO::getConnection();
        
        $user_id = $managerProfile->getUser_id();
        
        $sqlStr = "
            SELECT 
                ump.user_manager_profile_id,
                ump.user_manager_profile_department_id,
                ump.user_manager_profile_position,
                ump.user_manager_profile_twitter,
                ump.user_manager_profile_linkedin,
                u.user_id
            FROM 
                user u 
                LEFT JOIN user_manager_profile ump on ump.user_id = u.user_id
            WHERE u.user_id = :user_id";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            /*$sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'ManagerProfile', array(
                'user_manager_profile_id', 
                'user_manager_profile_department_id', 
                'user_manager_profile_position_id', 
                'user_manager_profile_branch_id', 
                'user_manager_profile_division_id', 
                'user_manager_profile_twitter',
                'user_manager_profile_linkedin',
                'user_id',
                'profile_pic'));*/
            
            $row = $sql->fetch();
            
            $managerProfile->setUser_manager_profile_id($row['user_manager_profile_id']);
            $managerProfile->setUser_manager_profile_department_id($row['user_manager_profile_department_id']);
            $managerProfile->setUser_manager_profile_position($row['user_manager_profile_position']);
            $managerProfile->setUser_manager_profile_twitter($row['user_manager_profile_twitter']);
            $managerProfile->setUser_manager_profile_linkedin($row['user_manager_profile_linkedin']);
            //$managerProfile->setProfile_pic(base64_encode($row['profile_pic']));
            
            //var_dump($row);
        } catch (PDOException $e) {
            return 'getContentByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $managerProfile;
        
    }
    
    public static function getManagerProfileDetails(ManagerProfile $managerProfile){
        
        $link = BaseDAO::getConnection();
        
        $managerProfile_id = $managerProfile->getUser_manager_profile_id();
        $managerProfileDetails = new ManagerProfileDetails();
        
        $sqlStr = "
            SELECT user_manager_profile_details.user_manager_profile_details_id,
                user_manager_profile_details.locale_id,
                user_manager_profile_details.user_manager_profile_details_aboutme,
                user_manager_profile_details.user_manager_profile_details_proud,
                user_manager_profile_details.user_manager_profile_details_branch,
                user_manager_profile_details.user_manager_profile_details_division,
                user_manager_profile_details.user_manager_profile_details_lead_style,
                user_manager_profile_details.user_manager_profile_details_emp_learn,
                user_manager_profile_details.user_manager_profile_details_expectations,
                user_manager_profile_details.user_manager_profile_id,
                user_manager_profile_details.user_manager_profile_review_options,
                user_manager_profile_details.user_manager_profile_staylate,
                user_manager_profile_details.user_manager_profile_engage,
                user_manager_profile_details.user_manager_profile_devops,
                user_manager_profile_details.user_manager_profile_lvwRequests,
                user_manager_profile_details.user_manager_profile_work_experience,
                user_manager_profile_details.user_manager_profile_education
            FROM talentcloud.user_manager_profile_details
            WHERE user_manager_profile_details.user_manager_profile_id = :managerProfile_id";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':managerProfile_id', $managerProfile_id, PDO::PARAM_INT);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            
            $row = $sql->fetch();
            
            $managerProfileDetails->setUser_manager_profile_id($row['user_manager_profile_id']);
            $managerProfileDetails->setLocale_id($row['locale_id']);
            $managerProfileDetails->setUser_manager_profile_details_aboutme($row['user_manager_profile_details_aboutme']);
            $managerProfileDetails->setUser_manager_profile_details_proud($row['user_manager_profile_details_proud']);
            $managerProfileDetails->setUser_manager_profile_details_branch($row['user_manager_profile_details_branch']);
            $managerProfileDetails->setUser_manager_profile_details_division($row['user_manager_profile_details_division']);
            $managerProfileDetails->setUser_manager_profile_details_lead_style($row['user_manager_profile_details_lead_style']);
            $managerProfileDetails->setUser_manager_profile_details_emp_learn($row['user_manager_profile_details_emp_learn']);
            $managerProfileDetails->setUser_manager_profile_details_expectations($row['user_manager_profile_details_expectations']);
            $managerProfileDetails->setUser_manager_profile_details_id($row['user_manager_profile_details_id']);
            $managerProfileDetails->setUser_manager_profile_review_options($row['user_manager_profile_review_options']);
            $managerProfileDetails->setUser_manager_profile_staylate($row['user_manager_profile_staylate']);
            $managerProfileDetails->setUser_manager_profile_engage($row['user_manager_profile_engage']);
            $managerProfileDetails->setUser_manager_profile_devops($row['user_manager_profile_devops']);
            $managerProfileDetails->setUser_manager_profile_lvwRequests($row['user_manager_profile_lvwRequests']);
            $managerProfileDetails->setUser_manager_profile_work_experience($row['user_manager_profile_work_experience']);
            $managerProfileDetails->setUser_manager_profile_education($row['user_manager_profile_education']);
            
            
            //var_dump($row);
        } catch (PDOException $e) {
            return 'getContentByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $managerProfileDetails;
        
    }
    
}

?>