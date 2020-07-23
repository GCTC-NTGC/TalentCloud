<?php

use App\Models\Lookup\Department;
use App\Models\JobPoster;
use App\Models\Lookup\JobTerm;
use App\Models\Lookup\LanguageRequirement;
use App\Models\Manager;
use App\Models\Lookup\Province;
use App\Models\Lookup\SecurityClearance;
use App\Models\Criteria;
use App\Models\JobPosterKeyTask;
use App\Models\JobPosterQuestion;
use App\Models\Lookup\Frequency;
use App\Models\Classification;
use App\Models\Lookup\JobPosterStatus;
use App\Models\Lookup\JobSkillLevel;
use App\Models\Lookup\TravelRequirement;
use App\Models\Lookup\OvertimeRequirement;
use App\Models\Lookup\TalentStream;
use App\Models\Lookup\TalentStreamCategory;

$faker_fr = Faker\Factory::create('fr');

$factory->define(JobPoster::class, function (Faker\Generator $faker) use ($faker_fr) {
    $closeDate = $faker->dateTimeBetween('now', '1 months')->format('Y-m-d');
    $openDate = $faker->dateTimeBetween('-1 months', 'now')->format('Y-m-d');
    $startDate = $faker->dateTimeBetween('1 months', '2 months')->format('Y-m-d');
    $work_env_features = [
        'accessToExternal' => $faker->boolean(),
        'assignedSeating' => $faker->boolean(),
        'cafeteria' => $faker->boolean(),
        'closeToTransit' => $faker->boolean(),
        'collaboration' => $faker->boolean(),
        'downtown' => $faker->boolean(),
        'fileSharing' => $faker->boolean(),
        'fitnessCenter' => $faker->boolean(),
        'naturalLight' => $faker->boolean(),
        'openConcept' => $faker->boolean(),
        'parking' => $faker->boolean(),
        'private' => $faker->boolean(),
        'restaurants' => $faker->boolean(),
        'smudging' => $faker->boolean(),
        'taskManagement' => $faker->boolean(),
        'versionControl' => $faker->boolean(),
        'videoConferencing' => $faker->boolean(),
        'windows' => $faker->boolean()
    ];
    return [
        'job_term_id' => JobTerm::inRandomOrder()->first()->id,
        'chosen_lang' => $faker->randomElement(['en', 'fr']),
        'term_qty' => $faker->numberBetween(1, 4),
        'open_date_time' => ptDayStartToUtcTime($openDate),
        'close_date_time' => ptDayEndToUtcTime($closeDate),
        'start_date_time' => ptDayStartToUtcTime($startDate),
        'job_poster_status_id' => JobPosterStatus::where('key', 'draft')->first()->id,
        'department_id' => Department::inRandomOrder()->first()->id,
        'province_id' => Province::inRandomOrder()->first()->id,
        'salary_min' => $faker->numberBetween(60000, 80000),
        'salary_max' => $faker->numberBetween(80000, 100000),
        'noc' => $faker->numberBetween(1, 9999),
        'classification_id' => Classification::inRandomOrder()->first()->id,
        'classification_level' => $faker->numberBetween(1, 6),
        'security_clearance_id' => SecurityClearance::inRandomOrder()->first()->id,
        'language_requirement_id' => LanguageRequirement::inRandomOrder()->first()->id,
        'remote_work_allowed' => $faker->boolean(50),
        'manager_id' => function () {
            return factory(Manager::class)->create()->id;
        },
        'team_size' => $faker->numberBetween(5, 30),
        'work_env_features' => $work_env_features,
        'fast_vs_steady' => $faker->numberBetween(1, 4),
        'horizontal_vs_vertical' => $faker->numberBetween(1, 4),
        'experimental_vs_ongoing' => $faker->numberBetween(1, 4),
        'citizen_facing_vs_back_office' => $faker->numberBetween(1, 4),
        'collaborative_vs_independent' => $faker->numberBetween(1, 4),
        'telework_allowed_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'flexible_hours_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'travel_requirement_id' => TravelRequirement::inRandomOrder()->first()->id,
        'overtime_requirement_id' => OvertimeRequirement::inRandomOrder()->first()->id,
        'city' => [
            'en' => $faker->city(),
            'fr' => $faker_fr->city()
        ],
        'title' => [
            'en' => $faker->unique()->realText(27, 1),
            'fr' => $faker_fr->unique()->realText(27, 1)
        ],
        'dept_impact' => [
            'en' => $faker->paragraph(),
            'fr' => $faker_fr->paragraph()
        ],
        'team_impact' => [
            'en' => $faker->paragraph(),
            'fr' => $faker_fr->paragraph()
        ],
        'hire_impact' => [
            'en' => $faker->paragraph(),
            'fr' => $faker_fr->paragraph()
        ],
        'division' => [
            'en' => $faker->word(),
            'fr' => $faker_fr->word()
        ],
        'education' => [
            'en' => $faker->sentence(),
            'fr' => $faker_fr->sentence()
        ],
        'work_env_description' => [
            'en' => $faker->paragraph(),
            'fr' => $faker_fr->paragraph()
        ],
        'culture_summary' => [
            'en' => $faker->paragraph(),
            'fr' => $faker_fr->paragraph()
        ],
        'culture_special' => [
            'en' => $faker->paragraph(),
            'fr' => $faker_fr->paragraph()
        ]
    ];
});

$factory->afterCreating(JobPoster::class, function ($jp): void {
    // Save at least one of each kind of criteria.
    $jp->criteria()->save(factory(Criteria::class)->states(['essential', 'hard'])->make([
        'job_poster_id' => $jp->id
    ]));
    $jp->criteria()->save(factory(Criteria::class)->states(['essential', 'soft'])->make([
        'job_poster_id' => $jp->id
    ]));
    $jp->criteria()->save(factory(Criteria::class)->states(['asset', 'hard'])->make([
        'job_poster_id' => $jp->id
    ]));
    $jp->criteria()->save(factory(Criteria::class)->states(['asset', 'soft'])->make([
        'job_poster_id' => $jp->id
    ]));
    // Other criteria divided randomly between essential and asset.
    $jp->criteria()->saveMany(factory(Criteria::class, 4)->make([
        'job_poster_id' => $jp->id
    ]));
    $order = 1;
    $jp->job_poster_key_tasks()->saveMany(factory(JobPosterKeyTask::class, 5)
        ->make([
            'job_poster_id' => $jp->id,
        ])
        ->each(function ($task) use (&$order): void {
            $task->order = $order;
            $order++;
        }));
    $jp->job_poster_questions()->saveMany(factory(JobPosterQuestion::class, 2)->make([
        'job_poster_id' => $jp->id
    ]));
});

$factory->state(
    JobPoster::class,
    'byUpgradedManager',
    ['manager_id' => function () {
        return factory(Manager::class)->state('upgraded')->create()->id;
    }]
);
$factory->state(
    JobPoster::class,
    'byDemoManager',
    ['manager_id' => function () {
        return factory(Manager::class)->state('demo')->create()->id;
    }]
);

$factory->state(
    JobPoster::class,
    'live',
    function (Faker\Generator $faker) {
        return [
            'job_poster_status_id' => JobPosterStatus::where('key', 'live')->first()->id,
            'open_date_time' => ptDayEndToUtcTime($faker->dateTimeBetween('-5 days', '-3 days')->format('Y-m-d')),
            'close_date_time' => ptDayEndToUtcTime($faker->dateTimeBetween('20 days', '30 days')->format('Y-m-d')),
        ];
    }
);

$factory->state(
    JobPoster::class,
    'closed',
    function (Faker\Generator $faker) {
        return [
            'job_poster_status_id' => JobPosterStatus::where('key', 'assessment')->first()->id,
            'open_date_time' => ptDayEndToUtcTime($faker->dateTimeBetween('-20 days', '-7 days')->format('Y-m-d')),
            'close_date_time' => ptDayEndToUtcTime($faker->dateTimeBetween('-5 days', '-3 days')->format('Y-m-d')),
        ];
    }
);

$factory->state(
    JobPoster::class,
    'draft',
    function (Faker\Generator $faker) {
        return [
            'job_poster_status_id' => JobPosterStatus::where('key', 'draft')->first()->id,
            'open_date_time' => ptDayStartToUtcTime($faker->dateTimeBetween('5 days', '10 days')->format('Y-m-d')),
            'close_date_time' => ptDayEndToUtcTime($faker->dateTimeBetween('3 weeks', '5 weeks')->format('Y-m-d')),
        ];
    }
);

$factory->state(
    JobPoster::class,
    'strategic_response',
    function () {
        return [
            'department_id' => config('app.strategic_response_department_id'),
            'close_date_time' => null,
            'talent_stream_id' => TalentStream::inRandomOrder()->first()->id,
            'talent_stream_category_id' => TalentStreamCategory::inRandomOrder()->first()->id,
            'job_skill_level_id' => JobSkillLevel::inRandomOrder()->first()->id,
        ];
    }
);

$factory->state(
    JobPoster::class,
    'review_requested',
    function (Faker\Generator $faker) {
        return [
            'job_poster_status_id' => JobPosterStatus::where('key', 'review_hr')->first()->id,
            'open_date_time' => ptDayStartToUtcTime($faker->dateTimeBetween('5 days', '10 days')->format('Y-m-d')),
            'close_date_time' => ptDayEndToUtcTime($faker->dateTimeBetween('3 weeks', '5 weeks')->format('Y-m-d')),
        ];
    }
);

$factory->state(JobPoster::class, 'remote', [
    'remote_work_allowed' => true
]);

$factory->state(JobPoster::class, 'local', [
    'remote_work_allowed' => false
]);
