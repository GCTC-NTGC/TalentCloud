<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class AwardRecognitionType
 *
 * @property int $id
 * @property string $key
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $experiences_award
 *
 * Localized Properties:
 * @property string $name
 */
class AwardRecognitionType extends BaseModel
{
    use HasTranslations;

    public $translatable = ['name'];
    protected $fillable = [];

    public function experiences_award() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\ExperienceAward::class);
    }
}
