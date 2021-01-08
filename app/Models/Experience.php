<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Models\ExperienceAward;
use App\Models\ExperienceCommunity;
use App\Models\ExperienceEducation;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceSkill;
use App\Models\ExperienceWork;

class Experience extends BaseModel
{
    public function getExperienceInstance(string $experience_type, int $experience_id)
    {
        $experience = null;
        switch ($experience_type) {
            case 'experience_work':
                $experience = ExperienceWork::find($experience_id);
                break;
            case 'experience_award':
                $experience = ExperienceAward::find($experience_id);
                break;
            case 'experience_community':
                $experience = ExperienceCommunity::find($experience_id);
                break;
            case 'experience_education':
                $experience = ExperienceEducation::find($experience_id);
                break;
            case 'experience_personal':
                $experience = ExperiencePersonal::find($experience_id);
                break;
        }
        return $experience;
    }
    public function getApplicantInstance(object $experience)
    {
        $applicant = null;
        switch ($experience->experienceable_type) {
            case 'applicant':
                $applicant = $experience->experienceable;
                break;
            case 'application':
                $applicant = $experience->experienceable->applicant;
                break;
        }
        return $applicant;
    }
}
