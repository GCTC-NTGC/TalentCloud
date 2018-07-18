<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

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
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 * @property \Illuminate\Database\Eloquent\Collection $manager_translations
 * @property \Illuminate\Database\Eloquent\Collection $manager_work_environments
 * @property \Illuminate\Database\Eloquent\Collection $team_cultures
 * 
 * Localized Properties:
 * @property string $aboutme
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

    public $translatedAttributes = ['aboutme', 'greatest_accomplishmest', 'branch',
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

    public function user() {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function job_posters() {
        return $this->hasMany(\App\Models\JobPoster::class);
    }

    public function manager_translations() {
        return $this->hasMany(\App\Models\ManagerTranslation::class);
    }

    public function manager_work_environments() {
        return $this->hasMany(\App\Models\ManagerWorkEnvironment::class);
    }

    public function team_cultures() {
        return $this->hasMany(\App\Models\TeamCulture::class);
    }

}
