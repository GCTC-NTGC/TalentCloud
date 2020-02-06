<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;

/**
 * Class HrAdvisor
 *
 * @property int $id
 * @property int $user_id
 *
 * @property \App\Models\User $user
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
    use CrudTrait;

    /**
     * @var string[] $casts
     */
    protected $casts = [
        'user_id' => 'int'
    ];

    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = ['id', 'user_id', 'name', 'claimed_job_ids'];

    /**
     * @var string[] $fillable
     */
    protected $fillable = [];



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

    public function claimed_jobs() //phpcs:ignore
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
        return $this->claimed_jobs()->allRelatedIds();
    }
}
