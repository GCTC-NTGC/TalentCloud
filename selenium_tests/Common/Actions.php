<?php

use Facebook\WebDriver\WebDriverBy;

require_once 'UserConfig.php';

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Actions {
    
    public static function login($webDriver){
        
        $webDriver->findElement(WebDriverBy::id("loginLink"))->click();
        print 'Clicked login link' . PHP_EOL;

        $webDriver->findElement(WebDriverBy::id("login_email"))->sendKeys(JOBSEEKER_USER_EMAIL);
        print 'enter user email address' . PHP_EOL;

        $webDriver->findElement(WebDriverBy::id("login_password"))->sendKeys(JOBSEEKER_USER_PASSWORD);
        print 'enter user password' . PHP_EOL;

        $webDriver->findElement(WebDriverBy::id("loginFormLoginBtn"))->click();
        print 'Click login button' . PHP_EOL;
        
    }
    
    public static function logout($webDriver){
        
        $webDriver->findElement(WebDriverBy::id("logoutLink"))->click();
        print 'Clicked logout link' . PHP_EOL;
        
    }
    
    public static function navigate($webDriver, $navLinkId){
        
        $webDriver->findElement(WebDriverBy::id($navLinkId))->click();
        
        print 'Navigating to '.$navLinkId.' link' . PHP_EOL;
        
    }
    
}