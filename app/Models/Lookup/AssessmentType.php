<?php

namespace App\Models\Lookup;

use App\Models\Assessment;
use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class AssessmentType
 *
 * @property int $id
 * @property string $key
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $assessments
 */
class AssessmentType extends BaseModel
{
    use HasTranslations;

    public $translatable = ['value'];
    protected $fillable = [];

    /**
     * Get the collection of Assessments of this type.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function assessments() // phpcs:ignore
    {
        return $this->hasMany(Assessment::class);
    }
}
