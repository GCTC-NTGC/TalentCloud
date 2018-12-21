<?php

namespace App\Models;

use App\Models\JobPoster;
use App\Models\Assessment;

/**
 * Class ScreeningPlan
 *
 * @property int $id
 * @property int $job_poster_id
 * @property int $version
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property JobPoster $job_poster
 * @property Collection[Assessment] $assessments
 */
class ScreeningPlan extends BaseModel
{
    /**
     * The columns that can be filled with mass-assignment
     *
     * @var string[]
     */
    protected $fillable = [];

    /**
     * Get the JobPoster this plan belongs to.
     *
     * @return Illuminate\Database\Eloquent\Relations\Relation
     */
    public function job_poster() // phpcs:ignore
    {
        return $this->belongsTo(JobPoster::class);
    }

    /**
     * Get the collection of Assessments that make up this plan.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function assessments() // phpcs:ignore
    {
        return $this->hasMany(Assessment::class);
    }
}
