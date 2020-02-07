<?php

namespace App\Models;

/**
 * Class JobPosterStatus
 *
 * @property int $id
 * @property int $job_poster_id
 * @property int $user_id
 * @property int $from_job_poster_status_id
 * @property int $to_job_poster_status_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobPoster $job_poster
 * @property \App\Models\User $user
 * @property \App\Models\Lookup\JobPosterStatus $from
 * @property \App\Models\Lookup\JobPosterStatus $to
 *
 */
class JobPosterStatusHistory extends BaseModel
{
    protected $table = 'job_poster_status_history';

    protected $fillable = [];

    public function job_poster() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    public function user() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function from() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\JobPosterStatus::class, 'from_job_poster_status_id');
    }

    public function to() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\JobPosterStatus::class, 'to_job_poster_status_id');
    }
}
