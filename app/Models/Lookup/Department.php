<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Backpack\CRUD\app\Models\Traits\SpatieTranslatable\HasTranslations;

/**
 * Class Department
 * @property int $id
 * @property string $name
 * @property string $impact
 * @property string $preference
 *
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $managers
 * @property \Illuminate\Database\Eloquent\Collection $job_posters
 *
 * Localized Properties:
 * @property string $name
 * @property string $impact
 * @property string $preference
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
        'preference',
    ];

    /**
     * @var $fillable string[]
     * */
    protected $fillable = [
        'name',
        'impact',
        'preference',
    ];

    public function managers() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\Manager::class);
    }

    public function job_posters() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\JobPoster::class);
    }
}
