<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class WorkplacePhotoCaption
 * 
 * @property int $id
 * @property int $work_environment_id
 * @property string $photo_name
 * @property int $workplace_photo_id
 * @property string $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\WorkEnvironment $work_environment
 * @property \App\Models\WorkplacePhoto $workplace_photo
 *
 * @package App\Models
 */
class WorkplacePhotoCaption extends Eloquent
{
	protected $casts = [
		'work_environment_id' => 'int',
		'workplace_photo_id' => 'int'
	];

	protected $fillable = [
		'work_environment_id',
		'photo_name',
		'workplace_photo_id',
		'description'
	];

	public function work_environment()
	{
		return $this->belongsTo(\App\Models\WorkEnvironment::class);
	}

	public function workplace_photo()
	{
		return $this->belongsTo(\App\Models\WorkplacePhoto::class);
	}
}
