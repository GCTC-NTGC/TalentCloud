<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class CitizenshipDeclaration
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $citizenship_declaration_translations
 * @property \Illuminate\Database\Eloquent\Collection $job_applications
 *
 * Localized Properties:
 * @property string $value
 */
class CitizenshipDeclaration extends BaseModel {

    use \Dimsav\Translatable\Translatable;

    public $translatedAttributes = ['value'];
    protected $fillable = [];

    public function citizenship_declaration_translations() {
        return $this->hasMany(\App\Models\Lookup\CitizenshipDeclarationTranslation::class);
    }

    public function job_applications() {
        return $this->hasMany(\App\Models\JobApplication::class);
    }

}
