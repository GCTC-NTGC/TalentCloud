<?php

namespace App\Models;

/**
 * Class RatingGuideQuestion
 *
 * @property int $id
 * @property int $rating_guide_question_id
 * @property int $criterion_id
 * @property string $expected_answer
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\RatingGuideQuestion $rating_guide_question
 * @property \App\Models\Criteria $criterion
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
        'criterion_id',
        'expected_answer',
    ];

    /**
     * Mutator for criterion_id. Save NULL instead of empty strings.
     *
     * @param string|null $value Criterion Id, or empty string
     * @return void
     */
    public function setCriterionIdAttribute($value): void
    {
        if (empty($value)) { // will check for empty string, null values
            $this->attributes['criterion_id'] = null;
        } else {
            $this->attributes['criterion_id'] = $value;
        }
    }

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
     * Get the Criteria relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function criterion(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\Criteria::class, 'criterion_id');
    }
}
