<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class Project
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $start_date
 * @property \Jenssegers\Date\Date $end_date
 * @property int $applicant_id
 *
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $references
 */
class Project extends BaseModel
{

    protected $casts = [
        'name' => 'string',
        'start_date' => 'date',
        'end_date' => 'date',
        'applicant_id' => 'int'
    ];
    protected $fillable = [
        'name',
        'start_date',
        'end_date'
    ];

    public function references()
    {
        return $this->belongsToMany(\App\Models\Reference::class);
    }

    public function applicant()
    {
        return $this->belongsTo(\App\Models\Applicant::class);
    }
}
