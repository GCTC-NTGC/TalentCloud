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

require_once '../dao/ContentDAO.php';
require_once '../model/Content.php';

/**
 * 
 */
class ContentController {

    /**
     * 
     * @param string $page_name
     * @param string $locale
     * @return Page object
     */
    public static function getContentByLocale($locale) {
        
        $content = new Content();
        $labels = ContentDAO::getContentByLocale($locale, "label");
        //var_dump($labels);
        $content->setContent($labels);
        //var_dump($content);
        return $content;
    }

}

?>