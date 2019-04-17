<?php

use App\Models\RatingGuideAnswer;
use App\Models\RatingGuideQuestion;
use App\Models\Skill;

$factory->define(RatingGuideAnswer::class, function (Faker\Generator $faker) {
    return [
        'rating_guide_question_id' => function () {
            return factory(RatingGuideQuestion::class)->create()->id;
        },
        'skill_id' => Skill::inRandomOrder()->first()->id,
        'expected_answer' => $faker->sentence(),
    ];
});
