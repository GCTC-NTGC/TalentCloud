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
set_include_path(get_include_path() . PATH_SEPARATOR);

/** Model Classes */
require_once '../dao/BaseDAO.php';
require_once '../model/ManagerProfile.php';
require_once '../model/ManagerProfileDetails.php';

class ManagerProfileDAO extends BaseDAO{
    
    public static function createManagerProfile(ManagerProfile $managerProfile, ManagerProfileDetails $managerProfileDetails){
        
        $link = BaseDAO::getConnection();
        
        $user_manager_profile_department_id = $managerProfile->getUser_manager_profile_department_id();
        $user_manager_profile_position_id = $managerProfile->getUser_manager_profile_position_id();
        $user_manager_profile_branch_id = $managerProfile->getUser_manager_profile_branch_id();
        $user_manager_profile_division_id = $managerProfile->getUser_manager_profile_division_id();
        $user_manager_profile_twitter = $managerProfile->getUser_manager_profile_twitter();
        $user_manager_profile_linkedin = $managerProfile->getUser_manager_profile_linkedin();
        $user_id = $managerProfile->getUser_id();
        
        $sqlStr="INSERT INTO talentcloud.user_manager_profile
            (
            user_manager_profile_department_id,
            user_manager_profile_position_id,
            user_manager_profile_branch_id,
            user_manager_profile_division_id,
            user_manager_profile_twitter,
            user_manager_profile_linkedin,
            user_id)
            VALUES
            (
            :user_manager_profile_department_id,
            :user_manager_profile_position_id,
            :user_manager_profile_branch_id,
            :user_manager_profile_division_id,
            :user_manager_profile_twitter,
            :user_manager_profile_linkedin,
            :user_id
            );
        ";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':user_manager_profile_department_id', $user_manager_profile_department_id, PDO::PARAM_INT);
        $sql->bindParam(':user_manager_profile_position_id', $user_manager_profile_department_id, PDO::PARAM_INT);
        $sql->bindParam(':user_manager_profile_branch_id', $user_manager_profile_department_id, PDO::PARAM_INT);
        $sql->bindParam(':user_manager_profile_division_id', $user_manager_profile_department_id, PDO::PARAM_INT);
        $sql->bindParam(':user_manager_profile_twitter', $contentType, PDO::PARAM_STR);
        $sql->bindParam(':user_manager_profile_linkedin', $contentType, PDO::PARAM_STR);
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        
        $locale_id = $managerProfileDetails->getLocale_id();
        $user_manager_profile_details_aboutme = $managerProfileDetails->getUser_manager_profile_details_aboutme();
        $user_manager_profile_details_proud = $managerProfileDetails->getUser_manager_profile_details_proud();
        $user_manager_profile_details_lead_style = $managerProfileDetails->getUser_manager_profile_details_lead_style();
        $user_manager_profile_details_emp_learn = $managerProfileDetails->getUser_manager_profile_details_emp_learn();
        $user_manager_profile_details_expectations = $managerProfileDetails->getUser_manager_profile_details_expectations();
        
        $sql2Str="INSERT INTO talentcloud.user_manager_profile_details
            (
            locale_id,
            user_manager_profile_details_aboutme,
            user_manager_profile_details_proud,
            user_manager_profile_details_lead_style,
            user_manager_profile_details_emp_learn,
            user_manager_profile_details_expectations,
            user_manager_profile_id
            )
            VALUES
            (
            :locale_id,
            :user_manager_profile_details_aboutme,
            :user_manager_profile_details_proud,
            :user_manager_profile_details_lead_style,
            :user_manager_profile_details_emp_learn,
            :user_manager_profile_details_expectations,
            last_insert_id()
            );
        ";
        
        $sql2 = $link->prepare($sql2Str);
        $sql2->bindParam(':locale_id', $locale_id, PDO::PARAM_INT);
        $sql2->bindParam(':user_manager_profile_details_aboutme', $user_manager_profile_details_aboutme, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_proud', $user_manager_profile_details_proud, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_lead_style', $user_manager_profile_details_lead_style, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_emp_learn', $user_manager_profile_details_emp_learn, PDO::PARAM_STR);
        $sql2->bindParam(':user_manager_profile_details_expectations', $user_manager_profile_details_expectations, PDO::PARAM_STR);
        
        $rowsmodified = 0;
        
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            $link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql2->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $link->commit();
            $rowsmodified = $sql->rowCount();
            if($rowsmodified > 0){
                $insert_id = $link->lastInsertId();
            }
        } catch (PDOException $e) {
            return 'createManagerProfile failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $insert_id;
        
    }
    
}

?>