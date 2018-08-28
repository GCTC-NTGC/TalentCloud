<?php

use Illuminate\Database\Seeder;
use App\Models\Manager;
use App\Models\TeamCulture;

class TeamCultureSeeder extends Seeder
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
        $managers = Manager::doesntHave('team_culture')->get();

        foreach($managers as $manager) {
            $teamCulture = new TeamCulture();
            $teamCulture->manager_id = $manager->id;
            $teamCulture->fill([
                'team_size' => $faker->numberBetween(5, 15),
                'gc_directory_url' => $faker->url(),
                'en' => [
                    'narrative_text' => $faker->paragraphs(2,true),
                    'operating_context' => $faker->paragraph(),
                    'what_we_value' => $faker->paragraph(),
                    'how_we_work' => $faker->paragraph()
                ],
                'fr' => [
                    'narrative_text' => $faker_fr->paragraphs(2,true),
                    'operating_context' => $faker_fr->paragraph(),
                    'what_we_value' => $faker_fr->paragraph(),
                    'how_we_work' => $faker_fr->paragraph()
                ]
            ]);

            $teamCulture->save();
        }
    }
}
