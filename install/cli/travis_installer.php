<?php
/**
 * Travis CI CLI installer script. It's designed for core automatic tests only.
 *
 * @access private
 */
$enabled = getenv('TRAVIS') != ''; //are we on Travis?
if (!$enabled) {
	echo "This script should be run only in Travis CI test environment.\n";
	exit(1);
}
if (PHP_SAPI !== 'cli') {
	echo "You must use the command line to run this script.\n";
	exit(2);
}
$tcRoot = dirname(dirname(__DIR__));
require_once "$tcRoot/vendor/autoload.php";

// none of the following may be empty
$params = array(
	// database parameters
	'dbuser' => 'talentcloud',
	'dbpassword' => 'talentcloud',
	'dbname' => 'talentcloud',
	// site settings
	'sitename' => 'TalentCloud | Travis-CI',
	'siteemail' => 'talentcloud-nuagedetalents@tbs-sct.gc.ca',
	'wwwroot' => 'http://localhost',
	'dataroot' => getenv('HOME') . '/data/',
	// admin account
    'displayname' => 'Administrator',
	'email' => 'grant.d.barnes@gmail.com',
	'username' => 'root',
	'password' => 'password',
);
// at this point installation has completed (otherwise an exception halted execution).
echo "Travis-CI CLI install successful. wwwroot: " . $wwwroot . "\n";
