<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:42 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class WorkplacePhotoCaption
 * 
 * @property int $work_environment_id
 * @property string $photo_name
 * @property int $workplace_photo_id
 * @property string $description
 *
 * @package App\Models
 */
class WorkplacePhotoCaption extends Eloquent
{
	protected $table = 'workplace_photo_caption';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'work_environment_id' => 'int',
		'workplace_photo_id' => 'int'
	];

	protected $fillable = [
		'workplace_photo_id',
		'description'
	];
}
