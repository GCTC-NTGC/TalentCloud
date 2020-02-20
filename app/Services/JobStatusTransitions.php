<?php

namespace App\Services;

use App\Models\User;

class JobStatusTransitions
{
    protected $transition_graph = [
        'states' => [
            [
                'name' => 'draft',
                'metadata' => ['owner' => 'manager']
            ],
            [
                'name' => 'review_manager',
                'metadata' => ['owner' => 'manager']
            ],
            [
                'name' => 'review_hr',
                'metadata' => ['owner' => 'hr']
            ],
            [
                'name' => 'translation',
                'metadata' => ['owner' => 'admin']
            ],
            [
                'name' => 'final_review_manager',
                'metadata' => ['owner' => 'manager']
            ],
            [
                'name' => 'final_review_hr',
                'metadata' => ['owner' => 'hr']
            ],
            [
                'name' => 'pending_approval',
                'metadata' => ['owner' => 'hr']
            ],
            [
                'name' => 'approved',
                'metadata' => ['owner' => 'admin']
            ],
            [
                'name' => 'published',
                'metadata' => ['owner' => 'admin']
            ],
            [
                'name' => 'completed',
                'metadata' => ['owner' => 'admin']
            ]
        ],
        'transitions' => [
            'send_to_hr' => [
                'from' => ['draft', 'review_manager'],
                'to' => 'review_hr'
            ],
            'send_to_manager' => [
                'from' => ['review_hr'],
                'to' => 'review_manager'
            ],
            'send_to_translation' => [
                'from' => ['review_hr', 'final_review_hr', 'pending_approval'],
                'to' => 'translation'
            ],
            'send_to_manager_final' => [
                'from' => ['translation', 'final_review_hr', 'pending_approval'],
                'to' => 'final_review_manager'
            ],
            'send_to_hr_final' => [
                'from' => ['final_review_manager'],
                'to' => 'final_review_hr',
            ],
            'submit_for_approval' => [
                'from' => ['final_review_manager'],
                'to' => 'pending_approval'
            ],
            'approve' => [
                'from' => ['pending_approval'],
                'to' => 'approved'
            ],
            'publish' => [
                'from' => ['approved'],
                'to' => 'published'
            ],
            'complete' => [
                'from' => ['published'],
                'to' => 'completed'
            ]
        ]
    ];

    public function states()
    {
        return collect($this->transition_graph['states'])->pluck('name')->all();
    }

    public function stateMetadata(string $state)
    {
        $graph = $this->transition_graph;
        $stateObj = collect($graph['states'])->firstWhere('name', $state);
        return $stateObj !== null
            ? $stateObj['metadata']
            : [];
    }

    public function isLegalTransition(string $from, string $to): bool
    {
        $graph = $this->transition_graph;
        $transitions = collect($graph['transitions']);
        return $transitions->some(function ($transition) use ($from, $to) {
            return $transition['to'] === $to && collect($transition['from'])->contains($from);
        });
    }

    public function legalDestinations(string $from)
    {
        return collect($this->transition_graph['transitions'])
            ->filter(function ($transition) use ($from) {
                return in_array($from, $transition['from']);
            })
            ->pluck('to')
            ->unique()
            ->all();
    }

    public function userOwnsState(User $user, string $state): bool
    {
        $owner = $this->stateMetadata($state)['owner'];
        return $user->isAdmin()
            || $owner === 'manager' && $user->isUpgradedManager()
            || $owner === 'hr' && $user->isHrAdvisor()
            || $owner === 'admin' && $user->isAdmin();
    }

    public function canTransition(User $user, string $from, string $to): bool
    {
        return $this->userOwnsState($user, $from) && $this->isLegalTransition($from, $to);
    }
}
