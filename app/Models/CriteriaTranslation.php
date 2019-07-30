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
 * @property string $locale
 * @property int $criteria_id
 * @property string $description
 * @property string $specificity
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\Criteria $criteria
 */
class CriteriaTranslation extends BaseModel
{

    protected $casts = [
        'criteria_id' => 'int',
        'locale' => 'string',
        'description' => 'string',
        'specificity' => 'string'
    ];
    protected $fillable = [
        'description',
        'specificity'
    ];

    public function criteria()
    {
        return $this->belongsTo(\App\Models\Lookup\Criteria::class);
    }
}
