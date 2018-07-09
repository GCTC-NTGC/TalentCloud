<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobSeekerProfileAnswer
 * 
 * @property int $job_seeker_profile_id
 * @property int $job_seeker_profile_question_id
 * @property string $answer
 * 
 * @property \App\Models\JobSeekerProfileQuestion $job_seeker_profile_question
 * @property \App\Models\JobSeekerProfile $job_seeker_profile
 *
 * @package App\Models
 */
class JobSeekerProfileAnswer extends Eloquent
{
	protected $table = 'job_seeker_profile_answer';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'job_seeker_profile_id' => 'int',
		'job_seeker_profile_question_id' => 'int'
	];

	protected $fillable = [
		'answer'
	];

	public function job_seeker_profile_question()
	{
		return $this->belongsTo(\App\Models\JobSeekerProfileQuestion::class);
	}

	public function job_seeker_profile()
	{
		return $this->belongsTo(\App\Models\JobSeekerProfile::class);
	}
}
