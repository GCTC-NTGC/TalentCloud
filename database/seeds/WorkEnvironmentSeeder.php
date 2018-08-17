<?php

use Illuminate\Database\Seeder;
use App\Models\Manager;
use App\Models\WorkEnvironment;

class WorkEnvironmentSeeder extends Seeder
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

        //Find all managers that don't have a work environment yet
        $managers = Manager::doesntHave('work_environment')->get();

        foreach($managers as $manager) {
            $workEnvironment = new WorkEnvironment();
            $workEnvironment->manager_id = $manager->id;
            $workEnvironment->fill([
                'remote_allowed' =>  $this->faker->randomElement(['option0','option1']),
                'telework_allowed' =>  $this->faker->randomElement(['option0','option1','option2','option3','option4']),
                'flexible_allowed' =>  $this->faker->randomElement(['option0','option1','option2','option3','option4']),
            ]);
            $workEnvironment->save();
        }        
    }
}
