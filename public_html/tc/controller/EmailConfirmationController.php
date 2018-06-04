<?php


date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 0);
set_time_limit(0);

if (!isset($_SESSION)) {
    session_start();
}

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../config/smtp.config.inc';
require_once __DIR__ . '/../model/User.php';

class EmailConfirmationController {
    
    public static function sendConfirmationEmail(User $user) {
        $conf_url = 'https://' . filter_input(INPUT_SERVER, 'HTTP_HOST', FILTER_SANITIZE_ENCODED) . "/#Confirmation/" . $user->getUser_id();
        $from_name = FROM_NAME;
        $from_email = FROM_EMAIL;
        $to = $user->getEmail();
        $subject = "TalentCloud Account Confirmation / French subject here";
        $message = "
        <html>
        <head>
        <title>TalentCloud Account Confirmation / French subject here</title>
        </head>
        <body>
        <p>Thank you for registering with TalentCloud. / French content here</p>
        <p><a href='".$conf_url . "'>Click here to confirm your email address with us. / French content</a></p>
        </body>
        </html>";

        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        // More headers
        $headers .= 'From:' . $from_email . "\r\n";
        //var_dump($message);
        if (!@mail($to, $subject, $message, $headers)) {
            return false;
        } else {
            return true;
        }
        
    }
    
    
}