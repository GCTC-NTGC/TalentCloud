<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\FileType;

class WorkSampleComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('file_types', FileType::all());
        $view->with('sample_template', Lang::get('common/work_samples'));
    }
}
