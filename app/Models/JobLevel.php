<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobLevel
 * 
 * @property int $job_level_id
 * @property string $job_level
 *
 * @package App\Models
 */
class JobLevel extends Eloquent
{
	protected $table = 'job_level';
	protected $primaryKey = 'job_level_id';
	public $timestamps = false;

	protected $fillable = [
		'job_level'
	];
}
