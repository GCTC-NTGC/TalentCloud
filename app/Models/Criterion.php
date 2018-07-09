<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Criterion
 * 
 * @property int $criteria_id
 * @property int $criteria_type_id
 * @property string $criteria_name
 * @property string $criteria_description
 * @property int $locale_id
 * @property int $job_poster_id
 * 
 * @property \App\Models\CriteriaType $criteria_type
 * @property \App\Models\JobPoster $job_poster
 * @property \App\Models\Locale $locale
 * @property \Illuminate\Database\Eloquent\Collection $application_micro_references
 * @property \Illuminate\Database\Eloquent\Collection $application_work_samples
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 *
 * @package App\Models
 */
class Criterion extends Eloquent
{
	public $timestamps = false;

	protected $casts = [
		'criteria_type_id' => 'int',
		'locale_id' => 'int',
		'job_poster_id' => 'int'
	];

	protected $fillable = [
		'criteria_name',
		'criteria_description',
		'locale_id',
		'job_poster_id'
	];

	public function criteria_type()
	{
		return $this->belongsTo(\App\Models\CriteriaType::class);
	}

	public function job_poster()
	{
		return $this->belongsTo(\App\Models\JobPoster::class);
	}

	public function locale()
	{
		return $this->belongsTo(\App\Models\Locale::class);
	}

	public function application_micro_references()
	{
		return $this->hasMany(\App\Models\ApplicationMicroReference::class, 'criteria_id');
	}

	public function application_work_samples()
	{
		return $this->hasMany(\App\Models\ApplicationWorkSample::class, 'criteria_id');
	}

	public function skill_declarations()
	{
		return $this->hasMany(\App\Models\SkillDeclaration::class, 'criteria_id');
	}
}
