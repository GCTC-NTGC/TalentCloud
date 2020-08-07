<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class ExperienceCommunity
 *
 * @property int $id
 * @property string $title
 * @property string $group
 * @property string $project
 * @property boolean $is_active
 * @property \Jenssegers\Date\Date $start_date
 * @property \Jenssegers\Date\Date $end_date
 * @property int $experienceable_id
 * @property string $experienceable_type
 * @property boolean $is_education_requirement
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant|\App\Models\JobApplication $experienceable
 * @property \Illuminate\Database\Eloquent\Collection $skills
 * @property \Illuminate\Database\Eloquent\Collection $experience_skills
 *
 * @method string experienceTypeName
 */
class ExperienceCommunity extends BaseModel
{
    protected $casts = [
        'title' => 'string',
        'group' => 'string',
        'project' => 'string',
        'is_active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_education_requirement' => 'boolean'
    ];

    protected $fillable = [
        'title',
        'group',
        'project',
        'is_active',
        'start_date',
        'end_date',
        'is_education_requirement'
    ];

    protected $table = 'experiences_community';

    public static function boot()
    {
        parent::boot();

        // Delete associated ExperienceSkills when this is deleted.
        static::deleting(function ($community): void {
            foreach ($community->experience_skills as $es) {
                $es->delete();
            }
        });
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
     * @return string Returns the string 'community'.
     */
    public function experienceTypeName(): string
    {
        return 'community';
    }
}
