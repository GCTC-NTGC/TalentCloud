<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class ExperienceAward
 *
 * @property int $id
 * @property string $title
 * @property int $award_recipient_type_id
 * @property string $issued_by
 * @property int $award_recognition_type_id
 * @property \Jenssegers\Date\Date $awarded_date
 * @property int $experienceable_id
 * @property string $experienceable_type
 * @property boolean $is_education_requirement
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant|\App\Models\JobApplication $experienceable
 * @property \App\Models\Lookup\AwardRecipientType $award_recipient_type
 * @property \App\Models\Lookup\AwardRecognitionType $award_recognition_type
 * @property \Illuminate\Database\Eloquent\Collection $skills
 * @property \Illuminate\Database\Eloquent\Collection $experience_skills
 *
 * @method string experienceTypeName
 */
class ExperienceAward extends BaseModel
{
    protected $casts = [
        'title' => 'string',
        'award_recipient_type_id' => 'int',
        'issued_by' => 'string',
        'award_recognition_type_id' => 'int',
        'awarded_date' => 'date',
        'is_education_requirement' => 'boolean'
    ];

    protected $fillable = [
        'title',
        'award_recipient_type_id',
        'issued_by',
        'award_recognition_type_id',
        'awarded_date',
        'is_education_requirement'
    ];

    protected $table = 'experiences_award';

    public static function boot()
    {
        parent::boot();

        // Delete associated ExperienceSkills when this is deleted.
        static::deleting(function ($award): void {
            foreach ($award->experience_skills as $es) {
                $es->delete();
            }
        });
    }

    public function award_recipient_type() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\AwardRecipientType::class);
    }

    public function award_recognition_type() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\AwardRecognitionType::class);
    }

    public function experienceable() //phpcs:ignore
    {
        return $this->morphTo();
    }

    public function skills()
    {
        return $this->morphToMany(\App\Models\Skill::class, 'experience', 'experience_skills');
    }

    public function experience_skills() //phpcs:ignore
    {
        return $this->morphMany(\App\Models\ExperienceSkill::class, 'experience');
    }

    /**
     * Returns the name of this experience type. Used to distinguish from other Experience models.
     * @return string Returns the string 'experience_award'.
     */
    public function experienceTypeName(): string
    {
        return 'experience_award';
    }
}
