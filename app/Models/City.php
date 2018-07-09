<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class City
 * 
 * @property int $city_id
 * @property string $city_gps_coords
 * @property string $city_common_name
 *
 * @package App\Models
 */
class City extends Eloquent
{
	protected $table = 'city';
	protected $primaryKey = 'city_id';
	public $timestamps = false;

	protected $fillable = [
		'city_gps_coords',
		'city_common_name'
	];
}
