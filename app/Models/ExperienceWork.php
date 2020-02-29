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
 * @property int $experienceable_id
 * @property string $experienceable_type
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant|\App\Models\JobApplication $experienceable
 * @property \Illuminate\Database\Eloquent\Collection $skills
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

    protected $table = 'experiences_work';

    public function experienceable() //phpcs:ignore
    {
        return $this->morphTo();
    }

    public function skills()
    {
        return $this->morphToMany(\App\Models\Skill::class, 'experience', 'experience_skills');
    }
}
