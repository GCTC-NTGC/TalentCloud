<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class JobTermTranslation
 * 
 * @property int $id
 * @property int $job_term_id
 * @property string $value
 * @property string $locale
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
 * @property \App\Models\Lookup\JobTerm $job_term
 */
class JobTermTranslation extends BaseModel{

    protected $casts = [
        'job_term_id' => 'int'
    ];
    protected $fillable = [];

    public function job_term() {
        return $this->belongsTo(\App\Models\Lookup\JobTerm::class);
    }

}
