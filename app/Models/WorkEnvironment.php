<?php

namespace App\Models;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class WorkEnvironment
 *
 * @property int $id
 * @property int $manager_id
 * @property int $telework_allowed_frequency_id
 * @property int $flexible_hours_frequency_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Manager $manager
 * @property \App\Models\Lookup\Frequency $telework_allowed_frequency
 * @property \App\Models\Lookup\Frequency $flexible_hours_frequency
 * @property \Illuminate\Database\Eloquent\Collection $workplace_photo_captions
 *
 * Localized Properties:
 * @property string $things_to_know
 */
class WorkEnvironment extends BaseModel
{
    use HasTranslations;

    public $translatable = ['things_to_know'];
    protected $casts = [
        'telework_allowed_frequency_id' => 'int',
        'flexible_hours_frequency_id' => 'int',
    ];
    protected $fillable = [
        'telework_allowed_frequency_id',
        'flexible_hours_frequency_id',
        'things_to_know'
    ];
    protected $with = [
        'telework_allowed_frequency',
        'flexible_hours_frequency'
    ];

    public function manager()
    {
        return $this->belongsTo(\App\Models\Manager::class);
    }

    public function telework_allowed_frequency() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function flexible_hours_frequency() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\Frequency::class);
    }

    public function workplace_photo_captions() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\WorkplacePhotoCaption::class);
    }
}
