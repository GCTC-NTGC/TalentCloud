<?php

use Illuminate\Database\Seeder;

use App\Models\Classification;
use App\Models\Skill;

class SkillClassificationSeeder extends Seeder // phpcs:ignore
{
    /**
     * Run the Skills Classification seeds.
     *
     * @return void
     */
    public function run()
    {
        $skills = Skill::all();

        foreach ($skills as $skill) {
            $skill->classifications()->attach(Classification::inRandomOrder()->first());
            $skill->is_culture_skill = (bool)random_int(0, 1);
            $skill->is_future_skill = (bool)random_int(0, 1);
            $skill->save();
        }
    }
}
