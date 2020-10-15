<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class Step
 *
 * @property int $id
 * @property int $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $job_application_steps
 */
class Step extends BaseModel
{
    public function job_applications() //phpcs:ignore
    {
        return $this->belongsToMany(
            \App\Models\JobApplication::class,
            'job_application_steps',
            'step_id',
            'job_application_id'
        )->withPivot('touched');
    }
}
