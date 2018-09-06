<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;
use App\Models\WorkExperience;

/**
 * Class Applicant
 *
 * @property int $id
 * @property string $personal_website
 * @property string $tagline
 * @property string $twitter_username
 * @property string $linkedin_url
 * @property int $user_ids
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $applicant_profile_answers
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 * @property \Illuminate\Database\Eloquent\Collection $degrees
 * @property \Illuminate\Database\Eloquent\Collection $courses
 * @property \Illuminate\Database\Eloquent\Collection $work_experiences
 */
class Applicant extends BaseModel {

    protected $casts = [
        'user_id' => 'int'
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
}
