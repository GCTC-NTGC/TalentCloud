<?php
date_default_timezone_set('America/Toronto');

error_reporting(E_ALL);
ini_set("display_errors", 1);


require_once __DIR__ . '/tc/config/auth.config.inc';
require_once __DIR__ . '/tc/controller/UserController.php';
require_once __DIR__ . '/tc/controller/AuthenticationController.php';
require_once __DIR__ . '/tc/utils/JWTUtils.php';
require_once __DIR__ . '/tc/utils/Utils.php';
require __DIR__ . '/../vendor/autoload.php';

use Jumbojett\OpenIDConnectClient;

//get query string and parse into array
$query_string = filter_input(INPUT_SERVER, 'QUERY_STRING', FILTER_SANITIZE_URL);
parse_str($query_string, $querystring_array);

//set initial nonce and state for login link url
$nonce = md5(uniqid(rand(), TRUE));
$state = md5(uniqid(rand(), TRUE));

if ($query_string !== "") {
    //if login response code from querystring array is not null
    if(array_key_exists("code", $querystring_array) && $querystring_array["code"] !== null){
        $oidc = new OpenIDConnectClient(OPENID_URI, CLIENT_ID, CLIENT_SECRET);
        
        $oidc->addScope(array('openid', 'profile', 'email'));
        $oidc->setVerifyPeer(false);
        $oidc->setRedirectURL(REDIRECT_URI);
        
        /* if($_SESSION["refreshToken"]){
          $oidc->refreshToken($_SESSION["refreshToken"]);
          }
          if($_SESSION["accessToken"]){
          $oidc->setAccessToken($_SESSION["accessToken"]);
          } */

        try {
            $oidc->authenticate();
        } catch (Jumbojett\OpenIDConnectClientException $e) {
            echo($e->getMessage());
        }

        //set session variables for openid info
        if (isset($oidc)) {
            if ($oidc->getAccessToken() !== "NULL") {
                $_SESSION["accessToken"] = $oidc->getAccessToken();
                $_SESSION["refreshToken"] = $oidc->getRefreshToken();
                $_SESSION["idToken"] = $oidc->getIdToken();
                $_SESSION["expires_in"] = $oidc->getTimeout();
                $time = time();
                $expires_at = $time + intval($oidc->getTimeout());
                $_SESSION["expires_at"] = $expires_at;
            }
        }

        //header("Refresh:0; url=\"".REDIRECT_URI."");
    }
} else {
    $_SESSION['openid_connect_state'] = $state;
    $_SESSION['openid_connect_nonce'] = $nonce;
}

if (isset($oidc)) {
    echo("Re authentication: ");
    print_r($oidc->authenticate());
}

if ($_SESSION["idToken"] !== null) {
    echo("\nSession id token found\n");
    print_r($_SESSION["idToken"]);
    echo("\n");
    echo("Re authentication: ");
    
    $oidc = new OpenIDConnectClient(OPENID_URI, CLIENT_ID, CLIENT_SECRET);
        
    $oidc->addScope(array('openid', 'profile', 'email'));
    $oidc->setVerifyPeer(false);
    $oidc->setRedirectURL(REDIRECT_URI);
    try {
        $res = $oidc->authenticate();
        print_r($res);
    } catch (Jumbojett\OpenIDConnectClientException $e) {
        echo($e->getMessage());
    }
  
}
    
    /*
    if ($_SESSION["accessToken"] !== null) {
        echo("var accessToken = '" . $_SESSION["accessToken"] . "';");
        echo("UserAPI.storeOpenIDAccessToken(accessToken);");
    }

    if ($_SESSION["idToken"] !== null) {
        echo("var idToken = '" . $_SESSION["idToken"] . "';");
        echo("UserAPI.storeOpenIDToken(idToken);");
    }

    if ($_SESSION["refreshToken"] !== null) {
        echo("var refreshToken = '" . $_SESSION["refreshToken"] . "';");
        echo("UserAPI.storeOpenIDRefreshToken(refreshToken);");
    }

    if ($_SESSION["expires_in"] !== null) {
        echo("var expires_in = '" . $_SESSION["expires_in"] . "';");
        echo("UserAPI.storeOpenIDExpiry(expires_in);");
    }

    if ($_SESSION["expires_at"] !== null) {
        echo("var expires_at = '" . $_SESSION["expires_at"] . "';");
        echo("UserAPI.storeSessionObject(\"expires_at\",expires_at, false);");
    }

    AuthenticationController::validateIdToken($_SESSION["idToken"]);
    
    //$userInfo = $oidc->requestUserInfo();
    //print_r($userInfo);
    $tc_user = null;
    //$tc_user = UserController::getUserByOpenId($userid);

    if ($tc_user !== null) {
        //echo("UserAPI.storeSessionUser(" . json_encode($userInfo) . ");");
        echo("var sessionUser = " . json_encode($tc_user) . ";");
        echo("UserAPI.loaded(sessionUser, false);");
    }
     * /
     */
