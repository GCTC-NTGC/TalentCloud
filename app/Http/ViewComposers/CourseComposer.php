<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\CourseStatus;

class CourseComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('course_status', CourseStatus::all());
        $view->with('course_template', Lang::get('common/course'));
    }
}
