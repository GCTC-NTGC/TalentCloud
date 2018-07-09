<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobSeekerProfileQuestionDetail
 * 
 * @property int $job_seeker_profile_question_id
 * @property int $locale_id
 * @property string $question
 * @property string $description
 * 
 * @property \App\Models\JobSeekerProfileQuestion $job_seeker_profile_question
 * @property \App\Models\Locale $locale
 *
 * @package App\Models
 */
class JobSeekerProfileQuestionDetail extends Eloquent
{
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'job_seeker_profile_question_id' => 'int',
		'locale_id' => 'int'
	];

	protected $fillable = [
		'question',
		'description'
	];

	public function job_seeker_profile_question()
	{
		return $this->belongsTo(\App\Models\JobSeekerProfileQuestion::class);
	}

	public function locale()
	{
		return $this->belongsTo(\App\Models\Locale::class);
	}
}
