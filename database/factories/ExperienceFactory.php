<?php

use App\Models\Applicant;
use Faker\Generator as Faker;
use App\Models\ExperienceWork;
use App\Models\ExperienceAward;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceCommunity;
use App\Models\ExperienceEducation;
use App\Models\Lookup\EducationType;
use App\Models\Lookup\EducationStatus;
use App\Models\Lookup\AwardRecipientType;
use App\Models\Lookup\AwardRecognitionType;

$factory->define(ExperienceWork::class, function (Faker $faker) {
    return [
        'title' => $faker->words(2, true),
        'organization' => $faker->company(),
        'group' => $faker->company(),
        'is_active' => false,
        'start_date' => $faker->dateTimeBetween('-3 years', '-1 years'),
        'end_date' => $faker->dateTimeBetween('-1 years', '-1 day'),
        'is_education_requirement' => $faker->boolean(),
        'experienceable_id' => function () {
            return Applicant::inRandomOrder()->first()->id;
        },
        'experienceable_type' => 'applicant',
    ];
});

$factory->define(ExperiencePersonal::class, function (Faker $faker) {
    return [
        'title' => $faker->words(4, true),
        'description' => $faker->paragraphs(1, true),
        'is_shareable' => $faker->boolean(),
        'is_active' => false,
        'start_date' => $faker->dateTimeBetween('-3 years', '-1 years'),
        'end_date' => $faker->dateTimeBetween('-1 years', '-1 day'),
        'is_education_requirement' => $faker->boolean(),
        'experienceable_id' => function () {
            return Applicant::inRandomOrder()->first()->id;
        },
        'experienceable_type' => 'applicant'
    ];
});

$factory->define(ExperienceEducation::class, function (Faker $faker) {
    return [
        'education_type_id' => EducationType::inRandomOrder()->first()->id,
        'area_of_study' => $faker->words(3, true),
        'institution' => $faker->company(),
        'education_status_id' => EducationStatus::inRandomOrder()->first()->id,
        'is_active' => false,
        'start_date' => $faker->dateTimeBetween('-3 years', '-1 years'),
        'end_date' => $faker->dateTimeBetween('-1 years', '-1 day'),
        'is_education_requirement' => $faker->boolean(),
        'experienceable_id' => function () {
            return Applicant::inRandomOrder()->first()->id;
        },
        'experienceable_type' => 'applicant',
        'thesis_title' => $faker->sentence(),
        'has_blockcert' => false
    ];
});

$factory->define(ExperienceAward::class, function (Faker $faker) {
    return [
        'title' => $faker->words(3, true),
        'award_recipient_type_id' => AwardRecipientType::inRandomOrder()->first()->id,
        'issued_by' => $faker->company(),
        'award_recognition_type_id' => AwardRecognitionType::inRandomOrder()->first()->id,
        'awarded_date' => $faker->dateTimeBetween('-3 years', '-1 years'),
        'is_education_requirement' => $faker->boolean(),
        'experienceable_id' => function () {
            return Applicant::inRandomOrder()->first()->id;
        },
        'experienceable_type' => 'applicant',
    ];
});

$factory->define(ExperienceCommunity::class, function (Faker $faker) {
    return [
        'title' => $faker->words(4, true),
        'group' => $faker->company(),
        'project' => $faker->sentence(),
        'is_active' => false,
        'start_date' => $faker->dateTimeBetween('-3 years', '-1 years'),
        'end_date' => $faker->dateTimeBetween('-1 years', '-1 day'),
        'is_education_requirement' => $faker->boolean(),
        'experienceable_id' => function () {
            return Applicant::inRandomOrder()->first()->id;
        },
        'experienceable_type' => 'applicant',
    ];
});
