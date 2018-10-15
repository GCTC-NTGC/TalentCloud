<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

/**
 * Class JobPosterTranslation
 *
 * @property int $id
 * @property int $job_poster_id
 * @property string $locale
 * @property string $city
 * @property string $title
 * @property string $impact
 * @property string $branch
 * @property string $division
 * @property string $education
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobPoster $job_poster
 */
class JobPosterTranslation extends BaseModel {

    protected $casts = [
        'job_poster_id' => 'int'
    ];
    protected $fillable = [
        'locale',
        'city',
        'title',
        'impact',
        'branch',
        'division',
        'education'
    ];

    public function job_poster() {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

}
