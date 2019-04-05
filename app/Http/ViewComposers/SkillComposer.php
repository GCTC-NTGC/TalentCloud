<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\SkillLevel;

class SkillComposer
{
    /**
     * @var mixed $skillLevels
     */
    private $skillLevels;

    /**
     * Bind data to the view.
     *
     * @param View $view View being rendered.
     *
     * @return void
     */
    public function compose(View $view) : void
    {
        if (!$this->skillLevels) {
            $this->skillLevels = SkillLevel::all();
        }

        $view->with('skill_levels', $this->skillLevels);
        $view->with('skill_template', Lang::get('common/skills'));
    }
}
