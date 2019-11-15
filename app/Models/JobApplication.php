<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use App\Models\Lookup\VeteranStatus;
use App\Models\Lookup\PreferredLanguage;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Applicant;
use App\Models\SkillDeclaration;
use App\Models\ApplicationReview;
use Illuminate\Notifications\Notifiable;
use App\Events\ApplicationSaved;
use App\Events\ApplicationRetrieved;
use App\Services\Validation\ApplicationValidator;
use Illuminate\Support\Facades\Log;

/**
 * Class JobApplication
 *
 * @property int $id
 * @property int $job_poster_id
 * @property int $application_status_id
 * @property int $citizenship_declaration_id
 * @property int $veteran_status_id
 * @property int $preferred_language_id
 * @property int $applicant_id
 * @property int $applicant_snapshot_id
 * @property string $submission_signature
 * @property string $submission_date
 * @property boolean $experience_saved
 * @property boolean $language_requirement_confirmed
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant $applicant
 * @property \App\Models\Applicant $applicant_snapshot
 * @property \App\Models\Lookup\ApplicationStatus $application_status
 * @property \App\Models\Lookup\CitizenshipDeclaration $citizenship_declaration
 * @property \App\Models\Lookup\VeteranStatus $veteran_status
 * @property \App\Models\Lookup\PreferredLanguage $preferred_language
 * @property \App\Models\JobPoster $job_poster
 * @property \Illuminate\Database\Eloquent\Collection $job_application_answers
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 * @property \App\Models\ApplicationReview $application_review
 * @property \Illuminate\Database\Eloquent\Collection $degrees
 * @property \Illuminate\Database\Eloquent\Collection $courses
 * @property \Illuminate\Database\Eloquent\Collection $work_experiences
 * @property \Illuminate\Database\Eloquent\Collection $references
 * @property \Illuminate\Database\Eloquent\Collection $work_samples
 * @property \Illuminate\Database\Eloquent\Collection $projects
 */
class JobApplication extends BaseModel
{

    use Notifiable;

    protected $dispatchesEvents = [
        'retrieved' => ApplicationRetrieved::class,
        'saved' => ApplicationSaved::class,
    ];

    protected $casts = [
        'job_poster_id' => 'int',
        'application_status_id' => 'int',
        'citizenship_declaration_id' => 'int',
        'veteran_status_id' => 'int',
        'preferred_language_id' => 'int',
        'applicant_id' => 'int',
        'applicant_snapshot_id' => 'int',
        'submission_signature' => 'string',
        'submission_date' => 'string',
        'experience_saved' => 'boolean',
        'language_requirement_confirmed' => 'boolean'
    ];
    protected $fillable = [
        'citizenship_declaration_id',
        'language_requirement_confirmed',
        'veteran_status_id',
        'preferred_language_id',
        'submission_signature',
        'submission_date',
        'experience_saved',
    ];

    /**
     * The accessors to append to the model's array/json form.
     *
     * @var array
     */
    protected $appends = ['meets_essential_criteria'];

    protected function createApplicantSnapshot($applicant_id)
    {
        $applicant = Applicant::where('id', $applicant_id)->firstOrFail();

        $snapshot = $applicant->replicate();
    }

    public function applicant()
    {
        return $this->belongsTo(\App\Models\Applicant::class);
    }

    public function applicant_snapshot()
    {
        return $this->belongsTo(\App\Models\Applicant::class, 'applicant_snapshot_id');
    }

    public function application_status()
    {
        return $this->belongsTo(\App\Models\Lookup\ApplicationStatus::class);
    }

    public function citizenship_declaration()
    {
        return $this->belongsTo(\App\Models\Lookup\CitizenshipDeclaration::class);
    }

    public function veteran_status()
    {
        return $this->belongsTo(\App\Models\Lookup\VeteranStatus::class);
    }

    public function preferred_language()
    {
        return $this->belongsTo(\App\Models\Lookup\PreferredLanguage::class);
    }

    public function job_poster()
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    public function job_application_answers()
    {
        return $this->hasMany(\App\Models\JobApplicationAnswer::class);
    }

    public function skill_declarations()
    {
        return $this->morphMany(\App\Models\SkillDeclaration::class, 'skillable');
    }

    public function application_review()
    {
        return $this->hasOne(ApplicationReview::class);
    }

    public function degrees()
    {
        return $this->morphMany(\App\Models\Degree::class, 'degreeable')->orderBy('end_date', 'desc');
    }

    public function courses()
    {
        return $this->morphMany(\App\Models\Course::class, 'courseable')->orderBy('end_date', 'desc');
    }

    public function work_experiences()
    {
        return $this->morphMany(\App\Models\WorkExperience::class, 'experienceable')->orderBy('end_date', 'desc');
    }

    public function references()
    {
        return $this->morphMany(\App\Models\Reference::class, 'referenceable');
    }

    public function projects()
    {
        return $this->morphMany(\App\Models\Project::class, 'projectable');
    }

    public function work_samples()
    {
        return $this->morphMany(\App\Models\WorkSample::class, 'work_sampleable');
    }

    /**
     * Return either 'complete', 'incomplete' or 'error', depending on the
     * status of the requested section.
     *
     * @param  string $section Should be one of:
     *                              'basics'
     *                              'experience'
     *                              'essential_skills'
     *                              'asset_skills'
     *                              'preview'
     *
     * @return string $status   'complete', 'incomplete' or 'error'
     */
    public function getSectionStatus(string $section)
    {
        // TODO: determine whether sections are complete or invalid
        $validator = new ApplicationValidator();
        $status = 'incomplete';
        switch ($section) {
            case 'basics':
                if ($validator->basicsComplete($this)) {
                    $status = 'complete';
                }
                break;
            case 'experience':
                if ($validator->experienceComplete($this)) {
                    $status = 'complete';
                }
                break;
            case 'essential_skills':
                if ($validator->essentialSkillsComplete($this)) {
                    $status = 'complete';
                }
                break;
            case 'asset_skills':
                if ($validator->assetSkillsComplete($this)) {
                    $status = 'complete';
                }
                break;
            case 'preview':
                if ($validator->basicsComplete($this) &&
                    $validator->experienceComplete($this) &&
                    $validator->essentialSkillsComplete($this) &&
                    $validator->assetSkillsComplete($this)
                ) {
                    $status = 'complete';
                }
                break;
            case 'confirm':
                if ($validator->affirmationComplete($this)) {
                    $status = 'complete';
                }
                break;
            default:
                $status = 'error';
                break;
        }
        return $status;
    }

    public function isDraft(): bool
    {
        return $this->application_status->name === 'draft';
    }

    /**
     * Returns true if this meets all the essential criteria.
     * That means it has attached an SkillDeclaration for each essential criterion,
     * with a level at least as high as the required level.
     * NOTE: If this application is in draft status, it will use
     *  SkillDeclarations from the the applicants profile for this check.
     *
     * @return boolean
     */
    public function meetsEssentialCriteria(): bool
    {
        $essentialCriteria = $this->job_poster->criteria->filter(
            function ($value, $key) {
                return $value->criteria_type->name == 'essential';
            }
        );
        $source = $this->isDraft() ? $this->applicant : $this;
        foreach ($essentialCriteria as $criterion) {
            $skillDeclaration = $source->skill_declarations->where('skill_id', $criterion->skill_id)->first();
            if ($skillDeclaration === null ||
                $skillDeclaration->skill_level_id < $criterion->skill_level_id
            ) {
                return false;
            }
        }
        return true;
    }

    /**
     * Accessor for meetsEssentialCriteria function, which
     * allows this value to be automtacially appended to array/json representation.
     *
     * @return boolean
     */
    public function getMeetsEssentialCriteriaAttribute(): bool
    {
        return $this->meetsEssentialCriteria();
    }

    /**
     * Save copies of all relevant profile data to this application.
     *
     *
     * @return void
     */
    public function saveProfileSnapshot(): void
    {
        $applicant = $this->applicant->fresh();

        // Delete previous snapshot.
        $this->degrees()->delete();
        $this->courses()->delete();
        $this->work_experiences()->delete();
        $this->projects()->delete();
        $this->references()->delete();
        $this->work_samples()->delete();
        $this->skill_declarations()->delete();

        $this->degrees()->saveMany($applicant->degrees->map->replicate());
        $this->courses()->saveMany($applicant->courses->map->replicate());
        $this->work_experiences()->saveMany($applicant->work_experiences->map->replicate());

        $copyWithHistory = function ($model) {
            return [
                'old' => $model,
                'new' => $model->replicate()
            ];
        };


        $projectMap = $applicant->projects->map($copyWithHistory);
        $referenceMap = $applicant->references->map($copyWithHistory);
        $workSampleMap = $applicant->work_samples->map($copyWithHistory);
        $skillDeclarationMap = $applicant->skill_declarations->map($copyWithHistory);

        // First link new projects, references, work samples and skill declarations to this application.
        $this->projects()->saveMany($projectMap->pluck('new'));
        $this->references()->saveMany($referenceMap->pluck('new'));
        $this->work_samples()->saveMany($workSampleMap->pluck('new'));
        $this->skill_declarations()->saveMany($skillDeclarationMap->pluck('new'));

        $findNewFromOld = function ($mapping, $old) {
            $matchingItem = $mapping->first(function ($value) use ($old) {
                return $value['old']->id === $old->id;
            });
            return $matchingItem['new'];
        };

        // Replicate copies shallow attributes, but not relationships. We have to copy those ourselves.
        $findNewReferenceFromOld = function ($old) use ($findNewFromOld, $referenceMap) {
            return $findNewFromOld($referenceMap, $old);
        };

        $findNewSkillDeclarationFromOld = function ($old) use ($findNewFromOld, $skillDeclarationMap) {
            return $findNewFromOld($skillDeclarationMap, $old);
        };

        // Link projects and references.
        foreach ($projectMap as $item) {
            $old = $item['old'];
            $newProj = $item['new'];
            $newReferences = $old->references->map($findNewReferenceFromOld);
            $newProj->references()->sync($newReferences);
        }

        // Link references and skills.
        foreach ($referenceMap as $item) {
            $old = $item['old'];
            $newRef = $item['new'];
            $newSkillDecs = $old->skill_declarations->map($findNewSkillDeclarationFromOld);
            $newRef->skill_declarations()->sync($newSkillDecs);
        }

        // Link work samples and skills.
        foreach ($workSampleMap as $item) {
            $old = $item['old'];
            $newSample = $item['new'];
            $newSkillDecs = $old->skill_declarations->map($findNewSkillDeclarationFromOld);
            $newSample->skill_declarations()->sync($newSkillDecs);
        }
    }
}
