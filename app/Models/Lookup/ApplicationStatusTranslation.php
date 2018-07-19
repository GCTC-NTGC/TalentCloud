<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ApplicationStatusTranslation
 * 
 * @property int $id
 * @property int $application_status_id
 * @property string $locale
 * @property string $value
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Lookup\ApplicationStatus $application_status
 */
class ApplicationStatusTranslation extends Eloquent {

    protected $casts = [
        'application_status_id' => 'int'
    ];
    protected $fillable = [];

    public function application_status() {
        return $this->belongsTo(\App\Models\Lookup\ApplicationStatus::class);
    }

}
