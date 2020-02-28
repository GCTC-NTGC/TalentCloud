<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Backpack\CRUD\app\Models\Traits\SpatieTranslatable\HasTranslations;

/**
 * Class Skill
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int $skill_type_id
 * @property boolean $is_culture_skill
 * @property boolean $is_future_skill
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\SkillType $skill_type
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 * @property \Illuminate\Database\Eloquent\Collection $classifications
 * @property \App\Models\ExperienceAward|\App\Models\ExperienceCommunity|\App\Models\ExperienceEducation|\App\Models\ExperiencePersonal|\App\Models\ExperienceWork $experience
 * @property \Illuminate\Database\Eloquent\Collection $experiences_work
 * @property \Illuminate\Database\Eloquent\Collection $experiences_personal
 * @property \Illuminate\Database\Eloquent\Collection $experiences_education
 * @property \Illuminate\Database\Eloquent\Collection $experiences_award
 * @property \Illuminate\Database\Eloquent\Collection $experiences_community
 */
class Skill extends BaseModel
{
    use CrudTrait;
    use HasTranslations;

    protected $casts = [
        'skill_type_id' => 'int',
        'is_culture_skill' => 'boolean',
        'is_future_skill' => 'boolean',
    ];

    protected $fillable = [
        'name',
        'description',
        'skill_type_id',
        'is_culture_skill',
        'is_future_skill',
        'classifications'
    ];

    public $translatable = [
        'name',
        'description',
    ];

    public function skill_type() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\SkillType::class);
    }

    public function skill_declarations() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\SkillDeclaration::class);
    }

    public function classifications() // phpcs:ignore
    {
        return $this->belongsToMany(\App\Models\Classification::class)->withTimestamps();
    }

    // Version 2 application models.

    public function experiences_work() // phpcs:ignore
    {
        return $this->morphedByMany(\App\Models\ExperienceWork::class, 'experience', 'experience_skills');
    }

    public function experiences_personal() // phpcs:ignore
    {
        return $this->morphedByMany(\App\Models\ExperiencePersonal::class, 'experience', 'experience_skills');
    }

    public function experiences_education() // phpcs:ignore
    {
        return $this->morphedByMany(\App\Models\ExperienceEducation::class, 'experience', 'experience_skills');
    }

    public function experiences_award() // phpcs:ignore
    {
        return $this->morphedByMany(\App\Models\ExperienceAward::class, 'experience', 'experience_skills');
    }

    public function experiences_community() // phpcs:ignore
    {
        return $this->morphedByMany(\App\Models\ExperienceCommunity::class, 'experience', 'experience_skills');
    }

    /**
     * Check for a null "is_culture_skill" and pass false instead.
     *
     * @param mixed $value Incoming value for the "is_culture_skill" attribute.
     *
     * @return void
     */
    public function setIsCultureSkillAttribute($value): void
    {
        if ($value === null) {
            $value = false;
        }
        $this->attributes['is_culture_skill'] = $value;
    }

    /**
     * Check for a null "is_future_skill" and pass false instead.
     *
     * @param mixed $value Incoming value for the "is_future_skill" attribute.
     *
     * @return void
     */
    public function setIsFutureSkillAttribute($value): void
    {
        if ($value === null) {
            $value = false;
        }
        $this->attributes['is_future_skill'] = $value;
    }
}
