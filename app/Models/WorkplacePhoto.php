<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class WorkplacePhoto
 * 
 * @property int $id
 * @property boolean $image
 * @property string $mime_type
 * @property int $size
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $workplace_photo_captions
 */
class WorkplacePhoto extends Eloquent
{
	protected $casts = [
		'image' => 'boolean',
		'size' => 'int'
	];

	protected $fillable = [
		'image'
	];

	public function workplace_photo_captions()
	{
		return $this->hasMany(\App\Models\WorkplacePhotoCaption::class);
	}
}
