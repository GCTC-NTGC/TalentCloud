<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Backpack\CRUD\CrudTrait;

/**
 * Class DepartmentTranslation
 *
 * @property int $id
 * @property int $department_id
 * @property string $locale
 * @property string $value
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\Department $department
 */
class DepartmentTranslation extends BaseModel
{
    use CrudTrait;

    /**
     *
     * @var $casts
     */
    protected $casts = [
        'department_id' => 'int'
    ];

    /**
     *
     * @var $fillable
     */
    protected $fillable = [
        'value' => 'string'
    ];

    /**
     * Action for updating an existing Department in the database.
     *
     * @return \App\Models\Lookup\Department
     */
    public function department(): object
    {
        return $this->belongsTo(\App\Models\Lookup\Department::class);
    }
}
