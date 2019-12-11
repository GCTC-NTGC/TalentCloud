<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class VeteranStatus
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 *
 */
class VeteranStatus extends BaseModel{

    protected $fillable = [];

    public function job_applications(){
        return $this->hasMany(\App\Models\JobApplication::class);
    }

}
