<?php

use App\Models\SkillDeclaration;
use App\Models\Skill;
use App\Models\Lookup\SkillStatus;
use App\Models\Lookup\SkillLevel;

$factory->define(SkillDeclaration::class, function (Faker\Generator $faker) {
    return [
        'skill_id' => Skill::inRandomOrder()->first()->id,
        'skill_status_id' => SkillStatus::inRandomOrder()->first()->id,
        'skill_level_id' => SkillLevel::inRandomOrder()->first()->id,
        'applicant_id' => function () {
            return factory(Applicant::class)->create()->id;
        },
        'description' => $faker->paragraph(),
    ];
});
