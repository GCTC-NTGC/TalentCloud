<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use App\Models\SkillDeclaration;

/**
 * Class Reference
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property int $relationship_id
 * @property int $applicant_id
 * @property string $description
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\Relationship $relationship
 * @property \App\Models\Applicant $applicant
 * @property \Illuminate\Database\Eloquent\Collection $projects
 * @property \Illuminate\Database\Eloquent\Collection $skill_declaractions
 */
class Reference extends BaseModel
{

    protected $casts = [
        'name' => 'string',
        'email' => 'string',
        'description' => 'string',
        'relationship_id' => 'int',
        'applicant_id' => 'int',
    ];
    protected $fillable = [
        'name',
        'email',
        'relationship_id',
        'description'
    ];

    public function relationship()
    {
        return $this->belongsTo(\App\Models\Lookup\Relationship::class);
    }

    public function applicant()
    {
        return $this->belongsTo(\App\Models\Applicant::class);
    }

    public function projects()
    {
        return $this->belongsToMany(\App\Models\Project::class);
    }

    public function skill_declarations()
    {
        return $this->belongsToMany(\App\Models\SkillDeclaration::class);
    }
}
