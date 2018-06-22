<?php

require_once __DIR__ . '/../config/php.config.inc';

/* set api path */
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../config/auth.config.inc';
require_once __DIR__ . '/../config/constants.config.inc';
require_once __DIR__ . '/../dao/AuthenticationDAO.php';
require_once __DIR__ . '/../dao/UserDAO.php';
require_once __DIR__ . '/../model/AuthToken.php';
require_once __DIR__ . '/../model/User.php';
require_once __DIR__ . '/../model/UserPermission.php';
require_once __DIR__ . '/../controller/UserController.php';
require_once __DIR__ . '/../utils/NetworkUtils.php';

require_once __DIR__ . '/../../../vendor/autoload.php';

use Jumbojett\OpenIDConnectClient;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Rsa\Sha256;
use Firebase\JWT\JWK;

/**
 * 
 */
class AuthenticationController {

    private static function getOpenIdSigningKey($kid, $alg) {
        //TODO: cache sigining key somehow
        //Get JWKS: Javascript Web Key Set from openid Connect server
        $jwks = json_decode(NetworkUtils::fetchURL(OPENID_JWKS_URI));
        if ($jwks === NULL) {
            throw new Exception('Error decoding JSON from jwks_uri');
        }
        
        $keySet = JWK::parseKeySet($jwks);
        $keyDetails = openssl_pkey_get_details($keySet[$kid]);
        $publicKey = $keyDetails["key"];
        return $publicKey;
//        foreach ($jwks->keys as $key) {
//            if ($key->alg === $alg //this key uses the correct algorithm
//                    && $key->use === "sig" //this key is intended for signing
//                    && $key->kid === $kid //this key matches our token
//            ) {
//                
//                print_r("Printed keyset");
//                $rsaKey = new RSAKey((array) $key);
//                return $rsaKey->toPEM();
//                return self::jwkToPemPublicKey($key);
//            }
//        }
//        return null;
    }

    public static function idTokenIsValid($idToken, $accessToken, $refreshToken = null) {
        $token = (new Parser())->parse((string) $idToken); // Parses from a string

        if (($token->isExpired() && $refreshToken)) {
            //Attempt to refresh tokens
            $oidc = new OpenIDConnectClient(OPENID_URI, CLIENT_ID, CLIENT_SECRET);
            $oidc->addScope(array('openid', 'profile', 'email'));

            $oidc->setVerifyPeer(false);

            $response = $oidc->refreshToken($refreshToken);
            if ($response && !isset($response->error)) {
                //RESET auth tokens
                setcookie(ID_TOKEN, $response->id_token, 0, "/");
                setcookie(ACCESS_TOKEN, $response->access_token, 0, "/");
                setcookie(REFRESH_TOKEN, $response->refresh_token, 0, "/");

                $idToken = $response->id_token;
                $accessToken = $response->access_token;
                $refreshToken = $response->refresh_token;

                $token = (new Parser())->parse((string) $idToken);
            }
        }

        
        
        //Ensure this token was meant for us
        // Allow validating of keys created up a few seconds in the future, to allow for response time if we're currently waiting on a refreshing token
        $expectation = new ValidationData(time()+NETWORK_REQUEST_TIMEOUT); 
        $expectation->setIssuer(OPENID_URI);
        $expectation->setAudience(CLIENT_ID);   
        $claimIsValid = $token->validate($expectation);

        if (!$claimIsValid) {
            //end early if claim is invalid
            return false;
        }

        //Validate signature to ensure token has not been modified
        $kid = $token->getHeader("kid");
        $alg = $token->getHeader("alg");
        $publicKey = self::getOpenIdSigningKey($kid, $alg);
        $signer = new Sha256();
        $signatureIsValid = $token->verify($signer, $publicKey);
        
        //TODO: consider doing this check at a different point
        //This registers user in our database if it doesn't exist yet
        UserController::getUserByOpenIdTokens($idToken, $accessToken);

        return $claimIsValid && $signatureIsValid;
    }

    public static function isLoggedIn() {
        if ($_COOKIE[ID_TOKEN]) {
            return idTokenIsValid($_COOKIE[ID_TOKEN], $_COOKIE[ACCESS_TOKEN], $_COOKIE[REFRESH_TOKEN]);
        }
        return false;
    }

    /**
     * Ensure user is logged in and meets at least one of the provided permissions.
     * If user is not valid, this function will exit php output with the 
     * appropriate status code.
     * If no userPermissions are provided, any logged-in user will be considered valid. 
     * 
     * @param UserPermission[] $userPermisions
     */
    public static function validateUser($userPermissions = []) {
        if (!isset($_COOKIE[ID_TOKEN])) {
            header('HTTP/1.0 401 Unauthorized');
            echo json_encode(array("message" => "You are accessing a secured resources without credentials. Please authenticate and retry."), JSON_FORCE_OBJECT);
            exit;
        }

        $idToken = $_COOKIE[ID_TOKEN];
        $accessToken = isset($_COOKIE[ACCESS_TOKEN]) ? $_COOKIE[ACCESS_TOKEN] : null;
        $refreshToken = isset($_COOKIE[REFRESH_TOKEN]) ? $_COOKIE[REFRESH_TOKEN] : null;

        if (!self::idTokenIsValid($idToken, $accessToken, $refreshToken)) {
            header('HTTP/1.0 401 Unauthorized');
            echo json_encode(array("message" => "You are accessing a secured resource without credentials. Please authenticate and retry."), JSON_FORCE_OBJECT);
            exit;
        }

        //User is logged in correctly


        if ($userPermissions === []) {
            //If no userPermissions were provided, all logged in users are valid;
            return;
        }
        $user = UserController::getUserByOpenIdTokens($idToken, $accessToken);
        foreach ($userPermissions as $permission) {
            if ($permission->userHasPermission($user)) {
                //user is valid
                return;
            }
        }
        //If user did not meet any of the permissions, this resource is forbidden
        header('HTTP/1.0 403 Forbidden');
        echo json_encode(array("message" => "You are not authorized to access this resource."), JSON_FORCE_OBJECT);
        exit;
    }

}
