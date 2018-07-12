<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobPosterKeyTask
 * 
 * @property int $id
 * @property int $job_poster_id
 * @property string $locale
 * @property string $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\JobPoster $job_poster
 *
 * @package App\Models
 */
class JobPosterKeyTask extends Eloquent
{
	protected $casts = [
		'job_poster_id' => 'int'
	];

	protected $fillable = [
		'job_poster_id',
		'locale',
		'description'
	];

	public function job_poster()
	{
		return $this->belongsTo(\App\Models\JobPoster::class);
	}
}
