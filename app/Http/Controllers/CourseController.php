<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @param  \App\Models\Course       $course  Incoming Course.
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Course $course)
    {
        $this->authorize('delete', $course);
        $course->delete();

        if ($request->ajax()) {
            return [
                'message' => 'Course delete',
            ];
        }

        return back();
    }
}
