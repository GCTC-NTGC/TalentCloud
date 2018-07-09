<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class CriteriaType
 * 
 * @property int $criteria_type_id
 * @property string $criteria_type
 * @property string $criteria_type_description
 * 
 * @property \Illuminate\Database\Eloquent\Collection $criteria
 *
 * @package App\Models
 */
class CriteriaType extends Eloquent
{
	protected $table = 'criteria_type';
	protected $primaryKey = 'criteria_type_id';
	public $timestamps = false;

	protected $fillable = [
		'criteria_type',
		'criteria_type_description'
	];

	public function criteria()
	{
		return $this->hasMany(\App\Models\Criterion::class);
	}
}
