<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class ProvinceTranslation
 * 
 * @property int $id
 * @property int $province_id
 * @property string $locale
 * @property string $value
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
 * @property \App\Models\Lookup\Province $province
 */
class ProvinceTranslation extends BaseModel{

    protected $casts = [
        'province_id' => 'int'
    ];
    protected $fillable = [];

    public function province() {
        return $this->belongsTo(\App\Models\Lookup\Province::class);
    }

}
