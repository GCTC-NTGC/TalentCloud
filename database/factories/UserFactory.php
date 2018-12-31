<?php

use App\Models\User;
use App\Models\UserRole;
use App\Models\Manager;
use App\Models\Lookup\Department;
use App\Models\Lookup\Frequency;
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

$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name(),
        'email' => $faker->unique()->safeEmail(),
        'password' => Hash::make('password'),
        'is_confirmed' => 1,
        'user_role_id' => UserRole::inRandomOrder()->first()->id,
        'remember_token' => str_random(10),
    ];
});

$factory->state(App\Models\User::class, 'manager', [
    'user_role_id' => UserRole::where('name', 'manager')->first()->id
]);

$factory->state(App\Models\User::class, 'applicant', [
    'user_role_id' => UserRole::where('name', 'applicant')->first()->id
]);

$factory->define(App\Models\Applicant::class, function (Faker\Generator $faker) {
    return [
        'twitter_username' => $faker->firstName(),
        'linkedin_url' => $faker->url(),
        'tagline' => $faker->paragraph(),
        'personal_website' => $faker->url(),
        'is_snapshot' => false,
        'user_id' => function () {
            return factory(App\Models\User::class)->states('applicant')->create()->id;
        },
    ];
});

$factory->define(App\Models\Manager::class, function (Faker\Generator $faker) use ($faker_fr) {
    return [
        'twitter_username' => $faker->firstName(),
        'linkedin_url' => $faker->url(),
        'department_id' => Department::inRandomOrder()->first()->id,
        'work_review_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'stay_late_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'engage_team_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'development_opportunity_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'refuse_low_value_work_frequency_id' => Frequency::inRandomOrder()->first()->id,
        'years_experience' => $faker->numberBetween(2, 25),
        'user_id' => function () {
            return factory(App\Models\User::class)->states('manager')->create()->id;
        },
        'about_me:en' => $faker->paragraphs(3, true),
        'greatest_accomplishment:en' => $faker->paragraphs(3, true),
        'branch:en' => $faker->word(),
        'division:en' => $faker->word(),
        'position:en' => $faker->word(),
        'leadership_style:en' => $faker->paragraph(),
        'employee_learning:en' => $faker->paragraph(),
        'expectations:en' => $faker->paragraph(),
        'career_journey:en' => $faker->paragraphs(3, true),
        'learning_path:en' => $faker->paragraphs(3, true),
        'education:en' => $faker->paragraphs(3, true),
        'about_me:fr' => $faker_fr->paragraphs(3, true),
        'greatest_accomplishment:fr' => $faker_fr->paragraphs(3, true),
        'branch:fr' => $faker_fr->word(),
        'division:fr' => $faker_fr->word(),
        'position:fr' => $faker_fr->word(),
        'leadership_style:fr' => $faker_fr->paragraph(),
        'employee_learning:fr' => $faker_fr->paragraph(),
        'expectations:fr' => $faker_fr->paragraph(),
        'career_journey:fr' => $faker_fr->paragraphs(3, true),
        'learning_path:fr' => $faker_fr->paragraphs(3, true),
        'education:fr' => $faker_fr->paragraphs(3, true),
    ];
});
