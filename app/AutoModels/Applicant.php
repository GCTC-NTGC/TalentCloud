<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Applicant
 * 
 * @property int $id
 * @property string $personal_website
 * @property string $tagline
 * @property string $twitter_username
 * @property string $linkedin_username
 * @property int $user_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $applicant_profile_answers
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 *
 * @package App\Models
 */
class Applicant extends Eloquent
{
	protected $casts = [
		'user_id' => 'int'
	];

	protected $fillable = [
		'personal_website',
		'tagline',
		'twitter_username',
		'linkedin_username',
		'user_id'
	];

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class);
	}

	public function applicant_profile_answers()
	{
		return $this->hasMany(\App\Models\ApplicantProfileAnswer::class);
	}

	public function job_applications()
	{
		return $this->hasMany(\App\Models\JobApplication::class);
	}
}
