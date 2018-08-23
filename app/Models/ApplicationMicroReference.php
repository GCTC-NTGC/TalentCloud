<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

/**
 * Class ApplicationMicroReference
 *
 * @property int $id
 * @property int $job_application_id
 * @property int $criteria_id
 * @property int $micro_reference_id
 * @property bool $is_active
<<<<<<< HEAD
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
=======
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
>>>>>>> dev
 * @property \App\Models\Criteria $criterion
 * @property \App\Models\JobApplication $job_application
 * @property \App\Models\MicroReference $micro_reference
 */
<<<<<<< HEAD
class ApplicationMicroReference extends Eloquent
{
=======
class ApplicationMicroReference extends BaseModel {
>>>>>>> dev

    protected $casts = [
        'job_application_id' => 'int',
        'criteria_id' => 'int',
        'micro_reference_id' => 'int',
        'is_active' => 'bool'
    ];
    protected $fillable = [];

    public function criterion()
    {
        return $this->belongsTo(\App\Models\Criteria::class, 'criteria_id');
    }

    public function job_application()
    {
        return $this->belongsTo(\App\Models\JobApplication::class);
    }

    public function micro_reference()
    {
        return $this->belongsTo(\App\Models\MicroReference::class);
    }
}
