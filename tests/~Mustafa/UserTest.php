<?php

/* 
 *Purpose of this UserTest was practice primarily.
 *Goal was to be able to set and get a first and last name on our user model.
 *Test is incomplete and not useful beyond practicing.
 *
 */

class UserTest 
{
    //let's say we wanted to be able set and get a first and last name on our user model.
    
    public function testThatWeCanGetTheFirstName()
    {
        $user = new \App\Models\User; // Where do we want this? Maybe in the Models directory. So we define the User class that may not exist yet.
                
        $user->setFirstName('Billy');
        
        $this->assertEquals($user->getFirstName(), 'Billy'); //Check that when we use a getter for our first name that it equals 'Billy'.
}

}