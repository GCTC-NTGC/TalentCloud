<?php

use App\Models\JobApplication;
use App\Models\JobPoster;
use App\Models\Lookup\ApplicationStatus;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\VeteranStatus;
use App\Models\Lookup\PreferredLanguage;
use App\Models\Applicant;
use App\Models\JobApplicationAnswer;
use App\Models\SkillDeclaration;

$factory->define(JobApplication::class, function (Faker\Generator $faker) {
    return [
        'job_poster_id' => function () {
            return factory(JobPoster::class)->state('published')->create()->id;
        },
        'application_status_id' => ApplicationStatus::where('name', 'submitted')->firstOrFail()->id,
        'citizenship_declaration_id' => CitizenshipDeclaration::inRandomOrder()->first()->id,
        'veteran_status_id' => VeteranStatus::inRandomOrder()->first()->id,
        'preferred_language_id' => PreferredLanguage::inRandomOrder()->first()->id,
        'submission_signature' => $faker->name(),
        'submission_date' => $faker->dateTimeBetween('yesterday', 'tomorrow')->format('Y-m-d H:i:s'),
        'applicant_id' => function () {
            return factory(Applicant::class)->create()->id;
        }
    ];
});

$factory->state(JobApplication::class, 'draft', [
    'application_status_id' => ApplicationStatus::where('name', 'draft')->firstOrFail()->id,
    'submission_signature' => null,
    'submission_date' => null
]);

$factory->afterCreating(JobApplication::class, function ($application) : void {
    foreach ($application->job_poster->job_poster_questions as $question) {
        $answer = factory(JobApplicationAnswer::class)->create([
            'job_poster_question_id' => $question->id,
            'job_application_id' => $application->id
        ]);
        $application->job_application_answers()->save($answer);
    }
    foreach ($application->job_poster->criteria as $criterion) {
        factory(SkillDeclaration::class)->create([
            'skill_id' => $criterion->skill_id,
            'applicant_id' => $application->applicant_id,
        ]);
    }
});
