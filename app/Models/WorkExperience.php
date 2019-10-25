<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class WorkExperience
 *
 * @property int $id
 * @property string $role
 * @property string $company
 * @property string $description
 * @property \Jenssegers\Date\Date $start_date
 * @property \Jenssegers\Date\Date $end_date
 * @property int $experienceable_id
 * @property int $experienceable_type
 *
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant|\App\Models\JobApplication $experienceable
 */
class WorkExperience extends BaseModel
{

    protected $casts = [
        'role' => 'string',
        'company' => 'string',
        'description' => 'string',
        'start_date' => 'date',
        'end_date' => 'date',
    ];
    protected $fillable = [
        'role',
        'company',
        'description',
        'start_date',
        'end_date'
    ];

    public function experienceable()
    {
        return $this->morphTo();
    }
}
