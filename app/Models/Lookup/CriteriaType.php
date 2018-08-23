<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class CriteriaType
 *
 * @property int $id
 * @property string $name
<<<<<<< HEAD
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
=======
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
>>>>>>> dev
 * @property \Illuminate\Database\Eloquent\Collection $criteria
 * @property \Illuminate\Database\Eloquent\Collection $criteria_translations
 *
 * Localized properties
 * @property string $value
 * @property string $description
 */
<<<<<<< HEAD
class CriteriaType extends Eloquent
{
=======
class CriteriaType extends BaseModel {
>>>>>>> dev

    use \Dimsav\Translatable\Translatable;

    public $translatedAttributes = ['value', 'description'];
    protected $fillable = [];

    public function criteria()
    {
        return $this->hasMany(\App\Models\Criteria::class);
    }

    public function criteria_type_translations()
    {
        return $this->hasMany(\App\Models\CriteriaTypeTranslation::class);
    }
}
