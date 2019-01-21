<?php

namespace App\Models\Lookup;

use App\Models\Assessment;
use App\Models\BaseModel;

/**
 * Class AssessmentType
 * Database columns:
 * @property int $id
 * @property string $key
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * Relations:
 * @property Collection[Assessment] $assessments
 * @property Collection[AssessmentTypeTranslation] $assessment_type_translations
 * Localized Properties:
 * @property string $name
 */
class AssessmentType extends BaseModel
{
    use \Dimsav\Translatable\Translatable;

    /**
     * The columns that can be filled with mass-assignment
     *
     * @var string[]
     */
    protected $fillable = [];

    public $translatedAttributes = ['name'];

    /**
     * Get the collection of Assessments of this type.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function assessments() // phpcs:ignore
    {
        return $this->hasMany(Assessment::class);
    }

    public function assessment_type_translations()
    {
        return $this->hasMany(App\Models\Lookup\AssessmentTypeTranslation::class);
    }
}
