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
 * @property \Illuminate\Database\Eloquent\Collection $rating_guide_answers
 */
class RatingGuideQuestion extends BaseModel
{
    /**
     * The columns that can be filled with mass-assignment
     *
     * @var string[]
     */
    protected $fillable = [
        'job_poster_id',
        'assessment_type_id',
        'question'
    ];

    /**
     * Get the JobPoster relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function job_poster(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    /**
     * Get the AssessmentType relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assessment_type(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\Lookup\AssessmentType::class);
    }

    /**
     * Get the RatingGuideAnswers relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function rating_guide_answers(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(\App\Models\RatingGuideAnswer::class);
    }
}
