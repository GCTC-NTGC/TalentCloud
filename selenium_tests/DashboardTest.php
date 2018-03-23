<?php

use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;
use DBUnitTestUtility;

require_once 'Common/UserConfig.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once '../vendor/autoload.php';
require_once 'Common/Actions.php';
/**
 * Description of loginTest
 *
 * @author GBowden
 */
class DashboardTest extends PHPUnit_Framework_TestCase {

   
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
            //if ($status == PHPUnit_Runner_BaseTestRunner::STATUS_ERROR || $status == PHPUnit_Runner_BaseTestRunner::STATUS_FAILURE) {
                $now = new DateTime();
                $dateStr = $now->format('Y-m-d_H-i-s');
                //$screenshotFilePath = 'D:/Selenium/screenshots/';
                //$screenshotFileName = $screenshotFilePath . $now->format('Y-m-d H:i:s') . ' test ' . $this->getName() . '.png';
                if (System.getProperty("screenshot_dir").equalsIgnoreCase("true")){
                    $screenshotFilePath = System.getProperty("screenshot_dir");
                }
                
                $this->webDriver->takeScreenshot($screenshotFilePath.'test_'.$dateStr.'.png');
            }
            $this->webDriver->close();
        //}
    }

    public function testDashboard() {
        $this->webDriver->get($this->url);
        
        Actions::login($this->webDriver);
        
        $this->webDriver->wait()->until(
            WebDriverExpectedCondition::visibilityOfElementLocated(WebDriverBy::id("dashBoardLink"))
        );
        
        Actions::navigate($this->webDriver, "dashBoardLink");
        
        $this->webDriver->wait()->until(
            WebDriverExpectedCondition::visibilityOfElementLocated(WebDriverBy::id("yourApplicationsTitle"))
        );
        
        Actions::logout($this->webDriver);
        
    }

}
