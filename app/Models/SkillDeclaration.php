<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

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
 * @property \Illuminate\Database\Eloquent\Collection $work_experiences
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
        'skill_level_id',
        'description',
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

    public function work_experiences() {
        $skill_id = $this->skill->id;
        return $this->applicant->work_experiences->filter(
            function($work_experience) use ($skill_id) {
                //Returns true if $work_experience is connected to a skill
                // that matches this skill declaration
                return $work_experience->skills->where(id, $skill_id) != null;
        });
    }

    public function references() {
        // Retrieve all references belonging to the same applicant and skill
        // as this object
        $skill_id = $this->skill->id;
        return Reference::where('applicant_id', $this->applcant_id)
            ->whereHas('skills', function($query) use ($skill_id){
                $query->where('id', $skill_id);
            })->get();
    }

    public function work_samples() {
        // Retrieve all work samples belonging to the same applicant and skill
        // as this object
        $skill_id = $this->skill->id;
        return WorkSample::where('applicant_id', $this->applcant_id)
            ->whereHas('skills', function($query) use ($skill_id){
                $query->where('id', $skill_id);
            })->get();
    }

}
