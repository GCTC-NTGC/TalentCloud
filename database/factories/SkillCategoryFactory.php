<?php

use App\Models\SkillCategory;
use Faker\Factory;
use Faker\Generator;

$faker_fr = Factory::create('fr');
$factory->define(SkillCategory::class, function (Generator $faker) use ($faker_fr) {
    return [
        'key' => strtolower($faker->unique()->word()),
        'name' => [
            'en' => ucwords($faker->words(2, true)),
            'fr' => ucwords($faker_fr->words(2, true)),
        ]
    ];
});
