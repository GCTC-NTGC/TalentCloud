<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Astrotomic\Translatable\Translatable as Translatable;

/**
 * Class ApplicationStatus
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $application_status_translations
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 *
 * Localized Properties:
 * @property string $value
 */
class ApplicationStatus extends BaseModel
{
    use Translatable;

    protected $table = 'application_status';
    public $translatedAttributes = ['value'];
    protected $fillable = [];

    public function application_status_translations() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\Lookup\ApplicationStatusTranslation::class);
    }

    public function job_applications() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobApplication::class);
    }
}
