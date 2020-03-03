<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class ExperiencePersonal
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property boolean $is_shareable
 * @property boolean $is_active
 * @property \Jenssegers\Date\Date $start_date
 * @property \Jenssegers\Date\Date $end_date
 * @property int $experienceable_id
 * @property string $experienceable_type
 * @property boolean $is_education_requirement
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant|\App\Models\JobApplication $experienceable
 */
class ExperiencePersonal extends BaseModel
{
    protected $casts = [
        'title' => 'string',
        'description' => 'string',
        'is_shareable' => 'boolean',
        'is_active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_education_requirement' => 'boolean'
    ];

    protected $fillable = [
        'title',
        'description',
        'is_shareable',
        'is_active',
        'start_date',
        'end_date',
        'is_education_requirement'
    ];

    protected $table = ['experiences_personal'];

    public function experienceable() //phpcs:ignore
    {
        return $this->morphTo();
    }
}
