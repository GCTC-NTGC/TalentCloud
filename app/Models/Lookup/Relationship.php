<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class Relationship
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $references
 *
 * Localized Properties:
 * @property string $value
 */
class Relationship extends BaseModel
{
    use HasTranslations;

    public $translatable = ['value'];
    protected $fillable = [];

    public function references()
    {
        return $this->hasMany(\App\Models\Reference::class);
    }
}
