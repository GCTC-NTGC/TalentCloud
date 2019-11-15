<?php

use Faker\Generator as Faker;
use App\Models\Applicant;
use App\Models\Degree;
use App\Models\Lookup\DegreeType;

$factory->define(Degree::class, function (Faker $faker) {
    return [
        'degree_type_id' => DegreeType::inRandomOrder()->first()->id,
        'area_of_study' => $faker->word(),
        'institution' => $faker->company(),
        'thesis' => $faker->sentence(),
        'start_date' => $faker->dateTimeBetween('-3 years', '-1 years'),
        'end_date' => $faker->dateTimeBetween('-1 years', '-1 day'),
        'degreeable_id' => function () {
            // Default factory degrees to belong to Applicant, not JobApplication
            return factory(Applicant::class)->create()->id;
        },
        'degreeable_type' => 'applicant',
    ];
});
