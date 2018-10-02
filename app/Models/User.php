<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class User
 *
 * @property int $id
 * @property string $email
 * @property string $name
 * @property bool $is_confirmed
 * @property int $user_role_id
 * @property string $open_id_sub
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant $applicant
 * @property \App\Models\Manager $manager
 * @property \App\Models\ProfilePic $profile_pic
 * @property \App\Models\UserRole $user_role
 */

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable {
    use Notifiable;

    protected $casts = [
        'is_confirmed' => 'bool',
        'user_role_id' => 'int'
    ];
    protected $fillable = [
        'name', 'email', 'password',
    ];
    protected $with = ['user_role'];
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function applicant() {
        return $this->hasOne(\App\Models\Applicant::class);
    }

    public function manager() {
        return $this->hasOne(\App\Models\Manager::class);
    }

    public function profile_pic() {
        return $this->hasOne(\App\Models\ProfilePic::class);
    }

    public function user_role() {
        return $this->belongsTo(\App\Models\UserRole::class);
    }

}
