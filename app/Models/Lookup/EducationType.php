<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class EducationType
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $experiences_education
 *
 * Localized Properties:
 * @property string $value
 */
class EducationType extends BaseModel
{
    use HasTranslations;

    public $translatable = ['value'];
    protected $fillable = [];

    public function experiences_education() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\ExperienceEducation::class);
    }
}
