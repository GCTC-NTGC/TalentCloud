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
            return factory(JobPoster::class)->states('published')->create()->id;
        },
        'language_requirement_confirmed' => true,
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
    'submission_date' => null,
]);

$factory->state(JobApplication::class, 'submitted', function (Faker\Generator $faker) {
    return [
        'application_status_id' => ApplicationStatus::where('name', 'submitted')->firstOrFail()->id,
        'submission_signature' => $faker->name(),
        'submission_date' => $faker->dateTimeBetween('yesterday', 'tomorrow')->format('Y-m-d H:i:s'),
    ];
});

$factory->afterCreating(JobApplication::class, function ($application) : void {
    foreach ($application->job_poster->job_poster_questions as $question) {
        $answer = factory(JobApplicationAnswer::class)->create([
            'job_poster_question_id' => $question->id,
            'job_application_id' => $application->id
        ]);
        $application->job_application_answers()->save($answer);
    }
    if ($application->isDraft()) {
        $skillableType = 'applicant';
        $owner = $application->applicant;
    } else {
        $skillableType = 'application';
        $owner = $application;
    }
    foreach ($application->job_poster->criteria as $criterion) {
        $owner->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => $criterion->skill_id,
            'skillable_id' => $owner->id,
            'skillable_type' => $skillableType,
        ]));
    }
});
