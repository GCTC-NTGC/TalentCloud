<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class LanguageRequirementTranslation
 * 
 * @property int $id
 * @property string $locale
 * @property int $language_requirement_id
 * @property string $value
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\LanguageRequirement $language_requirement
 *
 * @package App\Models
 */
class LanguageRequirementTranslation extends Eloquent
{
	protected $casts = [
		'language_requirement_id' => 'int'
	];

	protected $fillable = [
		'locale',
		'language_requirement_id',
		'value'
	];

	public function language_requirement()
	{
		return $this->belongsTo(\App\Models\LanguageRequirement::class);
	}
}
