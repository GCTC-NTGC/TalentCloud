<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class SkillType
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $skills
 */
class SkillType extends BaseModel{

    protected $fillable = [
        'name'
    ];

    public function skills(){
        return $this->hasMany(\App\Models\Skill::class);
    }
}
