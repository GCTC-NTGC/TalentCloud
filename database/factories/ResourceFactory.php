<?php

use App\Models\Resource;
use Illuminate\Support\Facades\Log;

$faker_fr = Faker\Factory::create('fr');
$dir = 'resources';

if (is_dir(storage_path('app/public/resources')) === false) {
    mkdir(storage_path('app/public/') . $dir);
}

$resources_dir = storage_path('app/public/resources');

// Get a list of all of the file names in the folder.
$files = glob(storage_path('app/public/resources') . '/*');

// Loop through the file list.
foreach ($files as $file) {
    // Make sure that this is a file and not a directory.
    if (is_file($file)) {
        // Use the unlink function to delete the file.
        unlink($file);
    }
}

$factory->define(Resource::class, function (Faker\Generator $faker) use ($faker_fr, $resources_dir) {

    // Add test file to test resources folder.
    $resource = $faker->md5 . '.txt';
    $file = fopen($resources_dir . '/' . $resource, 'w');
    fclose($file);

    return [
        'name' => [
            'en' => $faker->unique()->realText(27, 1),
            'fr' => $faker_fr->unique()->realText(27, 1)
        ],
        'file' =>  'resources/' . $resource,
    ];
});
