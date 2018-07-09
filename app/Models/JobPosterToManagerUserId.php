<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobPosterToManagerUserId
 * 
 * @property int $job_poster_id
 * @property int $user_id
 * 
 * @property \App\Models\JobPoster $job_poster
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class JobPosterToManagerUserId extends Eloquent
{
	protected $table = 'job_poster_to_manager_user_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'job_poster_id' => 'int',
		'user_id' => 'int'
	];

	public function job_poster()
	{
		return $this->belongsTo(\App\Models\JobPoster::class);
	}

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class);
	}
}
