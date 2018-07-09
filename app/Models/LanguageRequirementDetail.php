<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class LanguageRequirementDetail
 * 
 * @property int $language_requirement_details_id
 * @property int $language_requirement_details_locale_id
 * @property int $language_requirement_id
 * @property string $language_requirement_details_name
 * 
 * @property \App\Models\LanguageRequirement $language_requirement
 *
 * @package App\Models
 */
class LanguageRequirementDetail extends Eloquent
{
	protected $primaryKey = 'language_requirement_details_id';
	public $timestamps = false;

	protected $casts = [
		'language_requirement_details_locale_id' => 'int',
		'language_requirement_id' => 'int'
	];

	protected $fillable = [
		'language_requirement_details_locale_id',
		'language_requirement_id',
		'language_requirement_details_name'
	];

	public function language_requirement()
	{
		return $this->belongsTo(\App\Models\LanguageRequirement::class);
	}
}
