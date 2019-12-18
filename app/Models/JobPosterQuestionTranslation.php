<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

/**
 * Class JobPosterQuestionTranslation
 * 
 * @property int $id
 * @property int $job_poster_question_id
 * @property string $locale
 * @property string $question
 * @property string $description
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
 * @property \App\Models\JobPosterQuestion $job_poster_question
 */
class JobPosterQuestionTranslation extends BaseModel{

    protected $casts = [
        'job_poster_question_id' => 'int'
    ];
    protected $fillable = [
        'question',
        'description'
    ];

    public function job_poster_question() {
        return $this->belongsTo(\App\Models\JobPosterQuestion::class);
    }

}
