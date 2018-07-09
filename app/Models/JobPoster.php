<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobPoster
 * 
 * @property int $job_poster_id
 * @property int $job_term_id
 * @property string $job_poster_term_qty
 * @property int $job_poster_job_min_level_id
 * @property int $job_poster_job_max_level_id
 * @property \Carbon\Carbon $job_poster_open_date_time
 * @property \Carbon\Carbon $job_poster_close_date_time
 * @property \Carbon\Carbon $job_poster_start_date
 * @property int $job_poster_department_id
 * @property int $job_poster_province_id
 * @property int $job_poster_remuneration_min
 * @property int $job_poster_remuneration_max
 * @property int $job_poster_noc
 * @property string $job_poster_classification
 * @property int $job_poster_clearance_id
 * @property int $job_poster_language_id
 * 
 * @property \Illuminate\Database\Eloquent\Collection $criteria
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_applications
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_details
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_key_tasks
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_questions
 * @property \Illuminate\Database\Eloquent\Collection $users
 *
 * @package App\Models
 */
class JobPoster extends Eloquent
{
	protected $table = 'job_poster';
	protected $primaryKey = 'job_poster_id';
	public $timestamps = false;

	protected $casts = [
		'job_term_id' => 'int',
		'job_poster_job_min_level_id' => 'int',
		'job_poster_job_max_level_id' => 'int',
		'job_poster_department_id' => 'int',
		'job_poster_province_id' => 'int',
		'job_poster_remuneration_min' => 'int',
		'job_poster_remuneration_max' => 'int',
		'job_poster_noc' => 'int',
		'job_poster_clearance_id' => 'int',
		'job_poster_language_id' => 'int'
	];

	protected $dates = [
		'job_poster_open_date_time',
		'job_poster_close_date_time',
		'job_poster_start_date'
	];

	protected $fillable = [
		'job_term_id',
		'job_poster_term_qty',
		'job_poster_job_min_level_id',
		'job_poster_job_max_level_id',
		'job_poster_open_date_time',
		'job_poster_close_date_time',
		'job_poster_start_date',
		'job_poster_department_id',
		'job_poster_province_id',
		'job_poster_remuneration_min',
		'job_poster_remuneration_max',
		'job_poster_noc',
		'job_poster_classification',
		'job_poster_clearance_id',
		'job_poster_language_id'
	];

	public function criteria()
	{
		return $this->hasMany(\App\Models\Criterion::class);
	}

	public function job_poster_applications()
	{
		return $this->hasMany(\App\Models\JobPosterApplication::class, 'application_job_poster_id');
	}

	public function job_poster_details()
	{
		return $this->hasMany(\App\Models\JobPosterDetail::class);
	}

	public function job_poster_key_tasks()
	{
		return $this->hasMany(\App\Models\JobPosterKeyTask::class);
	}

	public function job_poster_questions()
	{
		return $this->hasMany(\App\Models\JobPosterQuestion::class);
	}

	public function users()
	{
		return $this->belongsToMany(\App\Models\User::class, 'job_poster_to_manager_user_id');
	}
}
