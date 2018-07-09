<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Department
 * 
 * @property int $department_id
 * @property string $department_common_name
 * @property int $department_province_id
 * @property int $department_city_id
 * 
 * @property \Illuminate\Database\Eloquent\Collection $department_details
 *
 * @package App\Models
 */
class Department extends Eloquent
{
	protected $table = 'department';
	protected $primaryKey = 'department_id';
	public $timestamps = false;

	protected $casts = [
		'department_province_id' => 'int',
		'department_city_id' => 'int'
	];

	protected $fillable = [
		'department_common_name',
		'department_province_id',
		'department_city_id'
	];

	public function department_details()
	{
		return $this->hasMany(\App\Models\DepartmentDetail::class);
	}
}
