<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class User
 * 
 * @property int $id
 * @property string $email
 * @property string $name
 * @property bool $is_confirmed
 * @property int $user_role_id
 * @property string $open_id_sub
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $applicants
 * @property \Illuminate\Database\Eloquent\Collection $managers
 * @property \Illuminate\Database\Eloquent\Collection $profile_pics
 *
 * @package App\Models
 */
class User extends Eloquent
{
	protected $casts = [
		'is_confirmed' => 'bool',
		'user_role_id' => 'int'
	];

	protected $fillable = [
		'email',
		'name',
		'is_confirmed',
		'user_role_id',
		'open_id_sub'
	];

	public function applicants()
	{
		return $this->hasMany(\App\Models\Applicant::class);
	}

	public function managers()
	{
		return $this->hasMany(\App\Models\Manager::class);
	}

	public function profile_pics()
	{
		return $this->hasMany(\App\Models\ProfilePic::class);
	}
}
