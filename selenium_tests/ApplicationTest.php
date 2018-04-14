<?php

use Facebook\WebDriver\WebDriverBy;

require_once '../vendor/autoload.php';
require_once 'Common/SeleniumConfig.php';
require_once 'Common/TalentCloudTest.php';
require_once 'Common/Actions.php';
/**
 * Description of loginTest
 *
 * @author GBowden
 * Modified by GObyrne
 */
class ApplicationTest extends talentCloudTest {
    
    public function testApplication() {
        
        print PHP_EOL . 'Begin Application Test' . PHP_EOL;
        $this->webDriver->get($this->url);
        
        Actions::login($this->webDriver);
        
        Actions::navigate($this->webDriver, "browseLink");

        print 'Get list of jobs' . PHP_EOL;
        Actions::wait($this->webDriver, "jobList");
        $jobs = $this->webDriver->findElements(WebDriverBy::className("jobSummary"));
        $this->assertTrue(count($jobs) != 0, "No Jobs Found");
        
        print "Get last job title on Browse Jobs page" . PHP_EOL;
        $lastJob = end($jobs);
        $jobTitle1 = $lastJob->findElement(WebDriverBy::className("jobSummaryTitle"))->getAttribute("innerHTML");
        $this->assertTrue($jobTitle1 != null,"Title of last job not found");
        
        print "Open last poster and click Apply" . PHP_EOL;
        $lastJob->findElement(WebDriverBy::cssSelector("button"))->click();
        Actions::navigate($this->webDriver, "jobPosterApplyButton");
        
        //print "Enter some info for application" . PHP_EOL;
        //Actions::navigate($this->webDriver, "jobApplicationAnswerField");
        //$this->webDriver->findElement(WebDriverBy::id("jobApplicationAnswerField"))->sendKeys("Testing an application");

        print "Get Job Title on Confirmation Page" . PHP_EOL;
        Actions::navigate($this->webDriver, "createJobApplicationSubmitButton");
        
        Actions::wait( $this->webDriver,"createJobApplicationConfirmationPostition");
        $jobTitleElement2 = $this->webDriver->findElement(WebDriverBy::id("createJobApplicationConfirmationPostition"));
        $jobTitle2 = $jobTitleElement2->getAttribute("innerHTML");
        $this->assertTrue($jobTitle1 == $jobTitle2, "Title on Confirmation page does not match title from Browse Jobs");
        
        print "Get Job Title on Dashboard" . PHP_EOL;
        Actions::navigate($this->webDriver, "createJobApplicationConfirmationContinueButton");
        Actions::wait($this->webDriver,"yourApplications");
        $dashboardJobTitles = $this->webDriver->findElements(WebDriverBy::className("dashboardJobSummaryTitle"));
        $jobTitle3 = end($dashboardJobTitles);

        $this->assertTrue($jobTitle3 == $jobTitle1, "Title on Dashboard page does not match title from Browse Jobs");

        print "Application Successful" . PHP_EOL;
        
        Actions::logout($this->webDriver);
    }

}