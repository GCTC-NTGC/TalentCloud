<?php

use App\Models\Resource;

$faker_fr = Faker\Factory::create('fr');

$factory->define(Resource::class, function (Faker\Generator $faker) use ($faker_fr) {
    return [
        'name' => [
            'en' => $faker->unique()->realText(27, 1),
            'fr' => $faker_fr->unique()->realText(27, 1)
        ],
        // 'file' =>
    ];
});
