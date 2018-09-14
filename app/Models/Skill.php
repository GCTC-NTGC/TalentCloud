<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

/**
 * Class Skill
 *
 * @property int $id
 * @property string $name
 * @property int $skill_type_id
 *
 * @property \App\Models\Lookup\SkillType $skill_type
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 */
class Skill extends BaseModel {

    protected $casts = [
        'name' => 'string',
        'skill_type_id' => 'int'
    ];
    protected $fillable = [
        'name',
        'skill_type_id'
    ];

    public function skill_type() {
        return $this->belongsTo(\App\Models\Lookup\SkillType::class);
    }

    public function skill_declarations() {
        return $this->hasMany(\App\Models\SkillDeclaration::class);
    }

}
