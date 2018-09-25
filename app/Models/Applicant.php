<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;
use App\Models\WorkSample;
use Illuminate\Database\Eloquent\Collection;

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
 *
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $applicant_profile_answers
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 * @property \Illuminate\Database\Eloquent\Collection $degrees
 * @property \Illuminate\Database\Eloquent\Collection $courses
 * @property \Illuminate\Database\Eloquent\Collection $work_experiences
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 * @property \Illuminate\Database\Eloquent\Collection $references
 * @property \Illuminate\Database\Eloquent\Collection $work_samples
 * @property \Illuminate\Database\Eloquent\Collection $projects
 */
class Applicant extends BaseModel {

    protected $casts = [
        'user_id' => 'int',
        'personal_website' => 'string',
        'tagline' => 'string',
        'twitter_username' => 'string',
        'linkedin_url' => 'string',
        'is_snapshot' => 'boolean'
    ];
    protected $fillable = [
        'personal_website',
        'tagline',
        'twitter_username',
        'linkedin_url'
    ];

    public function user() {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function applicant_profile_answers() {
        return $this->hasMany(\App\Models\ApplicantProfileAnswer::class);
    }

    public function job_applications() {
        if ($this->is_snapshot) {
            return $this->hasMany(\App\Models\JobApplication::class, 'applicant_snapshot_id');
        }
        return $this->hasMany(\App\Models\JobApplication::class);
    }

    public function degrees() {
        return $this->hasMany(\App\Models\Degree::class);
    }

    public function courses() {
        return $this->hasMany(\App\Models\Course::class);
    }

    public function work_experiences() {
        return $this->hasMany(\App\Models\WorkExperience::class);
    }

    public function skill_declarations() {
        return $this->hasMany(\App\Models\SkillDeclaration::class);
    }

    public function references() {
        return $this->hasMany(\App\Models\Reference::class);
    }

    public function work_samples() {
        return $this->hasMany(\App\Models\WorkSample::class);
    }

    public function projects() {
        return $this->hasMany(\App\Models\Project::class);
    }
}
