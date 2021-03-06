<?php

use App\Models\Criteria;
use App\Models\Lookup\CriteriaType;
use App\Models\JobPoster;
use App\Models\Skill;
use App\Models\Lookup\SkillLevel;
use App\Models\Lookup\SkillType;
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
        'description' => [
            'en' => $faker->paragraphs(2, true),
            'fr' => $faker_fr->paragraphs(2, true),
        ],
        'specificity' => [
            'en' => $faker->sentence(),
            'fr' => $faker_fr->sentence(),
        ]
    ];
});

$factory->state(Criteria::class, 'essential', [
    'criteria_type_id' => CriteriaType::where('name', 'essential')->first()->id
]);

$factory->state(Criteria::class, 'asset', [
    'criteria_type_id' => CriteriaType::where('name', 'asset')->first()->id
]);

$factory->state(Criteria::class, 'hard', [
    'skill_id' => Skill::where('skill_type_id', SkillType::firstWhere('name', 'hard')->id)
        ->inRandomOrder()->first()->id,
]);

$factory->state(Criteria::class, 'soft', [
    'skill_id' => Skill::where('skill_type_id', SkillType::firstWhere('name', 'soft')->id)
        ->inRandomOrder()->first()->id,
]);
