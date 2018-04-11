<?php

use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;

require_once '../vendor/autoload.php';
require_once 'Common/SeleniumConfig.php';
require_once 'Common/TalentCloudTest.php';
require_once 'Common/Actions.php';

/**
 * Description of DashboardTest
 *
 * @author GBowden
 * Modified by GObyrne
 * 
 */
class DashboardTest extends talentCloudTest {

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
