<?php

define('DEBUG_MODE', true);
define('NETWORK_REQUEST_TIMEOUT', 5);

date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);

if (DEBUG_MODE) {
    ini_set("display_errors", 1);
} else {
    ini_set("display_errors", 0);
}

set_time_limit(0);

if(!isset($_SESSION)){
    session_start();
}

include __DIR__ . '/constants.config.inc';

?>