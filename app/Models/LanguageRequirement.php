<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class LanguageRequirement
 * 
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 * @property \Illuminate\Database\Eloquent\Collection $language_requirement_translations
 */
class LanguageRequirement extends Eloquent
{
	protected $fillable = [];

	public function job_posters()
	{
		return $this->hasMany(\App\Models\JobPoster::class);
	}

	public function language_requirement_translations()
	{
		return $this->hasMany(\App\Models\LanguageRequirementTranslation::class);
	}
}
