<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class DepartmentDetail
 * 
 * @property int $department_details_id
 * @property int $department_id
 * @property int $department_details_locale_id
 * @property string $department_details_name
 * 
 * @property \App\Models\Department $department
 *
 * @package App\Models
 */
class DepartmentDetail extends Eloquent
{
	protected $primaryKey = 'department_details_id';
	public $timestamps = false;

	protected $casts = [
		'department_id' => 'int',
		'department_details_locale_id' => 'int'
	];

	protected $fillable = [
		'department_id',
		'department_details_locale_id',
		'department_details_name'
	];

	public function department()
	{
		return $this->belongsTo(\App\Models\Department::class);
	}
}
