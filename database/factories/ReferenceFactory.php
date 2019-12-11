<?php

use Faker\Generator as Faker;
use App\Models\Reference;
use App\Models\Lookup\Relationship;
use App\Models\Applicant;
use App\Models\Project;

$factory->define(Reference::class, function(Faker $faker){
    return [
        'name' => $faker->name(),
        'email' => $faker->safeEmail(),
        'description' => $faker->paragraphs(2, true),
        'relationship_id' => Relationship::inRandomOrder()->first()->id,
        'applicant_id' => function(){
            return factory(Applicant::class)->create()->id;
        },
    ];
});

$factory->define(Project::class, function(Faker $faker){
    return [
        'name' => $faker->sentence(),
        'start_date' => $faker->dateTimeBetween('-3 years', '-1 years'),
        'end_date' => $faker->dateTimeBetween('-1 years', '-1 day'),
        'applicant_id' => function(){
            return factory(Applicant::class)->create()->id;
        },
    ];
});

$factory->afterCreating(Reference::class, function($reference) : void {
    $reference->projects()->saveMany(factory(Project::class, 3)->make([
        'applicant_id' => $reference->applicant_id
    ]));
});
