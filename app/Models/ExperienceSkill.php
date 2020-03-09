<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class ExperienceSkill
 *
 * @property int $skill_id
 * @property int $experience_id
 * @property string $experience_type
 * @property string $justification
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $skills
 * @property \App\Models\ExperienceAward|\App\Models\ExperienceCommunity|\App\Models\ExperienceEducation|\App\Models\ExperiencePersonal|\App\Models\ExperienceWork $experience
 */
class ExperienceSkill extends BaseModel
{
    protected $casts = [
        'skill_id' => 'int',
        'experience_id' => 'int',
        'experience_type' => 'string',
        'justification' => 'string',
    ];

    protected $fillable = [
        'justification'
    ];

    public function skills()
    {
        return $this->belongsToMany(\App\Models\Skill::class);
    }

    // Version 2 application models.

    public function experiences_work() // phpcs:ignore
    {
        return $this->morphToMany(\App\Models\ExperienceWork::class, 'experience', 'experience_skills');
    }

    public function experiences_personal() // phpcs:ignore
    {
        return $this->morphToMany(\App\Models\ExperiencePersonal::class, 'experience', 'experience_skills');
    }

    public function experiences_education() // phpcs:ignore
    {
        return $this->morphToMany(\App\Models\ExperienceEducation::class, 'experience', 'experience_skills');
    }

    public function experiences_award() // phpcs:ignore
    {
        return $this->morphToMany(\App\Models\ExperienceAward::class, 'experience', 'experience_skills');
    }

    public function experiences_community() // phpcs:ignore
    {
        return $this->morphToMany(\App\Models\ExperienceCommunity::class, 'experience', 'experience_skills');
    }
}
