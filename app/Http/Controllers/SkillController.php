<?php

namespace App\Http\Controllers;

use App\Models\Skill;

class SkillController extends Controller
{
    /**
     * Return all skills as an array
     *
     * @return mixed
     */
    public function index()
    {
        $skills = Skill::all();
        $skillsArray = [];
        // TODO: improve effiency of getting translations.
        foreach ($skills as $skill) {
            $translations = [
                'en' => [
                    'name' => $skill->getTranslation('name', 'en'),
                    'description' => $skill->getTranslation('description', 'en'),
                ],
                'fr' => [
                    'name' => $skill->getTranslation('name', 'en'),
                    'description' => $skill->getTranslation('description', 'en'),
                ]
            ];
            $skillsArray[] = array_merge($skill->toArray(), $translations);
        }
        return ['skills' => $skillsArray];
    }
}
