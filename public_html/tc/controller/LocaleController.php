<?php

date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if (!isset($_SESSION)) {
    session_start();
}

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../dao/LocaleDAO.php';

/**
 * 
 */
class LocaleController {

    /**
     * 
     * @global type array - $locales
     * @return type array - $locales
     */
    public static function getLocales() {
            
        $locales = LocaleDAO::getLocales();

        return $locales;
    }

    /**
     * 
     * @global type array - $locales
     * @return type array - $locales
     */
    public static function getSiteLocales() {
        $locales = array();

        //$locales = unserialize(LOCALES);
                $locales = LocaleDAO::getLocales();

        return $locales;
    }

    /**
     * 
     * @global type array - $locales
     * @return type array - $locales
     */
    public static function getSessionLocale() {

                $locale = new Locale();
                
        return $locale;
    }
        
    /**
     * 
     * @global type array - $locales
     * @return type array - $locales
     */
    public static function setLocale($newLocale) {

                $pieces = explode("_", $newLocale);
                
                $country_code = $pieces[1];
                $language_abbreviation = $pieces[0];
                
                $locale = LocaleDAO::getLocaleByIsoCode($country_code, $language_abbreviation);
                //var_dump($locale);
        return $locale;
    }

}

?>