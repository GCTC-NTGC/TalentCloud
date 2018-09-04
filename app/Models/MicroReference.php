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
 * @property string $description
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\Relationship $relationship
 * @property \Illuminate\Database\Eloquent\Collection $projects
 * @property \Illuminate\Database\Eloquent\Collection $application_micro_references
 */
class MicroReference extends BaseModel {

    protected $casts = [
        'relationship_id' => 'int',
        'experience_level_id' => 'int'
    ];
    protected $fillable = [
        'name',
        'email',
        'relationship_id',
        'description'
    ];

    public function relationship() {
        return $this->belongsTo(\App\Models\Lookup\Relationship::class);
    }

    public function projects() {
        return $this->belongsToMany(\App\Models\Project::class);
    }
    
    public function application_micro_references() {
        return $this->hasMany(\App\Models\ApplicationMicroReference::class);
    }

}
