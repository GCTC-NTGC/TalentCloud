<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class TalentStreamCategory
 *
 * @property int $id
 * @property string $key
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 *
 * Localized Properties:
 * @property string $name
 */
class TalentStreamCategory extends BaseModel
{
    use HasTranslations;

    public $translatable = ['name'];
    protected $fillable = [];

    public function job_posters() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobPoster::class);
    }
}
