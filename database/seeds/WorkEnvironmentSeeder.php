<?php

use Illuminate\Database\Seeder;
use App\Models\Manager;
use App\Models\WorkEnvironment;
use App\Models\Lookup\Frequency;

class WorkEnvironmentSeeder extends Seeder
{
    protected $faker;
    protected $faker_fr;

    public function __construct(Faker\Generator $faker) {
        $this->faker = $faker;
        $this->faker_fr = Faker\Factory::create('fr');
    }

    /**
     * Run the Users table seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = $this->faker;
        $faker_fr = $this->faker_fr;

        //Find all managers that don't have a work environment yet
        $managers = Manager::doesntHave('work_environment')->get();

        foreach($managers as $manager) {
            $workEnvironment = new WorkEnvironment();
            $workEnvironment->manager_id = $manager->id;
            $workEnvironment->fill([
                'remote_work_allowed' => $this->faker->boolean(),
                'telework_allowed_frequency_id' => Frequency::inRandomOrder()->first()->id,
                'flexible_hours_frequency_id' => Frequency::inRandomOrder()->first()->id,
                'en' => [
                    'things_to_know' => $faker->paragraph()
                ],
                'fr' => [
                    'things_to_know' => $faker_fr->paragraph()
                ]
            ]);
            $workEnvironment->save();
        }
    }
}
