<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class SkillDeclaration
 * 
 * @property int $id
 * @property int $criteria_id
 * @property int $job_application_id
 * @property int $experience_level_id
 * @property int $skill_level_id
 * @property string $description
 * @property bool $is_active
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Criterion $criterion
 * @property \App\Models\ExperienceLevel $experience_level
 * @property \App\Models\JobApplication $job_application
 * @property \App\Models\SkillLevel $skill_level
 *
 * @package App\Models
 */
class SkillDeclaration extends Eloquent
{
	protected $table = 'skill_declaration';

	protected $casts = [
		'criteria_id' => 'int',
		'job_application_id' => 'int',
		'experience_level_id' => 'int',
		'skill_level_id' => 'int',
		'is_active' => 'bool'
	];

	protected $fillable = [
		'criteria_id',
		'job_application_id',
		'experience_level_id',
		'skill_level_id',
		'description',
		'is_active'
	];

	public function criterion()
	{
		return $this->belongsTo(\App\Models\Criterion::class, 'criteria_id');
	}

	public function experience_level()
	{
		return $this->belongsTo(\App\Models\ExperienceLevel::class);
	}

	public function job_application()
	{
		return $this->belongsTo(\App\Models\JobApplication::class);
	}

	public function skill_level()
	{
		return $this->belongsTo(\App\Models\SkillLevel::class);
	}
}
