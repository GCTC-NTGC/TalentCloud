<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class ApplicationStatusTranslation
 * 
 * @property int $id
 * @property int $application_status_id
 * @property string $locale
 * @property string $value
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
 * @property \App\Models\Lookup\ApplicationStatus $application_status
 */
class ApplicationStatusTranslation extends BaseModel{

    protected $casts = [
        'application_status_id' => 'int'
    ];
    protected $fillable = [];

    public function application_status() {
        return $this->belongsTo(\App\Models\Lookup\ApplicationStatus::class);
    }

}
