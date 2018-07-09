<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ExperienceLevelDetail
 * 
 * @property int $experience_level_details_id
 * @property int $experience_level_details_locale_id
 * @property int $experience_level_id
 * @property string $experience_level_details_name
 * 
 * @property \App\Models\ExperienceLevel $experience_level
 *
 * @package App\Models
 */
class ExperienceLevelDetail extends Eloquent
{
	protected $primaryKey = 'experience_level_details_id';
	public $timestamps = false;

	protected $casts = [
		'experience_level_details_locale_id' => 'int',
		'experience_level_id' => 'int'
	];

	protected $fillable = [
		'experience_level_details_locale_id',
		'experience_level_id',
		'experience_level_details_name'
	];

	public function experience_level()
	{
		return $this->belongsTo(\App\Models\ExperienceLevel::class);
	}
}
