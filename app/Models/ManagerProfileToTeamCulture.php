<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ManagerProfileToTeamCulture
 * 
 * @property int $user_manager_profile_id
 * @property int $team_culture_id
 * 
 * @property \App\Models\UserManagerProfile $user_manager_profile
 * @property \App\Models\TeamCulture $team_culture
 *
 * @package App\Models
 */
class ManagerProfileToTeamCulture extends Eloquent
{
	protected $table = 'manager_profile_to_team_culture';
	protected $primaryKey = 'user_manager_profile_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'user_manager_profile_id' => 'int',
		'team_culture_id' => 'int'
	];

	protected $fillable = [
		'team_culture_id'
	];

	public function user_manager_profile()
	{
		return $this->belongsTo(\App\Models\UserManagerProfile::class);
	}

	public function team_culture()
	{
		return $this->belongsTo(\App\Models\TeamCulture::class);
	}
}
