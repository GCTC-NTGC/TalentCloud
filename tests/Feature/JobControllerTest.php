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
        'salary_min' => $this->faker->numberBetween(60000, 80000),
        'salary_max' => $this->faker->numberBetween(80000, 100000),
        'noc' => $this->faker->numberBetween(1, 9999),
        'open_date' => $this->faker->date('Y-m-d', strtotime('+1 day')),
        'close_date' => $this->faker->date('Y-m-d', strtotime('+2 weeks')),
        'start_date' => $this->faker->date('Y-m-d', strtotime('+2 weeks')),
        'submit' => '',
        ];
        return $jobForm;
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

    public function testSubmitForReviewFailsForDemoManager() : void
    {
        $jobPoster = factory(JobPoster::class)->state('draft')->create();

        $response = $this->followingRedirects()
            ->actingAs($jobPoster->manager->user)
            ->post("manager/jobs/$jobPoster->id/review");

        $response->assertForbidden();
    }

    /**
     * Ensure a Job Poster can be submitted for review.
     *
     * @return void
     */
    public function testSubmitForReviewSucceedsForUpgradedManager() : void
    {
        Mail::fake();

        $jobPoster = factory(JobPoster::class)->states(['byUpgradedManager', 'draft'])->create();
        $response = $this->followingRedirects()
        ->actingAs($jobPoster->manager->user)
        ->post("manager/jobs/$jobPoster->id/review");
        // dd($response->baseResponse->exception);
        $response->assertStatus(200);

        $jobPoster->refresh();

        $this->assertInstanceOf(Date::class, $jobPoster->review_requested_at);

        Mail::assertQueued(JobPosterReviewRequested::class, function ($mail) use ($jobPoster) {
            return $mail->jobPoster->id === $jobPoster->id;
        });
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
        $dbValues = array_slice($jobEdit, 0, 3);

        $admin = factory(User::class)->states('admin')->create();
        $response = $this->followingRedirects()
            ->actingAs($admin)
            ->post(route('admin.jobs.update', $job), $jobEdit);

        $this->assertDatabaseHas('job_posters', $dbValues);

        $savedJob = JobPoster::where($dbValues)->first();
        $this->assertEquals($expectedOpenTime, humanizeTime($savedJob->open_date_time));
        $this->assertEquals($expectedOpenDate, humanizeDate($savedJob->open_date_time));
        $this->assertEquals($expectedCloseDate, humanizeDate($savedJob->close_date_time));
        $this->assertEquals($expectedCloseTime, humanizeTime($savedJob->close_date_time));
    }
}
