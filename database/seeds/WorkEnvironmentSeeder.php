<?php

use Illuminate\Database\Seeder;
use App\Models\Manager;
use App\Models\WorkEnvironment;
use App\Models\Lookup\Frequency;

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
                'remote_work_allowed' => $this->faker->boolean(),
                'telework_allowed_frequency_id' => Frequency::inRandomOrder()->first()->id,
                'flexible_hours_frequency_id' => Frequency::inRandomOrder()->first()->id,
            ]);
            $workEnvironment->save();
        }
    }
}
