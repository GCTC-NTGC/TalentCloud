<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;
use App\Models\Lookup\VeteranStatus;
use App\Models\Lookup\PreferredLanguage;
use App\Models\Lookup\CitizenshipDeclaration;
use Illuminate\Notifications\Notifiable;
use App\Events\ApplicationSaved;
use App\Events\ApplicationRetrieved;

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
    ];
    protected $fillable = [
        'citizenship_declaration_id',
        'veteran_status_id',
        'preferred_language_id',
        'submission_signature',
        'submission_date',
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
        //TODO: determine whether sections are complete or opcache_invalid

        $status = 'incomplete';
        switch($section) {
            case 'basics':
                break;
            case 'experience':
                break;
            case 'essential_skills':
                break;
            case 'asset_skills':
                break;
            case 'preview':
                break;
            default:
                $status = 'error';
                break;
        }
        return $status;
    }
}
