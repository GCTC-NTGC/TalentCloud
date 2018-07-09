<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobPosterQuestion
 * 
 * @property int $id
 * @property int $job_poster_id
 * @property int $locale_id
 * @property string $question
 * @property string $description
 * 
 * @property \App\Models\JobPoster $job_poster
 * @property \App\Models\Locale $locale
 * @property \Illuminate\Database\Eloquent\Collection $job_application_answers
 *
 * @package App\Models
 */
class JobPosterQuestion extends Eloquent
{
	protected $table = 'job_poster_question';
	public $timestamps = false;

	protected $casts = [
		'job_poster_id' => 'int',
		'locale_id' => 'int'
	];

	protected $fillable = [
		'job_poster_id',
		'locale_id',
		'question',
		'description'
	];

	public function job_poster()
	{
		return $this->belongsTo(\App\Models\JobPoster::class);
	}

	public function locale()
	{
		return $this->belongsTo(\App\Models\Locale::class);
	}

	public function job_application_answers()
	{
		return $this->hasMany(\App\Models\JobApplicationAnswer::class);
	}
}
