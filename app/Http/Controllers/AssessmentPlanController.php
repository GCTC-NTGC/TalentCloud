<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Gate;
use App\Models\JobPoster;
use App\Models\Criteria;
use App\Models\Assessment;
use App\Models\RatingGuideQuestion;
use App\Models\RatingGuideAnswer;
use App\Models\Lookup\AssessmentType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

class AssessmentPlanController extends Controller
{
    /**
     * Return all the criteria, Assessments, Assessments,
     * RatingGuideQuestions, and RatingGuideAnswers associated with a job,
     * as an array.
     *
     * @param  \App\Models\JobPoster $jobPoster Job Poster to retrieve assessment plan for.
     * @return mixed[]
     */
    public function getForJob(JobPoster $jobPoster)
    {
        $criteria = Criteria::where('job_poster_id', $jobPoster->id)->get();
        $criteriaTranslated = [];
        foreach ($criteria as $criterion) {
            // TODO: getTranslationsArray probably makes DB calls every loop. Find a way to profile & optimize.
            $criteriaTranslated[] = array_merge($criterion->toArray(), $criterion->getTranslationsArray());
        }
        $criteriaIds = $criteria->pluck('id');
        $assessments = Assessment::whereIn('criterion_id', $criteriaIds)->get();
        // Check for newly created assessment plan, and initialize any empty criteria to have the
        // "Narrative Review" option set.
        $assessmentCriteriaIds = $assessments->pluck('criterion_id');
        $emptyAssessments = array_diff($criteriaIds->toArray(), $assessmentCriteriaIds->toArray());
        if (!empty($emptyAssessments)) {
            $narrativeReview = AssessmentType::where('key', 'narrative_assessment')->first();
            foreach ($emptyAssessments as $criterionId) {
                Assessment::create([
                    'criterion_id' => $criterionId,
                    'assessment_type_id' => $narrativeReview->id
                ]);
            }
            $assessments = Assessment::whereIn('criterion_id', $criteriaIds)->get();
        }
        $questions = RatingGuideQuestion::where('job_poster_id', $jobPoster->id)->get();
        $answers = RatingGuideAnswer::whereIn('rating_guide_question_id', $questions->pluck('id'))->get();
        return [
            'criteria' => $criteriaTranslated,
            'assessments' => $assessments->toArray(),
            'rating_guide_questions' => $questions->toArray(),
            'rating_guide_answers' => $answers->toArray()
        ];
    }

    public function show(JobPoster $jobPoster)
    {
        // Show demo notification if the user is a demoManager and is not an hr-advisor that has claimed the job.
        $display_demo_notification = Auth::user() !== null &&
                                  Auth::user()->isDemoManager() &&
                                  (!$jobPoster->hr_advisors->contains('user_id', Auth::user()->id) &&
                                  Auth::user()->isHrAdvisor());

        return view('manager/assessment_plan', [
            'title' => Lang::get('manager/assessment_plan.title'),
            'job_id' => $jobPoster->id,
            'display_demo_notification' => $display_demo_notification,
        ]);
    }
}


