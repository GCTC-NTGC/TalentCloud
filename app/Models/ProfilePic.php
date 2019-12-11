<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

/**
 * Class ProfilePic
 *
 * @property int $id
 * @property int $user_id
 * @property string $image
 * @property string $type
 * @property int $size
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\User $user
 */
class ProfilePic extends BaseModel{

    protected $casts = [
        'user_id' => 'int',
        'image' => 'string',
        'size' => 'int'
    ];
    protected $fillable = [
        'image'
    ];

    public function user(){
        return $this->belongsTo(\App\Models\User::class);
    }

}
