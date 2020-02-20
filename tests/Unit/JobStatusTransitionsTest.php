<?php

namespace Tests\Unit;

use App\Models\Lookup\JobPosterStatus;
use App\Models\User;
use App\Services\JobStatusTransitions;
use Tests\TestCase;

class JobStatusTransitionsTest extends TestCase
{
    protected $transitions;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->transitions = new JobStatusTransitions();
    }

    public function testStates(): void
    {
        $states = JobPosterStatus::all()->pluck('name')->all();
        $this->assertEqualsCanonicalizing($states, $this->transitions->states());
    }

    public function testStateMetadata(): void
    {
        $this->assertEquals(['owner' => 'manager'], $this->transitions->stateMetadata('draft'));
        $this->assertEquals(['owner' => 'hr'], $this->transitions->stateMetadata('review_hr'));
        $this->assertEquals(['owner' => 'admin'], $this->transitions->stateMetadata('translation'));
    }

    public function testIsLegalTransition(): void
    {
        $this->assertTrue($this->transitions->isLegalTransition('draft', 'review_hr'));
        $this->assertTrue($this->transitions->isLegalTransition('review_hr', 'review_manager'));
        $this->assertTrue($this->transitions->isLegalTransition('review_manager', 'review_hr'));
        $this->assertTrue($this->transitions->isLegalTransition('review_hr', 'translation'));
        $this->assertTrue($this->transitions->isLegalTransition('translation', 'final_review_manager'));
        $this->assertTrue($this->transitions->isLegalTransition('final_review_manager', 'final_review_hr'));
        $this->assertTrue($this->transitions->isLegalTransition('final_review_hr', 'final_review_manager'));
        $this->assertTrue($this->transitions->isLegalTransition('final_review_manager', 'pending_approval'));
        $this->assertTrue($this->transitions->isLegalTransition('pending_approval', 'approved'));
        $this->assertTrue($this->transitions->isLegalTransition('approved', 'published'));
        $this->assertTrue($this->transitions->isLegalTransition('published', 'completed'));

        $this->assertFalse($this->transitions->isLegalTransition('draft', 'pending_approval'));
        $this->assertFalse($this->transitions->isLegalTransition('review_hr', 'pending_approval'));
        $this->assertFalse($this->transitions->isLegalTransition('final_review_manager', 'published'));
    }

    public function testLegalDestinations(): void
    {
        $this->assertEqualsCanonicalizing(['review_hr'], $this->transitions->legalDestinations('draft'));
        $this->assertEqualsCanonicalizing(['review_manager', 'translation'], $this->transitions->legalDestinations('review_hr'));
        $this->assertEqualsCanonicalizing(['review_hr'], $this->transitions->legalDestinations('review_manager'));
        $this->assertEqualsCanonicalizing(['final_review_manager'], $this->transitions->legalDestinations('translation'));
        $this->assertEqualsCanonicalizing(['final_review_hr', 'pending_approval'], $this->transitions->legalDestinations('final_review_manager'));
        $this->assertEqualsCanonicalizing(['translation', 'final_review_manager'], $this->transitions->legalDestinations('final_review_hr'));
        $this->assertEqualsCanonicalizing(['translation', 'final_review_manager', 'approved'], $this->transitions->legalDestinations('pending_approval'));
        $this->assertEqualsCanonicalizing(['published'], $this->transitions->legalDestinations('approved'));
        $this->assertEqualsCanonicalizing(['completed'], $this->transitions->legalDestinations('published'));
        $this->assertEqualsCanonicalizing([], $this->transitions->legalDestinations('completed'));
    }

    public function testUserOwnsState(): void
    {
        $manager = factory(User::class)->state('upgradedManager')->create();
        $hrAdvisor = factory(User::class)->state('hr_advisor')->create();
        $admin = factory(User::class)->state('admin')->create();

        $this->assertTrue($this->transitions->userOwnsState($manager, 'draft'));
        $this->assertFalse($this->transitions->userOwnsState($hrAdvisor, 'draft'));
        $this->assertTrue($this->transitions->userOwnsState($admin, 'draft'));

        $this->assertFalse($this->transitions->userOwnsState($manager, 'pending_approval'));
        $this->assertTrue($this->transitions->userOwnsState($hrAdvisor, 'pending_approval'));
        $this->assertTrue($this->transitions->userOwnsState($admin, 'pending_approval'));

        $this->assertFalse($this->transitions->userOwnsState($manager, 'approved'));
        $this->assertFalse($this->transitions->userOwnsState($hrAdvisor, 'approved'));
        $this->assertTrue($this->transitions->userOwnsState($admin, 'approved'));
    }

    public function testCanTransition(): void
    {
        $manager = factory(User::class)->state('upgradedManager')->create();
        $hrAdvisor = factory(User::class)->state('hr_advisor')->create();
        $admin = factory(User::class)->state('admin')->create();

        // Test all the intended transitions.
        $this->assertTrue($this->transitions->canTransition($manager, 'draft', 'review_hr'));
        $this->assertTrue($this->transitions->canTransition($hrAdvisor, 'review_hr', 'review_manager'));
        $this->assertTrue($this->transitions->canTransition($manager, 'review_manager', 'review_hr'));
        $this->assertTrue($this->transitions->canTransition($hrAdvisor, 'review_hr', 'translation'));
        $this->assertTrue($this->transitions->canTransition($admin, 'translation', 'final_review_manager'));
        $this->assertTrue($this->transitions->canTransition($manager, 'final_review_manager', 'final_review_hr'));
        $this->assertTrue($this->transitions->canTransition($hrAdvisor, 'final_review_hr', 'final_review_manager'));
        $this->assertTrue($this->transitions->canTransition($manager, 'final_review_manager', 'pending_approval'));
        $this->assertTrue($this->transitions->canTransition($hrAdvisor, 'pending_approval', 'approved'));
        $this->assertTrue($this->transitions->canTransition($admin, 'approved', 'published'));
        $this->assertTrue($this->transitions->canTransition($admin, 'published', 'completed'));

        // Ensure that admins can trigger transitions intended for other users.
        $this->assertTrue($this->transitions->canTransition($admin, 'draft', 'review_hr'));
        $this->assertTrue($this->transitions->canTransition($admin, 'review_hr', 'review_manager'));

        // Ensure that even admins can't transition to arbitrary states.
        $this->assertFalse($this->transitions->canTransition($admin, 'draft', 'published'));
        $this->assertFalse($this->transitions->canTransition($admin, 'pending_approval', 'published'));

        // Ensure that managers and hr advisors must own their state to transition.
        $this->assertFalse($this->transitions->canTransition($manager, 'review_hr', 'translation'));
        $this->assertFalse($this->transitions->canTransition($hrAdvisor, 'final_review_manager', 'pending_approval'));
    }
}
