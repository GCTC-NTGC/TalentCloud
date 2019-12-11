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
 * @property string $notes
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobApplication $job_application
 * @property \App\Models\Lookup\ReviewStatus $review_status
 *
 * Accessors:
 * @property string $status
 **/
class ApplicationReview extends Model
{
    protected $fillable = [
        'review_status_id',
        'notes',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $with = ['review_status'];

    public function job_application(){
        return $this->belongsTo(JobApplication::class);
    }

    public function review_status(){
        return $this->belongsTo(ReviewStatus::class);
    }

    public function getStatusAttribute(){
        return $this->review_status->translation;
    }
}
