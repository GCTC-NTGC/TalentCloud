<?php

use App\Models\SkillDeclaration;
use App\Models\Skill;
use App\Models\Lookup\SkillStatus;
use App\Models\Lookup\SkillLevel;
use App\Models\Applicant;

$factory->define(SkillDeclaration::class, function (Faker\Generator $faker) {
    return [
        'skill_id' => Skill::inRandomOrder()->first()->id,
        'skill_status_id' => SkillStatus::inRandomOrder()->first()->id,
        'skill_level_id' => SkillLevel::inRandomOrder()->first()->id,
        'skillable_id' => function () {
            return factory(Applicant::class)->create()->id;
        },
        'skillable_type' => 'applicant',
        'description' => $faker->paragraphs(3, true),
    ];
});
