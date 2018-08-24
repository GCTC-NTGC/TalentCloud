<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

/**
 * Class CriteriaTranslation
 * 
 * @property int $id
 * @property int $criteria_id
 * @property string $name
 * @property string $description
 * @property string $locale
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
 * @property \App\Models\Criteria $criterion
 */
class CriteriaTranslation extends BaseModel {

    protected $casts = [
        'criteria_id' => 'int'
    ];
    protected $fillable = [
        'name',
        'description',
        'locale'
    ];

    public function criterion() {
        return $this->belongsTo(\App\Models\Criteria::class, 'criteria_id');
    }

}
