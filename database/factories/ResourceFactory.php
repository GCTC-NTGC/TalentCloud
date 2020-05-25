<?php

use App\Models\Resource;
use Illuminate\Support\Facades\Log;

$faker_fr = Faker\Factory::create('fr');
$dir = 'resources';

if (is_dir(storage_path('app/public/' . $dir)) === false) {
    mkdir(storage_path('app/public/') . $dir);
}

$resources_dir = storage_path('app/public/' . $dir);

$factory->define(Resource::class, function (Faker\Generator $faker) use ($faker_fr, $resources_dir) {

    // Add test file to test resources folder.
    $resource = $faker->md5 . '.txt';
    $file = fopen($resources_dir . '/' . $resource, 'w');
    fwrite($file, $faker->paragraph());
    fclose($file);

    return [
        'name' => [
            'en' => $faker->unique()->realText(27, 1),
            'fr' => $faker_fr->unique()->realText(27, 1)
        ],
        'file' =>  'resources/' . $resource,
    ];
});
