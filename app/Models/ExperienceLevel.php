<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ExperienceLevel
 * 
 * @property int $experience_level_id
 * @property string $experience_level_common
 * 
 * @property \Illuminate\Database\Eloquent\Collection $experience_level_details
 * @property \Illuminate\Database\Eloquent\Collection $micro_references
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 *
 * @package App\Models
 */
class ExperienceLevel extends Eloquent
{
	protected $table = 'experience_level';
	protected $primaryKey = 'experience_level_id';
	public $timestamps = false;

	protected $fillable = [
		'experience_level_common'
	];

	public function experience_level_details()
	{
		return $this->hasMany(\App\Models\ExperienceLevelDetail::class);
	}

	public function micro_references()
	{
		return $this->hasMany(\App\Models\MicroReference::class, 'micro_reference_experience_level_id');
	}

	public function skill_declarations()
	{
		return $this->hasMany(\App\Models\SkillDeclaration::class);
	}
}
