<?php

namespace App\Rules;

class PasswordValidation implements Rule
{
    /**
     * This Password Validation rule should be referenced wherever we need the user input their password on the site.
     * The rules used on their passwords are;
     * 1) Password is required. 
     * 2) Must be at least 8 characters
     * 3) The password must contain at least one character from the following categories: 
     * lower-case characters (a-z), upper-case characters (A-Z), 
     * digits (0-9), and non-alphanumeric symbols (%, $, !, etc.).
     * Guide used by Polivas Korop
     * https://laraveldaily.com/how-to-create-custom-validation-rules-laravel/
     */

 public function PasswordCheck ($password) {
     return $password  
           (
            'required',
            ' min:8' ,
            'regex:/^.*(?=.{3,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/'
            );
             
 }

public function message() {
    
    return 'Password must be at least 8 characters, and contain at least one character from the following categories: 
     lower-case characters (a-z), upper-case characters (A-Z), 
     digits (0-9), and non-alphanumeric symbols (%, $, !, etc.).';
}
   
}

