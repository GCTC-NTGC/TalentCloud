<?php


use App\Models\Lookup\AssessmentType;
use App\Models\RatingGuideQuestion;
use App\Models\JobPoster;

$factory->define(RatingGuideQuestion::class, function (Faker\Generator $faker) {
    return [
        'job_poster_id' => function () {
            return factory(JobPoster::class)->create()->id;
        },
        'assessment_type_id' => AssessmentType::inRandomOrder()->first()->id,
        'question' => $faker->sentence(),
    ];
});
