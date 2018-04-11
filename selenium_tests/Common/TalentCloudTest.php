<?php

use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;

/**
 * Description of talentCloudTest
 *
 * @author gobyrne
 */
abstract class talentCloudTest extends PHPUnit_Framework_TestCase {

   
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

}
