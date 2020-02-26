<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class AwardRecipientType
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $experiences_awards
 *
 * Localized Properties:
 * @property string $value
 */
class AwardRecipientType extends BaseModel
{
    use HasTranslations;

    public $translatable = ['value'];
    protected $fillable = [];

    public function experiences_awards() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\ExperienceAward::class);
    }
}
