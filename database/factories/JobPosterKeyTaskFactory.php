<?php

use App\Models\JobPoster;
use App\Models\JobPosterKeyTask;
use Faker\Factory;
use Faker\Generator;

$faker_fr = Factory::create('fr');

$factory->define(JobPosterKeyTask::class, function (Generator $faker) use ($faker_fr) {
    return [
        'job_poster_id' => function () {
            return factory(JobPoster::class)->create()->id;
        },
        'description' => [
            'en' => $faker->sentence(),
            'fr' => $faker_fr->sentence(),
        ]
    ];
});
