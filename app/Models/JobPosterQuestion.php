<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobPosterQuestion
 * 
 * @property int $id
 * @property int $job_poster_id
 * @property string $locale
 * @property string $question
 * @property string $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\JobPoster $job_poster
 * @property \Illuminate\Database\Eloquent\Collection $job_application_answers
 */
class JobPosterQuestion extends Eloquent
{
	protected $casts = [
		'job_poster_id' => 'int'
	];

	protected $fillable = [
		'locale',
		'question',
		'description'
	];

	public function job_poster()
	{
		return $this->belongsTo(\App\Models\JobPoster::class);
	}

	public function job_application_answers()
	{
		return $this->hasMany(\App\Models\JobApplicationAnswer::class, 'job_poster_questions_id');
	}
}
