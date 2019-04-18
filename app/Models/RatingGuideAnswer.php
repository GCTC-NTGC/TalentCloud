<?php

namespace App\Models;

/**
 * Class RatingGuideQuestion
 *
 * @property int $id
 * @property int $rating_guide_question_id
 * @property int $skill_id
 * @property string $expected_answer
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\RatingGuideQuestion $rating_guide_question
 * @property \App\Models\Skill $skill
 */
class RatingGuideAnswer extends BaseModel
{
    /**
     * The columns that can be filled with mass-assignment
     *
     * @var string[]
     */
    protected $fillable = [
        'rating_guide_question_id',
        'skill_id',
        'expected_answer',
        'question'
    ];

    /**
     * Get the RatingGuideQuestion relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function rating_guide_question(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\RatingGuideQuestion::class);
    }

    /**
     * Get the Skill relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function skill(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\Skill::class);
    }
}
