<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

/**
 * Class JobApplication
 *
 * @property int $id
 * @property int $job_poster_id
 * @property int $application_status_id
 * @property int $applicant_id
 * @property int $applicant_snapshot_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant $applicant
 * @property \App\Models\Applicant $applicant_snapshot
 * @property \App\Models\Lookup\ApplicationStatus $application_status
 * @property \App\Models\JobPoster $job_poster
 * @property \Illuminate\Database\Eloquent\Collection $job_application_answers
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 */
class JobApplication extends BaseModel {

    protected $casts = [
        'job_poster_id' => 'int',
        'application_status_id' => 'int',
        'applicant_id' => 'int',
        'applicant_snapshot_id' => 'int'
    ];
    protected $fillable = [];

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

    public function job_poster() {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    public function job_application_answers() {
        return $this->hasMany(\App\Models\JobApplicationAnswer::class);
    }
}
