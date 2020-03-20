<?php

use App\Models\Applicant;
use App\Models\HrAdvisor;
use App\Models\JobApplication;
use App\Models\JobPoster;
use App\Models\Manager;
use App\Models\User;
use Illuminate\Database\Seeder;

class StrategicResponseSeeder extends Seeder // phpcs:ignore
{

    /**
     * Manager for Strategic Talent Response jobs.
     *
     * @var string
     */
    protected $strManagerEmail = 'str_manager@test.com';

    /**
     * HR Advisor for Strategic Talent Response jobs.
     *
     * @var string
     */
    protected $strHrEmail = 'str_hr@test.com';

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $str_department_id = config('app.strategic_response_department_id');

        DB::table('departments')->updateOrInsert(
            ['id' => $str_department_id],
            [
                'name' => json_encode([
                    'en' => 'Strategic Talent Response',
                    'fr' => 'Réponse stratégique de talents'
                ]),
                'impact' => json_encode([
                    'en' => 'Impact text placeholder',
                    'fr' => 'Impact text placeholder'
                ]),
                'preference' => json_encode([
                    'en' => 'You must currently be an employee of the Government of Canada with valid security clearance to apply to this opportunity.',
                    'fr' => 'Vous devez actuellement être un employé du gouvernement du Canada avec une habilitation de sécurité valide pour postuler à cette opportunité.'
                ]),
            ]
        );

        $hrUser = User::where('email', $this->strHrEmail)->first();
        if ($hrUser === null) {
            $hrUser = factory(User::class)->state('hr_advisor')->create([
                'email' => $this->strHrEmail,
                'department_id' => $str_department_id,
            ]);
            $hrUser->hr_advisor()->save(factory(HrAdvisor::class)->create([
                'user_id' => $hrUser->id,
            ]));
        }

        $managerUser = User::where('email', $this->strManagerEmail)->first();
        // Create the test manager if it does not exist yet.
        if ($managerUser === null) {
            $managerUser = factory(User::class)->state('upgradedManager')->create([
                'email' => $this->strManagerEmail,
                'department_id' => $str_department_id,
            ]);
            $managerUser->manager()->save(factory(Manager::class)->create([
                'user_id' => $managerUser->id,
            ]));
        }

        factory(JobPoster::class, 100)->states(['live', 'strategic_response'])->create([
            'manager_id' => $managerUser->manager->id
        ])->each(function ($job): void {
            $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
                'job_poster_id' => $job->id
            ]);
        });
    }
}
