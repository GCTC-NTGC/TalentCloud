<?php

namespace App\Models;

/**
 * Class HrAdvisor
 *
 * @property int $id
 * @property int $user_id
 * @property int $department_id
 *
 * @property \App\Models\User $user
 * @property \App\Models\Lookup\Department $department
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * Computed Properties
 * @property string $name
 * @property int[] $claimed_job_ids
 */
class HrAdvisor extends BaseModel
{
    /**
     * @var string[] $casts
     */
    protected $casts = [
        'department_id' => 'int',
        'user_id' => 'int'
    ];

    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = ['id', 'department_id', 'user_id', 'name', 'claimed_job_ids'];

    /**
     * @var string[] $fillable
     */
    protected $fillable = ['department_id'];



    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['name', 'claimed_job_ids'];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function department()
    {
        return $this->belongsTo(\App\Models\Lookup\Department::class);
    }

    public function claimed_jobs()
    {
        return $this->belongsToMany(
            \App\Models\JobPoster::class,
            'claimed_jobs'
        );
    }

    /**
     * Return the full name of the User associated with this HR Advisor.
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
     * Return an array of ids of claimed jobs.
     *
     * @return array
     */
    public function getClaimedJobIdsAttribute()
    {
        return $this->claimed_jobs()->allRelatedIds()->toArray();
    }
}
