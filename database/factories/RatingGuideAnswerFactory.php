<?php

use App\Models\RatingGuideAnswer;
use App\Models\RatingGuideQuestion;
use App\Models\Skill;
use App\Models\Criteria;

$factory->define(RatingGuideAnswer::class, function (Faker\Generator $faker) {
    return [
        'rating_guide_question_id' => function () {
            return factory(RatingGuideQuestion::class)->create()->id;
        },
        'criterion_id' => null,
        'expected_answer' => $faker->sentence(),
    ];
});
