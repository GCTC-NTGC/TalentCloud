<?php

namespace App\Models;

/**
 * Class Assessment
 *
 * @property int $id
 * @property int $job_poster_id
 * @property array $notification
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobPoster $job_poster
 */
class AssessmentPlanNotification extends BaseModel
{
    /**
     * The columns that can be filled with mass-assignment
     *
     * @var string[]
     */
    protected $fillable = ['notification'];

    /**
     * How each column should be cast to a variable
     */
    protected $casts = [
        'job_poster_id' => 'int',
        'notification' => 'array'
    ];

    /**
     * Get the JobPoster relationship
     */
    public function job_poster()
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }
}
