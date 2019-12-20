<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class SecurityClearanceTranslation
 *
 * @property int $id
 * @property string $locale
 * @property int $security_clearance_id
 * @property string $value
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\SecurityClearance $security_clearance
 */
class SecurityClearanceTranslation extends BaseModel
{

    protected $casts = [
        'security_clearance_id' => 'int'
    ];
    protected $fillable = [];

    public function security_clearance()
    {
        return $this->belongsTo(\App\Models\Lookup\SecurityClearance::class);
    }
}
