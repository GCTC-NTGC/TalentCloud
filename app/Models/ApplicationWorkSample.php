<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ApplicationWorkSample
 * 
 * @property int $application_work_sample_id
 * @property int $job_poster_application_id
 * @property int $criteria_id
 * @property int $work_sample_id
 * @property int $is_active
 * 
 * @property \App\Models\JobPosterApplication $job_poster_application
 * @property \App\Models\Criterion $criterion
 * @property \App\Models\WorkSample $work_sample
 *
 * @package App\Models
 */
class ApplicationWorkSample extends Eloquent
{
	protected $table = 'application_work_sample';
	protected $primaryKey = 'application_work_sample_id';
	public $timestamps = false;

	protected $casts = [
		'job_poster_application_id' => 'int',
		'criteria_id' => 'int',
		'work_sample_id' => 'int',
		'is_active' => 'int'
	];

	protected $fillable = [
		'job_poster_application_id',
		'criteria_id',
		'work_sample_id',
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

	public function work_sample()
	{
		return $this->belongsTo(\App\Models\WorkSample::class);
	}
}
