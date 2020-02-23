<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class ExperienceWork
 *
 * @property int $id
 * @property string $title
 * @property string $organization
 * @property string $group
 * @property boolean $is_active
 * @property \Jenssegers\Date\Date $start_date
 * @property \Jenssegers\Date\Date $end_date
 * @property int $work_experienceable_id
 * @property string $work_experienceable_type
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 * @property \App\Models\Applicant|\App\Models\JobApplication $work_experienceable
 */
class ExperienceWork extends BaseModel
{
    protected $casts = [
        'title' => 'string',
        'organization' => 'string',
        'group' => 'string',
        'is_active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date'
    ];

    protected $fillable = [
        'title',
        'organization',
        'group',
        'is_active',
        'start_date',
        'end_date'
    ];

    public function job_applications() //phpcs:ignore
    {
        return $this->belongsToMany(\App\Models\JobApplication::class);
    }

    public function work_experienceable() //phpcs:ignore
    {
        return $this->morphTo();
    }
}
