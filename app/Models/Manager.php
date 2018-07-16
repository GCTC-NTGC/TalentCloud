<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Manager
 * 
 * @property int $id
 * @property int $department_id
 * @property string $twitter_username
 * @property string $linkedin_username
 * @property int $user_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 * @property \Illuminate\Database\Eloquent\Collection $manager_translations
 * @property \Illuminate\Database\Eloquent\Collection $manager_work_environments
 * @property \Illuminate\Database\Eloquent\Collection $team_cultures
 */
class Manager extends Eloquent
{
	protected $casts = [
		'department_id' => 'int',
		'user_id' => 'int'
	];

	protected $fillable = [
		'department_id',
		'twitter_username',
		'linkedin_username'
	];

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class);
	}

	public function job_posters()
	{
		return $this->hasMany(\App\Models\JobPoster::class);
	}

	public function manager_translations()
	{
		return $this->hasMany(\App\Models\ManagerTranslation::class);
	}

	public function manager_work_environments()
	{
		return $this->hasMany(\App\Models\ManagerWorkEnvironment::class);
	}

	public function team_cultures()
	{
		return $this->hasMany(\App\Models\TeamCulture::class);
	}
}
