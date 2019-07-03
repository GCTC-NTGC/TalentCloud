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
 * @property \Illuminate\Database\Eloquent\Collection $managers
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 */
class Department extends BaseModel
{

    use CrudTrait;
    use HasTranslations;

    /**
     * @var $fillable string[]
     */
    protected $fillable = [
        'id',
        'name',
        'impact'
    ];

     /**
     * @var $translatable string[]
     */
    public $translatable = [
        'name',
        'impact'
    ];

    public function managers() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\Manager::class);
    }

    public function job_posters() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobPoster::class);
    }

    /**
     * Override the toArray() method to return the localized properties for
     * name and description. This was causing issues for ajax responses.
     *
     * @return mixed[]
     */
    public function toArray() : array
    {
        $array = parent::toArray();
        $array['name'] = $this->name;
        $array['impact'] = $this->impact;
        return $array;
    }
}
