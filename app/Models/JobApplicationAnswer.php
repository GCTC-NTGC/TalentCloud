<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobApplicationAnswer
 * 
 * @property int $job_poster_question_id
 * @property int $job_application_id
 * @property string $answer
 * 
 * @property \App\Models\JobPosterApplication $job_poster_application
 * @property \App\Models\JobPosterQuestion $job_poster_question
 *
 * @package App\Models
 */
class JobApplicationAnswer extends Eloquent
{
	protected $table = 'job_application_answer';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'job_poster_question_id' => 'int',
		'job_application_id' => 'int'
	];

	protected $fillable = [
		'answer'
	];

	public function job_poster_application()
	{
		return $this->belongsTo(\App\Models\JobPosterApplication::class, 'job_application_id');
	}

	public function job_poster_question()
	{
		return $this->belongsTo(\App\Models\JobPosterQuestion::class);
	}
}
