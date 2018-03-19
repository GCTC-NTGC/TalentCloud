<?php

require_once '../model/TeamCulture.php';
require_once '../dao/TeamCultureDAO.php';

class TeamCultureController {
    
    public static function setTeamCultureByManagerProfileId($teamCulture, $managerProfileId) {
        $previousEntry = TeamCultureDAO::getTeamCultureForManagerProfile($managerProfileId);
        if ($previousEntry) {
            TeamCultureDAO::updateTeamCultureForManagerProfile($teamCulture, $managerProfileId);
        } else {
            TeamCultureDAO::createTeamCultureForManagerProfile($teamCulture, $managerProfileId);
        }
        return $teamCulture;
    }
    
    public static function getTeamCultureByManagerProfileId($managerProfileId) {
        return TeamCultureDAO::getTeamCultureForManagerProfile($managerProfileId);
    }
}

