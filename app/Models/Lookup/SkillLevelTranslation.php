<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class SkillLevelTranslation
 *
 * @property int $id
 * @property int $skill_level_id
 * @property string $locale
 * @property string $value
<<<<<<< HEAD
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\Lookup\SkillLevel $skill_level
 */
class SkillLevelTranslation extends Eloquent
{
=======
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\SkillLevel $skill_level
 */
class SkillLevelTranslation extends BaseModel
{
    >>>>>>> dev

    protected $casts = [
        'skill_level_id' => 'int'
    ];
    protected $fillable = [];

    public function skill_level()
    {
        return $this->belongsTo(\App\Models\Lookup\SkillLevel::class);
    }
}
