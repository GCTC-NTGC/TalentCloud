<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class Step
 *
 * @property int $job_application_id
 * @property int $step_id
 * @property boolean $touched
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobApplication $job_application
 * @property \App\Models\Lookup\JobApplicationStep $job_application_step
 */
class TouchedApplicationStep extends BaseModel
{
    protected $casts = [
      'job_application_id' => 'int',
      'skill_id' => 'int',
      'touched' => 'boolean',
    ];

    protected $fillable = [
      'touched'
    ];

    public function job_application() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\JobApplication::class);
    }

    public function job_application_step() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\JobApplicationStep::class);
    }


}
