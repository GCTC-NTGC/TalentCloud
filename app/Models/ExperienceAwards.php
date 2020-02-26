<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class ExperienceAward
 *
 * @property int $id
 * @property string $title
 * @property int $recipient_type_id
 * @property string $issued_by
 * @property int $recognition_type_id
 * @property \Jenssegers\Date\Date $awarded_date
 * @property int $awards_experienceable_id
 * @property string $awards_experienceable_type
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 * @property \App\Models\Applicant|\App\Models\JobApplication $awards_experienceable
 */
class ExperienceAward extends BaseModel
{
    protected $casts = [
        'title' => 'string',
        'recipient_type_id' => 'int',
        'issued_by' => 'string',
        'recognition_type_id' => 'int',
        'awarded_date' => 'date'
    ];

    protected $fillable = [
        'title',
        'recipient_type_id',
        'issued_by',
        'recognition_type_id',
        'awarded_date'
    ];

    public function award_recipient_type() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\AwardRecipientType::class);
    }

    public function award_recognition_type() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\AwardRecognitionType::class);
    }

    public function job_applications() //phpcs:ignore
    {
        return $this->belongsToMany(\App\Models\JobApplication::class);
    }

    public function awards_experienceable() //phpcs:ignore
    {
        return $this->morphTo();
    }
}
