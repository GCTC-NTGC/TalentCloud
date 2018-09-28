<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\SkillLevel;

class SkillComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('skill_levels', SkillLevel::all());
        $view->with('skill_template', Lang::get('common/skills'));
    }
}
