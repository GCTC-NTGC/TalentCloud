<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor .
-->
<?php 
date_default_timezone_set('America/Toronto');

error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once '../tc/config/auth.config.inc';

require __DIR__ . '/../../vendor/autoload.php';

use Jumbojett\OpenIDConnectClient;

//get query string and parse into array
$query_string = filter_input(INPUT_SERVER, 'QUERY_STRING', FILTER_SANITIZE_URL);
parse_str($query_string, $querystring_array);

//set initial nonce and state for login link url
$nonce = md5(uniqid(rand(), TRUE));
$state = md5(uniqid(rand(), TRUE));

//if querystring is not empty
if($query_string !== ""){
    //if login response code from querystring array is not null
    if($querystring_array["code"] !== null){
        $oidc = new OpenIDConnectClient(OPENID_URI);
        $oidc->setClientID(CLIENT_ID);
        $oidc->setClientSecret(CLIENT_SECRET);
        $oidc->addScope("openid profile email");
        $oidc->setVerifyPeer(false);
        $oidc->setRedirectURL(REDIRECT_URI_ADMIN);
        /*if($_SESSION["refreshToken"]){
            $oidc->refreshToken($_SESSION["refreshToken"]);
        }
        if($_SESSION["accessToken"]){
            $oidc->setAccessToken($_SESSION["accessToken"]);
        }*/
        
        try{
            $oidc->authenticate();
        }catch(Jumbojett\OpenIDConnectClientException $e){
            echo($e->getMessage());
        }
        
        //set session variables for openid info
        if (isset($oidc)) {
            if ($oidc->getAccessToken() !== "NULL") {
                $_SESSION["accessToken"]=$oidc->getAccessToken();
                $_SESSION["refreshToken"]=$oidc->getRefreshToken();
                $_SESSION["idToken"]=$oidc->getIdToken();
                $_SESSION["expires_in"]=$oidc->getTimeout();
                $time = time();
                $expires_at = $time + intval($oidc->getTimeout());
                $_SESSION["expires_at"] = $expires_at;
            }
        }
        header("Refresh:0; url=\"".REDIRECT_URI_ADMIN."\"");
    }
}else{
    $_SESSION['openid_connect_state'] = $state;
    $_SESSION['openid_connect_nonce'] = $nonce;
}
?>
<html lang="en">
    <head>
        <title>GC Talent Cloud</title>
        <!-- Includes for metadata / scripts -->
        <?php
        include '../inc/common/head.php';
        include '../inc/manager/head-admin.php';
        ?>
    </head>
    <body>
        <script type="text/javascript">
            <?php
            if (isset($oidc)) {
                if($_SESSION["accessToken"] !== null){
                    echo("var accessToken = '".$_SESSION["accessToken"]."';");
                    echo("UserAPI.storeOpenIDAccessToken(accessToken);");
                }

                if($_SESSION["idToken"] !== null){
                    echo("var idToken = '".$_SESSION["idToken"]."';");
                    echo("UserAPI.storeOpenIDToken(idToken);");
                }
    
                if($_SESSION["refreshToken"] !== null){
                    echo("var refreshToken = '".$_SESSION["refreshToken"]."';");
                    echo("UserAPI.storeOpenIDRefreshToken(refreshToken);");
                }

                if($_SESSION["expires_in"] !== null){
                    echo("var expires_in = '".$_SESSION["expires_in"]."';");
                    echo("UserAPI.storeOpenIDExpiry(expires_in);");
                }

                if($_SESSION["expires_at"] !== null){
                    echo("var expires_at = '".$_SESSION["expires_at"]."';");
                    echo("UserAPI.storeSessionObject(\"expires_at\",expires_at, false);");
                }

                $userInfo = $oidc->requestUserInfo();

                if($userInfo !== null){
                    echo("UserAPI.storeSessionUser(".json_encode($userInfo).");");
                    echo("UserAPI.login(true);");
                }
            }else{
                echo("UserAPI.login(true);");
            }
            ?>

            //var isExistingUser = UserAPI.authenticate(UserAPI.getSessionUserAsJSON());
        </script>
        <!-- Include for Federal Identity Program (black banner) -->
        <?php include '../inc/manager/header-fip.php'; ?>
        <!-- Include for main navigation -->
        <?php include '../inc/manager/header-nav.php'; ?>

        <!-- BEGIN - Overlays (all should be children of this div) -->
        <div id="overlays">
            <!-- BEGIN - Includes for modal dialogs -->
            <?php
            include '../inc/manager/modal-registration.php';
            include '../inc/manager/modal-login.php';
            include '../inc/manager/modal-upload-photo.php';
            include '../inc/manager/modal-yes-no.php';
            include '../inc/manager/modal-update.php';
            ?>
            <!-- END - Modal dialogs -->
        </div>
        <!-- END - Overlays -->

        <!-- BEGIN - Page Content-->
        <main>
            <!-- BEGIN - Includes for pages -->
            <?php
            include "../inc/manager/page-home-content.php";
            include "../inc/manager/page-job-seeker.php";
            include "../inc/manager/page-create-job-poster.php";
            include "../inc/manager/page-profile-about-me.php";
            include "../inc/manager/page-profile-leadership-style.php";
            include "../inc/manager/page-profile-work-environment.php";
            include "../inc/manager/page-profile-team-culture.php";
            include "../inc/manager/page-profile-other.php";
            ?>
            <!-- END - Includes for pages -->
        </main>
        <!-- END - Page Content -->

        <!-- Include for footer -->
        <?php include '../inc/manager/footer.php'; ?>
    </body>
</html>
