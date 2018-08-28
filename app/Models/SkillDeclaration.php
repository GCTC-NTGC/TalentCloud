<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class SkillDeclaration
 * 
 * @property int $id
 * @property int $criteria_id
 * @property int $job_application_id
 * @property int $experience_level_id
 * @property int $skill_level_id
 * @property string $description
 * @property bool $is_active
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
 * @property \App\Models\Criteria $criterion
 * @property \App\Models\Lookup\ExperienceLevel $experience_level
 * @property \App\Models\JobApplication $job_application
 * @property \App\Models\Lookup\SkillLevel $skill_level
 */
class SkillDeclaration extends BaseModel {

    protected $casts = [
        'criteria_id' => 'int',
        'job_application_id' => 'int',
        'experience_level_id' => 'int',
        'skill_level_id' => 'int',
        'is_active' => 'bool'
    ];
    protected $fillable = [
        'criteria_id',
        'job_application_id',
        'experience_level_id',
        'skill_level_id',
        'description'
    ];

    public function criterion() {
        return $this->belongsTo(\App\Models\Criteria::class, 'criteria_id');
    }

    public function experience_level() {
        return $this->belongsTo(\App\Models\Lookup\ExperienceLevel::class);
    }

    public function job_application() {
        return $this->belongsTo(\App\Models\JobApplication::class);
    }

    public function skill_level() {
        return $this->belongsTo(\App\Models\Lookup\SkillLevel::class);
    }

}
