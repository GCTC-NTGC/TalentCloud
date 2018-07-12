<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class DepartmentTranslation
 * 
 * @property int $id
 * @property int $department_id
 * @property string $locale
 * @property string $value
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Department $department
 *
 * @package App\Models
 */
class DepartmentTranslation extends Eloquent
{
	protected $casts = [
		'department_id' => 'int'
	];

	protected $fillable = [
		'department_id',
		'locale',
		'value'
	];

	public function department()
	{
		return $this->belongsTo(\App\Models\Department::class);
	}
}
