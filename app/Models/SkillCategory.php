<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Backpack\CRUD\app\Models\Traits\SpatieTranslatable\HasTranslations;

/**
 * Class SkillCategory
 *
 * @property int $id
 * @property string $key
 * @property string $name
 * @property int|null $parent_id
 * @property int $lft
 * @property int $rgt
 * @property int $depth
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 */
class SkillCategory extends BaseModel
{
    use CrudTrait;
    use HasTranslations;

    /**
     * @var string[]
     */
    protected $fillable = [
        'key',
        'name',
        'parent_id',
    ];

    /**
     * @var string[]
     */
    public $translatable = [
        'name',
    ];

    public function skills() // phpcs:ignore
    {
        return $this->belongsToMany(\App\Models\Skill::class, 'skill_categories_skills');
    }
}
