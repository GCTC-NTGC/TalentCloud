<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class DegreeType
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $degrees
 */
class DegreeType extends BaseModel
{
    protected $fillable = [];

    public function degrees()
    {
        return $this->hasMany(\App\Models\Degree::class);
    }
}
