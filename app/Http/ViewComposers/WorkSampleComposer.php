<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\FileType;

class WorkSampleComposer
{
    /**
     * @var mixed $fileTypes
     */
    private $fileTypes;

    /**
     * Bind data to the view.
     *
     * @param View $view View being rendered.
     *
     * @return void
     */
    public function compose(View $view) : void
    {
        if (!$this->fileTypes) {
            $this->fileTypes = FileType::all();
        }

        $view->with('file_types', $this->fileTypes);
        $view->with('sample_template', Lang::get('common/work_samples'));
    }
}
