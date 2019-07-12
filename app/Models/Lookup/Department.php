<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

use Backpack\CRUD\CrudTrait;
use Backpack\CRUD\ModelTraits\SpatieTranslatable\HasTranslations;

/**
 * Class Department
 * @property int $id
 * @property string $name
 * @property string $impact
 *
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $managers
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 *
 * Localized Properties:
 * @property string $value
 */
class Department extends BaseModel
{
    use CrudTrait;
    use HasTranslations;

    /**
     * @var $translatable string[]
     * */
    public $translatable = [
        'name',
        'impact',
    ];

    protected $fillable = [];

    public function managers() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\Manager::class);
    }

    public function department_translations() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\Lookup\DepartmentTranslation::class);
    }

    public function job_posters() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobPoster::class);
    }
}
