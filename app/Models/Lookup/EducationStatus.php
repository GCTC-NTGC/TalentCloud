<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class EducationStatus
 *
 * @property int $id
 * @property string $key
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $experience_educations
 *
 * Localized Properties:
 * @property string $name
 */
class EducationStatus extends BaseModel
{
    use HasTranslations;

    public $translatable = ['name'];
    protected $fillable = [];

    public function experience_educations() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\ExperienceEducation::class);
    }
}
