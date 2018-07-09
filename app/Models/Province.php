<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Province
 * 
 * @property int $province_id
 * @property string $province_common_name
 *
 * @package App\Models
 */
class Province extends Eloquent
{
	protected $table = 'province';
	protected $primaryKey = 'province_id';
	public $timestamps = false;

	protected $fillable = [
		'province_common_name'
	];
}
