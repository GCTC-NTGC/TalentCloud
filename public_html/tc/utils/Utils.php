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

    /**
     * 
     * @param type $variable
     * @return type
     */
    public function is_defined(&$variable) {
        return isset($variable) && !is_null($variable);
    }

    /**
     * 
     * @param type $requestParams
     * @return type
     */
    public static function getLocaleFromRequest($requestParams) {

        $uri_delimiter = "/";

        $params = explode($uri_delimiter, $requestParams);

        $locale = $params[3];

        return $locale;
    }

    /**
     * 
     * @param type $requestParams
     * @param type $paramIndex
     * @return type
     */
    public static function getParameterFromRequest($requestParams, $paramIndex) {

        $uri_delimiter = "/";

        $params = explode($uri_delimiter, $requestParams);

        $paramValue = $params[$paramIndex];

        return $paramValue;
    }

    /**
     * 
     * @param type $requestParams
     * @param type $paramIndex
     * @return type
     */
    public static function getParameterFromheader($requestParams, $paramIndex) {

        $uri_delimiter = "/";

        $params = explode($uri_delimiter, $requestParams);

        $paramValue = $params[$paramIndex];

        return $paramValue;
    }

    /**
     * 
     * @param type $data
     * @return type
     */
    public static function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * 
     */
    public static function base64url_decode($data) {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }

}
