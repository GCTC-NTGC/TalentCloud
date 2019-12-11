<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class WorkplacePhotoCaption
 * 
 * @property int $id
 * @property int $work_environment_id
 * @property string $photo_name
 * @property int $workplace_photo_id
 * @property string $description
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
 * @property \App\Models\WorkEnvironment $work_environment
 * @property \App\Models\WorkplacePhoto $workplace_photo
 */
class WorkplacePhotoCaption extends BaseModel{

    protected $casts = [
        'work_environment_id' => 'int',
        'workplace_photo_id' => 'int'
    ];
    protected $fillable = [
        'photo_name',
        'description'
    ];

    public function work_environment(){
        return $this->belongsTo(\App\Models\WorkEnvironment::class);
    }

    public function workplace_photo(){
        return $this->belongsTo(\App\Models\WorkplacePhoto::class);
    }

}
