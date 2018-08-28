<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

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
class DepartmentTranslation extends BaseModel {

    protected $casts = [
        'department_id' => 'int'
    ];
    protected $fillable = [];

    public function department() {
        return $this->belongsTo(\App\Models\Lookup\Department::class);
    }

}
