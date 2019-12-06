<?php

use App\Models\JobPoster;
use App\Models\JobPosterQuestion;
use Faker\Factory;
use Faker\Generator;

$faker_fr = Factory::create('fr');

$factory->define(JobPosterQuestion::class, function (Generator $faker) use ($faker_fr) {
    $question = [
        'en' => $faker->paragraph(),
        'fr' => $faker_fr->paragraph(),
    ];
    $description = [
        'en' => $faker->sentence(),
        'fr' => $faker_fr->sentence(),
    ];
    return [
        'job_poster_id' => function () {
            return factory(JobPoster::class)->create()->id;
        },
        'question' => $question,
        'description' => $description
    ];
});
