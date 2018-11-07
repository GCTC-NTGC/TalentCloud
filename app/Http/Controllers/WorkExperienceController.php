<?php

namespace App\Http\Controllers;

use App\Models\WorkExperience;
use Illuminate\Http\Request;

class WorkExperienceController extends Controller
{
    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\WorkExperience  $workExperience
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, WorkExperience $workExperience)
    {
        $this->authorize('delete', $workExperience);
        $workExperience->delete();

        if ($request->ajax()) {
            return [
                'message' => "Work Experience delete",
            ];
        }

        return back();
    }
}
