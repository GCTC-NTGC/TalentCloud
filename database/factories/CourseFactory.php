<?php

use Faker\Generator as Faker;
use App\Models\Applicant;
use App\Models\Course;
use App\Models\Lookup\CourseStatus;

$factory->define(Course::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
        'institution' => $faker->company(),
        'course_status_id' => CourseStatus::inRandomOrder()->first()->id,
        'start_date' => $faker->dateTimeBetween('-3 years', '-1 years'),
        'end_date' => $faker->dateTimeBetween('-1 years', '-1 day'),
        'courseable_id' => function () {
            // Default factory item to belong to Applicant, not JobApplication
            return factory(Applicant::class)->create()->id;
        },
        'courseable_type' => 'applicant',
    ];
});
