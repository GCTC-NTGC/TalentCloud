<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use App\Models\User;

class UserUpdated
{
    use SerializesModels;

    public $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
