<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

/**
 * Class MicroReference
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property int $relationship_id
 * @property \Jenssegers\Date\Date $observed_from_date
 * @property \Jenssegers\Date\Date $observed_until_date
 * @property int $experience_level_id
 * @property string $story
<<<<<<< HEAD
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
=======
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
>>>>>>> dev
 * @property \App\Models\Lookup\ExperienceLevel $experience_level
 * @property \App\Models\Lookup\Relationship $relationship
 * @property \Illuminate\Database\Eloquent\Collection $application_micro_references
 */
<<<<<<< HEAD
class MicroReference extends Eloquent
{
=======
class MicroReference extends BaseModel {
>>>>>>> dev

    protected $casts = [
        'relationship_id' => 'int',
        'experience_level_id' => 'int'
    ];
    protected $dates = [
        'observed_from_date',
        'observed_until_date'
    ];
    protected $fillable = [
        'name',
        'email',
        'relationship_id',
        'observed_from_date',
        'observed_until_date',
        'experience_level_id',
        'story'
    ];

    public function experience_level()
    {
        return $this->belongsTo(\App\Models\Lookup\ExperienceLevel::class);
    }

    public function relationship()
    {
        return $this->belongsTo(\App\Models\Lookup\Relationship::class);
    }

    public function application_micro_references()
    {
        return $this->hasMany(\App\Models\ApplicationMicroReference::class);
    }
}
