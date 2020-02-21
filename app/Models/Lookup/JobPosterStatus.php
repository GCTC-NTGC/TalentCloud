<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class JobPosterStatus
 *
 * @property int $id
 * @property string $name
 * @property string $value
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 *
 * Localized Properties:
 * @property string $value
 *
 */
class JobPosterStatus extends BaseModel
{
    use HasTranslations;

    public $translatable = ['value'];
    protected $fillable = [];

    public function job_posters() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobPoster::class);
    }
}
