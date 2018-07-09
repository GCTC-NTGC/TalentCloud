<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobPosterApplication
 * 
 * @property int $job_poster_application_id
 * @property int $application_job_poster_id
 * @property int $job_poster_application_status_id
 * @property \Carbon\Carbon $last_updated
 * @property int $user_id
 * 
 * @property \App\Models\ApplicationStatus $application_status
 * @property \App\Models\JobPoster $job_poster
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $application_micro_references
 * @property \Illuminate\Database\Eloquent\Collection $application_work_samples
 * @property \Illuminate\Database\Eloquent\Collection $job_application_answers
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 *
 * @package App\Models
 */
class JobPosterApplication extends Eloquent
{
	protected $table = 'job_poster_application';
	protected $primaryKey = 'job_poster_application_id';
	public $timestamps = false;

	protected $casts = [
		'application_job_poster_id' => 'int',
		'job_poster_application_status_id' => 'int',
		'user_id' => 'int'
	];

	protected $dates = [
		'last_updated'
	];

	protected $fillable = [
		'application_job_poster_id',
		'job_poster_application_status_id',
		'last_updated',
		'user_id'
	];

	public function application_status()
	{
		return $this->belongsTo(\App\Models\ApplicationStatus::class, 'job_poster_application_status_id');
	}

	public function job_poster()
	{
		return $this->belongsTo(\App\Models\JobPoster::class, 'application_job_poster_id');
	}

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class);
	}

	public function application_micro_references()
	{
		return $this->hasMany(\App\Models\ApplicationMicroReference::class);
	}

	public function application_work_samples()
	{
		return $this->hasMany(\App\Models\ApplicationWorkSample::class);
	}

	public function job_application_answers()
	{
		return $this->hasMany(\App\Models\JobApplicationAnswer::class, 'job_application_id');
	}

	public function skill_declarations()
	{
		return $this->hasMany(\App\Models\SkillDeclaration::class);
	}
}
