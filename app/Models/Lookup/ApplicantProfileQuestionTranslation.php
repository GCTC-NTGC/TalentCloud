<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ApplicantProfileQuestionTranslation
 * 
 * @property int $id
 * @property int $applicant_profile_question_id
 * @property string $locale
 * @property string $value
 * @property string $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Lookup\ApplicantProfileQuestion $applicant_profile_question
 */
class ApplicantProfileQuestionTranslation extends Eloquent
{
	protected $casts = [
		'applicant_profile_question_id' => 'int'
	];

	protected $fillable = [];

	public function applicant_profile_question()
	{
		return $this->belongsTo(\App\Models\Lookup\ApplicantProfileQuestion::class);
	}
}
