<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Department
 *
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $managers
 * @property \Illuminate\Database\Eloquent\Collection $department_translations
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 *
 * Localized Properties:
 * @property string $value
 */
class Department extends Eloquent
{

    use \Dimsav\Translatable\Translatable;

    public $translatedAttributes = ['value'];
    protected $fillable = [];

    public function managers()
    {
        return $this->hasMany(\App\Models\Manager::class);
    }
    
    public function department_translations()
    {
        return $this->hasMany(\App\Models\Lookup\DepartmentTranslation::class);
    }

    public function job_posters()
    {
        return $this->hasMany(\App\Models\JobPoster::class);
    }
}
