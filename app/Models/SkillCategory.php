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
 * @property int|null $parent_id - Represents skill category's direct parent (used by Backpack as part of nested set model).
 * @property int $lft - Represents skill category's left boundary (used by Backpack as part of nested set model).
 * @property int $rgt - Represents skill category's right boundary (used by Backpack as part of nested set model).
 * @property int $depth - Represents skill category's nesting depth (used by Backpack as part of nested set model).
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
        'parent_category_id',
    ];

    /**
     * @var string[]
     */
    public $translatable = [
        'name',
    ];
}
