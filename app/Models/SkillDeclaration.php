<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;
use App\Models\Reference;
use App\Models\WorkSample;
use App\Models\WorkExperience;

/**
 * Class SkillDeclaration
 *
 * @property int $id
 * @property int $skill_id
 * @property int $skill_status_id
 * @property int $skill_level_id
 * @property int $applicant_id
 * @property string $description
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Skill $skill
 * @property \App\Models\Lookup\SkillStatus $skill_status
 * @property \App\Models\Lookup\SkillLevel $skill_level
 * @property \App\Models\Applicant $applicant
 * @property \Illuminate\Database\Eloquent\Collection $references
 * @property \Illuminate\Database\Eloquent\Collection $work_samples
 */
class SkillDeclaration extends BaseModel {

    protected $casts = [
        'skill_id' => 'int',
        'skill_status_id' => 'int',
        'skill_level_id' => 'int',
        'applicant_id' => 'int',
        'description' => 'string'
    ];
    protected $fillable = [
        'description',
        'skill_level_id'
    ];

    public function skill() {
        return $this->belongsTo(\App\Models\Skill::class);
    }

    public function skill_status() {
        return $this->belongsTo(\App\Models\Lookup\SkillStatus::class);
    }

    public function skill_level() {
        return $this->belongsTo(\App\Models\Lookup\SkillLevel::class);
    }

    public function applicant() {
        return $this->belongsTo(\App\Models\Applicant::class);
    }

    public function references() {
        return $this->belongsToMany(\App\Models\Reference::class);
    }

    public function work_samples() {
        return $this->belongsToMany(\App\Models\WorkSample::class);
    }

    // public function getWorkExperiencesAttribute() {
    //     // Retrieve all work experiences belonging to the same applicant and skill
    //     // as this object
    //     $skill_id = $this->skill->id;
    //     return WorkExperience::where('applicant_id', $this->applcant_id)
    //         ->whereHas('skills', function($query) use ($skill_id){
    //             $query->where('skills.id', $skill_id);
    //         })->get();
    // }
    //
    // public function getReferencesAttribute() {
    //     // Retrieve all references belonging to the same applicant and skill
    //     // as this object
    //     $skill_id = $this->skill->id;
    //     return Reference::where('applicant_id', $this->applcant_id)
    //         ->whereHas('skills', function($query) use ($skill_id){
    //             $query->where('skills.id', $skill_id);
    //         })->get();
    //     // $skill_id = $this->skill->id;
    //     // return $this->hasManyThrough(\App\Models\Reference::class,\App\Models\Applicant::class)
    //     //     ->whereHas('skills', function($query) use ($skill_id){
    //     //         $query->where('skills.id', $skill_id);
    //     //     })->get();
    // }
    //
    // public function getWorkSamplesAttribute() {
    //     // Retrieve all work samples belonging to the same applicant and skill
    //     // as this object
    //     $skill_id = $this->skill->id;
    //     return WorkSample::where('applicant_id', $this->applcant_id)
    //         ->whereHas('skills', function($query) use ($skill_id){
    //             $query->where('skills.id', $skill_id);
    //         })->get();
    // }

}
