<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class ApplicantProfileQuestion
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $applicant_profile_answers
 * @property \Illuminate\Database\Eloquent\Collection $applicant_profile_question_translations
 *
 * Localized Properties:
 * @property string $value
 * @property string $description
 */
class ApplicantProfileQuestion extends BaseModel {

    use \Dimsav\Translatable\Translatable;

    public $translatedAttributes = ['value', 'description'];
    protected $fillable = [];

    public function applicant_profile_answers() {
        return $this->hasMany(\App\Models\ApplicantProfileAnswer::class);
    }

    public function applicant_profile_question_translations() {
        return $this->hasMany(\App\Models\Lookup\ApplicantProfileQuestionTranslation::class);
    }

}
