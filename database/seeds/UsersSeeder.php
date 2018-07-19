<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserRole;
use App\Models\Manager;
use App\Models\Lookup\Department;

class UsersSeeder extends Seeder {

    protected $faker;

    public function __construct(Faker\Generator $faker) {
        $this->faker = $faker;
    }

    /**
     * Run the Users table seeds.
     *
     * @return void
     */
    public function run() {
        //Create a manager
        $user = new User();
        $user->name = $this->faker->name();
        $user->email = $this->faker->unique()->email();
        $user->is_confirmed = 1;
        $user->user_role_id = UserRole::where('name', 'manager')->first()->id;
        $user->open_id_sub = $this->faker->unique()->randomNumber(5);

        $user->save();

        $manager = new Manager();
        $nickname = $this->faker->firstName();
        $manager->twitter_username = $nickname;
        $manager->linkedin_username = $nickname;
        $manager->user_id = $user->id;
        $manager->department_id = Department::inRandomOrder()->first()->id;
        $manager->fill([
            'en' => [
                'aboutme' => $this->faker->paragraphs(3,true),
                'greatest_accomplishment' => $this->faker->paragraphs(3,true),
                'branch' => $this->faker->word(),
                'division' => $this->faker->word(),
                'position' => $this->faker->word(),
                'leadership_style' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'employee_learning' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'expectations' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'review_options' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'staylate' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'engage' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'opportunities' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'low_value_work_requests' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'work_experience' => $this->faker->paragraphs(3,true),
                'education' => $this->faker->paragraphs(3,true)
            ],
            'fr' => [
                'aboutme' => $this->faker->paragraphs(3,true),
                'greatest_accomplishment' => $this->faker->paragraphs(3,true),
                'branch' => $this->faker->word(),
                'division' => $this->faker->word(),
                'position' => $this->faker->word(),
                'leadership_style' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'employee_learning' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'expectations' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'review_options' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'staylate' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'engage' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'opportunities' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'low_value_work_requests' => $this->faker->randomElement(['option0','option1','option2','option3']),
                'work_experience' => $this->faker->paragraphs(3,true),
                'education' => $this->faker->paragraphs(3,true)
            ]
        ]);
        $manager->save();
    }

}
