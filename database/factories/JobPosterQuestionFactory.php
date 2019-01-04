<?php

use App\Models\JobPoster;
use App\Models\JobPosterQuestion;

$faker_fr = Faker\Factory::create('fr');

$factory->define(JobPosterQuestion::class, function (Faker\Generator $faker) use ($faker_fr) {
    return [
        'job_poster_id' => function () {
            return factory(JobPoster::class)->create()->id;
        },
        'description:en' => $faker->sentence(),
        'description:fr' => $faker_fr->sentence(),
        'question:en' => $faker->paragraph(),
        'question:fr' => $faker_fr->paragraph()
    ];
});
