<?php

use App\Models\Assessment;
use App\Models\Criteria;
use App\Models\Lookup\AssessmentType;
use App\Models\RatingGuideQuestion;
use App\Models\RatingGuideAnswer;

$factory->define(Assessment::class, function (Faker\Generator $faker) {
    return [
        'criterion_id' => function () {
            return factory(Criteria::class)->create()->id;
        },
        'assessment_type_id' => AssessmentType::inRandomOrder()->first()->id,
    ];
});

$factory->afterMakingState(Assessment::class, 'withRatingGuide', function ($assessment, $faker): void {
    // Create a RatingGuideQuestion, and an accompanying RatingGuideAnswer
    $question = factory(RatingGuideQuestion::class)->create([
        'job_poster_id' => $assessment->criterion->job_poster_id,
        'assessment_type_id' => $assessment->assessment_type_id,
    ]);
    factory(RatingGuideAnswer::class)->create([
        'rating_guide_question_id' => $question->id,
        'criterion_id' => $assessment->criterion_id,
    ]);
});
