<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class WorkEnvironment
 * 
 * @property int $id
 * @property string $remote_allowed
 * @property string $telework_allowed
 * @property string $flexible_allowed
 *
 * @package App\Models
 */
class WorkEnvironment extends Eloquent
{
	protected $table = 'work_environment';
	public $timestamps = false;

	protected $fillable = [
		'remote_allowed',
		'telework_allowed',
		'flexible_allowed'
	];
}
