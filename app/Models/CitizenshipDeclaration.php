<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class CitizenshipDeclaration
 * 
 * @property int $citizenship_declaration_id
 * @property string $citizenship_declaration_common_name
 * 
 * @property \Illuminate\Database\Eloquent\Collection $citizenship_declaration_details
 *
 * @package App\Models
 */
class CitizenshipDeclaration extends Eloquent
{
	protected $table = 'citizenship_declaration';
	protected $primaryKey = 'citizenship_declaration_id';
	public $timestamps = false;

	protected $fillable = [
		'citizenship_declaration_common_name'
	];

	public function citizenship_declaration_details()
	{
		return $this->hasMany(\App\Models\CitizenshipDeclarationDetail::class);
	}
}
