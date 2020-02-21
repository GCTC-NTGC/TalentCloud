<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Backpack\CRUD\app\Models\Traits\SpatieTranslatable\HasTranslations;

/**
 * Class UserRole
 *
 * @property int $id
 * @property string $key
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * @property \Illuminate\Database\Eloquent\Collection $users
 */
class UserRole extends BaseModel
{
    use CrudTrait;
    use HasTranslations;

    /**
     * @var $fillable string[]
     */
    protected $fillable = [
        'name'
    ];

    /**
     * @var $translatable string[]
     */
    public $translatable = [
        'name'
    ];

    public function users() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\User::class);
    }
}
