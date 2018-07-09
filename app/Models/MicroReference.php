<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class MicroReference
 * 
 * @property int $micro_reference_id
 * @property string $micro_reference_name
 * @property string $micro_reference_email
 * @property int $micro_reference_relationship_id
 * @property \Carbon\Carbon $micro_reference_observed_from_date
 * @property \Carbon\Carbon $micro_reference_observed_until_date
 * @property int $micro_reference_experience_level_id
 * @property string $micro_reference_story
 * 
 * @property \App\Models\ExperienceLevel $experience_level
 * @property \App\Models\Relationship $relationship
 * @property \Illuminate\Database\Eloquent\Collection $application_micro_references
 *
 * @package App\Models
 */
class MicroReference extends Eloquent
{
	protected $table = 'micro_reference';
	protected $primaryKey = 'micro_reference_id';
	public $timestamps = false;

	protected $casts = [
		'micro_reference_relationship_id' => 'int',
		'micro_reference_experience_level_id' => 'int'
	];

	protected $dates = [
		'micro_reference_observed_from_date',
		'micro_reference_observed_until_date'
	];

	protected $fillable = [
		'micro_reference_name',
		'micro_reference_email',
		'micro_reference_relationship_id',
		'micro_reference_observed_from_date',
		'micro_reference_observed_until_date',
		'micro_reference_experience_level_id',
		'micro_reference_story'
	];

	public function experience_level()
	{
		return $this->belongsTo(\App\Models\ExperienceLevel::class, 'micro_reference_experience_level_id');
	}

	public function relationship()
	{
		return $this->belongsTo(\App\Models\Relationship::class, 'micro_reference_relationship_id');
	}

	public function application_micro_references()
	{
		return $this->hasMany(\App\Models\ApplicationMicroReference::class);
	}
}
