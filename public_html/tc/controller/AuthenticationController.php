<?php

date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if (!isset($_SESSION)) {
    session_start();
}

/* set api path */
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../dao/AuthenticationDAO.php';
require_once __DIR__ . '/../dao/UserDAO.php';
require_once __DIR__ . '/../model/AuthToken.php';
require_once __DIR__ . '/../model/User.php';
require_once __DIR__ . '/../controller/UserController.php';
require_once __DIR__ . '/../utils/JWTUtils.php';
require_once __DIR__ . '/../utils/NetworkUtils.php';

require_once __DIR__ . '/../../../vendor/autoload.php';

use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Jumbojett\OpenIDConnectClient;

/**
 * 
 */
class AuthenticationController {

    /**
     * 
     * @param type $username
     * @param type $password
     * @return type
     */
    public static function getAuthToken($username, $password) {
        $authUser = AuthenticationController::authenticateUser($username, $password);
        //var_dump($authUser);
        if ($authUser && $authUser->getIs_confirmed()) {
            $token = JWTUtils::generateJWT($authUser);
            //store authtoken 
            //AuthenticationDAO::storeAuthToken($result,$authUser);
        }
        return $token;
    }

    /**
     * 
     * @global type $dbResourcesArray
     * @return type
     */
    public static function authenticateUser($username, $password) {
        $authUser = UserDAO::getUserByCredentials($username, $password);
        if ($authUser) {
            $authUser->setPassword($password);
        }
        return $authUser;
    }

    private static function getOpenIdSigningKey($kid, $alg) {
        //TODO: cache sigining key somehow
        //Get JWKS: Javascript Web Key Set from openid Connect server
        $jwks = json_decode(NetworkUtils::fetchURL(OPENID_JWKS_URI));
        if ($jwks === NULL) {
            throw new Exception('Error decoding JSON from jwks_uri');
        }
        foreach ($jwks["keys"] as $key) {
            if ($key["alg"] === $alg //this key uses the correct algorithm
                    && $key["use"] === "sig" //this key is intended for signing
                    && $key["kid"] === $kid //this key matches our token
            ) {
                return self::jwkToPemPublicKey($jwk);
            }
        }
        return null;
    }

    private static function jwkToPemPublicKey($jwk) {
        return "-----BEGIN RSA PUBLIC KEY-----" . $jwk["n"] . $jwk["e"] . "-----END RSA PUBLIC KEY-----";
    }

    public static function idTokenIsValid($idToken, $accessToken, $refreshToken=null) {
        $token = (new Parser())->parse((string) $idToken); // Parses from a string
        //Ensure this token was meant for us
        $expectation = new ValidationData(); // It will use the current time to validate (iat, nbf and exp)
        $expectation->setIssuer(OPENID_URI);
        $expectation->setAudience(CLIENT_ID);
        $claimIsValid = $token->validate($expectation);

        if (!claimIsValid) {
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
}
