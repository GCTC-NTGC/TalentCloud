<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;
use App\Models\Applicant;

/**
 * Class Degree
 *
 * @property int $id
 * @property int $degree_type_id
 * @property string $area_of_study
 * @property string $institution
 * @property string $thesis
 * @property \Jenssegers\Date\Date $start_date
 * @property \Jenssegers\Date\Date $end_date
 * @property int $applicant_id
 *
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\DegreeType $degree_type
 * @property \App\Models\Applicant $applicant
 */
class Degree extends BaseModel {

    protected $casts = [
        'degree_type_id' => 'int',
        'area_of_study' => 'string',
        'institution' => 'string',
        'thesis' => 'string',
        'start_date' => 'date',
        'end_date' => 'date',
        'appliant_id' => 'int'
    ];
    protected $fillable = [
        'degree_type_id',
        'area_of_study',
        'institution',
        'thesis',
        'start_date',
        'end_date'
    ];

    public function degree_type() {
        return $this->belongsTo(\App\Models\Lookup\DegreeType::class);
    }

    public function applicant() {
        return $this->belongsTo(\App\Models\Applicant::class);
    }
}
