<?php

namespace App\Models;

use Jenssegers\Date\Date;
use App\Models\Criteria;
use App\Models\Lookup\AssessmentType;

/**
 * Class Assessment
 *
 * @property int $id
 * @property int $criterion_id
 * @property int $assessment_type_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Criteria $criterion
 * @property \App\Models\Lookup\AssessmentType $assessment_type
 */
class Assessment extends BaseModel
{
    /**
     * The columns that can be filled with mass-assignment
     *
     * @var string[]
     */
    protected $fillable = [
        'criterion_id',
        'assessment_type_id'
    ];

    /**
     * Get the single Criteria object this assessment applies to.
     *
     * @return Illuminate\Database\Eloquent\Relations\Relation
     */
    public function criterion() // phpcs:ignore
    {
        return $this->belongsTo(Criteria::class, 'criterion_id');
    }

    /**
     * Get the AssessmentType of this Assessment.
     *
     * @return Illuminate\Database\Eloquent\Relations\Relation
     */
    public function assessment_type() // phpcs:ignore
    {
        return $this->belongsTo(AssessmentType::class);
    }
}
