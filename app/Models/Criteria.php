<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use App\Models\Lookup\CriteriaTypeTranslation;
use Illuminate\Support\Facades\Lang;

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
 * @property \Illuminate\Database\Eloquent\Collection $criteria_translations
 * @property \Illuminate\Database\Eloquent\Collection[Assessment] $assessments
 *
 *  Accessors
 * @property string $level_name The localized name of the skill level (accounts for skill type).
 * @property string $level_description The localized description of the skill level (accounts for skill type).
 *
 *  Localized Properties:
  * @property string $description
 */
class Criteria extends BaseModel {

    use \Dimsav\Translatable\Translatable;
    public $translatedAttributes = ['description'];

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
    ];
    protected $with = [
        'criteria_type',
        'skill',
        'skill_level'
    ];

    public function criteria_type() {
        return $this->belongsTo(\App\Models\Lookup\CriteriaType::class);
    }

    public function job_poster() {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    public function skill() {
        return $this->belongsTo(\App\Models\Skill::class);
    }

    public function skill_level() {
        return $this->belongsTo(\App\Models\Lookup\SkillLevel::class);
    }

    public function criteria_translations() {
        return $this->hasMany(\App\Models\Lookup\CriteriaTypeTranslation::class);
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
