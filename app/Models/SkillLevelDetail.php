<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class SkillLevelDetail
 * 
 * @property int $skill_level_details_id
 * @property int $skill_level_id
 * @property int $skill_level_details_locale_id
 * @property string $skill_level_details_name
 * 
 * @property \App\Models\SkillLevel $skill_level
 *
 * @package App\Models
 */
class SkillLevelDetail extends Eloquent
{
	protected $primaryKey = 'skill_level_details_id';
	public $timestamps = false;

	protected $casts = [
		'skill_level_id' => 'int',
		'skill_level_details_locale_id' => 'int'
	];

	protected $fillable = [
		'skill_level_id',
		'skill_level_details_locale_id',
		'skill_level_details_name'
	];

	public function skill_level()
	{
		return $this->belongsTo(\App\Models\SkillLevel::class);
	}
}
