<?php
/**
 * Docker CLI installer script.
 *
 * @access private
 */
$enabled = getenv('DOCKER') != ''; //are we in a Docker container?
if (!$enabled) {
	echo "This script should be run only in a properly configured Docker container environment.\n";
	exit(1);
}
if (PHP_SAPI !== 'cli') {
	echo "You must use the command line to run this script.\n";
	exit(2);
}
$tcRoot = dirname(dirname(__DIR__));
require_once "$tcRoot/vendor/autoload.php";
if (getenv('DBHOST') != '')
	$dbhost = getenv('DBHOST');
else
	$dbhost = 'http://localhost:3306';
if (getenv('WWWROOT') != '')
	$wwwroot = getenv('WWWROOT');
else
	$wwwroot = 'http://localhost';
// none of the following may be empty
$params = array(
	// database parameters
	'dbuser' => 'talentcloud',
	'dbpassword' => 'talentcloud',
	'dbname' => 'talentcloud',

	// We use a wonky dbprefix to catch any cases where folks hardcode "elgg_"
	// instead of using config->dbprefix
	// 'dbprefix' => 'd_elgg_',
	'dbhost' => $dbhost,
	// site settings
	'sitename' => 'Docker TalentCloud',
	'siteemail' => 'talentcloud-nuagedetalents@tbs-sct.gc.ca',
	'wwwroot' => $wwwroot,
	'dataroot' => getenv('HOME') . '/data/',
	// admin account
	'displayname' => 'Administrator',
	'email' => 'grant.d.barnes@gmail.com',
	'username' => 'root',
	'password' => 'password',
);
// wait for db to be ready
echo "Connecting to database..";
$etmp = error_reporting(E_ERROR);     // don't need all the connection errors...
do{
  echo ".";
  sleep(1); // wait for the db container
  $dbconnect = mysqli_connect($dbhost, $params['dbuser'], $params['dbpassword']);
}while(!$dbconnect);
echo "Connected!";
mysqli_close($dbconnect);
error_reporting($etmp);     // revert error reporting to default
// install and create the .htaccess file
// $installer->batchInstall($params, TRUE);
// at this point installation has completed (otherwise an exception halted execution).
echo "CLI install successful. wwwroot: " . $wwwroot . "\n";
