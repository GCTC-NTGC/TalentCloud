<?php

$root=pathinfo($_SERVER['SCRIPT_FILENAME']);

define ('BASE_FOLDER', basename($root['dirname']));

?>