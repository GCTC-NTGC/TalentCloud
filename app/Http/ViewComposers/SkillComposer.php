<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use App\Models\Skill;
use App\Models\Lookup\SkillLevel;

class SkillComposer
{
    /**
     * @var mixed $skillLevels
     */
    private $skillLevels;

    /**
     * @var mixed $skills
     */
    private $skills;

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

        if (!$this->skills) {
            $this->skills = Skill::all();
        }

        $view->with('skills', $this->skills);
        $view->with('skill_levels', $this->skillLevels);
        $view->with('skill_template', Lang::get('common/skills'));
        $view->with('skills_modal', Lang::get('common/skills_modals'));
    }
}
