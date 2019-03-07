<?php

namespace Tests\Unit\Policies;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Policies\JobPolicy;
use App\Models\JobPoster;
use App\Models\User;
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
    protected function setUp()
    {
        parent::setUp();

        $this->policy = new JobPolicy();
        $this->manager = factory(Manager::class)->create()->user;
        $this->applicant = factory(Applicant::class)->create()->user;
        $this->guest = null;
    }


    protected function policy()
    {
        return new JobPolicy();
    }

    public function testAnyoneCanViewOpenJob()
    {
        $job = factory(JobPoster::class)->states('published')->make();
        $this->assertTrue($this->policy->view($this->guest, $job));
        $this->assertTrue($this->policy->view($this->applicant, $job));
        $this->assertTrue($this->policy->view($this->manager, $job));
    }

    public function testAnyoneCanViewClosedJob()
    {
        $job = factory(JobPoster::class)->states('closed')->make();
        $this->assertTrue($this->policy->view($this->guest, $job));
        $this->assertTrue($this->policy->view($this->applicant, $job));
        $this->assertTrue($this->policy->view($this->manager, $job));
    }

    public function testNoOneCanViewUnpublishedJob()
    {
        $job = factory(JobPoster::class)->states('unpublished')->make();
        $this->assertFalse($this->policy->view($this->guest, $job));
        $this->assertFalse($this->policy->view($this->applicant, $job));
        $this->assertFalse($this->policy->view($this->manager, $job));
    }

    public function testManagerCanViewOwnUnpublishedJob()
    {
        $job = factory(JobPoster::class)->states('unpublished')->make([
            'manager_id' => $this->manager->manager->id
        ]);
        $this->assertTrue($this->policy->view($this->manager, $job));
    }

    public function testManagerCanNotPublishJob()
    {
        $job = factory(JobPoster::class)->states('published')->make([
            'manager_id' => $this->manager->manager->id
        ]);
        $this->assertFalse($this->policy->update($this->manager, $job));
    }

    public function testManagerCanUpdateDraftJob()
    {
        $job = factory(JobPoster::class)->states('unpublished')->make([
            'manager_id' => $this->manager->manager->id
        ]);
        $this->assertTrue($this->policy->update($this->manager, $job));
    }
}
