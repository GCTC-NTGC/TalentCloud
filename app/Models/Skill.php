<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Illuminate\Support\Facades\Lang;
use \Backpack\CRUD\CrudTrait;

/**
 * Class Skill
 *
 * @property int $id
 * @property string $name
 * @property int $skill_type_id
 *
 * Accessors:
 * @property string $skill
 * @property string $description
 *
 * @property \App\Models\Lookup\SkillType $skill_type
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 */
class Skill extends BaseModel {

    use CrudTrait;

    protected $casts = [
        'name' => 'string',
        'skill_type_id' => 'int'
    ];
    protected $fillable = [
        'name',
        'skill_type_id'
    ];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = ['skill', 'description'];

    public function skill_type() {
        return $this->belongsTo(\App\Models\Lookup\SkillType::class);
    }

    public function skill_declarations() {
        return $this->hasMany(\App\Models\SkillDeclaration::class);
    }

    // Accessors
    public function getSkillAttribute() {
        return Lang::get('common/skills.skills')[$this->name]['name'];
    }

    public function getDescriptionAttribute() {
        return Lang::get('common/skills.skills')[$this->name]['description'];
    }
}
