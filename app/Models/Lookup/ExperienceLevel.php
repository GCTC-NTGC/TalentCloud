<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class ExperienceLevel
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 *
 * Localized Properties:
 * @property string $value
 */
class ExperienceLevel extends BaseModel
{
    use HasTranslations;

    public $translatable = ['value'];
    protected $fillable = [];

    public function skill_declarations() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\SkillDeclaration::class);
    }
}
