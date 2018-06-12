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

if (!isset($_SESSION)) {
    session_start();
}

/*set api path*/
if (!defined('ROOT_PATH')) {
    define('ROOT_PATH', dirname(__DIR__) . '/');
}

/** Model Classes */
require_once ROOT_PATH . 'dao/BaseDAO.php';
require_once ROOT_PATH . 'model/ManagerProfile.php';
require_once ROOT_PATH . 'model/ManagerProfileDetails.php';
require_once ROOT_PATH . 'model/ManagerProfileDetailsNonLocalized.php';

class ManagerProfileDAO extends BaseDAO {

    /**
     *
     * @param ManagerProfile $managerProfile
     * @param ManagerProfileDetails $managerProfileDetails
     * @return int $profileId
     */
    public static function createManagerProfile(ManagerProfile $managerProfile, ManagerProfileDetailsNonLocalized $managerProfileDetails) {

        $link = BaseDAO::getConnection();

        $user_manager_profile_department_id = $managerProfile->getUser_manager_profile_department_id();
        $user_manager_profile_twitter = $managerProfile->getUser_manager_profile_twitter();
        $user_manager_profile_linkedin = $managerProfile->getUser_manager_profile_linkedin();
        $user_id = $managerProfile->getUser_id();

        $sqlStr = "INSERT INTO talentcloud.user_manager_profile
            (
            user_manager_profile_department_id,
            user_manager_profile_twitter,
            user_manager_profile_linkedin,
            user_id)
            VALUES
            (
            :user_manager_profile_department_id,
            :user_manager_profile_twitter,
            :user_manager_profile_linkedin,
            :user_id
            );
        ";

        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':user_manager_profile_department_id', $user_manager_profile_department_id, PDO::PARAM_STR);
        $sql->bindParam(':user_manager_profile_twitter', $user_manager_profile_twitter, PDO::PARAM_STR);
        $sql->bindParam(':user_manager_profile_linkedin', $user_manager_profile_linkedin, PDO::PARAM_STR);
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);

        //$locale_id = $managerProfileDetails->getLocale_id();
        $user_manager_profile_details_aboutme = $managerProfileDetails->getUser_manager_profile_details_aboutme();
        $user_manager_profile_details_aboutme_fr = $managerProfileDetails->getUser_manager_profile_details_aboutme_fr();
        $user_manager_profile_details_proud = $managerProfileDetails->getUser_manager_profile_details_proud();
        $user_manager_profile_details_proud_fr = $managerProfileDetails->getUser_manager_profile_details_proud_fr();
        $user_manager_profile_details_branch = $managerProfileDetails->getUser_manager_profile_details_branch();
        $user_manager_profile_details_branch_fr = $managerProfileDetails->getUser_manager_profile_details_branch_fr();
        $user_manager_profile_details_division = $managerProfileDetails->getUser_manager_profile_details_division();
        $user_manager_profile_details_division_fr = $managerProfileDetails->getUser_manager_profile_details_division_fr();
        $user_manager_profile_details_position = $managerProfileDetails->getUser_manager_profile_details_position();
        $user_manager_profile_details_position_fr = $managerProfileDetails->getUser_manager_profile_details_position_fr();
        $user_manager_profile_details_lead_style = $managerProfileDetails->getUser_manager_profile_details_lead_style();
        $user_manager_profile_details_lead_style_fr = $managerProfileDetails->getUser_manager_profile_details_lead_style_fr();
        $user_manager_profile_details_emp_learn = $managerProfileDetails->getUser_manager_profile_details_emp_learn();
        $user_manager_profile_details_emp_learn_fr = $managerProfileDetails->getUser_manager_profile_details_emp_learn_fr();
        $user_manager_profile_details_expectations = $managerProfileDetails->getUser_manager_profile_details_expectations();
        $user_manager_profile_details_expectations_fr = $managerProfileDetails->getUser_manager_profile_details_expectations_fr();

        $user_manager_profile_review_options = $managerProfileDetails->getUser_manager_profile_review_options();
        $user_manager_profile_staylate = $managerProfileDetails->getUser_manager_profile_staylate();
        $user_manager_profile_engage = $managerProfileDetails->getUser_manager_profile_engage();
        $user_manager_profile_devops = $managerProfileDetails->getUser_manager_profile_devops();
        $user_manager_profile_lvwrequests = $managerProfileDetails->getUser_manager_profile_lvwRequests();
        $user_manager_profile_work_experience = $managerProfileDetails->getUser_manager_profile_work_experience();
        $user_manager_profile_work_experience_fr = $managerProfileDetails->getUser_manager_profile_work_experience_fr();
        $user_manager_profile_education = $managerProfileDetails->getUser_manager_profile_education();
        $user_manager_profile_education_fr = $managerProfileDetails->getUser_manager_profile_education_fr();

        $sqlSelect = "SELECT LAST_INSERT_ID() INTO @user_manager_profile_id;";

        $sql2Str = "INSERT INTO talentcloud.user_manager_profile_details
            (
            locale_id,
            user_manager_profile_details_aboutme,
            user_manager_profile_details_proud,
            user_manager_profile_details_branch,
            user_manager_profile_details_division,
            user_manager_profile_details_position,
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
            (1,:user_manager_profile_details_aboutme,:user_manager_profile_details_proud,:user_manager_profile_details_branch,:user_manager_profile_details_division, :user_manager_profile_details_position, :user_manager_profile_details_lead_style, :user_manager_profile_details_emp_learn, :user_manager_profile_details_expectations, @user_manager_profile_id, :user_manager_profile_review_options, :user_manager_profile_staylate, :user_manager_profile_engage, :user_manager_profile_devops, :user_manager_profile_lvwrequests, :user_manager_profile_work_experience, :user_manager_profile_education),
            (2,:user_manager_profile_details_aboutme_fr,:user_manager_profile_details_proud_fr,:user_manager_profile_details_branch_fr,:user_manager_profile_details_division_fr, :user_manager_profile_details_position_fr, :user_manager_profile_details_lead_style_fr, :user_manager_profile_details_emp_learn_fr, :user_manager_profile_details_expectations_fr, @user_manager_profile_id, :user_manager_profile_review_options_fr, :user_manager_profile_staylate_fr, :user_manager_profile_engage_fr, :user_manager_profile_devops_fr, :user_manager_profile_lvwrequests_fr, :user_manager_profile_work_experience_fr, :user_manager_profile_education_fr);
        ";

        $sqlS = $link->prepare($sqlSelect);
        $sql2 = $link->prepare($sql2Str);

        //$sql2->bindValue(':locale_id', $locale_id, PDO::PARAM_INT);
        $sql2->bindValue(':user_manager_profile_details_aboutme', $user_manager_profile_details_aboutme, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_aboutme_fr', $user_manager_profile_details_aboutme_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_proud', $user_manager_profile_details_proud, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_proud_fr', $user_manager_profile_details_proud_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_branch', $user_manager_profile_details_branch, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_branch_fr', $user_manager_profile_details_branch_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_division', $user_manager_profile_details_division, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_division_fr', $user_manager_profile_details_division_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_position', $user_manager_profile_details_position, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_position_fr', $user_manager_profile_details_position_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_lead_style', $user_manager_profile_details_lead_style, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_lead_style_fr', $user_manager_profile_details_lead_style_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_emp_learn', $user_manager_profile_details_emp_learn, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_emp_learn_fr', $user_manager_profile_details_emp_learn_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_expectations', $user_manager_profile_details_expectations, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_expectations_fr', $user_manager_profile_details_expectations_fr, PDO::PARAM_STR);

        $sql2->bindValue(':user_manager_profile_review_options', $user_manager_profile_review_options, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_staylate', $user_manager_profile_staylate, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_engage', $user_manager_profile_engage, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_devops', $user_manager_profile_devops, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_lvwrequests', $user_manager_profile_lvwrequests, PDO::PARAM_STR);

        $sql2->bindValue(':user_manager_profile_review_options_fr', $user_manager_profile_review_options, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_staylate_fr', $user_manager_profile_staylate, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_engage_fr', $user_manager_profile_engage, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_devops_fr', $user_manager_profile_devops, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_lvwrequests_fr', $user_manager_profile_lvwrequests, PDO::PARAM_STR);

        $sql2->bindValue(':user_manager_profile_work_experience', $user_manager_profile_work_experience, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_work_experience_fr', $user_manager_profile_work_experience_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_education', $user_manager_profile_education, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_education_fr', $user_manager_profile_education_fr, PDO::PARAM_STR);

        $rowsmodified = 0;

        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            $link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $profileId = $link->lastInsertId();
            $sqlS->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql2->execute() or die("ERROR: " . implode(":", $link->errorInfo()));

            $link->commit();
            $rowsmodified = $sql->rowCount();
            
        } catch (PDOException $e) {
            return 'createManagerProfile failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $profileId;

    }

        /**
         *
         * @param ManagerProfile $managerProfile
         * @param ManagerProfileDetails $managerProfileDetails
         * @return int $profileId
         */
    public static function updateManagerProfile(ManagerProfile $managerProfile, ManagerProfileDetailsNonLocalized $managerProfileDetails){

        //var_dump($managerProfile->getUser_manager_profile_id());

        $link = BaseDAO::getConnection();

        $user_manager_profile_department_id = $managerProfile->getUser_manager_profile_department_id();
        $user_manager_profile_twitter = $managerProfile->getUser_manager_profile_twitter();
        $user_manager_profile_linkedin = $managerProfile->getUser_manager_profile_linkedin();
        $user_id = intval($managerProfile->getUser_id());

        $sqlStr = "UPDATE talentcloud.user_manager_profile
            SET
                user_manager_profile_department_id = :user_manager_profile_department_id,
                user_manager_profile_twitter = :user_manager_profile_twitter,
                user_manager_profile_linkedin = :user_manager_profile_linkedin,
                user_id = :user_id
            WHERE user_manager_profile_id = :user_manager_profile_id;
        ";

        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':user_manager_profile_department_id', $user_manager_profile_department_id, PDO::PARAM_STR);
        $sql->bindParam(':user_manager_profile_twitter', $user_manager_profile_twitter, PDO::PARAM_STR);
        $sql->bindParam(':user_manager_profile_linkedin', $user_manager_profile_linkedin, PDO::PARAM_STR);
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $sql->bindParam(':user_manager_profile_id', $user_manager_profile_id, PDO::PARAM_INT);

        //$locale_id = $managerProfileDetails->getLocale_id();
        $user_manager_profile_details_aboutme = $managerProfileDetails->getUser_manager_profile_details_aboutme();
        $user_manager_profile_details_aboutme_fr = $managerProfileDetails->getUser_manager_profile_details_aboutme_fr();
        $user_manager_profile_details_proud = $managerProfileDetails->getUser_manager_profile_details_proud();
        $user_manager_profile_details_proud_fr = $managerProfileDetails->getUser_manager_profile_details_proud_fr();
        $user_manager_profile_details_branch = $managerProfileDetails->getUser_manager_profile_details_branch();
        $user_manager_profile_details_branch_fr = $managerProfileDetails->getUser_manager_profile_details_branch_fr();
        $user_manager_profile_details_division = $managerProfileDetails->getUser_manager_profile_details_division();
        $user_manager_profile_details_division_fr = $managerProfileDetails->getUser_manager_profile_details_division_fr();
        $user_manager_profile_details_position = $managerProfileDetails->getUser_manager_profile_details_position();
        $user_manager_profile_details_position_fr = $managerProfileDetails->getUser_manager_profile_details_position_fr();
        $user_manager_profile_details_lead_style = $managerProfileDetails->getUser_manager_profile_details_lead_style();
        $user_manager_profile_details_lead_style_fr = $managerProfileDetails->getUser_manager_profile_details_lead_style_fr();
        $user_manager_profile_details_emp_learn = $managerProfileDetails->getUser_manager_profile_details_emp_learn();
        $user_manager_profile_details_emp_learn_fr = $managerProfileDetails->getUser_manager_profile_details_emp_learn_fr();
        $user_manager_profile_details_expectations = $managerProfileDetails->getUser_manager_profile_details_expectations();
        $user_manager_profile_details_expectations_fr = $managerProfileDetails->getUser_manager_profile_details_expectations_fr();

        $user_manager_profile_review_options = $managerProfileDetails->getUser_manager_profile_review_options();
        $user_manager_profile_staylate = $managerProfileDetails->getUser_manager_profile_staylate();
        $user_manager_profile_engage = $managerProfileDetails->getUser_manager_profile_engage();
        $user_manager_profile_devops = $managerProfileDetails->getUser_manager_profile_devops();
        $user_manager_profile_lvwrequests = $managerProfileDetails->getUser_manager_profile_lvwRequests();
        $user_manager_profile_work_experience = $managerProfileDetails->getUser_manager_profile_work_experience();
        $user_manager_profile_work_experience_fr = $managerProfileDetails->getUser_manager_profile_work_experience_fr();
        $user_manager_profile_education = $managerProfileDetails->getUser_manager_profile_education();
        $user_manager_profile_education_fr = $managerProfileDetails->getUser_manager_profile_education_fr();

        $sql2Str = "UPDATE
            user_manager_profile up,
            user_manager_profile_details upd_en,
            user_manager_profile_details upd_fr,
            locale l_en,
            locale l_fr
            SET
                upd_en.user_manager_profile_details_aboutme = :user_manager_profile_details_aboutme,
                upd_en.user_manager_profile_details_proud = :user_manager_profile_details_proud,
                upd_en.user_manager_profile_details_branch = :user_manager_profile_details_branch,
                upd_en.user_manager_profile_details_division = :user_manager_profile_details_division,
                upd_en.user_manager_profile_details_position = :user_manager_profile_details_position,
                upd_en.user_manager_profile_details_lead_style = :user_manager_profile_details_lead_style,
                upd_en.user_manager_profile_details_emp_learn = :user_manager_profile_details_emp_learn,
                upd_en.user_manager_profile_details_expectations = :user_manager_profile_details_expectations,
                upd_en.user_manager_profile_review_options = :user_manager_profile_review_options,
                upd_en.user_manager_profile_staylate = :user_manager_profile_staylate,
                upd_en.user_manager_profile_engage = :user_manager_profile_engage,
                upd_en.user_manager_profile_devops = :user_manager_profile_devops,
                upd_en.user_manager_profile_lvwrequests = :user_manager_profile_lvwrequests,
                upd_en.user_manager_profile_work_experience = :user_manager_profile_work_experience,
                upd_en.user_manager_profile_education = :user_manager_profile_education,

                upd_fr.user_manager_profile_details_aboutme = :user_manager_profile_details_aboutme_fr,
                upd_fr.user_manager_profile_details_proud = :user_manager_profile_details_proud_fr,
                upd_fr.user_manager_profile_details_branch = :user_manager_profile_details_branch_fr,
                upd_fr.user_manager_profile_details_division = :user_manager_profile_details_division_fr,
                upd_fr.user_manager_profile_details_position = :user_manager_profile_details_position_fr,
                upd_fr.user_manager_profile_details_lead_style = :user_manager_profile_details_lead_style_fr,
                upd_fr.user_manager_profile_details_emp_learn = :user_manager_profile_details_emp_learn_fr,
                upd_fr.user_manager_profile_details_expectations = :user_manager_profile_details_expectations_fr,
                upd_fr.user_manager_profile_review_options = :user_manager_profile_review_options_fr,
                upd_fr.user_manager_profile_staylate = :user_manager_profile_staylate_fr,
                upd_fr.user_manager_profile_engage = :user_manager_profile_engage_fr,
                upd_fr.user_manager_profile_devops = :user_manager_profile_devops_fr,
                upd_fr.user_manager_profile_lvwrequests = :user_manager_profile_lvwrequests_fr,
                upd_fr.user_manager_profile_work_experience = :user_manager_profile_work_experience_fr,
                upd_fr.user_manager_profile_education = :user_manager_profile_education_fr

            WHERE upd_en.user_manager_profile_id = up.user_manager_profile_id
            AND upd_fr.user_manager_profile_id = up.user_manager_profile_id
            AND upd_en.locale_id = l_en.locale_id
            AND l_en.locale_iso = :en_iso
            AND upd_fr.locale_id = l_fr.locale_id
            AND l_fr.locale_iso = :fr_iso
        ";

        $sql2 = $link->prepare($sql2Str);

        $sql2->bindValue(':en_iso', "en_CA", PDO::PARAM_STR);
        $sql2->bindValue(':fr_iso', "fr_CA", PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_aboutme', $user_manager_profile_details_aboutme, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_aboutme_fr', $user_manager_profile_details_aboutme_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_proud', $user_manager_profile_details_proud, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_proud_fr', $user_manager_profile_details_proud_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_branch', $user_manager_profile_details_branch, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_branch_fr', $user_manager_profile_details_branch_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_division', $user_manager_profile_details_division, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_division_fr', $user_manager_profile_details_division_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_position', $user_manager_profile_details_position, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_position_fr', $user_manager_profile_details_position_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_lead_style', $user_manager_profile_details_lead_style, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_lead_style_fr', $user_manager_profile_details_lead_style_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_emp_learn', $user_manager_profile_details_emp_learn, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_emp_learn_fr', $user_manager_profile_details_emp_learn_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_expectations', $user_manager_profile_details_expectations, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_details_expectations_fr', $user_manager_profile_details_expectations_fr, PDO::PARAM_STR);

        $sql2->bindValue(':user_manager_profile_review_options', $user_manager_profile_review_options, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_staylate', $user_manager_profile_staylate, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_engage', $user_manager_profile_engage, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_devops', $user_manager_profile_devops, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_lvwrequests', $user_manager_profile_lvwrequests, PDO::PARAM_STR);

        $sql2->bindValue(':user_manager_profile_review_options_fr', $user_manager_profile_review_options, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_staylate_fr', $user_manager_profile_staylate, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_engage_fr', $user_manager_profile_engage, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_devops_fr', $user_manager_profile_devops, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_lvwrequests_fr', $user_manager_profile_lvwrequests, PDO::PARAM_STR);

        $sql2->bindValue(':user_manager_profile_work_experience', $user_manager_profile_work_experience, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_work_experience_fr', $user_manager_profile_work_experience_fr, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_education', $user_manager_profile_education, PDO::PARAM_STR);
        $sql2->bindValue(':user_manager_profile_education_fr', $user_manager_profile_education_fr, PDO::PARAM_STR);

        $rowsmodified = 0;
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            $link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql2->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $link->commit();
            $rowsmodified = $sql->rowCount();
            if ($rowsmodified > 0) {
                $success = true;
            }
        } catch (PDOException $e) {
            return 'createManagerProfile failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $success;

    }

    public static function getManagerProfileByUser($userId) {

        $link = BaseDAO::getConnection();

        $sqlStr = "
            SELECT
                ump.user_manager_profile_id,
                ump.user_manager_profile_department_id,
                ump.user_manager_profile_twitter,
                ump.user_manager_profile_linkedin,
                ump.user_id
            FROM
                user_manager_profile ump
            WHERE ump.user_id = :user_id
            ORDER BY ump.user_manager_profile_id DESC LIMIT 1;";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':user_id', $userId, PDO::PARAM_INT);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'ManagerProfile');
            $managerProfile = $sql->fetch();
            
            /*
            $managerProfile->setUser_manager_profile_id($row['user_manager_profile_id']);
            $managerProfile->setUser_manager_profile_department_id($row['user_manager_profile_department_id']);
            $managerProfile->setUser_manager_profile_twitter($row['user_manager_profile_twitter']);
            $managerProfile->setUser_manager_profile_linkedin($row['user_manager_profile_linkedin']);
            //$managerProfile->setProfile_pic(base64_encode($row['profile_pic']));
            */
            
        } catch (PDOException $e) {
            return 'getContentByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $managerProfile;

    }

    public static function getManagerProfileDetailsByLocale(ManagerProfile $managerProfile, $locale) {

        $link = BaseDAO::getConnection();

        $managerProfile_id = $managerProfile->getUser_manager_profile_id();
        $managerProfileDetails = new ManagerProfileDetails();

        $sqlStr = "
            SELECT
                mpd.user_manager_profile_details_id,
                l.locale_id,
                mpd.user_manager_profile_details_aboutme,
                mpd.user_manager_profile_details_proud,
                mpd.user_manager_profile_details_branch,
                mpd.user_manager_profile_details_division,
                mpd.user_manager_profile_details_position,
                mpd.user_manager_profile_details_lead_style,
                mpd.user_manager_profile_details_emp_learn,
                mpd.user_manager_profile_details_expectations,
                mpd.user_manager_profile_id,
                mpd.user_manager_profile_review_options,
                mpd.user_manager_profile_staylate,
                mpd.user_manager_profile_engage,
                mpd.user_manager_profile_devops,
                mpd.user_manager_profile_lvwRequests,
                mpd.user_manager_profile_work_experience,
                mpd.user_manager_profile_education,
                mpd.locale_id
            FROM talentcloud.user_manager_profile_details mpd,
                talentcloud.locale l
            WHERE mpd.user_manager_profile_id = :managerProfile_id
            AND mpd.locale_id = l.locale_id
            AND l.locale_iso = :locale_iso
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':managerProfile_id', $managerProfile_id, PDO::PARAM_INT);
        $sql->bindParam(':locale_iso', $locale, PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'ManagerProfileDetails', array(
                'user_manager_profile_id', 'locale_id', 'user_manager_profile_details_aboutme', 'user_manager_profile_details_proud', 'user_manager_profile_details_branch', 'user_manager_profile_details_division', 'user_manager_profile_details_position', 'user_manager_profile_details_lead_style', 'user_manager_profile_details_emp_learn', 'user_manager_profile_details_expectations', 'user_manager_profile_details_id', 'user_manager_profile_review_options', 'user_manager_profile_staylate', 'user_manager_profile_engage', 'user_manager_profile_devops', 'user_manager_profile_lvwRequests', 'user_manager_profile_work_experience', 'user_manager_profile_education'
            ));
            $managerProfileDetails = $sql->fetch();

            //var_dump($row);
        } catch (PDOException $e) {
            return 'getManagerProfileDetailsByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $managerProfileDetails;

    }

}

?>
