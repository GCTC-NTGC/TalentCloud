<?php

namespace App\Models\Lookup;

use Illuminate\Database\Eloquent\Model;
use App\Models\Assessment;

/**
 * Class AssessmentType
 * Database columns:
 * @property int $id
 * @property string $key
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * Relations:
 * @property Collection[Assessment] $assessments
 * Accessors:
 * @property string $name   The localized name for this type.
 */
class AssessmentType extends Model
{
    /**
     * The columns that can be filled with mass-assignment
     *
     * @var string[]
     */
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

    /**
     * Get the localized name of this Type
     *
     * @return string
     */
    public function getNameAttribute(): string
    {
        return $this->key; //TODO: actually return a localized name
    }
}
