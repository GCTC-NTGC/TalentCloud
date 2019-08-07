<?php

namespace App\Models;

use Backpack\CRUD\CrudTrait;

/**
 * Class UserRole.
 *
 * @property int $id
 * @property string $key
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * @property \Illuminate\Database\Eloquent\Collection $skills
 */
class Classification extends BaseModel
{
    use CrudTrait;

    /**
     * @var string
     */
    protected $fillable = [
        'key'
    ];

    public function skills()
    {
        return $this->belongsToMany(\App\Models\Skill::class)->withTimestamps();
    }
}
