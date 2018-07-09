<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class CityDetail
 * 
 * @property int $city_details_id
 * @property int $city_details_city_id
 * @property int $city_details_locale_id
 * @property string $city_details_name
 *
 * @package App\Models
 */
class CityDetail extends Eloquent
{
	protected $primaryKey = 'city_details_id';
	public $timestamps = false;

	protected $casts = [
		'city_details_city_id' => 'int',
		'city_details_locale_id' => 'int'
	];

	protected $fillable = [
		'city_details_city_id',
		'city_details_locale_id',
		'city_details_name'
	];
}
