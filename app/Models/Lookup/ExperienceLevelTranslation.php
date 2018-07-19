<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ExperienceLevelTranslation
 * 
 * @property int $id
 * @property string $locale
 * @property int $experience_level_id
 * @property string $value
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Lookup\ExperienceLevel $experience_level
 */
class ExperienceLevelTranslation extends Eloquent {

    protected $casts = [
        'experience_level_id' => 'int'
    ];
    protected $fillable = [];

    public function experience_level() {
        return $this->belongsTo(\App\Models\Lookup\ExperienceLevel::class);
    }

}
