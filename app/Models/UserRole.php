<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class UserRole
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * @property \Illuminate\Database\Eloquent\Collection $users
 */
<<<<<<< HEAD
class UserRole extends Eloquent
{
=======
class UserRole extends BaseModel {
>>>>>>> dev

    protected $fillable = [];

    public function users()
    {
        return $this->hasMany(\App\Models\User::class);
    }
}
