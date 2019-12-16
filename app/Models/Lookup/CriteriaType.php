<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Astrotomic\Translatable\Translatable as Translatable;

/**
 * Class CriteriaType
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $criteria
 * @property \Illuminate\Database\Eloquent\Collection $criteria_translations
 *
 * Localized properties
 * @property string $value
 * @property string $description
 */
class CriteriaType extends BaseModel
{

    use Translatable;

    public $translatedAttributes = ['value', 'description'];
    protected $fillable = [];

    public function criteria()
    {
        return $this->hasMany(\App\Models\Criteria::class);
    }

    public function criteria_type_translations() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\Lookup\CriteriaTypeTranslation::class);
    }
}
