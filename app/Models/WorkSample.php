<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class WorkSample
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $date_created
 * @property int $file_type_id
 * @property string $url
 * @property string $description
 * @property string $applicant_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\FileType $file_type
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 * @property \App\Models\Applicant $applicant
 */
class WorkSample extends BaseModel
{

    protected $casts = [
        'name' => 'string',
        'file_type_id' => 'int',
        'date_created' => 'date',
        'url' => 'string',
        'description' => 'string',
        'applicant_id' => 'int'
    ];
    protected $fillable = [
        'name',
        'date_created',
        'file_type_id',
        'url',
        'description'
    ];

    public function file_type()
    {
        return $this->belongsTo(\App\Models\Lookup\FileType::class);
    }

    public function skill_declarations()
    {
        return $this->belongsToMany(\App\Models\SkillDeclaration::class);
    }

    public function applicant()
    {
        return $this->belongsTo(\App\Models\Applicant::class);
    }
}
