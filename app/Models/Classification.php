<?php

namespace App\Models;

/**
 * Class UserRole
 *
 * @property int $id
 * @property string $key
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $skills
 */
class Classification extends BaseModel
{

    protected $fillable = [];

    public function skills()
    {
        return $this->belongsToMany(\App\Models\Skill::class)->withTimestamps();
    }
}
