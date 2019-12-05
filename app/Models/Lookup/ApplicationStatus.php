<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class ApplicationStatus
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 *
 * Localized Properties:
 * @property string $value
 */
class ApplicationStatus extends BaseModel
{
    use HasTranslations;

    protected $table = 'application_status';
    public $translatable = ['value'];
    protected $fillable = [];

    public function job_applications() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobApplication::class);
    }
}
