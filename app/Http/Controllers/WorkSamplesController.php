<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\Applicant;
use App\Models\WorkSample;
use App\Services\Validation\Requests\UpdateWorkSampleValidator;

class WorkSamplesController extends Controller
{

    /**
     * Display the Work Samples associated with the applicant.
     *
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function show(Applicant $applicant)
    {
        //

    }

    /**
     * Show the form for editing the applicant's work samples
     *
     * @param  Request  $request
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Applicant $applicant)
    {
        return view('applicant/profile_05_portfolio', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_work_samples'),
        ]);
    }

    /**
     * Update the workSample in storage, or create new one.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\WorkSample|null  $workSample
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ?WorkSample $workSample = null)
    {
        $validator = new UpdateWorkSampleValidator();
        $validator->validate($request->input());

        if ($workSample === null) {
            $workSample = new WorkSample();
            $workSample->applicant_id = $request->user()->applicant->id;
        }
        $workSample->fill([
            'name' => $request->input('name'),
            'file_type_id' => $request->input('file_type_id'),
            'url' => $request->input('url'),
            'description' => $request->input('description'),
        ]);
        $workSample->save();

        //Attach relatives
        $skillIds = $this->getRelativeIds($request->input(), 'skills');
        $workSample->skill_declarations()->sync($skillIds);

        // if an ajax request, return the new object
        if ($request->ajax()) {
            $workSample->load('file_type');
            return $workSample->toJson();
        } else {
            return redirect()->back();
        }
    }

    /**
     * Delete the particular work sample from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\WorkSample  $workSample
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, WorkSample $workSample)
    {
        $this->authorize('delete', $workSample);

        $workSample->delete();

        if($request->ajax()) {
            return [
                "message" => 'Work sample deleted'
            ];
        }

        return redirect()->back();
    }

}
