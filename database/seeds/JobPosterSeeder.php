<?php

use Illuminate\Database\Seeder;
use App\Models\JobPoster;
use App\Models\Manager;
use App\Models\Criteria;
use App\Models\Lookup\CriteriaType;
use App\Models\JobPosterKeyTask;
use App\Models\Lookup\JobTerm;
use App\Models\Lookup\Department;
use App\Models\Lookup\SkillLevel;
use App\Models\Lookup\Province;
use App\Models\Lookup\SecurityClearance;
use App\Models\Lookup\LanguageRequirement;
use App\Models\JobPosterQuestion;
use App\Models\Skill;

class JobPosterSeeder extends Seeder
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

        $job = new JobPoster();
        $job->manager_id = Manager::inRandomOrder()->first()->id;
        $job->fill([
            'published' => true,
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
            'published' => true,
            'en' => [
                'city' => $faker->city(),
                'title' => $faker->word(),
                'impact' => $faker->paragraphs(2, true),
                'branch' => $faker->word(),
                'division' => $faker->word(),
                'education' => $faker->sentence(),
            ],
            'fr' => [
                'city' => $faker_fr->city(),
                'title' => $faker_fr->word(),
                'impact' => $faker_fr->paragraphs(2, true),
                'branch' => $faker_fr->word(),
                'division' => $faker_fr->word(),
                'education' => $faker_fr->sentence(),
            ]
        ]);

        $job->save();

        //Create 3-6 criteria
        for($i=0; $i< $faker->numberBetween(3,6); $i++) {
            $criteria = new Criteria();
            $criteria->criteria_type_id = CriteriaType::inRandomOrder()->first()->id;
            $criteria->job_poster_id = $job->id;
            $criteria->skill_id = Skill::inRandomOrder()->first()->id;
            $criteria->skill_level_id = SkillLevel::inRandomOrder()->first()->id;
            $criteria->fill([
                'en' => [
                    'description' => $faker->sentence(),
                ],
                'fr' => [
                    'description' => $faker_fr->sentence(),
                ],
            ]);
            $criteria->save();
        }

        //Create 2-4 key tasks
        for($i=0; $i< $faker->numberBetween(2,4); $i++) {
            $keyTask = new JobPosterKeyTask();
            $keyTask->job_poster_id = $job->id;
            $keyTask->fill([
                'en' => [
                    'description' => $faker->sentence()
                ],
                'fr' => [
                    'description' => $faker_fr->sentence()
                ]

            ]);
            $keyTask->save();
        }

        //Create 2-3 questions tasks
        for($i=0; $i< $faker->numberBetween(2,3); $i++) {
            $question = new JobPosterQuestion();
            $question->job_poster_id = $job->id;
            $question->fill([
                'en' => [
                    'question' => $faker->sentence(),
                    'description' => $faker->paragraph()
                ],
                'fr' => [
                    'question' => $faker->sentence(),
                    'description' => $faker->paragraph()
                ]

            ]);
            $question->save();
        }
    }
}
