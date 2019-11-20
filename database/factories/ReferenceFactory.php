<?php

use Faker\Generator as Faker;
use App\Models\Reference;
use App\Models\Lookup\Relationship;
use App\Models\Applicant;
use App\Models\Project;

$factory->define(Reference::class, function (Faker $faker) {
    return [
        'name' => $faker->name(),
        'email' => $faker->safeEmail(),
        'description' => $faker->paragraphs(2, true),
        'relationship_id' => Relationship::inRandomOrder()->first()->id,
        'referenceable_id' => function () {
            // Default factory references to belong to Applicant, not JobApplication.
            return factory(Applicant::class)->create()->id;
        },
        'referenceable_type' => 'applicant',
    ];
});

$factory->define(Project::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence(),
        'start_date' => $faker->dateTimeBetween('-3 years', '-1 years'),
        'end_date' => $faker->dateTimeBetween('-1 years', '-1 day'),
        'projectable_id' => function () {
            return factory(Applicant::class)->create()->id;
        },
        'projectable_type' => 'applicant'
    ];
});

$factory->afterCreating(Reference::class, function ($reference) : void {
    $reference->projects()->saveMany(factory(Project::class, 3)->make([
        'projectable_id' => $reference->referenceable_id,
        'projectable_type' => 'applicant'
    ]));
});
