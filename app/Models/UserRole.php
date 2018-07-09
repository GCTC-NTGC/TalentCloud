<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class UserRole
 * 
 * @property int $user_role_id
 * @property string $user_role
 *
 * @package App\Models
 */
class UserRole extends Eloquent
{
	protected $table = 'user_role';
	protected $primaryKey = 'user_role_id';
	public $timestamps = false;

	protected $fillable = [
		'user_role'
	];
}
