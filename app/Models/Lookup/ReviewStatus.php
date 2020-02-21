<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Illuminate\Support\Facades\Lang;

/**
 * Class ReviewStatus
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * Acessors:
 * @property string $translation
 */
class ReviewStatus extends BaseModel
{

    protected $fillable = [];

    public function getTranslationAttribute()
    {
        return Lang::get('common/lookup/review_status')[$this->name];
    }
}
