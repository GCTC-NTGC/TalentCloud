<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Illuminate\Support\Facades\Lang;
use \Backpack\CRUD\CrudTrait;
use Backpack\CRUD\ModelTraits\SpatieTranslatable\HasTranslations;

/**
 * Class Skill
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int $skill_type_id
 *
 * @property \App\Models\Lookup\SkillType $skill_type
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 */
class Skill extends BaseModel
{
    use CrudTrait;
    use HasTranslations;

    /**
     * @var $casts string[]
     * */
    protected $casts = [
        'skill_type_id' => 'int'
    ];
    /**
     * @var $fillable string[]
     * */
    protected $fillable = [
        'name',
        'description',
        'skill_type_id'
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
}
