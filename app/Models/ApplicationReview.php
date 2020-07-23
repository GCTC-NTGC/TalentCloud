<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\JobApplication;
use App\Models\Lookup\Department;
use App\Models\Lookup\ReviewStatus;
use App\Models\Lookup\ReviewDecision;

/**
 * Class AppliationReview
 *
 * @property int $id
 * @property int $job_application_id
 * @property int $review_status_id
 * @property int $department_id
 * @property string $notes
 * @property boolean $director_email_sent
 * @property boolean $reference _email_sent
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobApplication $job_application
 * @property \App\Models\Lookup\Department $department
 * @property \App\Models\Lookup\ReviewStatus $review_status
 *
 * Accessors:
 * @property string $status
 **/
class ApplicationReview extends Model
{
    protected $casts = [
        'job_application_id' => 'int',
        'review_status_id' => 'int',
        'department_id' => 'int',
        'notes' => 'string',
        'director_email_sent' => 'boolean',
        'reference_email_sent' => 'boolean',
    ];

    protected $fillable = [
        'review_status_id',
        'department_id',
        'notes',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $with = ['review_status'];

    public function job_application()
    {
        return $this->belongsTo(JobApplication::class);
    }

    public function review_status()
    {
        return $this->belongsTo(ReviewStatus::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function getStatusAttribute()
    {
        return $this->review_status->translation;
    }
}
