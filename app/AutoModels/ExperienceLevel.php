<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ExperienceLevel
 * 
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $experience_level_translations
 * @property \Illuminate\Database\Eloquent\Collection $micro_references
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 *
 * @package App\Models
 */
class ExperienceLevel extends Eloquent
{
	protected $fillable = [
		'name'
	];

	public function experience_level_translations()
	{
		return $this->hasMany(\App\Models\ExperienceLevelTranslation::class);
	}

	public function micro_references()
	{
		return $this->hasMany(\App\Models\MicroReference::class);
	}

	public function skill_declarations()
	{
		return $this->hasMany(\App\Models\SkillDeclaration::class);
	}
}
