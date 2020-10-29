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
 * @property \Illuminate\Database\Eloquent\Collection $touched_application_steps
 */
class JobApplicationStep extends BaseModel
{
    public function touched_application_steps() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\Lookup\TouchedApplicationStep::class);
    }
}
