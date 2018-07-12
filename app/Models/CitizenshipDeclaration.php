<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class CitizenshipDeclaration
 * 
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $citizenship_declaration_translations
 *
 * @package App\Models
 */
class CitizenshipDeclaration extends Eloquent
{
	protected $fillable = [
		'name'
	];

	public function citizenship_declaration_translations()
	{
		return $this->hasMany(\App\Models\CitizenshipDeclarationTranslation::class);
	}
}
