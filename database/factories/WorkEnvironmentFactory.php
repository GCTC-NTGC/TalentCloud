<?php

use Faker\Generator as Faker;
use Faker\Factory as FakerFactory;
use App\Models\WorkEnvironment;
use App\Models\Manager;
use App\Models\Lookup\Frequency;

$factory->define(WorkEnvironment::class, function (Faker $faker) {
    $faker_fr = FakerFactory::create('fr');
    return [
        'telework_allowed_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'flexible_hours_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'things_to_know:en' => $faker->paragraph(),
        'things_to_know:fr' => $faker_fr->paragraph(),
        'manager_id' => function () {
            return factory(Manager::class)->create()->id;
        }
    ];
});
