<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class WorkplacePhoto
 * 
 * @property int $id
 * @property boolean $image
 * @property string $mime_type
 * @property int $size
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
 * @property \App\Models\WorkplacePhotoCaption $workplace_photo_caption
 */
class WorkplacePhoto extends BaseModel{

    protected $casts = [
        'image' => 'boolean',
        'size' => 'int'
    ];
    protected $fillable = [
        'image'
    ];

    public function workplace_photo_caption(){
        return $this->hasOne(\App\Models\WorkplacePhotoCaption::class);
    }

}
