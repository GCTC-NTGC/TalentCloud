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
 * @property string $name
 * @property string $institution
 * @property int $course_status_id
 * @property \Jenssegers\Date\Date $start_date
 * @property \Jenssegers\Date\Date $end_date
 * @property int $applicant_id
 *
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\CourseStatus $course_status
 * @property \App\Models\Applicant $applicant
 */
class Course extends BaseModel{

    protected $casts = [
        'name' => 'string',
        'institution' => 'string',
        'course_status_id' => 'int',
        'start_date' => 'date',
        'end_date' => 'date',
        'appliant_id' => 'int'
    ];
    protected $fillable = [
        'name',
        'institution',
        'course_status_id',
        'start_date',
        'end_date'
    ];

    public function course_status(){
        return $this->belongsTo(\App\Models\Lookup\CourseStatus::class);
    }

    public function applicant(){
        return $this->belongsTo(\App\Models\Applicant::class);
    }
}
