<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobPoster;
use Illuminate\Support\Facades\Lang;
use Illuminate\View\View;
use App\Models\Skill;
use App\Models\Lookup\SkillLevel;
use App\Models\Lookup\AssessmentType;
use App\Models\ScreeningPlan;
use App\Models\Assessment;

class ScreeningPlanController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @param JobPoster $jobPoster The job to create a screening plan for.
     *
     * @return View|\Illuminate\Contracts\View\Factory
     */
    public function createForJob(JobPoster $jobPoster)
    {
        $jobPoster->load('criteria');
        $skills = Skill::all();

        $assessment_plans = [];
        foreach ($jobPoster->screening_plans as $plan) {
            $assessment_plan = [];
            foreach (AssessmentType::all() as $type) {
                $plan_type_assessments = $plan->assessments->where('assessment_type_id', $type->id);
                if (!$plan_type_assessments->isEmpty()) {
                    $assessment_plan[$type->name] = [];
                    foreach ($plan_type_assessments as $assessment) {
                        $assessment_plan[$type->name][] = $assessment->criterion->skill->name;
                    }
                }
            }
            $assessment_plans[$plan->id] = $assessment_plan;
        }

        return view(
            'manager/screening-plan',
            [
                'screening_l10n' => Lang::get('manager/screening-plan'),
                'job' => $jobPoster,
                'skill_template' => Lang::get('common/skills'),
                'assessment_types' => AssessmentType::all(),
                'assessment_plans' => $assessment_plans,
            ]
        );
    }

    /**
     * Save the screening plan.
     *
     * @param Request   $request   The incoming request object.
     * @param JobPoster $jobPoster The job to create a screen plan for.
     *
     * @return \Illuminate\Routing\Redirector|Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, JobPoster $jobPoster)
    {
        //TODO: Validate every job criteria is represented
        //TODO: Validate every job criteria has at least one assessment (?)
        //TODO: Validate every assessment is correct and complete

        $plan = new ScreeningPlan();
        $plan->job_poster_id = $jobPoster->id;
        $plan->version = ScreeningPlan::max('version') + 1;
        $plan->save();

        if ($request->input('criteria')) {
            foreach ($request->input('criteria') as $criteriaId => $assessments) {
                foreach ($assessments['assessment'] as $assessmentData) {
                    $assessment = new Assessment();
                    $assessment->screening_plan_id = $plan->id;
                    $assessment->criterion_id = $criteriaId;
                    $assessment->assessment_type_id = $assessmentData['assessment_type'];
                    $assessment->save();
                }
            }
        }

        return redirect(route('manager.jobs.screening_plan', $jobPoster));
    }

    /**
     * Delete the particular skill declaration in storage.
     *
     * @param \Illuminate\Http\Request  $request       The request object.
     * @param \App\Models\ScreeningPlan $screeningPlan The screening plan to delete.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, ScreeningPlan $screeningPlan) // phpcs:ignore
    {
        $this->authorize('delete', $screeningPlan);
        $screeningPlan->delete();

        if ($request->ajax()) {
            $content = ['message' => 'Screening Plan deleted'];
            return $this->formatAjaxResponse($content);
        }

        return redirect()->back();
    }
}
