<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class SkillLevel
 * 
 * @property int $skill_level_id
 * @property string $skill_level_common_name
 * 
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 * @property \Illuminate\Database\Eloquent\Collection $skill_level_details
 *
 * @package App\Models
 */
class SkillLevel extends Eloquent
{
	protected $table = 'skill_level';
	protected $primaryKey = 'skill_level_id';
	public $timestamps = false;

	protected $fillable = [
		'skill_level_common_name'
	];

	public function skill_declarations()
	{
		return $this->hasMany(\App\Models\SkillDeclaration::class);
	}

	public function skill_level_details()
	{
		return $this->hasMany(\App\Models\SkillLevelDetail::class);
	}
}
