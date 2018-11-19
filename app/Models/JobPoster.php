<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use App\Events\JobSaved;
use App\Models\JobApplication;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Lang;
use Jenssegers\Date\Date;

/**
 * Class JobPoster
 *
 * @property int $id
 * @property int $job_term_id
 * @property int $term_qty
 * @property \Jenssegers\Date\Date $open_date_time
 * @property \Jenssegers\Date\Date $close_date_time
 * @property \Jenssegers\Date\Date $start_date_time
 * @property int $department_id
 * @property int $province_id
 * @property int $salary_min
 * @property int $salary_max
 * @property int $noc
 * @property string $classification
 * @property int $security_clearance_id
 * @property int $language_requirement_id
 * @property boolean $remote_work_allowed
 * @property int $manager_id
 * @property boolean $published
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property int $submitted_applications_count
 *
 * @property \App\Models\Lookup\Department $department
 * @property \App\Models\Lookup\JobTerm $job_term
 * @property \App\Models\Lookup\LanguageRequirement $language_requirement
 * @property \App\Models\Manager $manager
 * @property \App\Models\Lookup\Province $province
 * @property \App\Models\Lookup\SecurityClearance $security_clearance
 * @property \Illuminate\Database\Eloquent\Collection $criteria
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_key_tasks
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_questions
 * @property \Illuminate\Database\Eloquent\Collection $job_poster_translations
 * @property \Illuminate\Database\Eloquent\Collection $submitted_applications
 *
 * Localized Properties:
 * @property string $city
 * @property string $title
 * @property string $impact
 * @property string $branch
 * @property string $division
 * @property string $education
 *
 * Methods
 * @method boolean isOpen()
 * @method string timeRemaining()
 */
class JobPoster extends BaseModel {

    use \Dimsav\Translatable\Translatable;
    use Notifiable;

    public $translatedAttributes = ['city', 'title', 'impact', 'branch', 'division', 'education'];
    protected $casts = [
        'job_term_id' => 'int',
        'department_id' => 'int',
        'province_id' => 'int',
        'salary_min' => 'int',
        'salary_max' => 'int',
        'noc' => 'int',
        'security_clearance_id' => 'int',
        'language_requirement_id' => 'int',
        'remote_work_allowed' => 'boolean',
        'manager_id' => 'int',
        'published' => 'boolean'
    ];
    protected $dates = [
        'open_date_time',
        'close_date_time',
        'start_date_time'
    ];
    protected $fillable = [
        'job_term_id',
        'term_qty',
        'open_date_time',
        'close_date_time',
        'start_date_time',
        'department_id',
        'province_id',
        'salary_min',
        'salary_max',
        'noc',
        'classification',
        'security_clearance_id',
        'language_requirement_id',
        'remote_work_allowed',
        'published'
    ];
    protected $withCount = ['submitted_applications'];

    protected $dispatchesEvents = [
        'saved' => JobSaved::class,
    ];

    public function department() {
        return $this->belongsTo(\App\Models\Lookup\Department::class);
    }

    public function job_term() {
        return $this->belongsTo(\App\Models\Lookup\JobTerm::class);
    }

    public function language_requirement() {
        return $this->belongsTo(\App\Models\Lookup\LanguageRequirement::class);
    }

    public function manager() {
        return $this->belongsTo(\App\Models\Manager::class);
    }

    public function province() {
        return $this->belongsTo(\App\Models\Lookup\Province::class);
    }

    public function security_clearance() {
        return $this->belongsTo(\App\Models\Lookup\SecurityClearance::class);
    }

    public function criteria() {
        return $this->hasMany(\App\Models\Criteria::class);
    }

    public function job_applications() {
        return $this->hasMany(\App\Models\JobApplication::class);
    }

    public function job_poster_key_tasks() {
        return $this->hasMany(\App\Models\JobPosterKeyTask::class);
    }

    public function job_poster_questions() {
        return $this->hasMany(\App\Models\JobPosterQuestion::class);
    }

    public function job_poster_translations() {
        return $this->hasMany(\App\Models\JobPosterTranslation::class);
    }

    // Artificial Relations

    public function submitted_applications() {
        return $this->hasMany(\App\Models\JobApplication::class)->whereHas('application_status', function ($query) {
            $query->where('name', '!=', 'draft');
        });
    }

    // Accessors

    // Methods

    public function isOpen() {
        return $this->published
            && $this->open_date_time->isPast()
            && $this->close_date_time->isFuture();
    }

    public function timeRemaining() {
        $interval = $this->close_date_time->diff(Date::now());

        $d = $interval->d;
        $h = $interval->h;
        $m = $interval->i;
        $s = $interval->s;

        if ($d > 0) {
            $unit = 'day';
            $count = $d;
        } else if ($h > 0) {
            $unit = 'hour';
            $count = $h;
        } else if ($m > 0) {
            $unit = 'minute';
            $count = $m;
        } else {
            $unit = 'second';
            $count = $s;
        }

        $key = "common/time.$unit";

        return Lang::choice($key, $count);
    }
}
