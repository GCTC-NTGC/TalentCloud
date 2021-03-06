<?php

namespace App\Models;

use App\Traits\TalentCloudCrudTrait as CrudTrait;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class Applicant
 *
 * @property int $id
 * @property string $personal_website
 * @property string $tagline
 * @property string $twitter_username
 * @property string $linkedin_url
 * @property int $user_id
 * @property boolean $is_snapshot
 * @property int $citizenship_declaration_id
 * @property int $veteran_status_id
 *
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $applicant_profile_answers
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 * @property \Illuminate\Database\Eloquent\Collection $submitted_applications
 * @property \Illuminate\Database\Eloquent\Collection $degrees
 * @property \Illuminate\Database\Eloquent\Collection $courses
 * @property \Illuminate\Database\Eloquent\Collection $work_experiences
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 * @property \Illuminate\Database\Eloquent\Collection $references
 * @property \Illuminate\Database\Eloquent\Collection $work_samples
 * @property \Illuminate\Database\Eloquent\Collection $projects
 * @property \Illuminate\Database\Eloquent\Collection $applicant_classifications
 * @property \Illuminate\Database\Eloquent\Collection $skills
 *
 * Version 2 application models.
 * @property \Illuminate\Database\Eloquent\Collection $experiences_work
 * @property \Illuminate\Database\Eloquent\Collection $experiences_personal
 * @property \Illuminate\Database\Eloquent\Collection $experiences_education
 * @property \Illuminate\Database\Eloquent\Collection $experiences_award
 * @property \Illuminate\Database\Eloquent\Collection $experiences_community
 *
 * @method \Illuminate\Database\Query\Builder experienceSkillsQuery
 */
class Applicant extends BaseModel
{
    // Trait for Backpack.
    use CrudTrait;

    protected $casts = [
        'user_id' => 'int',
        'personal_website' => 'string',
        'tagline' => 'string',
        'twitter_username' => 'string',
        'linkedin_url' => 'string',
        'is_snapshot' => 'boolean',
        'citizenship_declaration_id' => 'int',
        'veteran_status_id' => 'int',
    ];
    protected $fillable = [
        'personal_website',
        'tagline',
        'twitter_username',
        'linkedin_url',
        'citizenship_declaration_id' => 'int',
        'veteran_status_id' => 'int',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function applicant_profile_answers() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\ApplicantProfileAnswer::class);
    }

    public function job_applications() //phpcs:ignore
    {
        if ($this->is_snapshot) {
            return $this->hasMany(\App\Models\JobApplication::class, 'applicant_snapshot_id');
        }
        return $this->hasMany(\App\Models\JobApplication::class);
    }

    /**
     * Get all of the Job Applications submitted by this applicant
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function submitted_applications() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobApplication::class)->whereDoesntHave('application_status', function ($query): void {
            $query->where('name', 'draft');
        });
    }

    public function degrees()
    {
        return $this->morphMany(\App\Models\Degree::class, 'degreeable')->orderBy('end_date', 'desc');
    }

    public function courses()
    {
        return $this->morphMany(\App\Models\Course::class, 'courseable')->orderBy('end_date', 'desc');
    }

    public function work_experiences() //phpcs:ignore
    {
        return $this->morphMany(\App\Models\WorkExperience::class, 'experienceable')->orderBy('end_date', 'desc');
    }

    public function skill_declarations() //phpcs:ignore
    {
        return $this->morphMany(\App\Models\SkillDeclaration::class, 'skillable');
    }

    public function references()
    {
        return $this->morphMany(\App\Models\Reference::class, 'referenceable');
    }

    public function work_samples() //phpcs:ignore
    {
        return $this->morphMany(\App\Models\WorkSample::class, 'work_sampleable');
    }

    public function projects()
    {
        return $this->morphMany(\App\Models\Project::class, 'projectable');
    }

    public function applicant_classifications() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\ApplicantClassification::class);
    }

    public function skills() // phpcs:ignore
    {
        return $this->belongsToMany(\App\Models\Skill::class, 'applicant_skill');
    }

    // Version 2 application models.

    public function experiences_work() //phpcs:ignore
    {
        return $this->morphMany(\App\Models\ExperienceWork::class, 'experienceable')
            ->orderBy('end_date', 'desc');
    }

    public function experiences_personal() //phpcs:ignore
    {
        return $this->morphMany(\App\Models\ExperiencePersonal::class, 'experienceable')
            ->orderBy('end_date', 'desc');
    }

    public function experiences_education() //phpcs:ignore
    {
        return $this->morphMany(\App\Models\ExperienceEducation::class, 'experienceable')
            ->orderBy('end_date', 'desc');
    }

    public function experiences_award() //phpcs:ignore
    {
        return $this->morphMany(\App\Models\ExperienceAward::class, 'experienceable');
    }

    public function experiences_community() //phpcs:ignore
    {
        return $this->morphMany(\App\Models\ExperienceCommunity::class, 'experienceable')
            ->orderBy('end_date', 'desc');
    }

    /**
     * Returns a Laravel QueryBuilder object which will retrieve all ExperienceSkills
     * which are linked to this Applicant, through this Applicant's Experiences.
     *
     * It returns the query builder object instead of the results of the query, so that additional
     * clauses can be added by other code.
     *
     * @return \Illuminate\Database\Query\Builder
     */
    public function experienceSkillsQuery()
    {
        $applicantId = $this->id;
        return ExperienceSkill::whereHasMorph(
            'experience',
            '*',
            function (Builder $query) use ($applicantId): void {
                $query->where([
                    ['experienceable_type', 'applicant'],
                    ['experienceable_id', $applicantId]
                ]);
            }
        );
    }
}
