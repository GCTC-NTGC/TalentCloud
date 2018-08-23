<?php

use Illuminate\Database\Seeder;
use App\Models\JobPoster;
use App\Models\Manager;
use App\Models\Lookup\JobTerm;
use App\Models\Lookup\Department;
use App\Models\Lookup\Province;
use App\Models\Lookup\SecurityClearance;
use App\Models\Lookup\LanguageRequirement;

class JobPosterSeeder extends Seeder
{
    protected $faker;
    
    public function __construct(Faker\Generator $faker) {
        $this->faker = $faker;
    }
    
    /**
     * Run the Users table seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = $this->faker;
        
        $job = new JobPoster();
        $job->manager_id = Manager::inRandomOrder()->first()->id;
        $job->fill([                
            'job_term_id' => JobTerm::inRandomOrder()->first()->id,
            'term_qty' => $faker->numberBetween(1, 4),
            'open_date_time' => $faker->dateTimeBetween('-1 months','now'),
            'close_date_time' => $faker->dateTimeBetween('now', '1 months'),
            'start_date_time' => $faker->dateTimeBetween('1 months','2 months'),
            'department_id' => Department::inRandomOrder()->first()->id,
            'province_id' => Province::inRandomOrder()->first()->id,
            'salary_min' => $faker->numberBetween(60000, 80000),
            'salary_max' => $faker->numberBetween(80000,100000),
            'noc' => $faker->numberBetween(1, 9999),
            'classification' => $faker->regexify('[A-Z]{2}-0[1-5]'),
            'security_clearance_id' => SecurityClearance::inRandomOrder()->first()->id,
            'language_requirement_id' => LanguageRequirement::inRandomOrder()->first()->id,
            'en' => [
                'city' => $faker->city(),
                'title' => $faker->word(),
                'impact' => $faker->paragraphs(2, true),
                'branch' => $faker->word(),
                'division' => $faker->word()                
            ],
            'fr' => [
                'city' => $faker->city(),
                'title' => $faker->word(),
                'impact' => $faker->paragraphs(2, true),
                'branch' => $faker->word(),
                'division' => $faker->word()                
            ]
        ]);
        $job->save();
    }
}
