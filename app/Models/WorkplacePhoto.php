<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
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
 *
 * @package App\Models
 */
class WorkplacePhoto extends Eloquent
{
	protected $table = 'workplace_photo';
	public $timestamps = false;

	protected $casts = [
		'image' => 'boolean',
		'size' => 'int'
	];

	protected $fillable = [
		'image',
		'mime_type',
		'size'
	];
}
