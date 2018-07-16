<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ApplicantProfileQuestion
 * 
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $applicant_profile_answers
 * @property \Illuminate\Database\Eloquent\Collection $applicant_profile_question_translations
 */
class ApplicantProfileQuestion extends Eloquent
{
	protected $fillable = [];

	public function applicant_profile_answers()
	{
		return $this->hasMany(\App\Models\ApplicantProfileAnswer::class);
	}

	public function applicant_profile_question_translations()
	{
		return $this->hasMany(\App\Models\ApplicantProfileQuestionTranslation::class);
	}
}
