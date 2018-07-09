<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class User
 * 
 * @property int $user_id
 * @property string $email
 * @property string $name
 * @property bool $is_confirmed
 * @property int $user_role_id
 * @property int $open_id
 * 
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_applications
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 * @property \App\Models\ProfilePic $profile_pic
 * @property \Illuminate\Database\Eloquent\Collection $job_seeker_profiles
 * @property \Illuminate\Database\Eloquent\Collection $user_manager_profiles
 *
 * @package App\Models
 */
class User extends Eloquent
{
	protected $table = 'user';
	public $timestamps = false;

	protected $casts = [
		'is_confirmed' => 'bool',
		'user_role_id' => 'int',
		'open_id' => 'int'
	];

	protected $fillable = [
		'email',
		'name',
		'is_confirmed',
		'user_role_id'
	];

	public function job_poster_applications()
	{
		return $this->hasMany(\App\Models\JobPosterApplication::class);
	}

	public function job_posters()
	{
		return $this->belongsToMany(\App\Models\JobPoster::class, 'job_poster_to_manager_user_id');
	}

	public function profile_pic()
	{
		return $this->hasOne(\App\Models\ProfilePic::class);
	}

	public function job_seeker_profiles()
	{
		return $this->belongsToMany(\App\Models\JobSeekerProfile::class, 'user_job_seeker_profiles');
	}

	public function user_manager_profiles()
	{
		return $this->hasMany(\App\Models\UserManagerProfile::class);
	}
}
