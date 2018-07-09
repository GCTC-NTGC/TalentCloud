<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ProfilePic
 * 
 * @property int $user_id
 * @property boolean $image
 * @property \Carbon\Carbon $last_updated
 * @property string $type
 * @property int $size
 * 
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class ProfilePic extends Eloquent
{
	protected $table = 'profile_pic';
	protected $primaryKey = 'user_id';
	public $timestamps = false;

	protected $casts = [
		'image' => 'boolean',
		'size' => 'int'
	];

	protected $dates = [
		'last_updated'
	];

	protected $fillable = [
		'image',
		'last_updated',
		'type',
		'size'
	];

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class);
	}
}
