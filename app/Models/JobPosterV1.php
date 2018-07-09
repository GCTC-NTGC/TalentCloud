<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobPosterV1
 * 
 * @property int $job_poster_id
 * @property int $job_number
 * @property string $job_poster_title
 * @property string $job_poster_description
 * @property int $job_term_id
 * @property string $job_poster_term_qty
 * @property int $job_poster_job_min_level_id
 * @property int $job_poster_job_max_level_id
 * @property \Carbon\Carbon $job_poster_start_date
 * @property \Carbon\Carbon $job_poster_end_date
 * @property \Carbon\Carbon $job_poster_close_date_time
 * @property int $job_poster_department_id
 * @property int $job_poster_location_province_id
 * @property int $job_poster_location_city_id
 *
 * @package App\Models
 */
class JobPosterV1 extends Eloquent
{
	protected $table = 'job_poster_v1';
	protected $primaryKey = 'job_poster_id';
	public $timestamps = false;

	protected $casts = [
		'job_number' => 'int',
		'job_term_id' => 'int',
		'job_poster_job_min_level_id' => 'int',
		'job_poster_job_max_level_id' => 'int',
		'job_poster_department_id' => 'int',
		'job_poster_location_province_id' => 'int',
		'job_poster_location_city_id' => 'int'
	];

	protected $dates = [
		'job_poster_start_date',
		'job_poster_end_date',
		'job_poster_close_date_time'
	];

	protected $fillable = [
		'job_number',
		'job_poster_title',
		'job_poster_description',
		'job_term_id',
		'job_poster_term_qty',
		'job_poster_job_min_level_id',
		'job_poster_job_max_level_id',
		'job_poster_start_date',
		'job_poster_end_date',
		'job_poster_close_date_time',
		'job_poster_department_id',
		'job_poster_location_province_id',
		'job_poster_location_city_id'
	];
}
