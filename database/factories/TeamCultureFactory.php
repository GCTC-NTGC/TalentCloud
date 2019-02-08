<?php

use Faker\Generator as Faker;
use Faker\Factory as FakerFactory;
use App\Models\TeamCulture;
use App\Models\Manager;

$factory->define(TeamCulture::class, function (Faker $faker) {
    $faker_fr = FakerFactory::create('fr');
    return [
        'team_size' => $faker->numberBetween(5, 15),
        'gc_directory_url' => $faker->url(),
        'narrative_text:en' => $faker->paragraphs(2, true),
        'operating_context:en' => $faker->paragraph(),
        'what_we_value:en' => $faker->paragraph(),
        'how_we_work:en' => $faker->paragraph(),
        'narrative_text:fr' => $faker_fr->paragraphs(2, true),
        'operating_context:fr' => $faker_fr->paragraph(),
        'what_we_value:fr' => $faker_fr->paragraph(),
        'how_we_work:fr' => $faker_fr->paragraph(),
        'manager_id' => function () {
            return factory(Manager::class)->create()->id;
        }
    ];
});
