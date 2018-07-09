<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Locale
 * 
 * @property int $locale_id
 * @property string $locale_iso
 * 
 * @property \Illuminate\Database\Eloquent\Collection $criteria
 * @property \Illuminate\Database\Eloquent\Collection $file_type_details
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_details
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_key_tasks
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_questions
 * @property \Illuminate\Database\Eloquent\Collection $job_seeker_profile_question_details
 * @property \Illuminate\Database\Eloquent\Collection $relationship_details
 *
 * @package App\Models
 */
class Locale extends Eloquent
{
	protected $table = 'locale';
	protected $primaryKey = 'locale_id';
	public $timestamps = false;

	protected $fillable = [
		'locale_iso'
	];

	public function criteria()
	{
		return $this->hasMany(\App\Models\Criterion::class);
	}

	public function file_type_details()
	{
		return $this->hasMany(\App\Models\FileTypeDetail::class);
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

	public function job_seeker_profile_question_details()
	{
		return $this->hasMany(\App\Models\JobSeekerProfileQuestionDetail::class);
	}

	public function relationship_details()
	{
		return $this->hasMany(\App\Models\RelationshipDetail::class);
	}
}
