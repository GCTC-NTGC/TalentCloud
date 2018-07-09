<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class SkillDeclaration
 * 
 * @property int $skill_declaration_id
 * @property int $criteria_id
 * @property int $job_poster_application_id
 * @property int $experience_level_id
 * @property int $skill_level_id
 * @property string $description
 * @property int $is_active
 * @property \Carbon\Carbon $last_updated
 * 
 * @property \App\Models\JobPosterApplication $job_poster_application
 * @property \App\Models\Criterion $criterion
 * @property \App\Models\ExperienceLevel $experience_level
 * @property \App\Models\SkillLevel $skill_level
 *
 * @package App\Models
 */
class SkillDeclaration extends Eloquent
{
	protected $table = 'skill_declaration';
	protected $primaryKey = 'skill_declaration_id';
	public $timestamps = false;

	protected $casts = [
		'criteria_id' => 'int',
		'job_poster_application_id' => 'int',
		'experience_level_id' => 'int',
		'skill_level_id' => 'int',
		'is_active' => 'int'
	];

	protected $dates = [
		'last_updated'
	];

	protected $fillable = [
		'criteria_id',
		'job_poster_application_id',
		'experience_level_id',
		'skill_level_id',
		'description',
		'is_active',
		'last_updated'
	];

	public function job_poster_application()
	{
		return $this->belongsTo(\App\Models\JobPosterApplication::class);
	}

	public function criterion()
	{
		return $this->belongsTo(\App\Models\Criterion::class, 'criteria_id');
	}

	public function experience_level()
	{
		return $this->belongsTo(\App\Models\ExperienceLevel::class);
	}

	public function skill_level()
	{
		return $this->belongsTo(\App\Models\SkillLevel::class);
	}
}
