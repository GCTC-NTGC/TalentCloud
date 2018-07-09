<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ApplicationMicroReference
 * 
 * @property int $application_micro_reference_id
 * @property int $job_poster_application_id
 * @property int $criteria_id
 * @property int $micro_reference_id
 * @property int $is_active
 * 
 * @property \App\Models\JobPosterApplication $job_poster_application
 * @property \App\Models\Criterion $criterion
 * @property \App\Models\MicroReference $micro_reference
 *
 * @package App\Models
 */
class ApplicationMicroReference extends Eloquent
{
	protected $table = 'application_micro_reference';
	protected $primaryKey = 'application_micro_reference_id';
	public $timestamps = false;

	protected $casts = [
		'job_poster_application_id' => 'int',
		'criteria_id' => 'int',
		'micro_reference_id' => 'int',
		'is_active' => 'int'
	];

	protected $fillable = [
		'job_poster_application_id',
		'criteria_id',
		'micro_reference_id',
		'is_active'
	];

	public function job_poster_application()
	{
		return $this->belongsTo(\App\Models\JobPosterApplication::class);
	}

	public function criterion()
	{
		return $this->belongsTo(\App\Models\Criterion::class, 'criteria_id');
	}

	public function micro_reference()
	{
		return $this->belongsTo(\App\Models\MicroReference::class);
	}
}
