<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ProvinceDetail
 * 
 * @property int $province_details_id
 * @property int $province_details_province_id
 * @property int $province_details_locale_id
 * @property string $province_details_name
 *
 * @package App\Models
 */
class ProvinceDetail extends Eloquent
{
	protected $primaryKey = 'province_details_id';
	public $timestamps = false;

	protected $casts = [
		'province_details_province_id' => 'int',
		'province_details_locale_id' => 'int'
	];

	protected $fillable = [
		'province_details_province_id',
		'province_details_locale_id',
		'province_details_name'
	];
}
