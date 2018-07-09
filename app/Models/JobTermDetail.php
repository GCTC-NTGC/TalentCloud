<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobTermDetail
 * 
 * @property int $job_term_details_id
 * @property int $job_term_id
 * @property string $job_term
 * @property int $job_term_locale_id
 *
 * @package App\Models
 */
class JobTermDetail extends Eloquent
{
	protected $primaryKey = 'job_term_details_id';
	public $timestamps = false;

	protected $casts = [
		'job_term_id' => 'int',
		'job_term_locale_id' => 'int'
	];

	protected $fillable = [
		'job_term_id',
		'job_term',
		'job_term_locale_id'
	];
}
