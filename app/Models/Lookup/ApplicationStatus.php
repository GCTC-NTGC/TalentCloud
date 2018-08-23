<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class ApplicationStatus
 *
 * @property int $id
 * @property string $name
<<<<<<< HEAD
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
=======
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
>>>>>>> dev
 * @property \Illuminate\Database\Eloquent\Collection $application_status_translations
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 *
 * Localized Properties:
 * @property string $value
 */
<<<<<<< HEAD
class ApplicationStatus extends Eloquent
{
=======
class ApplicationStatus extends BaseModel {
>>>>>>> dev

    use \Dimsav\Translatable\Translatable;

    protected $table = 'application_status';
    public $translatedAttributes = ['value'];
    protected $fillable = [];

    public function application_status_translations()
    {
        return $this->hasMany(\App\Models\Lookup\ApplicationStatusTranslation::class);
    }

    public function job_applications()
    {
        return $this->hasMany(\App\Models\JobApplication::class);
    }
}
