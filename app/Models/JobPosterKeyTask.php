<?php

namespace App\Models;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

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

class JobPosterKeyTask extends BaseModel
{
    use HasTranslations;

    public $translatable = [
        'description'
    ];
    protected $fillable = [
        'description'
    ];
    protected $casts = [
        'job_poster_id' => 'int'
    ];

    public function job_poster() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }
}
