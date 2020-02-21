<?php

use Faker\Generator as Faker;
use App\Models\Applicant;
use App\Models\WorkExperience;

$factory->define(WorkExperience::class, function (Faker $faker) {
    return [
        'role' => $faker->word(),
        'company' => $faker->company(),
        'description' => $faker->paragraph(),
        'start_date' => $faker->dateTimeBetween('-3 years', '-1 years'),
        'end_date' => $faker->dateTimeBetween('-1 years', '-1 day'),
        'experienceable_id' => function () {
            // Factory items to belong to Applicant by default, not JobApplication
            return factory(Applicant::class)->create()->id;
        },
        'experienceable_type' => 'applicant',
    ];
});
