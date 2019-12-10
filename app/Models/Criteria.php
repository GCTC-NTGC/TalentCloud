<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Support\Facades\Lang;
use Spatie\Translatable\HasTranslations;

/**
 * Class Criteria
 *
 * @property int $id
 * @property int $criteria_type_id
 * @property int $job_poster_id
 * @property int $skill_id
 * @property int $skill_level_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\CriteriaType $criteria_type
 * @property \App\Models\JobPoster $job_poster
 * @property \App\Models\Skill $skill
 * @property \App\Models\Lookup\SkillLevel $skill_level
 * @property \Illuminate\Database\Eloquent\Collection[Assessment] $assessments
 *
 *  Accessors
 * @property string $level_name The localized name of the skill level (accounts for skill type).
 * @property string $level_description The localized description of the skill level (accounts for skill type).
 *
 *  Localized Properties:
  * @property string $description
  * @property string $specificity
 */
class Criteria extends BaseModel
{

    use HasTranslations;

    public $translatable = [
        'description',
        'specificity'
    ];

    protected $table = 'criteria';

    protected $casts = [
        'criteria_type_id' => 'int',
        'job_poster_id' => 'int',
        'skill_id' => 'int',
        'skill_level_id' => 'int',
    ];
    protected $fillable = [
        'skill_id',
        'criteria_type_id',
        'skill_level_id',
        'description',
        'specificity'
    ];
    protected $with = [
        'criteria_type',
        'skill',
        'skill_level'
    ];

    public function criteria_type() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\CriteriaType::class);
    }

    public function job_poster() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    public function skill()
    {
        return $this->belongsTo(\App\Models\Skill::class);
    }

    public function skill_level() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\SkillLevel::class);
    }

    /**
     * Get all assessments for this Criteria, for all Screening Plans.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function assessments() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\Assessment::class, 'criterion_id');
    }

    /**
     * Get the translated name of this Criteria's required skill level.
     *
     * @return string
     */
    public function getLevelNameAttribute(): string
    {
        $level = $this->skill_level->name;
        $type = $this->skill->skill_type->name;
        return Lang::get("common/lookup/skill_level.$level.$type.name");
    }

    /**
     * Get the translated description of this Criteria's required skill level.
     *
     * @return string
     */
    public function getLevelDescriptionAttribute() : string
    {
        $level = $this->skill_level->name;
        $type = $this->skill->skill_type->name;
        return Lang::get("common/lookup/skill_level.$level.$type.description");
    }
}
