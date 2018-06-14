<?php

require_once __DIR__ . '/../../tc/controller/UserController.php';

if (isset($_COOKIE[ID_TOKEN])) {
    //If we're logged in (ie ID_TOKEN cookie is set) ensure the user is saved in 
    //local session storage frontend use
    echo("<script type=\"text/javascript\">");
    echo("if (!UserAPI.hasSessionUser()) {");
    $user = UserController::getUserByOpenIdTokens($_COOKIE[ID_TOKEN], $_COOKIE[ACCESS_TOKEN]);
    echo("var sessionUser = JSON.parse('" . json_encode($user, JSON_HEX_APOS) . "');");
    echo("UserAPI.storeSessionUser(sessionUser);");
    echo("}");
    echo("</script>");
}
