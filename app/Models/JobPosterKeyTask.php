<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobPosterKeyTask
 * 
 * @property int $job_poster_key_task_id
 * @property int $job_poster_id
 * @property int $locale_id
 * @property string $task
 * 
 * @property \App\Models\JobPoster $job_poster
 * @property \App\Models\Locale $locale
 *
 * @package App\Models
 */
class JobPosterKeyTask extends Eloquent
{
	protected $table = 'job_poster_key_task';
	protected $primaryKey = 'job_poster_key_task_id';
	public $timestamps = false;

	protected $casts = [
		'job_poster_id' => 'int',
		'locale_id' => 'int'
	];

	protected $fillable = [
		'job_poster_id',
		'locale_id',
		'task'
	];

	public function job_poster()
	{
		return $this->belongsTo(\App\Models\JobPoster::class);
	}

	public function locale()
	{
		return $this->belongsTo(\App\Models\Locale::class);
	}
}
