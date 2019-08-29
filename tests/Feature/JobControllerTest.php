<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Mail;

use Jenssegers\Date\Date;

use App\Models\Applicant;
use App\Models\Lookup\Department;
use App\Models\JobPoster;
use App\Models\Lookup\LanguageRequirement;
use App\Models\Manager;
use App\Models\User;
use App\Models\Criteria;
use App\Models\Lookup\Province;
use App\Models\Lookup\SecurityClearance;
use App\Mail\JobPosterReviewRequested;

class JobControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp() : void
    {
        parent::setUp();

        $this->faker = \Faker\Factory::create();
        $this->faker_fr = \Faker\Factory::create('fr_FR');

        $this->manager = factory(Manager::class)->create();
        $this->jobPoster = factory(JobPoster::class)
        ->create([
            'manager_id' => $this->manager->id
        ]);

        $this->otherManager = factory(Manager::class)->create();
        $this->otherJobPoster = factory(JobPoster::class)
        ->create([
            'manager_id' => $this->otherManager->id
        ]);

        $this->publishedJob = factory(JobPoster::class)->states('published')->create();
    }

    /**
     * Generate an array with all the data that would be submitted through a completed edit/create job form.
     *
     * @return array
     */
    private function generateEditJobFormData() : array
    {
        $jobForm = [
        'term_qty' => $this->faker->numberBetween(1, 4),
        'salary_min' => $this->faker->numberBetween(60000, 80000),
        'salary_max' => $this->faker->numberBetween(80000, 100000),
        'noc' => $this->faker->numberBetween(1, 9999),
        'classification' => $this->faker->regexify('[A-Z]{2}-0[1-5]'),
        'manager_id' => $this->manager->id,
        'published' => false,
        'remote_work_allowed' => $this->faker->boolean(50),
        'open_date' => $this->faker->date('Y-m-d', strtotime('+1 day')),
        'close_date' => $this->faker->date('Y-m-d', strtotime('+2 weeks')),
        'start_date' => $this->faker->date('Y-m-d', strtotime('+2 weeks')),
        'security_clearance' => SecurityClearance::inRandomOrder()->first()->id,
        'language_requirement' => LanguageRequirement::inRandomOrder()->first()->id,
        'department' => Department::inRandomOrder()->first()->id,
        'province' => Province::inRandomOrder()->first()->id,
        'city' => $this->faker->city,
        'title' => [
            'en' => $this->faker->word,
            'fr' => $this->faker_fr->word
        ],
        // The form is named impact, but the controller saves it to the hire_impact field
        'impact' => [
            'en' => $this->faker->paragraphs(
                2,
                true
            ),
            'fr' => $this->faker_fr->paragraphs(
                2,
                true
            )
        ],
        'branch' => [
            'en' => $this->faker->word,
            'fr' => $this->faker_fr->word
        ],
        'division' => [
            'en' => $this->faker->word,
            'fr' => $this->faker_fr->word
        ],
        'education' => [
            'en' => $this->faker->sentence(),
            'fr' => $this->faker_fr->sentence()
        ],
        'submit' => '',
        ];
        return $jobForm;
    }

    /**
     * Create form data for a single Criterion
     *
     * @param integer      $criteria_type_id Must be 1 or 2, for essential or asset.
     * @param integer      $skill_id         Must be a valid skill id.
     * @param integer      $skill_level_id   Must be 1-4.
     * @param integer|null $crtiteria_id     Leave null if this is a new criteria.
     * @return mixed[]
     */
    private function generateCriteriaFormData(int $criteria_type_id, int $skill_id, int $skill_level_id, ?int $crtiteria_id = null)
    {
        $age = $crtiteria_id ? 'old' : 'new';
        $type = [1 => 'essential', 2 => 'asset'][$criteria_type_id];
        $id = $crtiteria_id ? $crtiteria_id : 1;
        $data['criteria'] = [
            $age => [
                $type => [
                    'soft' => [
                        $id => [
                            'skill_id' => $skill_id,
                            'skill_level_id' => $skill_level_id,
                            'description' => [
                                'en' => null,
                                'fr' => null,
                            ]
                        ]
                    ]
                ]
            ]
        ];
        return $data;
    }

    /**
     * Ensure an unauthorized user receives the correct job poster view.
     *
     * @return void
     */
    public function testGuestSingleView() : void
    {
        $response = $this->get('jobs/' . $this->publishedJob->id);
        $response->assertStatus(200);
        $response->assertSee(e(Lang::get('applicant/job_post')['apply']['login_link_title']));
    }

    /**
     * Ensure an authorized applicant receives the correct job poster view.
     *
     * @return void
     */
    public function testApplicantSingleView() : void
    {
        $applicant = factory(Applicant::class)->create();

        $response = $this->actingAs($applicant->user)
        ->get('jobs/' . $this->publishedJob->id);
        $response->assertStatus(200);
        $response->assertSee(e(Lang::get('applicant/job_post')['apply']['apply_link_title']));
    }

    /**
     * Ensure a manager can view their index page.
     *
     * @return void
     */
    public function testManagerIndexView() : void
    {
        $response = $this->actingAs($this->manager->user)
        ->get('manager/jobs');
        $response->assertStatus(200);

        $response->assertSee(e($this->jobPoster->title));
        $response->assertDontSeeText(e($this->otherJobPoster->title));
    }

    /**
     * Ensure a Job Poster can be submitted for review.
     *
     * @return void
     */
    public function testSubmitForReview() : void
    {
        Mail::fake();

        $jobPoster = $this->jobPoster;

        $response = $this->followingRedirects()
        ->actingAs($this->manager->user)
        ->post("manager/jobs/$jobPoster->id/review");

        $response->assertStatus(200);

        $jobPoster->refresh();

        $this->assertInstanceOf(Date::class, $jobPoster->review_requested_at);

        Mail::assertQueued(JobPosterReviewRequested::class, function ($mail) use ($jobPoster) {
            return $mail->jobPoster->id === $jobPoster->id;
        });
    }

    // TODO: Managers cannot create job posters until Job Poster Builder is complete
    // /**
    // * Ensure a manager can view the create Job Poster form.
    // *
    // * @return void
    // */
    // public function testManagerCreateView() : void
    // {
    // $response = $this->actingAs($this->manager->user)
    // ->get('manager/jobs/create');
    // $response->assertStatus(200);
    // $response->assertSee(e(Lang::get('manager/job_create')['title']));
    // $response->assertViewIs('manager.job_create');
    // $response->assertSee(e(Lang::get('manager/job_create', [], 'en')['questions']['00']));
    // $response->assertSee(e(Lang::get('manager/job_create', [], 'fr')['questions']['00']));
    // }
    // /**
    // * Ensure a manager can create a Job Poster.
    // *
    // * @return void
    // */
    // public function testManagerCreate() : void
    // {
    // $newJob = $this->generateEditJobFormData();
    // $dbValues = array_slice($newJob, 0, 8);
    // $response = $this->followingRedirects()
    // ->actingAs($this->manager->user)
    // ->post('manager/jobs/', $newJob);
    // $response->assertStatus(200);
    // $response->assertViewIs('applicant.job_post');
    // $this->assertDatabaseHas('job_posters', $dbValues);
    // $response->assertSee(e(Lang::get('applicant/job_post')['apply']['edit_link_title']));
    // }

    /**
     * Ensure a manager can edit an unpublished Job Poster they created.
     *
     * @return void
     */
    public function testManagerEditView() : void
    {
        $response = $this->actingAs($this->manager->user)
        ->get('manager/jobs/' . $this->jobPoster->id . '/edit');

        $response->assertStatus(200);
        $response->assertViewIs('manager.job_create');
        // Check for a handful of properties
        $response->assertSee(e($this->jobPoster->city));
        $response->assertSee(e($this->jobPoster->education));
        $response->assertSee(e($this->jobPoster->title));
        $response->assertSee(e($this->jobPoster->hire_impact));
        $response->assertSee(e($this->jobPoster->branch));
        $response->assertSee(e($this->jobPoster->division));
        $response->assertSee(e($this->jobPoster->education));
    }

    /**
     * An admin saving edits to the job should not change the jobs manager.
     *
     * @return void
     */
    public function testAdminEditDoesntChangeManager() : void
    {
        // In order to simulate actual behaviour, the admin
        // user needs a related Manager instance. When navigating
        // around the site as an admin, a middleware will be triggered
        // to create this relationship. (InitializeUser)
        $admin = factory(User::class)->states('admin')->create();
        $admin->manager_id = factory(Manager::class)->create([
            'user_id' => $admin->id
        ]);
        $admin->applicant_id = factory(Applicant::class)->create([
            'user_id' => $admin->id
        ]);

        $manager = factory(Manager::class)->create();
        $job = factory(JobPoster::class)->create([
            'manager_id' => $manager->id
        ]);
        $jobEdit = $this->generateEditJobFormData();
        $this->actingAs($admin)->post(route('admin.jobs.update', $job), $jobEdit);
        $job->refresh();
        $this->assertEquals($manager->user->id, $job->manager->user->id);
    }

    /**
     * Ensure a manager cannot edit a published Job Poster they created.
     *
     * @return void
     */
    public function testManagerCanNotEditViewPublished() : void
    {
        $response = $this->actingAs($this->manager->user)
        ->get('manager/jobs/' . $this->publishedJob->id . '/edit');

        $response->assertStatus(403);
    }

    /**
     * Adding a 'published' field to the create job form data should affect the created job.
     *
     * @return void
     */
    public function testManagerCannotPublishJobThroughEditView() : void
    {
        $job = factory(JobPoster::class)->states('draft')->create([
            'manager_id' => $this->manager->id
        ]);
        $jobEdit = $this->generateEditJobFormData();
        $jobEdit['published'] = true;

        $dbValues = array_slice($jobEdit, 0, 8);
        $dbValues['published'] = false;

        $response = $this->followingRedirects()
            ->actingAs($this->manager->user)
            ->post(route('admin.jobs.update', $job), $jobEdit);
        $response->assertStatus(200);
        $this->assertDatabaseHas('job_posters', $dbValues);
    }

    /**
     * Ensure that open and close datetimes are set to midnight PT
     * at the start and end of the desired day.
     *
     * @return void
     */
    public function testSavedJobHasCorrectTimes() : void
    {
        $localTimezone = config('app.local_timezone');
        $jobTimezone = config('app.job_timezone');
        $dateFormat = config('app.date_format')['en'];
        $timeFormat = config('app.time_format')['en'];

        $expectedOpenDateTime = new Date('2019-01-01 00:00:00', new \DateTimeZone($jobTimezone));
        $expectedOpenDateTime->setTimezone($localTimezone);
        $expectedOpenDate = $expectedOpenDateTime->format($dateFormat);
        $expectedOpenTime = $expectedOpenDateTime->format($timeFormat);

        $expectedCloseDateTime = new Date('2019-01-31 23:59:59', new \DateTimeZone($jobTimezone));
        $expectedCloseDateTime->setTimezone($localTimezone);
        $expectedCloseDate = $expectedCloseDateTime->format($dateFormat);
        $expectedCloseTime = $expectedCloseDateTime->format($timeFormat);

        $job = factory(JobPoster::class)->states('draft')->create([
            'manager_id' => $this->manager->id
        ]);

        $jobEdit = $this->generateEditJobFormData();
        $jobEdit['open_date'] = '2019-01-01';
        $jobEdit['close_date'] = '2019-01-31';

        // Expected db values
        $dbValues = array_slice($jobEdit, 0, 8);

        $response = $this->followingRedirects()
            ->actingAs($this->manager->user)
            ->post(route('admin.jobs.update', $job), $jobEdit);

        $this->assertDatabaseHas('job_posters', $dbValues);

        $savedJob = JobPoster::where($dbValues)->first();
        $this->assertEquals($expectedOpenTime, humanizeTime($savedJob->open_date_time));
        $this->assertEquals($expectedOpenDate, humanizeDate($savedJob->open_date_time));
        $this->assertEquals($expectedCloseDate, humanizeDate($savedJob->close_date_time));
        $this->assertEquals($expectedCloseTime, humanizeTime($savedJob->close_date_time));
    }

    /**
     * Adding criteria to an existing job should work,
     * and should create an AssessmentPlanNotification
     *
     * @return void
     */
    public function testAddCriteria(): void
    {
        $job = factory(JobPoster::class)->states('draft')->create([
            'manager_id' => $this->manager->id
        ]);
        $data = $this->generateEditJobFormData();
        $data = array_merge(
            $this->generateEditJobFormData(),
            $this->generateCriteriaFormData(2, 28, 2)
        );
        $response = $this->followingRedirects()
            ->actingAs($this->manager->user)
            ->post(route('admin.jobs.update', $job), $data);
        $response->assertStatus(200);

        // Check the criteria has been added to job
        $criteriaValues = [
            'criteria_type_id' => 2, // asset
            'job_poster_id' => $job->id,
            'skill_id' => 28,
            'skill_level_id' => 2
        ];
        $this->assertDatabaseHas('criteria', $criteriaValues);

        // Check the AssessmentPlanNotification has been created
        $notificationValues = [
            'type' => 'CREATE',
            'job_poster_id' => $job->id,
            'criteria_type_id' => 2, // asset
            'criteria_type_id_new' => null,
            'job_poster_id' => $job->id,
            'skill_id' => 28,
            'skill_id_new' => null,
            'skill_level_id' => 2,
            'skill_level_id_new' => null,
            'acknowledged' => false
        ];
        $this->assertDatabaseHas('assessment_plan_notifications', $notificationValues);
    }

    /**
     * Updating criteria in an job should work,
     * and should create an AssessmentPlanNotification
     *
     * @return void
     */
    public function testUpdateCriteria(): void
    {
        $job = factory(JobPoster::class)->states('draft')->create([
            'manager_id' => $this->manager->id
        ]);
        $criteria = factory(Criteria::class)->create(
            [
                'job_poster_id' => $job->id,
                'criteria_type_id' => 1,
                'skill_id' => 28,
                'skill_level_id' => 3,
                'description:en' => 'DESCRIPTION',
                'description:fr' => 'DESCRIPTION'
            ]
        );
        $job->criteria()->save($criteria);

        $this->assertDatabaseHas('criteria', [
            'id' => $criteria->id,
            'criteria_type_id' => 1,
            'job_poster_id' => $job->id,
            'skill_id' => 28,
            'skill_level_id' => 3
        ]); // Sanity check

        $data = $this->generateEditJobFormData();
        $data = array_merge(
            $this->generateEditJobFormData(),
            $this->generateCriteriaFormData(1, 28, 4, $criteria->id) // Changed skill level
        );

        $response = $this->followingRedirects()
            ->actingAs($this->manager->user)
            ->post(route('admin.jobs.update', $job), $data);
        $response->assertStatus(200);

        // Check the criteria has been updated
        $criteriaValues = [
            'id' => $criteria->id,
            'criteria_type_id' => 1,
            'job_poster_id' => $job->id,
            'skill_id' => 28,
            'skill_level_id' => 4 // updated from 3
        ];
        $this->assertDatabaseHas('criteria', $criteriaValues);

        // Check the AssessmentPlanNotification has been created
        $notificationValues = [
            'type' => 'UPDATE',
            'job_poster_id' => $job->id,
            'criteria_type_id' => 1,
            'job_poster_id' => $job->id,
            'skill_id' => 28,
            'skill_id_new' => 28,
            'skill_level_id' => 3,
            'skill_level_id_new' => 4,
            'criteria_type_id_new' => 1,
            'acknowledged' => false
        ];
        $this->assertDatabaseHas('assessment_plan_notifications', $notificationValues);
    }

    /**
     * Deleting criteria from a job should work,
     * and should create an AssessmentPlanNotification
     *
     * @return void
     */
    public function testDeleteCriteria(): void
    {
        $job = factory(JobPoster::class)->states('draft')->create([
            'manager_id' => $this->manager->id
        ]);
        $criteria = factory(Criteria::class)->create(
            [
                'job_poster_id' => $job->id,
                'criteria_type_id' => 1,
                'skill_id' => 28,
                'skill_level_id' => 3,
                'description:en' => 'DESCRIPTION',
                'description:fr' => 'DESCRIPTION'
            ]
        );
        $job->criteria()->save($criteria);

        $this->assertDatabaseHas('criteria', [
            'id' => $criteria->id,
            'criteria_type_id' => 1,
            'job_poster_id' => $job->id,
            'skill_id' => 28,
            'skill_level_id' => 3
        ]); // Sanity check

        // Delete criteria by simply not including them in the new form data.
        $data = $this->generateEditJobFormData();

        $response = $this->actingAs($this->manager->user)
            ->post(route('admin.jobs.update', $job), $data);
        // $response->assertStatus(200);
        // Check the criteria has been removed
        $criteriaValues = [
            'id' => $criteria->id,
        ];
        // print_r(Criteria::find($criteria->id) ? Criteria::find($criteria->id)->toArray() : "NULL");
        $this->assertDatabaseMissing('criteria', $criteriaValues);

        // Check the AssessmentPlanNotification has been created
        $notificationValues = [
            'type' => 'DELETE',
            'job_poster_id' => $job->id,
            'criteria_type_id' => 1,
            'criteria_type_id_new' => null,
            'job_poster_id' => $job->id,
            'skill_id' => 28,
            'skill_id_new' => null,
            'skill_level_id' => 3,
            'skill_level_id_new' => null,
            'acknowledged' => false
        ];
        $this->assertDatabaseHas('assessment_plan_notifications', $notificationValues);
    }
}
