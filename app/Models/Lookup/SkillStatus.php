<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Illuminate\Support\Facades\Lang;

/**
 * Class SkillStatus
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * Accessors:
 * @property string $status
 *
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 */
class SkillStatus extends BaseModel{

    protected $fillable = [
        'name'
    ];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = ['status'];

    public function skill_declarations() {
        return $this->hasMany(\App\Models\SkillDeclaration::class);
    }

    // Accessors
    public function getStatusAttribute() {
        return Lang::get('common/skills.status')[$this->name];
    }
}
