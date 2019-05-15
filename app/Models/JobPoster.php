<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use App\Events\JobSaved;
use App\Models\JobApplication;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;
use Jenssegers\Date\Date;
use \Backpack\CRUD\CrudTrait;

/**
 * Class JobPoster
 *
 * @property int $id
 * @property int $job_term_id
 * @property int $term_qty
 * @property \Jenssegers\Date\Date $open_date_time
 * @property \Jenssegers\Date\Date $close_date_time
 * @property \Jenssegers\Date\Date $start_date_time
 * @property \Jenssegers\Date\Date $review_requested_at
 * @property \Jessengers\Date\Date $published_at
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
 * @method string toApiArray()
 */
class JobPoster extends BaseModel
{
    use CrudTrait;
    use \Dimsav\Translatable\Translatable;
    use Notifiable;

    const DATE_FORMAT = [
        'en' => 'M jS, Y',
        'fr' => 'd M Y',
    ];
    const TIME_FORMAT = [
        'en' => 'h:i A T',
        'fr' => 'H \h i T',
    ];
    const TIMEZONE = 'America/Toronto';

    /**
     * @var string[] $translatedAttributes
     */
    public $translatedAttributes = [
        'city',
        'title',
        'impact',
        'branch',
        'division',
        'education'
    ];

    /**
     * @var string[] $casts
     */
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

    /**
     * @var string[] $dates
     */
    protected $dates = [
        'open_date_time',
        'close_date_time',
        'start_date_time',
        'review_requested_at',
        'published_at'
    ];

    /**
     * @var string[] $fillable
     */
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

    /**
     * @var mixed[] $dispatchesEvents
     */
    protected $dispatchesEvents = [
        'saved' => JobSaved::class,
    ];

    // @codeCoverageIgnoreStart

    public function department() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\Department::class);
    }

    public function job_term() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\JobTerm::class);
    }

    public function language_requirement() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\LanguageRequirement::class);
    }

    public function manager() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Manager::class);
    }

    public function province() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\Province::class);
    }

    public function security_clearance() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\SecurityClearance::class);
    }

    public function criteria() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\Criteria::class);
    }

    public function job_applications() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobApplication::class);
    }

    public function job_poster_key_tasks() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobPosterKeyTask::class);
    }

    public function job_poster_questions() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobPosterQuestion::class);
    }

    public function job_poster_translations() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobPosterTranslation::class);
    }

    // Artificial Relations

    /**
     * Get all of the Job Applications submitted to this
     * Job Poster.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function submitted_applications() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobApplication::class)->whereDoesntHave('application_status', function ($query) : void {
            $query->where('name', 'draft');
        });
    }

    // Overrides

    /**
     * Retrieve the model for a bound value.
     * Seems to be a useful workaround for providing submitted_applications_count
     * to any bound routes that receive a jobPoster instance without using the
     * withCount property on the model itself.
     * See https://github.com/laravel/framework/issues/23957 for more info.
     *
     * @param mixed $value Value used to retrieve the model instance.
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function resolveRouteBinding($value) // phpcs:ignore
    {
        return $this->withCount('submitted_applications')->where('id', $value)->first() ?? abort(404);
    }

    // @codeCoverageIgnoreEnd

    // Accessors

    // Mutators

    /**
     * Intercept setting the "published" attribute, and set the
     * "published_at" timestamp if true.
     *
     * @param mixed $value Incoming value for the 'published' attribute.
     *
     * @return void
     */
    public function setPublishedAttribute($value) : void
    {
        if ($value && $this->open_date_time->isPast()) {
            $this->attributes['published_at'] = new Date();
        } elseif ($value && $this->open_date_time->isFuture()) {
            $this->attributes['published_at'] = $this->open_date_time;
        }
        $this->attributes['published'] = $value;
    }

    // Methods

    public function submitted_applications_count()
    {
        return $this->submitted_applications()->count();
    }

    /**
     * Formatted and localized date and time the Job Poster closes.
     *
     * @return string[]
     */
    public function applyBy() : array
    {
        $localCloseDate = new Date($this->close_date_time); // This initializes the date object in UTC time
        $localCloseDate->setTimezone(new \DateTimeZone(self::TIMEZONE)); // Then set the time zone for display
        $displayDate = [
            'date' => $localCloseDate->format(self::DATE_FORMAT[App::getLocale()]),
            'time' => $localCloseDate->format(self::TIME_FORMAT[App::getLocale()])
        ];

        if (App::isLocale('fr')) {
            $displayDate['time'] = str_replace(['EST', 'EDT'], ['HNE', 'HAE'], $displayDate['time']);
        }

        return $displayDate;
    }

    /**
     * Return whether the Job is Open or Closed.
     * Used by the Admin Portal JobPosterCrudController.
     *
     * @return string
     */
    public function displayStatus() : string
    {
        return $this->isOpen() ? 'Open' : 'Closed';
    }

    /**
     * Check if a Job Poster is open for applications.
     *
     * @return boolean
     */
    public function isOpen() : bool
    {
        return $this->published
            && $this->open_date_time->isPast()
            && $this->close_date_time->isFuture();
    }

    /**
     * Check if a Job Poster is closed for applications.
     *
     * @return boolean
     */
    public function isClosed() : bool
    {
        return $this->published
            && $this->open_date_time->isPast()
            && $this->close_date_time->isPast();
    }

    /**
     * Calculate the remaining time a Job Poster is open.
     *
     * @return string
     */
    public function timeRemaining() : string
    {
        $interval = $this->close_date_time->diff(Date::now());

        $d = $interval->d;
        $h = $interval->h;
        $m = $interval->i;
        $s = $interval->s;

        if ($d > 0) {
            $unit = 'day';
            $count = $d;
        } elseif ($h > 0) {
            $unit = 'hour';
            $count = $h;
        } elseif ($m > 0) {
            $unit = 'minute';
            $count = $m;
        } else {
            $unit = 'second';
            $count = $s;
        }

        $key = "common/time.$unit";

        return Lang::choice($key, $count);
    }

    /**
     * Return the current status for the Job Poster.
     * Possible values are "draft", "submitted", "published" and "closed".
     *
     * @return string
     */
    public function status() : string
    {
        $status = 'draft';
        if ($this->isOpen()) {
            $status = 'published';
        } elseif ($this->isClosed()) {
            $status = 'closed';
        } elseif ($this->review_requested_at !== null) {
            $status = 'submitted';
        } else {
            $status = 'draft';
        }

        return $status;
    }

    /**
     * Return the array of values used to represent this object in an api response.
     * This array should contain no nested objects (besides translations).
     *
     * @return mixed[]
     */
    public function toApiArray()
    {
        $jobWithTranslations = array_merge($this->toArray(), $this->getTranslationsArray());
        $jobCollection = collect($jobWithTranslations)->only([
            'id',
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
            'en',
            'fr',
        ])->all();
        return $jobCollection;
    }
}
