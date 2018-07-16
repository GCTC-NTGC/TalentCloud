<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ApplicationMicroReference
 * 
 * @property int $id
 * @property int $job_application_id
 * @property int $criteria_id
 * @property int $micro_reference_id
 * @property bool $is_active
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Criterion $criterion
 * @property \App\Models\JobApplication $job_application
 * @property \App\Models\MicroReference $micro_reference
 */
class ApplicationMicroReference extends Eloquent
{
	protected $casts = [
		'job_application_id' => 'int',
		'criteria_id' => 'int',
		'micro_reference_id' => 'int',
		'is_active' => 'bool'
	];

	protected $fillable = [];

	public function criterion()
	{
		return $this->belongsTo(\App\Models\Criterion::class, 'criteria_id');
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
