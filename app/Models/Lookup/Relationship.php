<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Astrotomic\Translatable\Translatable as Translatable;

/**
 * Class Relationship
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $references
 * @property \Illuminate\Database\Eloquent\Collection $relationship_translations
 *
 * Localized Properties:
 * @property string $value
 */
class Relationship extends BaseModel
{

    use Translatable;

    public $translatedAttributes = ['value'];
    protected $fillable = [];

    public function references()
    {
        return $this->hasMany(\App\Models\References::class);
    }

    public function relationship_translations() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\Lookup\RelationshipTranslation::class);
    }
}
