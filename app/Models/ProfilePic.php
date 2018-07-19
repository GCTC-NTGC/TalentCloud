<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ProfilePic
 * 
 * @property int $id
 * @property int $user_id
 * @property boolean $image
 * @property string $type
 * @property int $size
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\User $user
 */
class ProfilePic extends Eloquent {

    protected $casts = [
        'user_id' => 'int',
        'image' => 'boolean',
        'size' => 'int'
    ];
    protected $fillable = [
        'image'
    ];

    public function user() {
        return $this->belongsTo(\App\Models\User::class);
    }

}
