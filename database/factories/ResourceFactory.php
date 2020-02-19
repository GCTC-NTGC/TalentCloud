<?php

use App\Models\Resource;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Log;

$factory->define(Resource::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->realText(27, 1),
        // 'file' =>
    ];
});
