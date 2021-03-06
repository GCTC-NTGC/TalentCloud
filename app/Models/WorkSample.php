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
 * @property int $work_sampleable_id
 * @property string $work_sampleable_type
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\FileType $file_type
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 * @property \App\Models\Applicant|\App\Models\JobApplication $work_sampleable
 */
class WorkSample extends BaseModel
{

    protected $casts = [
        'name' => 'string',
        'file_type_id' => 'int',
        'date_created' => 'date',
        'url' => 'string',
        'description' => 'string',
    ];
    protected $fillable = [
        'name',
        'date_created',
        'file_type_id',
        'url',
        'description'
    ];

    public function file_type() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\FileType::class);
    }

    public function skill_declarations() // phpcs:ignore
    {
        return $this->belongsToMany(\App\Models\SkillDeclaration::class);
    }

    public function work_sampleable() // phpcs:ignore
    {
        return $this->morphTo();
    }
}
