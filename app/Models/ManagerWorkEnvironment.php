<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ManagerWorkEnvironment
 * 
 * @property int $id
 * @property int $manager_id
 * @property int $work_environment_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Manager $manager
 *
 * @package App\Models
 */
class ManagerWorkEnvironment extends Eloquent
{
	protected $table = 'manager_work_environment';

	protected $casts = [
		'manager_id' => 'int',
		'work_environment_id' => 'int'
	];

	protected $fillable = [
		'manager_id',
		'work_environment_id'
	];

	public function manager()
	{
		return $this->belongsTo(\App\Models\Manager::class);
	}
}
