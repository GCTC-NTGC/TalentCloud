<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobPosterQuestionTranslation
 * 
 * @property int $id
 * @property int $job_poster_question_id
 * @property string $locale
 * @property string $question
 * @property string $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\JobPosterQuestion $job_poster_question
 */
class JobPosterQuestionTranslation extends Eloquent
{
	protected $casts = [
		'job_poster_question_id' => 'int'
	];

	protected $fillable = [
		'question',
		'description'
	];

	public function job_poster_question()
	{
		return $this->belongsTo(\App\Models\JobPosterQuestion::class);
	}
}
