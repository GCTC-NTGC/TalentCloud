<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\Relationship;

class ReferenceComposer
{
    /**
     * @var mixed $relationships
     */
    private $relationships;

    /**
     * Bind data to the view.
     *
     * @param View $view View being rendered.
     *
     * @return void
     */
    public function compose(View $view) : void
    {
        if (!$this->relationships) {
            $this->relationships = Relationship::all();
        }

        $view->with('relationships', $this->relationships);
        $view->with('reference_template', Lang::get('common/references'));
    }
}
