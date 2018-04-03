<?php

require_once '../model/TeamCulture.php';
require_once '../model/TeamCultureNonLocalized.php';
require_once '../dao/TeamCultureDAO.php';

class TeamCultureController {
    
    /**
     * 
     * @param TeamCultureNonLocalized $teamCulture
     * @param int $managerProfileId
     * @return TeamCultureNonLocalized
     */
    public static function setTeamCultureByManagerProfileId($teamCulture, $managerProfileId) {
        $previousEntry = TeamCultureDAO::getTeamCultureNonLocalizedForManagerProfile($managerProfileId);
        if ($previousEntry) {
            $result = TeamCultureDAO::updateTeamCultureForManagerProfile($teamCulture, $managerProfileId);
        } else {
            $result = TeamCultureDAO::createTeamCultureForManagerProfile($teamCulture, $managerProfileId);
        }
        return $result;
    }
    
    /**
     * 
     * @param int $managerProfileId
     * @param string $locale
     * @return TeamCulture
     */
    public static function getTeamCultureByManagerProfileId($managerProfileId, $locale) {
        return TeamCultureDAO::getTeamCultureForManagerProfile($managerProfileId, $locale);
    }
    
    public static function getTeamCultureNonLocalizedByManagerProfileId($managerProfileId) {
        return TeamCultureDAO::getTeamCultureNonLocalizedForManagerProfile($managerProfileId);
    }
}

