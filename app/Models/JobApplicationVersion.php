<?php

namespace App\Models;

/**
 * Class JobApplicationVersion
 *
 * @property int $id
 * @property int $version
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobApplication $job_application
 */
class JobApplicationVersion extends BaseModel
{

    protected $casts = [
        'version' => 'int',
    ];
    protected $fillable = [
        'version'
    ];

    public function job_application() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\JobApplication::class);
    }
}
