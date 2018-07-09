<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobPosterCoreCompetency
 * 
 * @property int $job_poster_core_competency_id
 * @property int $job_poster_id
 * @property int $locale_id
 * @property string $core_competency
 *
 * @package App\Models
 */
class JobPosterCoreCompetency extends Eloquent
{
	protected $table = 'job_poster_core_competency';
	protected $primaryKey = 'job_poster_core_competency_id';
	public $timestamps = false;

	protected $casts = [
		'job_poster_id' => 'int',
		'locale_id' => 'int'
	];

	protected $fillable = [
		'job_poster_id',
		'locale_id',
		'core_competency'
	];
}
