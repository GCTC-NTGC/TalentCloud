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
        print PHP_EOL . 'Begin Dashboard Test' . PHP_EOL;
        $this->webDriver->get($this->url);
        
        Actions::login($this->webDriver);
        Actions::navigate($this->webDriver, "dashBoardLink");
        Actions::wait($this->webDriver,"yourApplicationsTitle");
        Actions::logout($this->webDriver);
        print 'End Dashboard Test' . PHP_EOL . PHP_EOL;
    }
}
