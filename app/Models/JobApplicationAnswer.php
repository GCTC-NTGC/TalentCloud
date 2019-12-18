<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

/**
 * Class JobApplicationAnswer
 *
 * @property int $id
 * @property int $job_poster_question_id
 * @property int $job_application_id
 * @property string $answer
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobApplication $job_application
 * @property \App\Models\JobPosterQuestion $job_poster_question
 */
class JobApplicationAnswer extends BaseModel{

    protected $casts = [
        'job_poster_questions_id' => 'int',
        'job_application_id' => 'int'
    ];
    protected $fillable = [
        'answer'
    ];

    public function job_application() {
        return $this->belongsTo(\App\Models\JobApplication::class);
    }

    public function job_poster_question() {
        return $this->belongsTo(\App\Models\JobPosterQuestion::class);
    }

}
