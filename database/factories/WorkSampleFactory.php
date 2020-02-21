<?php

use Faker\Generator as Faker;
use App\Models\Applicant;
use App\Models\Lookup\FileType;
use App\Models\WorkSample;

$factory->define(WorkSample::class, function (Faker $faker) {
    return [
        'name' => $faker->words(3, true),
        'file_type_id' => FileType::inRandomOrder()->first()->id,
        'url' => $faker->url(),
        'description' => $faker->paragraph(),
        'date_created' => $faker->dateTimeBetween('-3 years', '-1 years'),
        'work_sampleable_id' => function () {
            // Factory items to belong to Applicant by default, not JobApplication
            return factory(Applicant::class)->create()->id;
        },
        'work_sampleable_type' => 'applicant',
    ];
});
