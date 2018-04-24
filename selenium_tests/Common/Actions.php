<?php

use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;

require_once 'UserConfig.php';
require_once 'SeleniumConfig.php';

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Actions {
    
    public static function login($webDriver){
        
        print '-Start login' . PHP_EOL;
        Actions::navigate($webDriver,"loginLink");

        print '-enter user email address' . PHP_EOL;
        $webDriver->findElement(WebDriverBy::id("login_email"))->sendKeys(JOBSEEKER_USER_EMAIL);
        
        print '-enter user password' . PHP_EOL;
        $webDriver->findElement(WebDriverBy::id("login_password"))->sendKeys(JOBSEEKER_USER_PASSWORD);
        
        Actions::navigate($webDriver,"loginFormLoginBtn");
        
        print '-End login' . PHP_EOL;
    }
    
    public static function logout($webDriver){
        
        $webDriver->findElement(WebDriverBy::id("logoutLink"))->click();
        print '-Clicked logout link' . PHP_EOL;
        
    }
    
    public static function wait($webDriver, $elementId){
        
        print '-Waiting for '.$elementId.' visibility' . PHP_EOL;
        $webDriver->wait()->until(
             WebDriverExpectedCondition::visibilityOfElementLocated(WebDriverBy::id("$elementId"))
        );
        
    }
    
    public static function navigate($webDriver, $navLinkId){
        
        Actions::wait($webDriver, $navLinkId);
        $webDriver->findElement(WebDriverBy::id($navLinkId))->click();
        print '-Clicked '.$navLinkId.' link' . PHP_EOL;
        
    }
    
}