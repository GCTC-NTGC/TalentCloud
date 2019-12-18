<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;
use App\Models\WorkEnvironment;

/**
 * Class WorkEnvironmentTranslation
 *
 * @property int $id
 * @property int $work_environment_id
 * @property string $locale
 * @property string $things_to_know
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\WorkEnvironment $work_environment
 */
class WorkEnvironmentTranslation extends BaseModel{

    protected $fillable = [
        'things_to_know'
    ];

    public function work_environment() {
        return $this->belongsTo(\App\Models\WorkEnvironment::class);
    }
}
