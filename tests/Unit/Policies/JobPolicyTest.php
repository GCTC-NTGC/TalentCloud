<?php

namespace Tests\Unit\Policies;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Policies\JobPolicy;
use App\Models\JobPoster;
use App\Models\Applicant;
use App\Models\Manager;

class JobPolicyTest extends TestCase
{

    use RefreshDatabase;

    /**
     * policy for use in tests
     *
     * @var \App\Models\JobPolicy
     */
    protected $policy;

    /**
     * Manager user for use in tests
     *
     * @var \App\Models\User
     */
    protected $manager;

    /**
     * Applicant user for use in tests
     *
     * @var \App\Models\User
     */
    protected $applicant;

    /**
     * Guest user (null) for use in test
     *
     * @var null
     */
    protected $guest;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp() : void
    {
        parent::setUp();

        $this->policy = new JobPolicy();
        $this->manager = factory(Manager::class)->create()->user;
        $this->applicant = factory(Applicant::class)->create()->user;
        $this->guest = null;
    }

    /**
     * Provide a JobPolicy object on demand.
     *
     * @return JobPolicy
     */
    protected function policy() : JobPolicy
    {
        return new JobPolicy();
    }

    /**
     * Test the policy around an open Job Poster.
     *
     * @return void
     */
    public function testAnyoneCanViewOpenJob() : void
    {
        $job = factory(JobPoster::class)->states('published')->make();
        $this->assertTrue($this->policy->view($this->guest, $job));
        $this->assertTrue($this->policy->view($this->applicant, $job));
        $this->assertTrue($this->policy->view($this->manager, $job));
    }

    /**
     * Test the policy around a closed Job Poster.
     *
     * @return void
     */
    public function testAnyoneCanViewClosedJob() : void
    {
        $job = factory(JobPoster::class)->states('closed')->make();
        $this->assertTrue($this->policy->view($this->guest, $job));
        $this->assertTrue($this->policy->view($this->applicant, $job));
        $this->assertTrue($this->policy->view($this->manager, $job));
    }

    /**
     * Test the policy around an unpublished Job Poster.
     *
     * @return void
     */
    public function testNoOneCanViewUnpublishedJob() : void
    {
        $job = factory(JobPoster::class)->make();
        $this->assertFalse($this->policy->view($this->guest, $job));
        $this->assertFalse($this->policy->view($this->applicant, $job));
        $this->assertFalse($this->policy->view($this->manager, $job));
    }

    /**
     * Ensure a manager can view their own unpublished Job Poster.
     *
     * @return void
     */
    public function testManagerCanViewOwnUnpublishedJob() : void
    {
        $job = factory(JobPoster::class)->make([
            'manager_id' => $this->manager->manager->id
        ]);
        $this->assertTrue($this->policy->view($this->manager, $job));
    }

    /**
     * Ensure a manager cannot update a published job.
     *
     * @return void
     */
    public function testManagerCannotUpdatePublishedJob() : void
    {
        $job = factory(JobPoster::class)->states('published')->make([
            'manager_id' => $this->manager->manager->id
        ]);
        $this->assertFalse($this->policy->update($this->manager, $job));
    }

    /**
     * Ensure a manager can edit their own draft Job Poster.
     *
     * @return void
     */
    public function testManagerCanUpdateDraftJob() : void
    {
        $job = factory(JobPoster::class)->make([
            'manager_id' => $this->manager->manager->id
        ]);
        $this->assertTrue($this->policy->update($this->manager, $job));
    }
}
