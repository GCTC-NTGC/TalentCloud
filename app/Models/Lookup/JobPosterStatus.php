<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Backpack\CRUD\app\Models\Traits\SpatieTranslatable\HasTranslations;

/**
 * Class JobPosterStatus
 *
 * @property int $id
 * @property string $key
 * @property string $name
 * @property string $description
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 *
 * Localized Properties:
 * @property string $name
 * @property string $description
 *
 */
class JobPosterStatus extends BaseModel
{
    use CrudTrait;
    use HasTranslations;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'job_poster_status';

    public $translatable = ['name', 'description'];
    protected $fillable = ['name', 'description'];

    public function job_posters() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobPoster::class);
    }
}
