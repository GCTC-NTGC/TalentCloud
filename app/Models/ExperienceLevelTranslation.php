<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ExperienceLevelTranslation
 * 
 * @property int $id
 * @property string $locale
 * @property int $experience_level_id
 * @property string $value
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\ExperienceLevel $experience_level
 *
 * @package App\Models
 */
class ExperienceLevelTranslation extends Eloquent
{
	protected $casts = [
		'experience_level_id' => 'int'
	];

	protected $fillable = [
		'locale',
		'experience_level_id',
		'value'
	];

	public function experience_level()
	{
		return $this->belongsTo(\App\Models\ExperienceLevel::class);
	}
}
