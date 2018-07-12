<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class CitizenshipDeclarationTranslation
 * 
 * @property int $id
 * @property int $citizenship_declaration_id
 * @property string $locale
 * @property string $value
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\CitizenshipDeclaration $citizenship_declaration
 *
 * @package App\Models
 */
class CitizenshipDeclarationTranslation extends Eloquent
{
	protected $casts = [
		'citizenship_declaration_id' => 'int'
	];

	protected $fillable = [
		'citizenship_declaration_id',
		'locale',
		'value'
	];

	public function citizenship_declaration()
	{
		return $this->belongsTo(\App\Models\CitizenshipDeclaration::class);
	}
}
