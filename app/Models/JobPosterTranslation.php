<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

/**
 * Class JobPosterTranslation
 *
 * @property int $id
 * @property int $job_poster_id
 * @property string $locale
 * @property string $city
 * @property string $title
 * @property string $dept_impact
 * @property string $team_impact
 * @property string $hire_impact
 * @property string $branch
 * @property string $division
 * @property string $education
 * @property string $work_env_description
 * @property string $culture_summary
 * @property string $culture_special
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobPoster $job_poster
 */
class JobPosterTranslation extends BaseModel
{

    protected $casts = [
        'job_poster_id' => 'int',
        'locale' => 'string',
        'city' => 'string',
        'title' => 'string',
        'dept_impact' => 'string',
        'team_impact' => 'string',
        'hire_impact' => 'string',
        'branch' => 'string',
        'division' => 'string',
        'education' => 'string',
        'work_env_description' => 'string',
        'culture_summary' => 'string',
        'culture_special' => 'string',
    ];
    protected $fillable = [
        'locale',
        'city',
        'title',
        'dept_impact',
        'team_impact',
        'hire_impact',
        'branch',
        'division',
        'education',
        'work_env_description',
        'culture_summary',
        'culture_special',
    ];

    public function job_poster()
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }
}
