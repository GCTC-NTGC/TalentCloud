<?php

require_once __DIR__ . '/../../tc/controller/UserController.php';
require_once __DIR__ . '/../../tc/config/auth.config.inc';
require_once __DIR__ . '/../../../vendor/autoload.php';

use Jumbojett\OpenIDConnectClient;

//get query string and parse into array
$query_string = filter_input(INPUT_SERVER, 'QUERY_STRING', FILTER_SANITIZE_URL);
parse_str($query_string, $querystring_array);

//set initial nonce and state for login link url
$nonce = md5(uniqid(rand(), TRUE));
$state = md5(uniqid(rand(), TRUE));

//if querystring is not empty
if ($query_string !== "") {
    //if login response code from querystring array is not null
    if (array_key_exists("code", $querystring_array) && $querystring_array["code"] !== null) {
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

            //TODO: show error message            
        }

        //set session variables for openid info
        if (isset($oidc)) {
            if ($oidc->getIdToken()) {
                //Ensure user is registered with TalentCloud
                $user = UserController::registerOpenIdUser($oidc->getIdToken(), $oidc->getAccessToken());

                //Set cookies used for backend authentication

                //Set cookies with session expiry and valid for the whole domain
                setcookie(ID_TOKEN, $oidc->getIdToken(),0,"/");
                setcookie(ACCESS_TOKEN, $oidc->getAccessToken(),0,"/");
                setcookie(REFRESH_TOKEN, $oidc->getRefreshToken(),0,"/");


                //Set Cookies through javascript because setcookie can only be called
                //before php has echoed any text.
                /*
                  echo("<script type=\"text/javascript\">");
                  echo("Utilities.setCookie(\"".ID_TOKEN."\",\"".$oidc->getIdToken() ."\");");
                  echo("Utilities.setCookie(\"".ACCESS_TOKEN."\",\"".$oidc->getAccessToken() ."\");");
                  echo("Utilities.setCookie(\"".REFRESH_TOKEN."\",\"".$oidc->getRefreshToken() ."\");");
                  echo("</script>");
                 */

                //TODO: set Authorization header?
                //Authentication complete - redirect to homepage
                if ($user->getUser_role() === "administrator") {
                    $homepage = HOMEPAGE_URI_ADMIN;
                } else {
                    $homepage = HOMEPAGE_URI_APPLICANT;
                }
                header("Location: " . $homepage);
                exit();
            }
        }
    }
} else {
    $_SESSION['openid_connect_state'] = $state;
    $_SESSION['openid_connect_nonce'] = $nonce;
}