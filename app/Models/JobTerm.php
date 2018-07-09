<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobTerm
 * 
 * @property int $job_term_id
 * @property string $job_term_common_name
 *
 * @package App\Models
 */
class JobTerm extends Eloquent
{
	protected $table = 'job_term';
	protected $primaryKey = 'job_term_id';
	public $timestamps = false;

	protected $fillable = [
		'job_term_common_name'
	];
}
