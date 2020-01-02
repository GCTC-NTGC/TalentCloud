<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use App\Models\JobApplication;

class ApplicationRetrieved
{
    use SerializesModels;

    public $application;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(JobApplication $application)
    {
        $this->application = $application;
    }
}
