<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\CourseStatus;

class CourseComposer
{
    /**
     * @var mixed $courseStatuses
     */
    private $courseStatuses;

    /**
     * Bind data to the view.
     *
     * @param View $view View being rendered.
     *
     * @return void
     */
    public function compose(View $view) : void
    {
        if (!$this->courseStatuses) {
            $this->courseStatuses = CourseStatus::all();
        }

        $view->with('course_status', $this->courseStatuses);
        $view->with('course_template', Lang::get('common/course'));
    }
}
