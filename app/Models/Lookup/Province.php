<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class Province
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
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 * @property \Illuminate\Database\Eloquent\Collection $province_translations
 *
 * Localized Properties:
 * @property string $value
 */
<<<<<<< HEAD
class Province extends Eloquent
{
=======
class Province extends BaseModel {
>>>>>>> dev

    use \Dimsav\Translatable\Translatable;

    public $translatedAttributes = ['value'];
    protected $fillable = [];

    public function job_posters()
    {
        return $this->hasMany(\App\Models\JobPoster::class);
    }

    public function province_translations()
    {
        return $this->hasMany(\App\Models\Lookup\ProvinceTranslation::class);
    }
}
