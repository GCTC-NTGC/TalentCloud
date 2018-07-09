<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class SkillDetail
 * 
 * @property int $skill_details_id
 * @property int $skill_id
 * @property int $skill_details_locale_id
 * @property string $skill_details_name
 *
 * @package App\Models
 */
class SkillDetail extends Eloquent
{
	protected $primaryKey = 'skill_details_id';
	public $timestamps = false;

	protected $casts = [
		'skill_id' => 'int',
		'skill_details_locale_id' => 'int'
	];

	protected $fillable = [
		'skill_id',
		'skill_details_locale_id',
		'skill_details_name'
	];
}
