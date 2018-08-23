<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ApplicantProfileAnswer
 *
 * @property int $id
 * @property int $applicant_id
 * @property int $applicant_profile_question_id
 * @property string $answer
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\Applicant $applicant
 * @property \App\Models\Lookup\ApplicantProfileQuestion $applicant_profile_question
 */
class ApplicantProfileAnswer extends Eloquent
{

    protected $casts = [
        'applicant_id' => 'int',
        'applicant_profile_question_id' => 'int'
    ];
    protected $fillable = [
        'applicant_profile_question_id',
        'answer'
    ];
    protected $with = [
        'applicant_profile_question'
    ];

    public function applicant()
    {
        return $this->belongsTo(\App\Models\Applicant::class);
    }

    public function applicant_profile_question()
    {
        return $this->belongsTo(\App\Models\Lookup\ApplicantProfileQuestion::class);
    }
}
