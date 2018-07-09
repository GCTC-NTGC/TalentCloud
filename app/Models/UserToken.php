<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class UserToken
 * 
 * @property int $user_token_id
 * @property int $user_id
 * @property string $access_token
 * @property int $expires_in
 * @property string $token_type
 * @property string $scope
 *
 * @package App\Models
 */
class UserToken extends Eloquent
{
	protected $table = 'user_token';
	protected $primaryKey = 'user_token_id';
	public $timestamps = false;

	protected $casts = [
		'user_id' => 'int',
		'expires_in' => 'int'
	];

	protected $hidden = [
		'access_token'
	];

	protected $fillable = [
		'user_id',
		'access_token',
		'expires_in',
		'token_type',
		'scope'
	];
}
