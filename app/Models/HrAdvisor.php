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
 *
 * Computed Properties
 * @property string $name
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
     * @var string[] $fillable
     */
    protected $fillable = ['department_id'];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function department()
    {
        return $this->belongsTo(\App\Models\Lookup\Department::class);
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
}
