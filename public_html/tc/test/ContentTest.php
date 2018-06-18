<?php
require_once __DIR__ . '/../config/php.config.inc';

/** Include path **/
set_include_path("../");
include_once("dao/ContentDAO.php");
include_once("model/Content.php");

$content = ContentDAO::getLocalizedContentByBaseContentId(1, 'en', 'CA');

var_dump($content);

?>