<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class ExperienceLevelTranslation
 *
 * @property int $id
 * @property string $locale
 * @property int $experience_level_id
 * @property string $value
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\ExperienceLevel $experience_level
 */
class ExperienceLevelTranslation extends BaseModel
{

    protected $casts = [
        'experience_level_id' => 'int'
    ];
    protected $fillable = [];

    public function experience_level()
    {
        return $this->belongsTo(\App\Models\Lookup\ExperienceLevel::class);
    }
}
