<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class ExperienceCommunity
 *
 * @property int $id
 * @property string $title
 * @property string $group
 * @property string $project
 * @property boolean $is_active
 * @property \Jenssegers\Date\Date $start_date
 * @property \Jenssegers\Date\Date $end_date
 * @property int $community_experienceable_id
 * @property string $community_experienceable_type
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 * @property \App\Models\Applicant|\App\Models\JobApplication $community_experienceable
 */
class ExperienceCommunity extends BaseModel
{
    protected $casts = [
        'title' => 'string',
        'group' => 'string',
        'project' => 'string',
        'is_active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date'
    ];

    protected $fillable = [
        'title',
        'group',
        'project',
        'is_active',
        'start_date',
        'end_date'
    ];

    public function job_applications() //phpcs:ignore
    {
        return $this->belongsToMany(\App\Models\JobApplication::class);
    }

    public function community_experienceable() //phpcs:ignore
    {
        return $this->morphTo();
    }
}
