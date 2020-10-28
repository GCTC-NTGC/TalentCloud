<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Backpack\CRUD\app\Models\Traits\SpatieTranslatable\HasTranslations;

/**
 * Class UserRole.
 *
 * @property int $id
 * @property string $key
 * @property string $education_requirements
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * @property \Illuminate\Database\Eloquent\Collection $skills
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 */
class Classification extends BaseModel
{
    use CrudTrait;
    use HasTranslations;

    /**
     * @var string
     */
    protected $fillable = [
        'key',
        'education_requirements',
    ];

    public $translatable = [
        'education_requirements',
    ];

    public function skills()
    {
        return $this->belongsToMany(\App\Models\Skill::class)->withTimestamps();
    }

    public function job_posters() //phpcs:ignore
    {
        return $this->belongsToMany(\App\Models\JobPoster::class);
    }
}
