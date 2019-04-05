<?php

namespace App\Models;

/**
 * Class RatingGuideQuestion
 *
 * @property int $id
 * @property int $job_poster_id
 * @property int $assessment_type_id
 * @property string $question
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobPoster $job_poster
 * @property \App\Models\Lookup\AssessmentType $assessment_type
 */
class RatingGuideQuestion extends BaseModel
{
    /**
     * The columns that can be filled with mass-assignment
     *
     * @var string[]
     */
    protected $fillable = ['question'];

    /**
     * Get the JobPoster relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function job_poster()
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    /**
     * Get the AssessmentType relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assessment_type()
    {
        return $this->belongsTo(\App\Models\AssessmentType::class);
    }
}
