<?php

use App\Models\Applicant;
use App\Models\User;
use App\Models\UserRole;
use App\Models\Manager;
use App\Models\HrAdvisor;
use App\Models\Lookup\Department;
use App\Models\Lookup\Frequency;
use App\Models\TeamCulture;
use App\Models\WorkEnvironment;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$faker_fr = Faker\Factory::create('fr');

$factory->define(User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'first_name' => $faker->firstName(),
        'last_name' => $faker->lastName(),
        'email' => $faker->unique()->safeEmail(),
        'password' => $password ?: $password = Hash::make('password'),
        'is_confirmed' => 1,
        'user_role_id' => UserRole::where('name', 'basic')->first()->id, // Users should default to basic user role.
        'remember_token' => str_random(10),
        'is_priority' => $faker->boolean(10), // 10% chance of true
    ];
});

$factory->state(User::class, 'upgradedManager', function (Faker\Generator $faker) {
    return [
        'user_role_id' => UserRole::where('name', 'upgradedManager')->first()->id,
        'gov_email' => $faker->unique()->safeEmail(),
    ];
});

$factory->state(User::class, 'hr_advisor', function (Faker\Generator $faker) {
    return [
        'user_role_id' => UserRole::where('name', 'hr_advisor')->first()->id,
        'gov_email' => $faker->unique()->safeEmail(),
    ];
});

$factory->state(User::class, 'applicant', [
    'user_role_id' => UserRole::where('name', 'basic')->first()->id
]);

$factory->state(User::class, 'admin', [
    'user_role_id' => UserRole::where('name', 'admin')->first()->id
]);

$factory->state(User::class, 'priority', [
    'is_priority' => true
]);

$factory->define(Applicant::class, function (Faker\Generator $faker) {
    return [
        'twitter_username' => $faker->firstName(),
        'linkedin_url' => null,
        'tagline' => $faker->paragraph(),
        'personal_website' => $faker->url(),
        'is_snapshot' => false,
        'user_id' => function () {
            return factory(User::class)->states('applicant')->create()->id;
        },
    ];
});

$factory->define(HrAdvisor::class, function () {
    return [
        'department_id' => Department::inRandomOrder()->first()->id,
        'user_id' => function () {
            return factory(User::class)->state('hr_advisor')->create()->id;
        },
    ];
});

$factory->define(Manager::class, function (Faker\Generator $faker) use ($faker_fr) {
    return [
        'twitter_username' => $faker->firstName(),
        'linkedin_url' => null,
        'department_id' => Department::inRandomOrder()->first()->id,
        'work_review_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'stay_late_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'engage_team_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'development_opportunity_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'refuse_low_value_work_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'years_experience' => $faker->numberBetween(2, 25),
        'user_id' => function () use ($faker) {
            return factory(User::class)->create([
                'gov_email' => $faker->unique()->safeEmail(),
            ])->id;
        },
        'about_me:en' => $faker->paragraphs(3, true),
        'greatest_accomplishment:en' => $faker->paragraphs(3, true),
        'division:en' => $faker->word(),
        'position:en' => $faker->word(),
        'leadership_style:en' => $faker->paragraphs(2, true),
        'employee_learning:en' => $faker->paragraphs(2, true),
        'expectations:en' => $faker->paragraphs(2, true),
        'career_journey:en' => $faker->paragraphs(3, true),
        'learning_path:en' => $faker->paragraphs(3, true),
        'education:en' => $faker->paragraphs(3, true),
        'about_me:fr' => $faker_fr->paragraphs(3, true),
        'greatest_accomplishment:fr' => $faker_fr->paragraphs(3, true),
        'division:fr' => $faker_fr->word(),
        'position:fr' => $faker_fr->word(),
        'leadership_style:fr' => $faker_fr->paragraphs(2, true),
        'employee_learning:fr' => $faker_fr->paragraphs(2, true),
        'expectations:fr' => $faker_fr->paragraphs(2, true),
        'career_journey:fr' => $faker_fr->paragraphs(3, true),
        'learning_path:fr' => $faker_fr->paragraphs(3, true),
        'education:fr' => $faker_fr->paragraphs(3, true),
    ];
});

$factory->state(Manager::class, 'upgraded', [
    'user_id' => function () {
        return factory(User::class)->state('upgradedManager')->create()->id;
    },
]);

$factory->afterCreating(Manager::class, function ($manager) : void {
    $manager->team_culture()->save(factory(TeamCulture::class)->create([
        'manager_id' => $manager->id,
    ]));
    $manager->work_environment()->save(factory(WorkEnvironment::class)->create([
        'manager_id' => $manager->id,
    ]));
});
