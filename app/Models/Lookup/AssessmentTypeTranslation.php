<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class AssessmentTypeTranslation
 *
 * @property int $id
 * @property int $assessment_type_id
 * @property string $locale
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\AssessmentType $assessment_type
 */
class AssessmentTypeTranslation extends BaseModel{

    protected $casts = [
        'id' => 'int',
        'assessment_type_id' => 'int',
        'locale' => 'string',
        'name' => 'string',
    ];
    protected $fillable = [
        'name',
    ];

    public function assessment_type() {
        return $this->belongsTo(\App\Models\Lookup\AssessmentType::class);
    }

}
