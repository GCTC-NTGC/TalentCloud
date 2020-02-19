<?php

use Faker\Generator;
use Faker\Factory;
use App\Models\TeamCulture;
use App\Models\Manager;

$faker_fr = Factory::create('fr');

$factory->define(TeamCulture::class, function (Generator $faker) use ($faker_fr) {
    return [
        'team_size' => $faker->numberBetween(5, 15),
        'gc_directory_url' => $faker->url(),
        'narrative_text' => [
            'en' => $faker->paragraphs(2, true),
            'fr' => $faker_fr->paragraphs(2, true)
        ],
        'operating_context' => [
            'en' => $faker->paragraph(),
            'fr' => $faker_fr->paragraph()
        ],
        'what_we_value' => [
            'en' => $faker->paragraph(),
            'fr' => $faker_fr->paragraph()
        ],
        'how_we_work' => [
            'en' => $faker->paragraph(),
            'fr' => $faker_fr->paragraph()
        ],
        'manager_id' => function () {
            return factory(Manager::class)->create()->id;
        }
    ];
});
