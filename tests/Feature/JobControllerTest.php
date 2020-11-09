<?php

namespace Tests\Feature;

use App\Mail\JobPosterReviewRequested;
use App\Models\Applicant;
use App\Models\HrAdvisor;
use App\Models\JobApplication;
use App\Models\JobPoster;

use App\Models\Manager;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Mail;
use Jenssegers\Date\Date;
use Tests\TestCase;

class JobControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp(): void
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

        $this->liveJob = factory(JobPoster::class)->state('live')->create();
    }

    /**
     * Generate an array with all the data that would be submitted through a completed edit/create job form.
     *
     * @return array
     */
    private function generateEditJobFormData(): array
    {
        $jobForm = [
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
    public function testGuestSingleView(): void
    {
        $response = $this->get('jobs/' . $this->liveJob->id);
        $response->assertStatus(200);
        $response->assertSee(Lang::get('applicant/job_post')['apply']['login_link_title']);
    }

    /**
     * Ensure an authorized applicant receives the correct job poster view.
     *
     * @return void
     */
    public function testApplicantSingleView(): void
    {
        $applicant = factory(Applicant::class)->create();

        $response = $this->actingAs($applicant->user)
            ->get('jobs/' . $this->liveJob->id);
        $response->assertStatus(200);
        $response->assertSee(Lang::get('applicant/job_post')['apply']['apply_link_title']);
    }

    /**
     * Ensure a manager can view their index page.
     *
     * @return void
     */
    public function testManagerIndexView(): void
    {
        $response = $this->actingAs($this->manager->user)
            ->get('manager/jobs');
        $response->assertStatus(200);

        $response->assertSee($this->jobPoster->title);
        $response->assertDontSeeText($this->otherJobPoster->title);
    }

    /**
     * An admin saving edits to the job should not change the jobs manager.
     *
     * @return void
     */
    public function testAdminEditDoesntChangeManager(): void
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
    public function testSavedJobHasCorrectTimes(): void
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

        $jobEdit['id'] = $job->id;
        $jobEdit['open_date_time'] = '2019-01-01';
        $jobEdit['close_date_time'] = '2019-01-31';
        $jobEdit['start_date_time'] = $this->faker->date('Y-m-d', strtotime('+2 weeks'));

        $admin = factory(User::class)->states('admin')->create();
        $response = $this->followingRedirects()
            ->actingAs($admin)
            ->put(route('job-poster.update', $job), $jobEdit);

        $savedJob = $job->refresh();

        $this->assertEquals($expectedOpenTime, humanizeTime($savedJob->open_date_time));
        $this->assertEquals($expectedOpenDate, humanizeDate($savedJob->open_date_time));
        $this->assertEquals($expectedCloseDate, humanizeDate($savedJob->close_date_time));
        $this->assertEquals($expectedCloseTime, humanizeTime($savedJob->close_date_time));
    }

    public function testHrIndexAuth(): void
    {
        $guestResponse = $this->get(route('hr_advisor.jobs.index'));
        $guestResponse->assertRedirect(route('hr_advisor.login'));

        $manager = factory(Manager::class)->create();
        $managerResponse = $this->actingAs($manager->user)->get(route('hr_advisor.jobs.index'));
        $managerResponse->assertRedirect(route('hr_advisor.home'));

        $hrAdvisor = factory(HrAdvisor::class)->create();
        $hrResponse = $this->actingAs($hrAdvisor->user)->get(route('hr_advisor.jobs.index'));
        $hrResponse->assertStatus(200);

        $adminUser = factory(User::class)->state('admin')->create();
        $adminResponse = $this->actingAs($adminUser)->get(route('hr_advisor.jobs.index'));
        $adminResponse->assertRedirect(route('hr_advisor.first_visit'));
    }

    public function testApply()
    {
        $job = factory(JobPoster::class)->state('live')->create();
        $applicant = factory(Applicant::class)->create();

        // If an applicant applies to a live job, an application should be created
        // they should be redirected to application.
        $response = $this->actingAs($applicant->user)->get(route('jobs.apply', $job->id));
        $this->assertDatabaseHas('job_applications', [
            'job_poster_id' => $job->id,
            'applicant_id' => $applicant->id,
        ]);
        $application = JobApplication::where([
            'job_poster_id' => $job->id,
            'applicant_id' => $applicant->id,
            'version_id' => 2, // And the new application should be version 2.
        ])->get();
        $response->assertRedirect(route('applications.timeline', $application->id));

        // If an applicant applies to a live job they've already started an application for,
        // they should be redirected to where they can continue it.
        $response = $this->actingAs($applicant->user)->get(route('jobs.apply', $job->id));
        $response->assertRedirect(route('applications.timeline', $application->id));

        // If an applicant applies to a job they've already submitted for,
        // they should be redirected to preview.
        $jobSubmitted = factory(JobPoster::class)->state('live')->create();
        $submitted = factory(JobApplication::class)->states(['version2', 'submitted'])->create([
            'job_poster_id' => $jobSubmitted->id,
        ]);
        $response = $this->actingAs($submitted->applicant)->get(route('jobs.apply', $jobSubmitted->id));
        $response->assertRedirect(route('applications.show', $submitted->id));

        // If an applicant tries to continue an application for a job that has closed,
        // they should be redirected to preview.
        $jobClosed = factory(JobPoster::class)->state('closed')->create();
        $appClosed = factory(JobApplication::class)->states(['version2', 'draft'])->create([
            'job_poster_id' => $jobClosed->id,
        ]);
        $response = $this->actingAs($appClosed->applicant)->get(route('jobs.apply', $jobClosed->id));
        $response->assertRedirect(route('applications.show', $appClosed->id));

        // If, somehow, there is an existing version 1 application for a job that is still open,
        // applicant should be redirected to old Application UI.
        $jobOld = factory(JobPoster::class)->state('live')->create();
        $appOld = factory(JobApplication::class)->states(['version1', 'draft'])->create([
            'job_poster_id' => $jobOld->id,
        ]);
        $response = $this->actingAs($appOld->applicant)->get(route('jobs.apply', $jobOld->id));
        $response->assertRedirect(route('job.application.edit.1', $jobOld->id));
    }
}
