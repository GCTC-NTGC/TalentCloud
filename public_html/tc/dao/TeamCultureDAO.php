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
require_once '../model/TeamCultureNonLocalized.php';
/**
 * Summary: Data Access Object for Resources
 *
 * @extends BaseDAO
 */
class TeamCultureDAO extends BaseDAO {

    /**
     *
     * @param TeamCultureNonLocalized $teamCulture
     * @param int $managerProfileId
     * @return int $teamCultureId
     */
    public static function createTeamCultureForManagerProfile($teamCulture, $managerProfileId) {
        $link = BaseDAO::getConnection();
        $sqlStr1 = "INSERT INTO team_culture
            (team_size, gc_directory_url)
            VALUES
            (:team_size, :gc_directory_url);";
        $sqlStr2 = "SELECT LAST_INSERT_ID() INTO @team_culture_id;";
        $sqlStr3 = "INSERT INTO manager_profile_to_team_culture
            (user_manager_profile_id, team_culture_id)
            VALUES
            (:manager_profile_id, @team_culture_id)
            ;";

        $sqlStrDetails = "INSERT INTO team_culture_details
            (team_culture_id, narrative_text, operating_context, what_we_value, how_we_work, locale_id)
            VALUES
            (@team_culture_id, :narrative_text_en, :operating_context_en, :what_we_value_en, :how_we_work_en, (SELECT locale.locale_id FROM locale WHERE locale.locale_iso=:en_iso LIMIT 1)),
            (@team_culture_id, :narrative_text_fr, :operating_context_fr, :what_we_value_fr, :how_we_work_fr, (SELECT locale.locale_id FROM locale WHERE locale.locale_iso=:fr_iso LIMIT 1));";

        $sql1 = $link->prepare($sqlStr1);
        $sql2 = $link->prepare($sqlStr2);
        $sql3 = $link->prepare($sqlStr3);
        $sqlDetails = $link->prepare($sqlStrDetails);

        $sql1->bindValue(':team_size', $teamCulture->getTeam_size(), PDO::PARAM_INT);
        $sql1->bindValue(':gc_directory_url', $teamCulture->getGc_directory_url(), PDO::PARAM_STR);

        $sql3->bindValue(':manager_profile_id', $managerProfileId, PDO::PARAM_INT);

        $sqlDetails->bindValue(':narrative_text_en', $teamCulture->getNarrative_text_en(), PDO::PARAM_STR);
        $sqlDetails->bindValue(':narrative_text_fr', $teamCulture->getNarrative_text_fr(), PDO::PARAM_STR);
		$sqlDetails->bindValue(':operating_context_en', $teamCulture->getOperating_context_en(), PDO::PARAM_STR);
        $sqlDetails->bindValue(':operating_context_fr', $teamCulture->getOperating_context_fr(), PDO::PARAM_STR);
		$sqlDetails->bindValue(':what_we_value_en', $teamCulture->getWhat_we_value_en(), PDO::PARAM_STR);
        $sqlDetails->bindValue(':what_we_value_fr', $teamCulture->getWhat_we_value_fr(), PDO::PARAM_STR);
		$sqlDetails->bindValue(':how_we_work_en', $teamCulture->getHow_we_work_en(), PDO::PARAM_STR);
        $sqlDetails->bindValue(':how_we_work_fr', $teamCulture->getHow_we_work_fr(), PDO::PARAM_STR);
        $sqlDetails->bindValue(':en_iso', "en_CA", PDO::PARAM_STR);
        $sqlDetails->bindValue(':fr_iso', "fr_CA", PDO::PARAM_STR);

        $teamCultureId = 0;
        try {
            $link->beginTransaction();
            $sql1->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $teamCultureId = $link->lastInsertId();
            $sql2->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql3->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sqlDetails->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $link->commit();

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
        $sqlStr = "UPDATE
            team_culture tc,
            team_culture_details tcd_en,
            team_culture_details tcd_fr,
            manager_profile_to_team_culture mp_tc,
            locale locale_en,
            locale locale_fr
            SET
                tc.team_size = :team_size,
                tc.gc_directory_url = :gc_directory_url,
                tcd_en.narrative_text = :narrative_text_en,
                tcd_fr.narrative_text = :narrative_text_fr,
				tcd_en.operating_context = :operating_context_en,
				tcd_fr.operating_context = :operating_context_fr,
				tcd_en.what_we_value = :what_we_value_en,
				tcd_fr.what_we_value = :what_we_value_fr,
				tcd_en.how_we_work = :how_we_work_en,
				tcd_fr.how_we_work = :how_we_work_fr
            WHERE
                mp_tc.user_manager_profile_id = :manager_profile_id
                AND mp_tc.team_culture_id = tc.id
                AND tcd_en.team_culture_id = tc.id
                AND tcd_en.locale_id = locale_en.locale_id
                AND locale_en.locale_iso = :en_iso
                AND tcd_fr.team_culture_id = tc.id
                AND tcd_fr.locale_id = locale_fr.locale_id
                AND locale_fr.locale_iso = :fr_iso
            ;";
        $sql = $link->prepare($sqlStr);


        $sql->bindValue(':team_size', $teamCulture->getTeam_size(), PDO::PARAM_INT);
        $sql->bindValue(':gc_directory_url', $teamCulture->getGc_directory_url(), PDO::PARAM_STR);
        $sql->bindValue(':narrative_text_en', $teamCulture->getNarrative_text_en(), PDO::PARAM_STR);
        $sql->bindValue(':narrative_text_fr', $teamCulture->getNarrative_text_fr(), PDO::PARAM_STR);
		$sql->bindValue(':operating_context_en', $teamCulture->getOperating_context_en(), PDO::PARAM_STR);
		$sql->bindValue(':operating_context_fr', $teamCulture->getOperating_context_fr(), PDO::PARAM_STR);
		$sql->bindValue(':what_we_value_en', $teamCulture->getWhat_we_value_en(), PDO::PARAM_STR);
		$sql->bindValue(':what_we_value_fr', $teamCulture->getWhat_we_value_fr(), PDO::PARAM_STR);
		$sql->bindValue(':how_we_work_en', $teamCulture->getHow_we_work_en(), PDO::PARAM_STR);
		$sql->bindValue(':how_we_work_fr', $teamCulture->getHow_we_work_fr(), PDO::PARAM_STR);
        $sql->bindValue(':manager_profile_id', $managerProfileId, PDO::PARAM_INT);
        $sql->bindValue(':en_iso', "en_CA", PDO::PARAM_STR);
        $sql->bindValue(':fr_iso', "fr_CA", PDO::PARAM_STR);

        $rowsModified = 0;
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
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
    public static function getTeamCultureForManagerProfile($managerProfileId, $locale) {
        $link = BaseDAO::getConnection();
        $sqlStr = "SELECT
                tc.team_size as team_size,
                tc.gc_directory_url as gc_directory_url,
                tc_details.narrative_text as narrative_text,
				tc_details.operating_context as operating_context,
				tc_details.what_we_value as what_we_value,
				tc_details.how_we_work as how_we_work
            FROM
            team_culture tc,
            manager_profile_to_team_culture mp_tc,
            team_culture_details tc_details,
            locale
            WHERE
                mp_tc.user_manager_profile_id = :manager_profile_id
                AND mp_tc.team_culture_id = tc.id
                AND tc.id = tc_details.team_culture_id
                AND tc_details.locale_id = locale.locale_id
                AND locale.locale_iso = :locale
            ;";

        $sql = $link->prepare($sqlStr);

        $sql->bindValue(':manager_profile_id', $managerProfileId, PDO::PARAM_INT);
        $sql->bindValue(":locale", $locale, PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'TeamCulture');
            $teamCulture = $sql->fetch();

        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'getTeamCultureForManagerProfile failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $teamCulture;
    }

    /**
     *
     * @param int $managerProfileId
     * @return TeamCultureNonLocalized $teamCulture
     */
    public static function getTeamCultureNonLocalizedForManagerProfile($managerProfileId) {
        $link = BaseDAO::getConnection();
        $sqlStr = "SELECT
                tc.team_size as team_size,
                tc.gc_directory_url as gc_directory_url,
                tcd_en.narrative_text as narrative_text_en,
                tcd_fr.narrative_text as narrative_text_fr,
				tcd_en.operating_context as operating_context_en,
                tcd_fr.operating_context as operating_context_fr,
				tcd_en.what_we_value as what_we_value_en,
                tcd_fr.what_we_value as what_we_value_fr,
				tcd_en.how_we_work as how_we_work_en,
                tcd_fr.how_we_work as how_we_work_fr
            FROM
            team_culture tc,
            manager_profile_to_team_culture mp_tc,
            team_culture_details tcd_en,
            team_culture_details tcd_fr,
            locale locale_en,
            locale locale_fr
            WHERE
                mp_tc.user_manager_profile_id = :manager_profile_id
                AND mp_tc.team_culture_id = tc.id
                AND tcd_en.team_culture_id = tc.id
                AND tcd_en.locale_id = locale_en.locale_id
                AND locale_en.locale_iso = :en_iso
                AND tcd_fr.team_culture_id = tc.id
                AND tcd_fr.locale_id = locale_fr.locale_id
                AND locale_fr.locale_iso = :fr_iso
            ;";

        $sql = $link->prepare($sqlStr);

        $sql->bindValue(':manager_profile_id', $managerProfileId, PDO::PARAM_INT);
        $sql->bindValue(":en_iso", "en_CA", PDO::PARAM_STR);
        $sql->bindValue(":fr_iso", "fr_CA", PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'TeamCultureNonLocalized');
            $teamCulture = $sql->fetch();

        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'getTeamCultureNonLocalizedForManagerProfile failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $teamCulture;
    }
}
