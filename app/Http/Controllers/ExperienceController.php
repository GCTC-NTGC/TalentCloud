<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Degree;
use App\Models\Applicant;
use App\Models\Course;
use App\Models\WorkExperience;
use App\Http\Controllers\Controller;

class ExperienceController extends Controller
{
    /**
     * Show the form for editing the logged-in applicant's experience
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @return \Illuminate\Http\Response
     */
    public function editAuthenticated(Request $request)
    {
        $applicant = $request->user()->applicant;
        return redirect(route('profile.experience.edit', $applicant));
    }

    /**
     * Show the form for editing the applicant's experience
     *
     * @param  \Illuminate\Http\Request $request   Incoming request object.
     * @param  \App\Models\Applicant    $applicant Incoming applicant object.
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Applicant $applicant)
    {
        return view('applicant/profile_02_experience', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_experience'),
            'work_template' => Lang::get('common/work_experience'),
            'form_submit_action' => route('profile.experience.update', $applicant)
        ]);
    }

    /**
     * Update the applicant's profile in storage.
     *
     * @param  \Illuminate\Http\Request $request   Incoming Request.
     * @param  \App\Models\Applicant    $applicant Incoming Applicant.
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Applicant $applicant)
    {
        $input = $request->input();

        $degrees = $input['degrees'];

        $request->validate([
            'degrees.new.*.degree_type_id' => 'required',
            'degrees.new.*.area_of_study'  => 'required',
            'degrees.new.*.institution'    => 'required',
            'degrees.new.*.thesis'         => 'nullable',
            'degrees.new.*.start_date'     => 'required|date',
            'degrees.new.*.end_date'       => 'required|date',
            'degrees.new.*.blockcert_url'       => 'nullable|string',
        ]);

        // Delete old degrees that weren't resubmitted.
        // Note: this must be done before adding new degrees, so we don't delete
        // them right after adding them.
        foreach ($applicant->degrees as $oldDegree) {
            // Check if no degrees were resubmitted, or if this specific one wasn't.
            if (!isset($degrees['old']) ||
            !isset($degrees['old'][$oldDegree->id])) {
                $oldDegree->delete();
            }
        }

        // Save new degrees.
        if (isset($degrees['new'])) {
            foreach ($degrees['new'] as $degreeInput) {
                $degree = new Degree();
                $degree->applicant_id = $applicant->id;
                $degree->fill([
                    'degree_type_id' => $degreeInput['degree_type_id'],
                    'area_of_study' => $degreeInput['area_of_study'],
                    'institution' => $degreeInput['institution'],
                    'thesis' => $degreeInput['thesis'],
                    'start_date' => $degreeInput['start_date'],
                    'end_date' => $degreeInput['end_date'],
                    'blockcert_url' => $degreeInput['blockcert_url'],
                ]);
                $degree->save();
            }
        }

        // Update old degrees.
        if (isset($degrees['old'])) {
            foreach ($degrees['old'] as $id => $degreeInput) {
                // Ensure this degree belongs to this applicant.
                $degree = $applicant->degrees->firstWhere('id', $id);
                if ($degree != null) {
                    $degree->fill([
                        'degree_type_id' => $degreeInput['degree_type_id'],
                        'area_of_study' => $degreeInput['area_of_study'],
                        'institution' => $degreeInput['institution'],
                        'thesis' => $degreeInput['thesis'],
                        'start_date' => $degreeInput['start_date'],
                        'end_date' => $degreeInput['end_date'],
                        'blockcert_url' => $degreeInput['blockcert_url'],
                    ]);
                    $degree->save();
                } else {
                    Log::warning("applicant $applicant->id attempted to update degree with invalid id: $id");
                }
            }
        }

        $courses = $input['courses'];

        $request->validate([
            'courses.new.*.name'             => 'required',
            'courses.new.*.institution'      => 'required',
            'courses.new.*.course_status_id' => 'required',
            'courses.new.*.start_date'       => 'required|date',
            'courses.new.*.end_date'         => 'required|date',
        ]);

        // Delete old courses that weren't resubmitted.
        // Note: this must be done before adding new ones, so we don't delete
        // them right after adding them.
        foreach ($applicant->courses as $oldCourse) {
            // Check if no courses were resubmitted, or if this specific one wasn't.
            if (!isset($courses['old']) ||
            !isset($courses['old'][$oldCourse->id])) {
                $oldCourse->delete();
            }
        }

        // Save new courses.
        if (isset($courses['new'])) {
            foreach ($courses['new'] as $courseInput) {
                $course = new Course();
                $course->applicant_id = $applicant->id;
                $course->fill([
                    'name' => $courseInput['name'],
                    'institution' => $courseInput['institution'],
                    'course_status_id' => $courseInput['course_status_id'],
                    'start_date' => $courseInput['start_date'],
                    'end_date' => $courseInput['end_date']
                ]);
                $course->save();
            }
        }

        // Update old courses.
        if (isset($courses['old'])) {
            foreach ($courses['old'] as $id => $courseInput) {
                // Ensure this course belongs to this applicant.
                $course = $applicant->courses->firstWhere('id', $id);
                if ($course != null) {
                    $course->fill([
                        'name' => $courseInput['name'],
                        'institution' => $courseInput['institution'],
                        'course_status_id' => $courseInput['course_status_id'],
                        'start_date' => $courseInput['start_date'],
                        'end_date' => $courseInput['end_date']
                    ]);
                    $course->save();
                } else {
                    Log::warning("applicant $applicant->id attempted to update course with invalid id: $id");
                }
            }
        }

        $work_experiences = $input['work_experiences'];

        $request->validate([
            'work_experiences.new.*.role'        => 'required',
            'work_experiences.new.*.company'     => 'required',
            'work_experiences.new.*.description' => 'required',
            'work_experiences.new.*.start_date'  => 'required|date',
            'work_experiences.new.*.end_date'    => 'required|date',
        ]);

        // Delete old work_experiences that weren't resubmitted.
        // Note: this must be done before adding new ones, so we don't delete
        // them right after adding them.
        foreach ($applicant->work_experiences as $oldWorkExperience) {
            // Check if no work_experiences were resubmitted, or if this specific one wasn't.
            if (!isset($work_experiences['old']) ||
            !isset($work_experiences['old'][$oldWorkExperience->id])) {
                $oldWorkExperience->delete();
            }
        }

        // Save new work_experiences.
        if (isset($work_experiences['new'])) {
            foreach ($work_experiences['new'] as $workExperienceInput) {
                $workExperience = new WorkExperience();
                $workExperience->applicant_id = $applicant->id;
                $workExperience->fill([
                    'role' => $workExperienceInput['role'],
                    'company' => $workExperienceInput['company'],
                    'description' => $workExperienceInput['description'],
                    'start_date' => $workExperienceInput['start_date'],
                    'end_date' => $workExperienceInput['end_date']
                ]);
                $workExperience->save();
            }
        }

        // Update old work_experiences.
        if (isset($work_experiences['old'])) {
            foreach ($work_experiences['old'] as $id => $workExperienceInput) {
                // Ensure this work_experience belongs to this applicant.
                $workExperience = $applicant->work_experiences->firstWhere('id', $id);
                if ($workExperience != null) {
                    $workExperience->fill([
                        'role' => $workExperienceInput['role'],
                        'company' => $workExperienceInput['company'],
                        'description' => $workExperienceInput['description'],
                        'start_date' => $workExperienceInput['start_date'],
                        'end_date' => $workExperienceInput['end_date']
                    ]);
                    $workExperience->save();
                } else {
                    Log::warning("applicant $applicant->id attempted to update work_experience with invalid id: $id");
                }
            }
        }

        return redirect(route('profile.experience.edit', $applicant));
    }
}
