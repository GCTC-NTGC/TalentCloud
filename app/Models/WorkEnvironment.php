<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class WorkEnvironment
 * 
 * @property int $id
 * @property int $manager_id
 * @property string $remote_allowed
 * @property string $telework_allowed
 * @property string $flexible_allowed
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Manager $manager
 * @property \Illuminate\Database\Eloquent\Collection $workplace_photo_captions
 */
class WorkEnvironment extends Eloquent
{
	protected $fillable = [
		'remote_allowed',
		'telework_allowed',
		'flexible_allowed'
	];

	public function manager()
	{
		return $this->belongsTo(\App\Models\Manager::class);
	}

	public function workplace_photo_captions()
	{
		return $this->hasMany(\App\Models\WorkplacePhotoCaption::class);
	}
}
