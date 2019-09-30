<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

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
 */
class Skill extends BaseModel
{
    use CrudTrait;
    use HasTranslations;

    /**
     * @var $casts string[]
     * */
    protected $casts = [
        'skill_type_id' => 'int',
        'is_culture_skill' => 'boolean',
        'is_future_skill' => 'boolean',
    ];
    /**
     * @var $fillable string[]
     * */
    protected $fillable = [
        'name',
        'description',
        'skill_type_id',
        'is_culture_skill',
        'is_future_skill',
        'classifications'
    ];
    /**
     * @var $translatable string[]
     * */
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

    /**
     * Check for a null "is_culture_skill" and pass false instead.
     *
     * @param mixed $value Incoming value for the "is_culture_skill" attribute.
     *
     * @return void
     */
    public function setIsCultureSkillAttribute($value) : void
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
    public function setIsFutureSkillAttribute($value) : void
    {
        if ($value === null) {
            $value = false;
        }
        $this->attributes['is_future_skill'] = $value;
    }

    /**
     * Override the toArray() method to return the localized properties for
     * name and description. This was causing issues for ajax responses.
     *
     * @return mixed[]
     */
    public function toArray() : array
    {
        $array = parent::toArray();
        $array['name'] = $this->name;
        $array['description'] = $this->description;
        return $array;
    }
}
