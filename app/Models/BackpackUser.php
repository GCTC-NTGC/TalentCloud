<?php

namespace App\Models;

use App\Models\User;
use Backpack\CRUD\app\Notifications\ResetPasswordNotification as ResetPasswordNotification;
use Illuminate\Support\Facades\App;

class BackpackUser extends User
{
    use \Parental\HasParent;

    protected $table = 'users';

    /**
     * Send the password reset notification.
     *
     * @param string $token
     *
     * @return void
     */
    public function sendPasswordResetNotification($token) : void
    {
        $locale = App::getLocale();
        $notification = new ResetPasswordNotification($token);
        $this->notify($notification->locale($locale));
    }

    /**
     * Get the e-mail address where password reset links are sent.
     *
     * @return string
     */
    public function getEmailForPasswordReset() : string
    {
        return $this->email;
    }
}
