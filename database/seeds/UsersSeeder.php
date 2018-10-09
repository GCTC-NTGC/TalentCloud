<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserRole;
use App\Models\Manager;
use App\Models\Lookup\Department;
use App\Models\Lookup\Frequency;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder {

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
    public function run() {
        $faker = $this->faker;
        $faker_fr = $this->faker_fr;

        //Create a manager
        $user = new User();
        $user->name = $faker->name();
        $user->email = $faker->unique()->safeEmail();
        $user->password = Hash::make('password');
        $user->is_confirmed = 1;
        $user->user_role_id = UserRole::where('name', 'manager')->first()->id;
        $user->remember_token = str_random(10);
        //$user->open_id_sub = $faker->unique()->randomNumber(5);

        $user->save();

        $manager = new Manager();
        $nickname = $faker->firstName();
        $manager->twitter_username = $nickname;
        $manager->linkedin_url = $faker->url();
        $manager->user_id = $user->id;
        $manager->department_id = Department::inRandomOrder()->first()->id;
        $manager->work_review_frequency_id = Frequency::inRandomOrder()->first()->id;
        $manager->stay_late_frequency_id = Frequency::inRandomOrder()->first()->id;
        $manager->engage_team_frequency_id = Frequency::inRandomOrder()->first()->id;
        $manager->development_opportunity_frequency_id = Frequency::inRandomOrder()->first()->id;
        $manager->refuse_low_value_work_frequency_id = Frequency::inRandomOrder()->first()->id;
        $manager->years_experience = $faker->numberBetween(2,25);
        $manager->fill([
            'en' => [
                'about_me' => $faker->paragraphs(3,true),
                'greatest_accomplishment' => $faker->paragraphs(3,true),
                'branch' => $faker->word(),
                'division' => $faker->word(),
                'position' => $faker->word(),
                'leadership_style' => $faker->paragraph(),
                'employee_learning' => $faker->paragraph(),
                'expectations' => $faker->paragraph(),
                'career_journey' => $faker->paragraphs(3,true),
                'learning_path' => $faker->paragraphs(3,true),
                'education' => $faker->paragraphs(3,true)
            ],
            'fr' => [
                'about_me' => $faker_fr->paragraphs(3,true),
                'greatest_accomplishment' => $faker_fr->paragraphs(3,true),
                'branch' => $faker_fr->word(),
                'division' => $faker_fr->word(),
                'position' => $faker_fr->word(),
                'leadership_style' => $faker_fr->paragraph(),
                'employee_learning' => $faker_fr->paragraph(),
                'expectations' => $faker_fr->paragraph(),
                'career_journey' => $faker_fr->paragraphs(3,true),
                'learning_path' => $faker_fr->paragraphs(3,true),
                'education' => $faker_fr->paragraphs(3,true)
            ]
        ]);
        $manager->save();
    }

}
