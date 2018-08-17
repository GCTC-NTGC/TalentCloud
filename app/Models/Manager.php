<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Models\TeamCulture;

/**
 * Class Manager
 *
 * @property int $id
 * @property int $department_id
 * @property string $twitter_username
 * @property string $linkedin_username
 * @property int $user_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\User $user
 * @property \App\Models\Lookup\Department $department
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 * @property \App\Models\WorkEnvironment $work_environment
 * @property \App\Models\TeamCulture $team_culture
 *
 * Localized Properties:
 * @property string $about_me
 * @property string $greatest_accomplishment
 * @property string $branch
 * @property string $division
 * @property string $position
 * @property string $leadership_style
 * @property string $employee_learning
 * @property string $expectations
 * @property string $review_options
 * @property string $staylate
 * @property string $engage
 * @property string $opportunities
 * @property string $low_value_work_requests
 * @property string $work_experience
 * @property string $education
 */
class Manager extends Eloquent {

    use \Dimsav\Translatable\Translatable;

    public $translatedAttributes = ['about_me', 'greatest_accomplishmest', 'branch',
        'division', 'position', 'leadership_style', 'employee_learning',
        'expectations', 'review_options', 'staylate', 'engage', 'opportunities',
        'low_value_work_requests', 'work_experience', 'education'];
    protected $casts = [
        'department_id' => 'int',
        'user_id' => 'int'
    ];
    protected $fillable = [
        'department_id',
        'twitter_username',
        'linkedin_username'
    ];
    protected $with = [
        'department'
    ];

    public function user() {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function department() {
        return $this->belongsTo(\App\Models\Lookup\Department::class);
    }

    public function job_posters() {
        return $this->hasMany(\App\Models\JobPoster::class);
    }

    public function work_environment() {
        return $this->hasOne(\App\Models\WorkEnvironment::class);
    }

    public function team_culture() {
        return $this->hasOne(\App\Models\TeamCulture::class);
    }

}
