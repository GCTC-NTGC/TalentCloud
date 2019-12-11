<?php

use App\Models\JobPoster;
use App\Models\JobPosterQuestion;
use App\Models\JobApplication;
use App\Models\JobApplicationAnswer;

$factory->define(JobApplicationAnswer::class, function(Faker\Generator $faker){
    return [
        'job_poster_question_id' => function(){
            return factory(JobPosterQuestion::class)->create()->id;
        },
        'job_application_id' => function(){
            return factory(JobApplication::class)->create()->id;
        },
        'answer' => $faker->paragraph()
    ];
});
