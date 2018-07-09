<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ManagerProfileToWorkEnvironment
 * 
 * @property int $user_manager_profile_id
 * @property int $work_environment_id
 * 
 * @property \App\Models\UserManagerProfile $user_manager_profile
 *
 * @package App\Models
 */
class ManagerProfileToWorkEnvironment extends Eloquent
{
	protected $table = 'manager_profile_to_work_environment';
	protected $primaryKey = 'user_manager_profile_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'user_manager_profile_id' => 'int',
		'work_environment_id' => 'int'
	];

	protected $fillable = [
		'work_environment_id'
	];

	public function user_manager_profile()
	{
		return $this->belongsTo(\App\Models\UserManagerProfile::class);
	}
}
