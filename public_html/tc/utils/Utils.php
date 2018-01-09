<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Utils
 *
 * @author gregg
 */
class Utils {
    //put your code here
    public function is_defined(&$variable) {
        return isset($variable) && !is_null($variable);
    }
    
    public static function getLocaleFromRequest($requestParams){
        
        $uri_delimiter = "/";
        
        $params = explode($uri_delimiter, $requestParams);
        
        $locale = $params[3];
        
        return $locale;
    }
    
    public static function getParameterFromRequest($requestParams,$paramIndex){
        
        $uri_delimiter = "/";
        
        $params = explode($uri_delimiter, $requestParams);
        
        $paramValue = $params[$paramIndex];
        
        return $paramValue;
    }
    
    public static function getParameterFromheader($requestParams,$paramIndex){
        
        $uri_delimiter = "/";
        
        $params = explode($uri_delimiter, $requestParams);
        
        $paramValue = $params[$paramIndex];
        
        return $paramValue;
    }
}
