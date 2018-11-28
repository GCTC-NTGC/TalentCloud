<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\JobApplication;
use App\Models\Lookup\ReviewStatus;
use App\Models\Lookup\ReviewDecision;

/**
 * Class AppliationReview
 *
 * @property int $id
 * @property int $job_application_id
 * @property int $review_status_id
 * @property int $review_decision_id
 * @property string $reviewer
 * @property string $notes
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobApplication $job_application
 * @property \App\Models\Lookup\ReviewStatus $review_status
 * @property \App\Models\Lookup\ReviewDecision $review_decision
 *
 * Accessors:
 * @property string $status
 * @property string $decision
 **/
class ApplicationReview extends Model
{
    protected $fillable = [
        'review_status_id',
        'review_decision_id',
        'reviewer',
        'notes',
    ];

    public function job_application() {
        return $this->belongsTo(JobApplication::class);
    }

    public function review_status() {
        return $this->belongsTo(ReviewStatus::class);
    }

    public function review_decision() {
        return $this->belongsTo(ReviewDecision::class);
    }

    public function getStatusAttribute() {
        return $this->review_status->translation;
    }

    public function getDecisionAttribute() {
        return $this->review_decision->translation;
    }
}
