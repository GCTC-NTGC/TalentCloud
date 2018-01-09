<?php
date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
set_time_limit(0);

/** Include path **/
set_include_path("../");
include_once("dao/ContentDAO.php");
include_once("model/Content.php");

$content = ContentDAO::getLocalizedContentByBaseContentId(1, 'en', 'CA');

var_dump($content);

?>