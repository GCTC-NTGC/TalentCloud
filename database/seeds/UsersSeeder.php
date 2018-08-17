<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserRole;
use App\Models\Manager;
use App\Models\Lookup\Department;

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
        $user->email = $faker->unique()->email();
        $user->is_confirmed = 1;
        $user->user_role_id = UserRole::where('name', 'manager')->first()->id;
        $user->open_id_sub = $faker->unique()->randomNumber(5);

        $user->save();

        $manager = new Manager();
        $nickname = $faker->firstName();
        $manager->twitter_username = $nickname;
        $manager->linkedin_username = $nickname;
        $manager->user_id = $user->id;
        $manager->department_id = Department::inRandomOrder()->first()->id;
        $manager->fill([
            'en' => [
                'about_me' => $faker->paragraphs(3,true),
                'greatest_accomplishment' => $faker->paragraphs(3,true),
                'branch' => $faker->word(),
                'division' => $faker->word(),
                'position' => $faker->word(),
                'leadership_style' => $faker->randomElement(['option0','option1','option2','option3']),
                'employee_learning' => $faker->randomElement(['option0','option1','option2','option3']),
                'expectations' => $faker->randomElement(['option0','option1','option2','option3']),
                'review_options' => $faker->randomElement(['option0','option1','option2','option3']),
                'staylate' => $faker->randomElement(['option0','option1','option2','option3']),
                'engage' => $faker->randomElement(['option0','option1','option2','option3']),
                'opportunities' => $faker->randomElement(['option0','option1','option2','option3']),
                'low_value_work_requests' => $faker->randomElement(['option0','option1','option2','option3']),
                'work_experience' => $faker->paragraphs(3,true),
                'education' => $faker->paragraphs(3,true)
            ],
            'fr' => [
                'about_me' => $faker_fr->paragraphs(3,true),
                'greatest_accomplishment' => $faker_fr->paragraphs(3,true),
                'branch' => $faker_fr->word(),
                'division' => $faker_fr->word(),
                'position' => $faker_fr->word(),
                'leadership_style' => $faker_fr->randomElement(['option0','option1','option2','option3']),
                'employee_learning' => $faker_fr->randomElement(['option0','option1','option2','option3']),
                'expectations' => $faker_fr->randomElement(['option0','option1','option2','option3']),
                'review_options' => $faker_fr->randomElement(['option0','option1','option2','option3']),
                'staylate' => $faker_fr->randomElement(['option0','option1','option2','option3']),
                'engage' => $faker_fr->randomElement(['option0','option1','option2','option3']),
                'opportunities' => $faker_fr->randomElement(['option0','option1','option2','option3']),
                'low_value_work_requests' => $faker_fr->randomElement(['option0','option1','option2','option3']),
                'work_experience' => $faker_fr->paragraphs(3,true),
                'education' => $faker_fr->paragraphs(3,true)
            ]
        ]);
        $manager->save();
    }

}
