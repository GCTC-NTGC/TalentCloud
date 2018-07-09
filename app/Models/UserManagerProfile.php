<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class UserManagerProfile
 * 
 * @property int $user_manager_profile_id
 * @property int $user_manager_profile_department_id
 * @property string $user_manager_profile_twitter
 * @property string $user_manager_profile_linkedin
 * @property int $user_id
 * 
 * @property \App\Models\User $user
 * @property \App\Models\ManagerProfileToTeamCulture $manager_profile_to_team_culture
 * @property \App\Models\ManagerProfileToWorkEnvironment $manager_profile_to_work_environment
 * @property \Illuminate\Database\Eloquent\Collection $user_manager_profile_details
 *
 * @package App\Models
 */
class UserManagerProfile extends Eloquent
{
	protected $table = 'user_manager_profile';
	protected $primaryKey = 'user_manager_profile_id';
	public $timestamps = false;

	protected $casts = [
		'user_manager_profile_department_id' => 'int',
		'user_id' => 'int'
	];

	protected $fillable = [
		'user_manager_profile_department_id',
		'user_manager_profile_twitter',
		'user_manager_profile_linkedin',
		'user_id'
	];

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class);
	}

	public function manager_profile_to_team_culture()
	{
		return $this->hasOne(\App\Models\ManagerProfileToTeamCulture::class);
	}

	public function manager_profile_to_work_environment()
	{
		return $this->hasOne(\App\Models\ManagerProfileToWorkEnvironment::class);
	}

	public function user_manager_profile_details()
	{
		return $this->hasMany(\App\Models\UserManagerProfileDetail::class);
	}
}
