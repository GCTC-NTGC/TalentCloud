<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Astrotomic\Translatable\Translatable as Translatable;

/**
 * Class SkillLevel
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 * @property \Illuminate\Database\Eloquent\Collection $skill_level_translations
 *
 * Localized Properties:
 * @property string $value
 */
class SkillLevel extends BaseModel
{

    use Translatable;

    public $translatedAttributes = ['value'];
    protected $fillable = [];

    public function skill_declarations() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\SkillDeclaration::class);
    }

    public function skill_level_translations() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\Lookup\SkillLevelTranslation::class);
    }
}
