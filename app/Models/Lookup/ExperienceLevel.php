<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Astrotomic\Translatable\Translatable as Translatable;

/**
 * Class ExperienceLevel
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $experience_level_translations
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 *
 * Localized Properties:
 * @property string $value
 */
class ExperienceLevel extends BaseModel
{

    use Translatable;

    public $translatedAttributes = ['value'];
    protected $fillable = [];

    public function experience_level_translations() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\Lookup\ExperienceLevelTranslation::class);
    }

    public function skill_declarations() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\SkillDeclaration::class);
    }
}
