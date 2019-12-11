<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Comment;
use App\Models\Lookup\CommentType;
use App\Models\JobPoster;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    return [
        'job_poster_id' => function () {
            return factory(JobPoster::class)->create()->id;
        },
        'user_id' => function () {
            return factory(User::class)->create()->id;
        },
        'comment' => $faker->sentence(),
        'location' => $faker->word(),
        'type_id' => CommentType::inRandomOrder()->first()->id,
    ];
});
