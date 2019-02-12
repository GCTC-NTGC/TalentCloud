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
 */
class JobApplication extends BaseModel {

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
    ];
    protected $fillable = [
        'citizenship_declaration_id',
        'veteran_status_id',
        'preferred_language_id',
        'submission_signature',
        'submission_date',
        'experience_saved',
    ];

    protected function createApplicantSnapshot($applicant_id) {
        $applicant = Applicant::where('id', $applicant_id)->firstOrFail();

        $snapshot = $applicant->replicate();

    }

    public function applicant() {
        return $this->belongsTo(\App\Models\Applicant::class);
    }

    public function applicant_snapshot() {
        return $this->belongsTo(\App\Models\Applicant::class, 'applicant_snapshot_id');
    }

    public function application_status() {
        return $this->belongsTo(\App\Models\Lookup\ApplicationStatus::class);
    }

    public function citizenship_declaration() {
        return $this->belongsTo(\App\Models\Lookup\CitizenshipDeclaration::class);
    }

    public function veteran_status() {
        return $this->belongsTo(\App\Models\Lookup\VeteranStatus::class);
    }

    public function preferred_language() {
        return $this->belongsTo(\App\Models\Lookup\PreferredLanguage::class);
    }

    public function job_poster() {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    public function job_application_answers() {
        return $this->hasMany(\App\Models\JobApplicationAnswer::class);
    }

    public function skill_declarations() {
        return $this->applicant->skill_declarations()
            ->whereIn('skill_id', $this->job_poster->criteria->pluck('skill_id'));
    }

    public function application_review() {
        return $this->hasOne(ApplicationReview::class);
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
    public function getSectionStatus(string $section) {
        //TODO: determine whether sections are complete or invalid
        $validator = new ApplicationValidator();
        $status = 'incomplete';
        switch($section) {
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
                    $validator->assetSkillsComplete($this)) {
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
}
