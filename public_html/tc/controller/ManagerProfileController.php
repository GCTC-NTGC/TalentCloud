<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../model/ManagerProfile.php';
require_once '../model/ManagerProfileDetails.php';
require_once '../dao/ManagerProfileDAO.php';

class ManagerProfileController{
    
    public static function createManagerProfile($managerProfile,$managerProfileDetails){
        
        $response = ManagerProfileDAO::createManagerProfile($managerProfile, $managerProfileDetails);
        
        return $response;
        
    }
    
    public static function getManagerProfile($managerProfile){
        $response = ManagerProfileDAO::getManagerProfile($managerProfile);
        
        return $response;
    }
    
}
?>