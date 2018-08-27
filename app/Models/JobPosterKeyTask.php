<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

/**
 * Class JobPosterKeyTask
 * 
 * @property int $id
 * @property int $job_poster_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
 * @property \App\Models\JobPoster $job_poster
 * 
 * Localized Properties:
 * @property string $description
 */
class JobPosterKeyTask extends BaseModel {

    use \Dimsav\Translatable\Translatable;

    public $translatedAttributes = ['description'];
    protected $casts = [
        'job_poster_id' => 'int'
    ];
    protected $fillable = [];

    public function job_poster() {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

}
