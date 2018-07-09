<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class UserJobSeekerProfile
 * 
 * @property int $user_id
 * @property int $job_seeker_profile_id
 * 
 * @property \App\Models\JobSeekerProfile $job_seeker_profile
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class UserJobSeekerProfile extends Eloquent
{
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'user_id' => 'int',
		'job_seeker_profile_id' => 'int'
	];

	public function job_seeker_profile()
	{
		return $this->belongsTo(\App\Models\JobSeekerProfile::class);
	}

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class);
	}
}
