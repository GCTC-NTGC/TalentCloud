<?php

use Faker\Generator as Faker;

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

$factory->define(\App\Models\User::class, function ($faker) {
    return [
        'user_id' => function () {
            return factory(App\User::class)->create()->user_role_id;
        },
        'user_type' => function (array $post) {
            return App\User::find($post['user_role_id'])->type;
        }
    ];
});



/*
$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\User::class, 'applicant', function (Faker $faker) {
    return [
        'user_role_id' => 1,
    ];
});

$factory->define(App\User::class, 'manager', function (Faker $faker) {
    return [
        'user_role_id' => 2,
    ];
});

$factory->define(App\Models\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name(),
        'email' => $faker->unique()->safeEmail(),
        'password' => Hash::make('password'),
    ];
});

$factory->defineAs(App\User::class, 'applicant', function (Faker $faker) {
    $post = $factory->raw('App\Models\User');
    return [
        'user_role_id' => 1,
        'user_role' => 'applicant',
    ];
});

$factory->define(App\Models\Applicant::class, function () {
    return [
        'user_role' => function (array $post) {
            return App\User::find($post['user_id'])->type;
        }
    ];
});

$factory->define(App\Models\Manager::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'user_role' => '2',
    ];
});

$factory->state(App\Models\User::class, 'applicant', [
    'user_role' => 'applicant',
]);

$factory->state(App\Models\User::class, 'applicant', [
    'user_role' => 'applicant',
]);

$factory->state(App\Models\User::class, 'manager', [
    'user_role' => 'manager',
]);
*/
