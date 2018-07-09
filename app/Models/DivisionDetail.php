<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class DivisionDetail
 * 
 * @property int $division_details_id
 * @property int $division_id
 * @property int $division_locale_id
 * @property string $division_name
 *
 * @package App\Models
 */
class DivisionDetail extends Eloquent
{
	protected $primaryKey = 'division_details_id';
	public $timestamps = false;

	protected $casts = [
		'division_id' => 'int',
		'division_locale_id' => 'int'
	];

	protected $fillable = [
		'division_id',
		'division_locale_id',
		'division_name'
	];
}
