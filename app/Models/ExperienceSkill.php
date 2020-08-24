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
 * @property \Illuminate\Database\Eloquent\Collection $skill
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

    public function skill()
    {
        return $this->belongsTo(\App\Models\Skill::class);
    }

    public function experience()
    {
        return $this->morphTo();
    }
}
