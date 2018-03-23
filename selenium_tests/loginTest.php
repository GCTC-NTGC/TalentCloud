<?php

use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;
use Facebook\WebDriver\JavaScriptExecutor;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once '../vendor/autoload.php';
require_once 'Common/Actions.php';
require_once 'Common/SeleniumConfig.php';
/**
 * Description of loginTest
 *
 * @author GBowden
 */
class loginTest extends PHPUnit_Framework_TestCase {

   
    /**
     * @var \RemoteWebDriver
     */
    protected $webDriver;
    
    protected $session;
    
    //Selenium standalone jar proxy url - after running start.bat
    protected $host = "http://localhost:4444/wd/hub";
    
    //site url
    protected $url = SITE_URL;

    public function setUp() {
        $options = new ChromeOptions();
        $options->addArguments(array(
            '--start-maximized',
            '--ignore-certificate-errors'
        ));
        
        if(BROWSER_TO_TEST == 'chrome'){
            if(BINARYPATH_CHROME !== ''){
                $options->setBinary(BINARYPATH_CHROME);
            }
        }
        
        if(BROWSER_TO_TEST == 'firefox'){
            if(BINARYPATH_FIREFOX !== ''){
                $options->setBinary(BINARYPATH_FIREFOX);
            }
        }
        
        $caps = DesiredCapabilities::chrome();
        $caps->setCapability(ChromeOptions::CAPABILITY, $options);
                
        $this->webDriver = RemoteWebDriver::create($this->host, $caps);
        
    }

    public function tearDown() {
        if($this->webDriver != null){
            $status = $this->getStatus();
            if ($status == PHPUnit_Runner_BaseTestRunner::STATUS_ERROR || $status == PHPUnit_Runner_BaseTestRunner::STATUS_FAILURE) {
                if (SCREENSHOTS_DIR !== ''){
                $now = new DateTime();
                $dateStr = $now->format('Y-m-d_H-i-s');
                    $this->webDriver->takeScreenshot(SCREENSHOTS_DIR.'test_'.$dateStr.'.png');
                }
            }
            $this->webDriver->close();
        }
    }

    public function testLogin() {
        $this->webDriver->get($this->url);
        
        Actions::login($this->webDriver);
        
        $this->webDriver->wait()->until(
            WebDriverExpectedCondition::visibilityOfElementLocated(WebDriverBy::id("logoutLink"))
        );
        
        $sessionUserArray = $this->webDriver->executeScript('return UserAPI.getSessionUserAsJSON();');
        var_dump(gettype($sessionUserArray));
        print 'get User from sessionstorage' . PHP_EOL;
        
        $sessionUserJSONString = json_encode($sessionUserArray);
        var_dump(gettype($sessionUserJSONString));
        
        $this->assertJson($sessionUserJSONString, "Invalid JSON Object for session User");
        
        $sessionUserJSON = json_decode($sessionUserJSONString);
        
        $user_id = $sessionUserJSON->user_id;
        var_dump($user_id);
        $this->assertTrue($user_id == 1, "No user Id");
        
        $authTokenJSONArray = $this->webDriver->executeScript('return UserAPI.getAuthTokenAsJSON();');
        print 'get JWT token from sessionstorage' . PHP_EOL;
        $authTokenJSONString = json_encode($authTokenJSONArray);
        
        $this->assertJson($authTokenJSONString, "Invalid JSON Object for session Auth token");
        
        $sessionAuthTokenJSON = json_decode($authTokenJSONString);
        
        $token = $sessionAuthTokenJSON->token;
        var_dump($token);
        $this->assertTrue($token != null, "No token for user");
        
        Actions::logout($this->webDriver);
    }

}
