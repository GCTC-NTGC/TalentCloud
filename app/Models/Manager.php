<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use App\Traits\TalentCloudCrudTrait as CrudTrait;
use Astrotomic\Translatable\Translatable as Translatable;

/**
 * Class Manager
 *
 * @property int $id
 * @property int $department_id
 * @property int $work_review_frequency_id
 * @property int $stay_late_frequency_id
 * @property int $engage_team_frequency_id
 * @property int $development_opportunity_frequency_id
 * @property int $refuse_low_value_work_frequency_id
 * @property int $years_experience
 * @property string $twitter_username
 * @property string $linkedin_url
 * @property int $user_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\User $user
 * @property \App\Models\Lookup\Department $department
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 * @property \App\Models\WorkEnvironment $work_environment
 * @property \App\Models\TeamCulture $team_culture
 * @property \App\Models\Lookup\Frequency $work_review_frequency
 * @property \App\Models\Lookup\Frequency $stay_late_frequency
 * @property \App\Models\Lookup\Frequency $engage_team_frequency
 * @property \App\Models\Lookup\Frequency $development_opportunity_frequency
 * @property \App\Models\Lookup\Frequency $refuse_low_value_work_frequency
 *
 * Localized Properties:
 * @property string $about_me
 * @property string $greatest_accomplishment
 * @property string $division
 * @property string $position
 * @property string $leadership_style
 * @property string $employee_learning
 * @property string $expectations
 * @property string $education
 * @property string $career_journey
 * @property string $learning_path
 *
 * Computed Properties
 * @property string $name
 *
 * Methods
 * @method   string toApiArray()
 */
class Manager extends BaseModel
{
    use Translatable;
    // Trait for Backpack.
    use CrudTrait;

    public $translatedAttributes = [
        'about_me',
        'greatest_accomplishment',
        'division',
        'position',
        'leadership_style',
        'employee_learning',
        'expectations',
        'education',
        'career_journey',
        'learning_path'
    ];
    protected $casts = [
        'department_id' => 'int',
        'user_id' => 'int'
    ];
    protected $fillable = [
        'department_id',
        'twitter_username',
        'linkedin_url',
        'work_review_frequency_id',
        'stay_late_frequency_id',
        'engage_team_frequency_id',
        'development_opportunity_frequency_id',
        'refuse_low_value_work_frequency_id',
        'years_experience'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['name'];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function department()
    {
        return $this->belongsTo(\App\Models\Lookup\Department::class);
    }

    public function job_posters() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobPoster::class);
    }

    public function work_environment() //phpcs:ignore
    {
        return $this->hasOne(\App\Models\WorkEnvironment::class)->withDefault();
    }

    public function team_culture() //phpcs:ignore
    {
        return $this->hasOne(\App\Models\TeamCulture::class)->withDefault();
    }
    /*
    * @property \App\Models\Lookup\Frequency $review_options
    * @property \App\Models\Lookup\Frequency $staylate
    * @property \App\Models\Lookup\Frequency $engage
    * @property \App\Models\Lookup\Frequency $opportunities
    * @property \App\Models\Lookup\Frequency $low_value_work_requests
    *
    * work_review_frequency
    * stay_late_frequency
    * engage_team_frequency
    * development_opportunity_frequency
    * refuse_low_value_work_frequency
    */
    public function work_review_frequency() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function stay_late_frequency() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function engage_team_frequency() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function development_opportunity_frequency() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function refuse_low_value_work_frequency() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    /**
     * Return the full name of the User associated with this Manager.
     *
     * @return string
     */
    public function getNameAttribute(): string
    {
        if ($this->user !== null) {
            return $this->user->first_name . ' ' . $this->user->last_name;
        }
        return '';
    }

    /**
     * Return the array of values used to represent this object in an api response.
     * This array should contain no nested objects (besides translations).
     *
     * @return mixed[]
     */
    public function toApiArray()
    {
        $withTranslations = array_merge($this->toArray(), $this->getTranslationsArray());
        return $withTranslations;
    }
}
