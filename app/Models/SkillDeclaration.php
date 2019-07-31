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
 * @property int $skill_id
 * @property int $skill_status_id
 * @property int $skill_level_id
 * @property int $applicant_id
 * @property string $description
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Skill $skill
 * @property \App\Models\Lookup\SkillStatus $skill_status
 * @property \App\Models\Lookup\SkillLevel $skill_level
 * @property \App\Models\Applicant $applicant
 * @property \Illuminate\Database\Eloquent\Collection $references
 * @property \Illuminate\Database\Eloquent\Collection $work_samples
 */
class SkillDeclaration extends BaseModel
{

    /**
     * @var string[]
     */
    protected $casts = [
        'skill_id' => 'int',
        'skill_status_id' => 'int',
        'skill_level_id' => 'int',
        'applicant_id' => 'int',
        'description' => 'string'
    ];

    /**
     * @var string[]
     */
    protected $fillable = [
        'description',
        'skill_level_id'
    ];

    public function skill()// phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Skill::class);
    }

    public function skill_status()// phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\SkillStatus::class);
    }

    public function skill_level()// phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\SkillLevel::class);
    }

    public function applicant()// phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Applicant::class);
    }

    public function references()// phpcs:ignore
    {
        return $this->belongsToMany(\App\Models\Reference::class);
    }

    public function work_samples()// phpcs:ignore
    {
        return $this->belongsToMany(\App\Models\WorkSample::class);
    }
}
