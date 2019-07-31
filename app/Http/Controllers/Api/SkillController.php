<?php

namespace App\Http\Controllers\Api;

use App\Models\Skill;
use App\Http\Controllers\Controller;

class SkillController extends Controller
{
    /**
     * Return all skills as an array
     *
     * @return mixed
     */
    public function index()
    {
        $skills = Skill::with('classifications')->get();
        $skillsArray = [];
        // TODO: improve effiency of getting translations.
        foreach ($skills as $skill) {
            $translations = [
                'en' => [
                    'name' => $skill->getTranslation('name', 'en'),
                    'description' => $skill->getTranslation('description', 'en'),
                ],
                'fr' => [
                    'name' => $skill->getTranslation('name', 'fr'),
                    'description' => $skill->getTranslation('description', 'fr'),
                ]
            ];
            $skillsArray[] = array_merge($skill->toArray(), $translations);
        }
        return ['skills' => $skillsArray];
    }
}
