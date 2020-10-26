<?php

use App\Models\Applicant;
use App\Models\ExperienceAward;
use App\Models\ExperienceCommunity;
use App\Models\ExperienceEducation;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceSkill;
use App\Models\ExperienceWork;
use App\Models\JobApplication;
use App\Models\JobApplicationAnswer;
use App\Models\JobPoster;
use App\Models\Lookup\ApplicationStatus;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\PreferredLanguage;
use App\Models\Lookup\SecurityClearance;
use App\Models\Lookup\VeteranStatus;
use App\Models\SkillDeclaration;

$factory->define(JobApplication::class, function (Faker\Generator $faker) {
    return [
        'job_poster_id' => function () {
            return factory(JobPoster::class)->states('live')->create()->id;
        },
        'language_requirement_confirmed' => true,
        'education_requirement_confirmed' => true,
        'language_test_confirmed' => false,
        'application_status_id' => ApplicationStatus::where('name', 'submitted')->firstOrFail()->id,
        'citizenship_declaration_id' => CitizenshipDeclaration::inRandomOrder()->first()->id,
        'veteran_status_id' => VeteranStatus::inRandomOrder()->first()->id,
        'preferred_language_id' => PreferredLanguage::inRandomOrder()->first()->id,
        'experience_saved' => true,
        'submission_signature' => $faker->name(),
        'submission_date' => $faker->dateTimeBetween('yesterday', 'tomorrow')->format('Y-m-d H:i:s'),
        'applicant_id' => function () {
            return factory(Applicant::class)->create()->id;
        },
        'version_id' => 1,
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
        'experience_saved' => true,
    ];
});

$factory->state(JobApplication::class, 'strategic_response', function (Faker\Generator $faker) {
    return [
        'citizenship_declaration_id' => null,
        'veteran_status_id' => null,
        'language_requirement_confirmed' => false,
        'director_name' => $faker->name(),
        'director_title' => $faker->jobTitle(),
        'director_email' => $faker->email(),
        'reference_name' => $faker->name(),
        'reference_title' => $faker->jobTitle(),
        'reference_email' => $faker->email(),
        'gov_email' => $faker->firstName() . '@canada.ca',
        'physical_office_willing' => $faker->boolean(),
        'security_clearance_id' => SecurityClearance::inRandomOrder()->first()->id,
    ];
});

$factory->state(JobApplication::class, 'version2', [
    'version_id' => 2,
]);

$factory->afterCreating(JobApplication::class, function ($application): void {
    foreach ($application->job_poster->job_poster_questions as $question) {
        $answer = factory(JobApplicationAnswer::class)->create([
            'job_poster_question_id' => $question->id,
            'job_application_id' => $application->id
        ]);
        $application->job_application_answers()->save($answer);
    }

    if ($application->version_id === null || $application->version_id === 1) {
        // Version 1 applications need a SkillDeclaration saved to the Application profile for each job critera.
        $applicant = $application->applicant;
        $applicantSkillIds = $applicant->skill_declarations->pluck('skill_id');
        foreach ($application->job_poster->criteria as $criterion) {
            if (!$applicantSkillIds->contains($criterion->skill_id)) {
                $applicant->skill_declarations()->save(factory(SkillDeclaration::class)->create([
                    'skill_id' => $criterion->skill_id,
                    'skillable_id' => $applicant->id,
                    'skillable_type' => 'applicant',
                ]));
            }
        }
    }
    if ($application->version_id === 2) {
        // Version 2 applications need an Experience with an ExperienceSkill for each criteria.
        $experienceTypes = [
            ExperienceWork::class,
            ExperiencePersonal::class,
            ExperienceEducation::class,
            ExperienceAward::class,
            ExperienceCommunity::class
        ];
        foreach ($application->job_poster->criteria as $criterion) {
            $index = rand(0, 4);
            $experience = factory($experienceTypes[$index])->create([
                'experienceable_id' => $application->applicant_id,
                'experienceable_type' => 'applicant',
            ]);
            factory(ExperienceSkill::class)->create([
                'skill_id' => $criterion->skill_id,
                'experience_type' => $experience->experienceTypeName(),
                'experience_id' => $experience->id,
            ]);
        }
    }

    // If application is not a draft, it needs a snapshot of the profile.
    // Different versions save different snapshots.
    if (!$application->isDraft()) {
        if ($application->version_id === 2) {
            $application->saveProfileSnapshotTimeline();
        } else {
            $application->saveProfileSnapshot();
        }
    }
});
