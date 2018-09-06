<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class SkillStatus
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 */
class SkillStatus extends BaseModel {

    protected $fillable = [
        'name'
    ];

    public function skill_declarations() {
        return $this->hasMany(\App\Models\SkillDeclaration::class);
    }
}
