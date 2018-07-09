<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobPosterDetail
 * 
 * @property int $job_poster_details
 * @property int $job_poster_id
 * @property int $locale_id
 * @property string $job_poster_desc_title
 * @property string $job_poster_desc_content
 * @property string $job_poster_city
 * @property string $job_poster_title
 * @property string $job_poster_impact
 * @property string $branch
 * @property string $division
 * 
 * @property \App\Models\JobPoster $job_poster
 * @property \App\Models\Locale $locale
 *
 * @package App\Models
 */
class JobPosterDetail extends Eloquent
{
	protected $primaryKey = 'job_poster_details';
	public $timestamps = false;

	protected $casts = [
		'job_poster_id' => 'int',
		'locale_id' => 'int'
	];

	protected $fillable = [
		'job_poster_id',
		'locale_id',
		'job_poster_desc_title',
		'job_poster_desc_content',
		'job_poster_city',
		'job_poster_title',
		'job_poster_impact',
		'branch',
		'division'
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
