<?php

use Faker\Generator as Faker;

$factory->define(App\Models\JobPoster::class, function (Faker $faker) {
    return [
        'job_term_id' => JobTerm::inRandomOrder()->first()->id,
        'term_qty' => $faker->numberBetween(1, 4),
        'open_date_time' => $faker->dateTimeBetween('-1 months','now'),
        'close_date_time' => $faker->dateTimeBetween('now', '1 months'),
        'start_date_time' => $faker->dateTimeBetween('1 months','2 months'),
        'department_id' => Department::inRandomOrder()->first()->id,
        'province_id' => Province::inRandomOrder()->first()->id,
        'salary_min' => $faker->numberBetween(60000, 80000),
        'salary_max' => $faker->numberBetween(80000,100000),
        'noc' => $faker->numberBetween(1, 9999),
        'classification' => $faker->regexify('[A-Z]{2}-0[1-5]'),
        'security_clearance_id' => SecurityClearance::inRandomOrder()->first()->id,
        'language_requirement_id' => LanguageRequirement::inRandomOrder()->first()->id,
        'published' => true,
    ];
});
