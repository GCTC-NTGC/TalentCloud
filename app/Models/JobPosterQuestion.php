<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use App\Models\BaseModel;
use Astrotomic\Translatable\Translatable as Translatable;

/**
 * Class JobPosterQuestion
 *
 * @property int $id
 * @property int $job_poster_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobPoster $job_poster
 * @property \Illuminate\Database\Eloquent\Collection $job_application_answers
 *
 * Localized Properties:
 * @property string $question
 * @property string $description
 */
class JobPosterQuestion extends BaseModel
{

    use Translatable;

    public $translatedAttributes = ['question', 'description'];
    protected $casts = [
        'job_poster_id' => 'int'
    ];
    protected $fillable = [];

    public function job_poster() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    public function job_application_answers() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobApplicationAnswer::class, 'job_poster_questions_id');
    }
}
