<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ProvinceTranslation
 * 
 * @property int $id
 * @property int $province_id
 * @property string $locale
 * @property string $value
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Province $province
 */
class ProvinceTranslation extends Eloquent
{
	protected $casts = [
		'province_id' => 'int'
	];

	protected $fillable = [];

	public function province()
	{
		return $this->belongsTo(\App\Models\Province::class);
	}
}
