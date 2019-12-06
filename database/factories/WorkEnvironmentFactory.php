<?php

use App\Models\Lookup\Frequency;
use App\Models\Manager;
use App\Models\WorkEnvironment;
use Faker\Factory;
use Faker\Generator;

$faker_fr = Factory::create('fr');

$factory->define(WorkEnvironment::class, function (Generator $faker) use ($faker_fr) {
    return [
        'telework_allowed_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'flexible_hours_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'things_to_know' => [
            'en' => $faker->paragraph(),
            'fr' => $faker_fr->paragraph()
        ],
        'manager_id' => function () {
            return factory(Manager::class)->create()->id;
        }
    ];
});
