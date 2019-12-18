<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class CitizenshipDeclarationTranslation
 * 
 * @property int $id
 * @property int $citizenship_declaration_id
 * @property string $locale
 * @property string $value
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
 * @property \App\Models\Lookup\CitizenshipDeclaration $citizenship_declaration
 */
class CitizenshipDeclarationTranslation extends BaseModel{

    protected $casts = [
        'citizenship_declaration_id' => 'int'
    ];
    protected $fillable = [];

    public function citizenship_declaration() {
        return $this->belongsTo(\App\Models\Lookup\CitizenshipDeclaration::class);
    }

}
