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

/** Model Classes */
require_once '../dao/BaseDAO.php';
require_once '../model/TeamCulture.php';
/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class TeamCultureDAO extends BaseDAO {

    /**
     * 
     * @param TeamCulture $teamCulture
     * @param int $managerProfileId
     * @return int $teamCultureId
     */
    public static function createTeamCultureForManagerProfile($teamCulture, $managerProfileId) {
        $link = BaseDAO::getConnection();
        $sqlStr1 = "INSERT INTO team_culture 
            (team_size, gc_directory_url, narrative_text)
            VALUES
            (:team_size, :gc_directory_url, :narrative_text);";
        $sqlStr2 = "SELECT LAST_INSERT_ID() INTO @team_culture_id;";
        $sqlStr3 = "INSERT INTO manager_profile_to_team_culture
            (user_manager_profile_id, team_culture_id)
            VALUES
            (:manager_profile_id, @team_culture_id)
            ;";
        $sql1 = $link->prepare($sqlStr1);
        $sql2 = $link->prepare($sqlStr2);
        $sql3 = $link->prepare($sqlStr3);
        
        $sql1->bindValue(':team_size', $teamCulture->getTeam_size(), PDO::PARAM_INT);
        $sql1->bindValue(':gc_directory_url', $teamCulture->getGc_directory_url(), PDO::PARAM_STR);
        $sql1->bindValue(':narrative_text', $teamCulture->getNarrative_text(), PDO::PARAM_STR);
        
        $sql3->bindValue(':manager_profile_id', $managerProfileId, PDO::PARAM_INT);
        
        $teamCultureId = 0;
        try {
            $sql1->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $teamCultureId = $link->lastInsertId();
            $sql2->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql3->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'setTeamCultureForManagerProfile failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $teamCultureId;
    }
    
    /**
     * 
     * @param TeamCulture $teamCulture
     * @param int $managerProfileId
     * @return int $rowsModified
     */
    public static function updateTeamCultureForManagerProfile($teamCulture, $managerProfileId) {
        $link = BaseDAO::getConnection();
        $sqlStr = "UPDATE team_culture tc, manager_profile_to_team_culture mp_tc
            SET 
                tc.team_size = :team_size, 
                tc.gc_directory_url = :gc_directory_url,
                tc.narrative_text = :narrative_text
            WHERE
                mp_tc.user_manager_profile_id = :manager_profile_id
                AND mp_tc.team_culture_id = tc.id
            ;";
        $sql = $link->prepare($sqlStr);

        
        $sql->bindValue(':team_size', $teamCulture->getTeam_size(), PDO::PARAM_INT);
        $sql->bindValue(':gc_directory_url', $teamCulture->getGc_directory_url(), PDO::PARAM_STR);
        $sql->bindValue(':narrative_text', $teamCulture->getNarrative_text(), PDO::PARAM_STR);
        $sql->bindValue(':manager_profile_id', $managerProfileId, PDO::PARAM_INT);
        
        $rowsModified = 0;
        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $rowsModified = $sql->rowCount();
            
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'updateTeamCultureForManagerProfile failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rowsModified;
    }
    
    /**
     * 
     * @param int $managerProfileId
     * @return TeamCulture $teamCulture
     */
    public static function getTeamCultureForManagerProfile($managerProfileId) {
        $link = BaseDAO::getConnection();
        $sqlStr = "SELECT 
                tc.team_size as team_size, 
                tc.gc_directory_url as gc_directory_url,
                tc.narrative_text as narrative_text
            FROM 
            team_culture tc, manager_profile_to_team_culture mp_tc
            WHERE
                mp_tc.user_manager_profile_id = :manager_profile_id
                AND mp_tc.team_culture_id = tc.id
            ;";
        
        $sql = $link->prepare($sqlStr);
        
        $sql->bindValue(':manager_profile_id', $managerProfileId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'TeamCulture');
            $teamCulture = $sql->fetch();   
            
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'getTeamCultureForManagerProfile failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $teamCulture;
    }
}