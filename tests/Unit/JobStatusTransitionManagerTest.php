<?php

namespace Tests\Unit;

use App\Models\Lookup\JobPosterStatus;
use App\Models\User;
use App\Services\JobStatusTransitionManager;
use Tests\TestCase;

class JobStatusTransitionManagerTest extends TestCase
{
    /**
     * @var JobStatusTransitionManager
     */
    protected $transitionManager;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->transitionManager = new JobStatusTransitionManager();
    }

    public function testIsLegalTransition(): void
    {
        $this->assertTrue($this->transitionManager->isLegalTransition('draft', 'review_hr'));
        $this->assertTrue($this->transitionManager->isLegalTransition('review_hr', 'review_manager'));
        $this->assertTrue($this->transitionManager->isLegalTransition('review_manager', 'review_hr'));
        $this->assertTrue($this->transitionManager->isLegalTransition('review_hr', 'translation'));
        $this->assertTrue($this->transitionManager->isLegalTransition('translation', 'final_review_manager'));
        $this->assertTrue($this->transitionManager->isLegalTransition('final_review_manager', 'final_review_hr'));
        $this->assertTrue($this->transitionManager->isLegalTransition('final_review_hr', 'final_review_manager'));
        $this->assertTrue($this->transitionManager->isLegalTransition('final_review_manager', 'pending_approval'));
        $this->assertTrue($this->transitionManager->isLegalTransition('pending_approval', 'approved'));
        $this->assertTrue($this->transitionManager->isLegalTransition('approved', 'ready'));
        $this->assertTrue($this->transitionManager->isLegalTransition('ready', 'live'));
        $this->assertTrue($this->transitionManager->isLegalTransition('live', 'assessment'));
        $this->assertTrue($this->transitionManager->isLegalTransition('assessment', 'completed'));

        $this->assertFalse($this->transitionManager->isLegalTransition('draft', 'pending_approval'));
        $this->assertFalse($this->transitionManager->isLegalTransition('review_hr', 'pending_approval'));
        $this->assertFalse($this->transitionManager->isLegalTransition('final_review_manager', 'ready'));
        $this->assertFalse($this->transitionManager->isLegalTransition('approved', 'live'));
    }

    public function testLegalTransitions(): void
    {
        $this->assertEqualsCanonicalizing(
            ['review_hr'],
            $this->transitionManager->legalTransitions('draft')->pluck('to.key')->all()
        );
        $this->assertEqualsCanonicalizing(
            ['review_manager', 'translation'],
            $this->transitionManager->legalTransitions('review_hr')->pluck('to.key')->all()
        );
        $this->assertEqualsCanonicalizing(
            ['review_hr'],
            $this->transitionManager->legalTransitions('review_manager')->pluck('to.key')->all()
        );
        $this->assertEqualsCanonicalizing(
            ['final_review_manager'],
            $this->transitionManager->legalTransitions('translation')->pluck('to.key')->all()
        );
        $this->assertEqualsCanonicalizing(
            ['final_review_hr', 'pending_approval'],
            $this->transitionManager->legalTransitions('final_review_manager')->pluck('to.key')->all()
        );
        $this->assertEqualsCanonicalizing(
            ['translation', 'final_review_manager'],
            $this->transitionManager->legalTransitions('final_review_hr')->pluck('to.key')->all()
        );
        $this->assertEqualsCanonicalizing(
            ['translation', 'final_review_manager', 'approved'],
            $this->transitionManager->legalTransitions('pending_approval')->pluck('to.key')->all()
        );
        $this->assertEqualsCanonicalizing(
            ['ready'],
            $this->transitionManager->legalTransitions('approved')->pluck('to.key')->all()
        );
        $this->assertEqualsCanonicalizing(
            ['live'],
            $this->transitionManager->legalTransitions('ready')->pluck('to.key')->all()
        );
        $this->assertEqualsCanonicalizing(
            ['assessment'],
            $this->transitionManager->legalTransitions('live')->pluck('to.key')->all()
        );
        $this->assertEqualsCanonicalizing(
            ['completed'],
            $this->transitionManager->legalTransitions('assessment')->pluck('to.key')->all()
        );
        $this->assertEqualsCanonicalizing(
            [],
            $this->transitionManager->legalTransitions('completed')->pluck('key')->all()
        );
    }

    public function testLegalDestinations(): void
    {
        $this->assertEqualsCanonicalizing(['review_hr'], $this->transitionManager->legalDestinations('draft'));
        $this->assertEqualsCanonicalizing(['review_manager', 'translation'], $this->transitionManager->legalDestinations('review_hr'));
        $this->assertEqualsCanonicalizing(['review_hr'], $this->transitionManager->legalDestinations('review_manager'));
        $this->assertEqualsCanonicalizing(['final_review_manager'], $this->transitionManager->legalDestinations('translation'));
        $this->assertEqualsCanonicalizing(['final_review_hr', 'pending_approval'], $this->transitionManager->legalDestinations('final_review_manager'));
        $this->assertEqualsCanonicalizing(['translation', 'final_review_manager'], $this->transitionManager->legalDestinations('final_review_hr'));
        $this->assertEqualsCanonicalizing(['translation', 'final_review_manager', 'approved'], $this->transitionManager->legalDestinations('pending_approval'));
        $this->assertEqualsCanonicalizing(['ready'], $this->transitionManager->legalDestinations('approved'));
        $this->assertEqualsCanonicalizing(['live'], $this->transitionManager->legalDestinations('ready'));
        $this->assertEqualsCanonicalizing(['assessment'], $this->transitionManager->legalDestinations('live'));
        $this->assertEqualsCanonicalizing(['completed'], $this->transitionManager->legalDestinations('assessment'));
        $this->assertEqualsCanonicalizing([], $this->transitionManager->legalDestinations('completed'));
    }

    public function testUserCanTransition(): void
    {
        $manager = factory(User::class)->state('upgradedManager')->create();
        $hrAdvisor = factory(User::class)->state('hr_advisor')->create();
        $admin = factory(User::class)->state('admin')->create();

        // Test all the intended transitions.
        $this->assertTrue($this->transitionManager->userCanTransition($manager, 'draft', 'review_hr'));
        $this->assertTrue($this->transitionManager->userCanTransition($hrAdvisor, 'review_hr', 'review_manager'));
        $this->assertTrue($this->transitionManager->userCanTransition($manager, 'review_manager', 'review_hr'));
        $this->assertTrue($this->transitionManager->userCanTransition($hrAdvisor, 'review_hr', 'translation'));
        $this->assertTrue($this->transitionManager->userCanTransition($admin, 'translation', 'final_review_manager'));
        $this->assertTrue($this->transitionManager->userCanTransition($manager, 'final_review_manager', 'final_review_hr'));
        $this->assertTrue($this->transitionManager->userCanTransition($hrAdvisor, 'final_review_hr', 'final_review_manager'));
        $this->assertTrue($this->transitionManager->userCanTransition($manager, 'final_review_manager', 'pending_approval'));
        $this->assertTrue($this->transitionManager->userCanTransition($hrAdvisor, 'pending_approval', 'approved'));
        $this->assertTrue($this->transitionManager->userCanTransition($admin, 'approved', 'ready'));
        $this->assertTrue($this->transitionManager->userCanTransition($admin, 'ready', 'live'));
        $this->assertTrue($this->transitionManager->userCanTransition($admin, 'live', 'assessment'));
        $this->assertTrue($this->transitionManager->userCanTransition($admin, 'assessment', 'completed'));

        // Ensure that admins can trigger transitions intended for other users.
        $this->assertTrue($this->transitionManager->userCanTransition($admin, 'draft', 'review_hr'));
        $this->assertTrue($this->transitionManager->userCanTransition($admin, 'review_hr', 'review_manager'));

        // Ensure that even admins can't transition to arbitrary states.
        $this->assertFalse($this->transitionManager->userCanTransition($admin, 'draft', 'live'));
        $this->assertFalse($this->transitionManager->userCanTransition($admin, 'pending_approval', 'ready'));

        // Ensure that managers and hr advisors must own their state to transition.
        $this->assertFalse($this->transitionManager->userCanTransition($manager, 'review_hr', 'translation'));
        $this->assertFalse($this->transitionManager->userCanTransition($hrAdvisor, 'final_review_manager', 'pending_approval'));
    }
}
