<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobSeekerProfile
 * 
 * @property int $job_seeker_profile_id
 * @property string $job_seeker_profile_link
 * @property string $job_seeker_profile_tagline
 * @property string $job_seeker_profile_twitter_link
 * @property string $job_seeker_profile_linkedin_link
 * @property \Carbon\Carbon $last_updated
 * 
 * @property \Illuminate\Database\Eloquent\Collection $job_seeker_profile_answers
 * @property \Illuminate\Database\Eloquent\Collection $users
 *
 * @package App\Models
 */
class JobSeekerProfile extends Eloquent
{
	protected $table = 'job_seeker_profile';
	protected $primaryKey = 'job_seeker_profile_id';
	public $timestamps = false;

	protected $dates = [
		'last_updated'
	];

	protected $fillable = [
		'job_seeker_profile_link',
		'job_seeker_profile_tagline',
		'job_seeker_profile_twitter_link',
		'job_seeker_profile_linkedin_link',
		'last_updated'
	];

	public function job_seeker_profile_answers()
	{
		return $this->hasMany(\App\Models\JobSeekerProfileAnswer::class);
	}

	public function users()
	{
		return $this->belongsToMany(\App\Models\User::class, 'user_job_seeker_profiles');
	}
}
