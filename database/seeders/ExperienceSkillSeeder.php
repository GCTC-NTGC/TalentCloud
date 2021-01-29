<?php

namespace Database\Seeders;

use App\Models\Skill;
use App\Models\ExperienceWork;
use App\Models\ExperienceAward;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceCommunity;
use App\Models\ExperienceEducation;
use Illuminate\Database\Seeder;

class ExperienceSkillSeeder extends Seeder // phpcs:ignore
{
    /**
     * Run the Experience Skills seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(ExperienceWork::class, 8)->create();
        factory(ExperienceAward::class, 5)->create();
        factory(ExperiencePersonal::class, 6)->create();
        factory(ExperienceEducation::class, 7)->create();
        factory(ExperienceCommunity::class, 4)->create();

        $skills = Skill::all();

        foreach ($skills as $skill) {
            $skill->experiences_work()
                ->attach(ExperienceWork::inRandomOrder()->first(), [
                    'justification' => 'Because I had some job.'
                ]);
            $skill->experiences_personal()
                ->attach(ExperiencePersonal::inRandomOrder()->first(), [
                    'justification' => 'Because I did this thing.'
                ]);
            $skill->experiences_education()
                ->attach(ExperienceEducation::inRandomOrder()->first(), [
                    'justification' => 'Because a piece of paper has my name on it.'
                ]);
            $skill->experiences_award()
                ->attach(ExperienceAward::inRandomOrder()->first(), [
                    'justification' => 'Because I got a prize for participating.'
                ]);
            $skill->experiences_community()
                ->attach(ExperienceCommunity::inRandomOrder()->first(), [
                    'justification' => 'Because I am a communist.'
                ]);
            $skill->save();
        }
    }
}
