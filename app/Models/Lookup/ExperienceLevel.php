<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class ExperienceLevel
 *
 * @property int $id
 * @property string $name
<<<<<<< HEAD
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
=======
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
>>>>>>> dev
 * @property \Illuminate\Database\Eloquent\Collection $experience_level_translations
 * @property \Illuminate\Database\Eloquent\Collection $micro_references
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 *
 * Localized Properties:
 * @property string $value
 */
<<<<<<< HEAD
class ExperienceLevel extends Eloquent
{
=======
class ExperienceLevel extends BaseModel {
>>>>>>> dev

    use \Dimsav\Translatable\Translatable;

    public $translatedAttributes = ['value'];
    protected $fillable = [];

    public function experience_level_translations()
    {
        return $this->hasMany(\App\Models\Lookup\ExperienceLevelTranslation::class);
    }

    public function micro_references()
    {
        return $this->hasMany(\App\Models\MicroReference::class);
    }

    public function skill_declarations()
    {
        return $this->hasMany(\App\Models\SkillDeclaration::class);
    }
}
