<?php

namespace App\Models;

/**
 * Class AssessmentPlanNotification
 *
 * @property int $id
 * @property int $job_poster_id
 * @property string $type
 * @property int $criteria_id
 * @property int $criteria_type_id
 * @property int $criteria_type_id_new
 * @property int $skill_id
 * @property int $skill_id_new
 * @property int $skill_level_id
 * @property int $skill_level_id_new
 * @property boolean $acknowledged
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
    protected $fillable = [
        'acknowledged'
    ];

    /**
     * How each column should be cast to a variable
     */
    protected $casts = [];

    /**
     * Get the JobPoster relationship
     */
    public function job_poster()
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }
}
