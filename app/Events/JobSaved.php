<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use App\Models\JobPoster;

class JobSaved
{
    use SerializesModels;

    public $job;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(JobPoster $job)
    {
        $this->job = $job;
    }
}
