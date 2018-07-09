<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class LanguageRequirement
 * 
 * @property int $language_requirement_id
 * @property string $language_requirement_common_name
 * 
 * @property \Illuminate\Database\Eloquent\Collection $language_requirement_details
 *
 * @package App\Models
 */
class LanguageRequirement extends Eloquent
{
	protected $table = 'language_requirement';
	protected $primaryKey = 'language_requirement_id';
	public $timestamps = false;

	protected $fillable = [
		'language_requirement_common_name'
	];

	public function language_requirement_details()
	{
		return $this->hasMany(\App\Models\LanguageRequirementDetail::class);
	}
}
