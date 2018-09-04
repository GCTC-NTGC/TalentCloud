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
 */
class SkillDeclaration extends BaseModel {

    protected $casts = [
        'skill_id' => 'int',
        'skill_status_id' => 'int',
        'skill_level_id' => 'int',
        'applicant_id' => 'int',
        'description' => 'string'
    ];
    protected $fillable = [
        'skill_level_id',
        'description',
    ];

    public function skill() {
        return $this->belongsTo(\App\Models\Skill::class);
    }

    public function skill_status() {
        return $this->belongsTo(\App\Models\Lookup\SkillStatus::class);
    }

    public function skill_level() {
        return $this->belongsTo(\App\Models\Lookup\SkillLevel::class);
    }

}
