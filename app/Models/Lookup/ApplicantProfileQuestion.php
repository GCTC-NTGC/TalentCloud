<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Illuminate\Support\Facades\Lang;

/**
 * Class ApplicantProfileQuestion
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $applicant_profile_answers
 *
 * Accessors:
 * @property string $question
 * @property string $description
 */
class ApplicantProfileQuestion extends BaseModel{

    protected $fillable = [];

    public function applicant_profile_answers() {
        return $this->hasMany(\App\Models\ApplicantProfileAnswer::class);
    }

    // Accessors

    public function getQuestionAttribute() {
        return Lang::get('common/lookup/applicant_profile_questions')[$this->name]['question'];
    }

    public function getDescriptionAttribute() {
        return Lang::get('common/lookup/applicant_profile_questions')[$this->name]['description'];
    }

}
