<?php

namespace App\Models;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

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
    use HasTranslations;

    public $translatable = ['question', 'description'];
    protected $fillable = [];
    protected $casts = [
        'job_poster_id' => 'int'
    ];

    public function job_poster() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    public function job_application_answers() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobApplicationAnswer::class, 'job_poster_questions_id');
    }
}
