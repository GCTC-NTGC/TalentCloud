<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ApplicationStatus
 * 
 * @property int $application_status_id
 * @property string $application_status
 * 
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_applications
 *
 * @package App\Models
 */
class ApplicationStatus extends Eloquent
{
	protected $table = 'application_status';
	protected $primaryKey = 'application_status_id';
	public $timestamps = false;

	protected $fillable = [
		'application_status'
	];

	public function job_poster_applications()
	{
		return $this->hasMany(\App\Models\JobPosterApplication::class, 'job_poster_application_status_id');
	}
}
