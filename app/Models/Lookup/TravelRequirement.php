<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class TravelRequirement
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 */
class TravelRequirement extends BaseModel
{
    protected $fillable = [];
}
