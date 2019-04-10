<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\DegreeType;

class DegreeComposer
{
    /**
     * @var mixed $degreeTypes
     */
    private $degreeTypes;

    /**
     * Bind data to the view.
     *
     * @param View $view View being rendered.
     *
     * @return void
     */
    public function compose(View $view) : void
    {
        if (!$this->degreeTypes) {
            $this->degreeTypes = DegreeType::all();
        }

        $view->with('degree_types', $this->degreeTypes);
        $view->with('degree_template', Lang::get('common/degree'));
    }
}
