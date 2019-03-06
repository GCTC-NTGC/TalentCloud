<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Mail;

use Jenssegers\Date\Date;

use App\Models\Applicant;
use App\Models\Criteria;
use App\Models\Lookup\Department;
use App\Models\JobPoster;
use App\Models\JobPosterKeyTask;
use App\Models\JobPosterQuestion;
use App\Models\Lookup\LanguageRequirement;
use App\Models\Manager;
use App\Models\Lookup\Province;
use App\Models\Lookup\SecurityClearance;
use Doctrine\Common\Cache\VoidCache;
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
            ->states('unpublished')
            ->create([
                'manager_id' => $this->manager->id
            ]);

        $this->otherManager = factory(Manager::class)->create();
        $this->otherJobPoster = factory(JobPoster::class)
            ->states('unpublished')
            ->create([
                'manager_id' => $this->otherManager->id
            ]);

        $this->publishedJob = factory(JobPoster::class)->states('published')->create();
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

        Mail::assertSent(JobPosterReviewRequested::class, function ($mail) use ($jobPoster) {
            return $mail->jobPoster->id === $jobPoster->id;
        });
    }

    /**
     * Ensure a manager can view the create Job Poster form.
     *
     * @return void
     */
    public function testManagerCreateView() : void
    {
        $response = $this->actingAs($this->manager->user)
            ->get('manager/jobs/create');
        $response->assertStatus(200);

        $response->assertSee(e(Lang::get('manager/job_create')['title']));
        $response->assertViewIs('manager.job_create');

        $response->assertSee(e(Lang::get('manager/job_create', [], 'en')['questions']['00']));
        $response->assertSee(e(Lang::get('manager/job_create', [], 'fr')['questions']['00']));
    }

    /**
     * Ensure a manager can create a Job Poster.
     *
     * @return void
     */
    public function testManagerCreate() : void
    {
        $newJob = [
            'term_qty' => $this->faker->numberBetween(1, 4),
            'salary_min' => $this->faker->numberBetween(60000, 80000),
            'salary_max' => $this->faker->numberBetween(80000, 100000),
            'noc' => $this->faker->numberBetween(1, 9999),
            'classification' => $this->faker->regexify('[A-Z]{2}-0[1-5]'),
            'manager_id' => $this->manager->id,
            'published' => false,
            'remote_work_allowed' => $this->faker->boolean(50),
            'open_date' => $this->faker->date('Y-m-d', strtotime('+1 day')),
            'open_time' => $this->faker->time(),
            'close_date' => $this->faker->date('Y-m-d', strtotime('+2 weeks')),
            'close_time' => $this->faker->time(),
            'start_date_time' => $this->faker->date('Y-m-d', strtotime('+2 weeks')) . ' ' . $this->faker->time(),
            'security_clearance' => SecurityClearance::inRandomOrder()->first()->id,
            'language_requirement' => LanguageRequirement::inRandomOrder()->first()->id,
            'department' => Department::inRandomOrder()->first()->id,
            'province' => Province::inRandomOrder()->first()->id,
            'city' => $this->faker->city,
            'title' => [
                'en' => $this->faker->word,
                'fr' => $this->faker_fr->word
            ],
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

        $dbValues = array_slice($newJob, 0, 8);

        $response = $this->followingRedirects()
            ->actingAs($this->manager->user)
            ->post('manager/jobs/', $newJob);
        $response->assertStatus(200);
        $response->assertViewIs('applicant.job_post');
        $this->assertDatabaseHas('job_posters', $dbValues);
        $response->assertSee(e(Lang::get('applicant/job_post')['apply']['edit_link_title']));
    }

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
        $response->assertSee(e($this->jobPoster->impact));
        $response->assertSee(e($this->jobPoster->branch));
        $response->assertSee(e($this->jobPoster->division));
        $response->assertSee(e($this->jobPoster->education));
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

        $response->assertStatus(500);
    }
}
