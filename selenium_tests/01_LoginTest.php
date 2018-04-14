<?php

use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;

require_once '../vendor/autoload.php';
require_once 'Common/SeleniumConfig.php';
require_once 'Common/TalentCloudTest.php';
require_once 'Common/Actions.php';

/**
 * Description of loginTest
 *
 * @author GBowden
 */
class LoginTest extends talentCloudTest {

    public function testLogin() {
        print PHP_EOL . 'Begin Login Test' . PHP_EOL;
        $this->webDriver->get($this->url);  
        
        Actions::login($this->webDriver);
        Actions::wait($this->webDriver,"logoutLink");
        
        print 'get User from sessionstorage' . PHP_EOL;
        $sessionUserArray = $this->webDriver->executeScript('return UserAPI.getSessionUserAsJSON();');
        $sessionUserJSONString = json_encode($sessionUserArray);
        $this->assertJson($sessionUserJSONString, "Invalid JSON Object for session User");
        
        print 'get user session ID from UserJSON' . PHP_EOL;
        $sessionUserJSON = json_decode($sessionUserJSONString);
        $user_id = $sessionUserJSON->user_id;
        $this->assertTrue($user_id > 0, "No user Id");
        
        print 'get JWT token from sessionstorage' . PHP_EOL;
        $authTokenJSONArray = $this->webDriver->executeScript('return UserAPI.getAuthTokenAsJSON();');
        $authTokenJSONString = json_encode($authTokenJSONArray);
        $this->assertJson($authTokenJSONString, "Invalid JSON Object for session Auth token");
        
        print 'get user auth token' . PHP_EOL;
        $sessionAuthTokenJSON = json_decode($authTokenJSONString);
        $token = $sessionAuthTokenJSON->token;
        $this->assertTrue($token != null, "No token for user");
        
        Actions::logout($this->webDriver);
        print 'End of Login Test' . PHP_EOL . PHP_EOL;
    }

}
