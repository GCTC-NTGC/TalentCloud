<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobSeekerProfileQuestion
 * 
 * @property int $job_seeker_profile_question_id
 * @property string $common_name
 * 
 * @property \Illuminate\Database\Eloquent\Collection $job_seeker_profile_answers
 * @property \Illuminate\Database\Eloquent\Collection $job_seeker_profile_question_details
 *
 * @package App\Models
 */
class JobSeekerProfileQuestion extends Eloquent
{
	protected $table = 'job_seeker_profile_question';
	protected $primaryKey = 'job_seeker_profile_question_id';
	public $timestamps = false;

	protected $fillable = [
		'common_name'
	];

	public function job_seeker_profile_answers()
	{
		return $this->hasMany(\App\Models\JobSeekerProfileAnswer::class);
	}

	public function job_seeker_profile_question_details()
	{
		return $this->hasMany(\App\Models\JobSeekerProfileQuestionDetail::class);
	}
}
