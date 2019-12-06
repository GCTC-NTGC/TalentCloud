<?php

use App\Models\Criteria;
use App\Models\Lookup\CriteriaType;
use App\Models\JobPoster;
use App\Models\Skill;
use App\Models\Lookup\SkillLevel;
use Faker\Factory;
use Faker\Generator;

$faker_fr = Factory::create('fr');

$factory->define(Criteria::class, function (Generator $faker) use ($faker_fr) {
    return [
        'criteria_type_id' => CriteriaType::inRandomOrder()->first()->id,
        'job_poster_id' => function () {
            return factory(JobPoster::class)->create()->id;
        },
        'skill_id' => Skill::inRandomOrder()->first()->id,
        'skill_level_id' => SkillLevel::inRandomOrder()->first()->id,
        'description' => json_encode([
            'en' => $faker->paragraphs(2, true),
            'fr' => $faker_fr->paragraphs(2, true),
        ]),
        'specificity' => json_encode([
            'en' => $faker->sentence(),
            'fr' => $faker_fr->sentence(),
        ])
    ];
});
