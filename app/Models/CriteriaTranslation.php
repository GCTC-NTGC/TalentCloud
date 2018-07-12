<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class CriteriaTranslation
 * 
 * @property int $id
 * @property int $criteria_id
 * @property string $name
 * @property string $description
 * @property string $locale
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Criterion $criterion
 *
 * @package App\Models
 */
class CriteriaTranslation extends Eloquent
{
	protected $casts = [
		'criteria_id' => 'int'
	];

	protected $fillable = [
		'criteria_id',
		'name',
		'description',
		'locale'
	];

	public function criterion()
	{
		return $this->belongsTo(\App\Models\Criterion::class, 'criteria_id');
	}
}
