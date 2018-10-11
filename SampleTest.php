<?php
//Doesn't actually test anything but should run on command line.


 class SampleTest extends \PHPUnit_Framework_TestCase

 {
     
     public function testTrueAssertstoTrue()
     
     {
         $this->assertTrue(true); //change to false to fail test.
     }
 }
 