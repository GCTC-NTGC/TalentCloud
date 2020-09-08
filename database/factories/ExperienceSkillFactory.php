<?php

use App\Models\ExperienceAward;
use App\Models\ExperienceCommunity;
use App\Models\ExperienceEducation;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceSkill;
use App\Models\ExperienceWork;
use App\Models\Skill;
use Faker\Generator as Faker;

$factory->define(ExperienceSkill::class, function (Faker $faker) {
    $experience_type = $faker->randomElement([
        'experience_work',
        'experience_award',
        'experience_community',
        'experience_education',
        'experience_personal'
    ]);
    return [
        'skill_id' => Skill::inRandomOrder()->first()->id,
        'justification' => $faker->paragraph(),
        'experience_type' => $experience_type,
        'experience_id' => function () use ($experience_type) {
            switch ($experience_type) {
                case 'experience_work':
                    return factory(ExperienceWork::class)->create()->id;
                case 'experience_award':
                    return factory(ExperienceAward::class)->create()->id;
                case 'experience_community':
                    return factory(ExperienceCommunity::class)->create()->id;
                case 'experience_education':
                    return factory(ExperienceEducation::class)->create()->id;
                case 'experience_personal':
                    return factory(ExperiencePersonal::class)->create()->id;
            }
        }
    ];
});
