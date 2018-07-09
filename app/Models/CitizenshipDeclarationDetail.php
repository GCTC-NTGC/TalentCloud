<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class CitizenshipDeclarationDetail
 * 
 * @property int $citizenship_declaration_details_id
 * @property int $citizenship_declaration_id
 * @property int $citizenship_declaration_locale_id
 * @property string $citizenship_declaration
 * 
 *
 * @package App\Models
 */
class CitizenshipDeclarationDetail extends Eloquent
{
	protected $primaryKey = 'citizenship_declaration_details_id';
	public $timestamps = false;

	protected $casts = [
		'citizenship_declaration_id' => 'int',
		'citizenship_declaration_locale_id' => 'int'
	];

	protected $fillable = [
		'citizenship_declaration_id',
		'citizenship_declaration_locale_id',
		'citizenship_declaration'
	];

	public function citizenship_declaration()
	{
		return $this->belongsTo(\App\Models\CitizenshipDeclaration::class);
	}
}
