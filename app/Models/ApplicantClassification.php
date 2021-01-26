<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class ApplicationClassification
 *
 * @property int $id
 * @property int applicant_id
 * @property int classification_id
 * @property int level
 * @property int order
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant $applicant
 * @property \App\Models\Classification $classification
 */
class ApplicantClassification extends BaseModel
{
    protected $casts = [
        'applicant_id' => 'int',
        'classification_id' => 'int',
        'level' => 'int',
        'order' => 'int',
    ];

    protected $fillable = [
        'level',
        'order',
    ];

    public function applicant() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Applicant::class);
    }

    public function classification() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Classification::class);
    }
}
