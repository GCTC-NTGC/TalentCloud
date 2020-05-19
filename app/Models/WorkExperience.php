<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class WorkExperience
 *
 * @property int $id
 * @property string $role
 * @property string $company
 * @property string $description
 * @property \Jenssegers\Date\Date $start_date
 * @property \Jenssegers\Date\Date $end_date
 * @property int $experienceable_id
 * @property string $experienceable_type
 *
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant|\App\Models\JobApplication $experienceable
 */
class WorkExperience extends BaseModel
{
    /**
     * The table associated with the model.
     *
     * An update to the underlying pluralization library Laravel
     * uses is causing this model to not be associated with a table
     * properly.
     *
     * https://github.com/laravel/framework/pull/32734
     *
     * @var string
     */
    protected $table = 'work_experiences';

    protected $casts = [
        'role' => 'string',
        'company' => 'string',
        'description' => 'string',
        'start_date' => 'date',
        'end_date' => 'date',
    ];
    protected $fillable = [
        'role',
        'company',
        'description',
        'start_date',
        'end_date'
    ];

    public function experienceable()
    {
        return $this->morphTo();
    }
}
