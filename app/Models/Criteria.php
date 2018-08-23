<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Criteria
 *
 * @property int $id
 * @property int $criteria_type_id
 * @property int $job_poster_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\CriteriaType $criteria_type
 * @property \App\Models\JobPoster $job_poster
 * @property \Illuminate\Database\Eloquent\Collection $application_micro_references
 * @property \Illuminate\Database\Eloquent\Collection $application_work_samples
 * @property \Illuminate\Database\Eloquent\Collection $criteria_translations
 * @property \Illuminate\Database\Eloquent\Collection $skill_declarations
 *
 * Localized properties
 * @property string $name
 * @property string $description
 */
class Criteria extends Eloquent
{

    use \Dimsav\Translatable\Translatable;

    protected $table = 'criteria';
    public $translatedAttributes = ['name', 'description'];
    protected $casts = [
        'criteria_type_id' => 'int',
        'job_poster_id' => 'int'
    ];
    protected $fillable = [
        'criteria_type_id',
        'job_poster_id'
    ];

    public function criteria_type()
    {
        return $this->belongsTo(\App\Models\CriteriaType::class);
    }

    public function job_poster()
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    public function application_micro_references()
    {
        return $this->hasMany(\App\Models\ApplicationMicroReference::class, 'criteria_id');
    }

    public function application_work_samples()
    {
        return $this->hasMany(\App\Models\ApplicationWorkSample::class, 'criteria_id');
    }

    public function criteria_translations()
    {
        return $this->hasMany(\App\Models\CriteriaTranslation::class, 'criteria_id');
    }

    public function skill_declarations()
    {
        return $this->hasMany(\App\Models\SkillDeclaration::class, 'criteria_id');
    }
}
