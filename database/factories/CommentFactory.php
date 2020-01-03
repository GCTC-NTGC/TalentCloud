<?php

use App\Models\Comment;
use App\Models\Lookup\CommentType;
use App\Models\JobPoster;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    return [
        'comment' => $faker->sentence(),
        'location' => $faker->word(), // TODO: Using a real location would be more useful here.
        'type_id' => CommentType::inRandomOrder()->first()->id,
    ];
});
