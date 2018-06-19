<?php

require_once __DIR__ . '/../config/php.config.inc';

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../dao/ContentDAO.php';
require_once __DIR__ . '/../model/Content.php';

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