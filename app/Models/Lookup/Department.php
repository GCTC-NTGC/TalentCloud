<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Backpack\CRUD\CrudTrait;

/**
 * Class Department
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * @property \Illuminate\Database\Eloquent\Collection $managers
 * @property \Illuminate\Database\Eloquent\Collection $department_translations
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 * Localized Properties:
 * @property string $value
 */
class Department extends BaseModel
{

    use CrudTrait;
    use \Dimsav\Translatable\Translatable;

    /**
     * @var $translatedAttributes
     */
    public $translatedAttributes = ['value'];

    /**
     * @var $fillable
     */
    protected $fillable = ['id'];

    /**
     * Departments belonging to managers.
     * @return object
     */
    public function managers() : object
    {
        return $this->hasMany(\App\Models\Manager::class);
    }

    /**
     * Departments belonging to Job Posters.
     * @return object
     */
    public function job_posters() : object
    {
        return $this->hasMany(\App\Models\JobPoster::class);
    }

    /**
     * Localized department names.
     * @return object
     */
    public function department_translations() : object
    {
        return $this->hasMany(\App\Models\Lookup\DepartmentTranslation::class);
    }
}
