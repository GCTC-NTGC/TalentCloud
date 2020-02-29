<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class ExperienceEducation
 *
 * @property int $id
 * @property int $education_type_id
 * @property string $area_of_study
 * @property string $institution
 * @property int $education_status_id
 * @property boolean $is_active
 * @property \Jenssegers\Date\Date $start_date
 * @property \Jenssegers\Date\Date $end_date
 * @property string $thesis_title
 * @property boolean $has_blockcert
 * @property int $experienceable_id
 * @property string $experienceable_type
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\EducationType $education_type
 * @property \App\Models\Lookup\EducationStatus $education_status
 * @property \App\Models\Applicant|\App\Models\JobApplication $experienceable
 * @property \Illuminate\Database\Eloquent\Collection $skills
 */
class ExperienceEducation extends BaseModel
{
    protected $casts = [
        'education_type_id' => 'int',
        'area_of_study' => 'string',
        'institution' => 'string',
        'education_status_id' => 'int',
        'is_active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
        'thesis_title' => 'string',
        'has_blockcert' => 'boolean'
    ];

    protected $fillable = [
        'education_type_id',
        'area_of_study',
        'institution',
        'education_status_id',
        'is_active',
        'start_date',
        'end_date',
        'thesis_title',
        'has_blockcert'
    ];

    protected $table = 'experiences_education';

    public function education_type() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\EducationType::class);
    }

    public function education_status() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\EducationStatus::class);
    }

    public function experienceable() //phpcs:ignore
    {
        return $this->morphTo();
    }

    public function skills()
    {
        return $this->morphToMany(\App\Models\Skill::class, 'experience', 'experience_skills');
    }
}
