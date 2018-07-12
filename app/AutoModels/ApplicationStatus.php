<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ApplicationStatus
 * 
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $application_status_translations
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 *
 * @package App\Models
 */
class ApplicationStatus extends Eloquent
{
	protected $table = 'application_status';

	protected $fillable = [
		'name'
	];

	public function application_status_translations()
	{
		return $this->hasMany(\App\Models\ApplicationStatusTranslation::class);
	}

	public function job_applications()
	{
		return $this->hasMany(\App\Models\JobApplication::class);
	}
}
