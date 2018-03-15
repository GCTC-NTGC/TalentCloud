<?php

use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once '../vendor/autoload.php';

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
    protected $url = 'https://talentcloud.localhost/';

    public function setUp() {
        
        $options = new ChromeOptions();
        
        $options->addArguments(array(
            '--start-maximized',
            '--ignore-certificate-errors'
        ));
        
        $caps = DesiredCapabilities::chrome();
        $caps->setCapability(ChromeOptions::CAPABILITY, $options);
                
        $this->webDriver = RemoteWebDriver::create($this->host, $caps);
    }

    public function tearDown() {
        if($this->webDriver != null){
            $status = $this->getStatus();
            //if ($status == PHPUnit_Runner_BaseTestRunner::STATUS_ERROR || $status == PHPUnit_Runner_BaseTestRunner::STATUS_FAILURE) {
                $now = new DateTime();
                $dateStr = $now->format('Y-m-d_H-i-s');
                //$screenshotFilePath = 'D:/Selenium/screenshots/';
                //$screenshotFileName = $screenshotFilePath . $now->format('Y-m-d H:i:s') . ' test ' . $this->getName() . '.png';
                $screenshotFilePath = 'C:/dev/Selenium/screenshots/';
                $this->webDriver->takeScreenshot($screenshotFilePath.'test_'.$dateStr.'.png');
            }
            $this->webDriver->close();
        //}
    }

    public function testLogin() {
        $this->webDriver->get($this->url);
        
        $this->webDriver->findElement(WebDriverBy::id("loginLink"))->click();
        print 'Clicked login link' . PHP_EOL;
        
        $this->webDriver->findElement(WebDriverBy::id("login_email"))->sendKeys("gbowden@deloitte.ca");
        print 'enter user email address' . PHP_EOL;
        
        $this->webDriver->findElement(WebDriverBy::id("login_password"))->sendKeys("Vetitum4u.ca");
        print 'enter user password' . PHP_EOL;
                
        $this->webDriver->findElement(WebDriverBy::id("loginFormLoginBtn"))->click();
        print 'Click login button' . PHP_EOL;
        
        //wait for valid login to finish
        $this->webDriver->wait()->until(
            WebDriverExpectedCondition::presenceOfElementLocated(WebDriverBy::cssSelector('div.bar'))
        );
        
        $window = $this->webDriver->getWindowHandle();
        
        $authTokenJSONString = $this->webDriver->executeScript('return window.sessionStorage.authToken',array());
        print 'get JWT token from sessionstorage' . PHP_EOL;
        var_dump($authTokenJSONString);
        
        print 'validate JWT token' . PHP_EOL;
        //$authTokenJSON = json_decode($authTokenJSONString);
        
        //$authToken = $authTokenJSON;
        
        //var_dump($authToken);
    }

}
