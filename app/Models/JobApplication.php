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
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant $applicant
 * @property \App\Models\Lookup\ApplicationStatus $application_status
 * @property \App\Models\JobPoster $job_poster
 * @property \Illuminate\Database\Eloquent\Collection $job_application_answers
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 */
class JobApplication extends BaseModel {

    protected $casts = [
        'job_poster_id' => 'int',
        'application_status_id' => 'int',
        'applicant_id' => 'int'
    ];
    protected $fillable = [];

    public function applicant() {
        return $this->belongsTo(\App\Models\Applicant::class);
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

    public function skill_declarations() {
        return $this->hasMany(\App\Models\SkillDeclaration::class);
    }

}
