<?php

use App\Models\ApplicationReview;
use App\Models\JobApplication;
use App\Models\Lookup\ReviewStatus;

$factory->define(ApplicationReview::class, function (Faker\Generator $faker) {
    return [
        'job_application_id' => function () {
            return factory(JobApplication::class)->states('submitted')->create()->id;
        },
        'review_status_id' => ReviewStatus::whereIn(
            'name',
            [
                'screened_out',
                'still_thinking',
                'still_in'
            ]
        )->inRandomOrder()->first()->id,
        'notes' => $faker->optional()->words(100, true),
        'department_id' => null,
        'director_email_sent' => false,
        'reference_email_sent' => false,
    ];
});

$factory->state(ApplicationReview::class, 'not_reviewed', [
    'review_status_id' => null,
    'notes' => null
]);
