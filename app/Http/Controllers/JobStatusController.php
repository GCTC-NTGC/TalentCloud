<?php

namespace App\Http\Controllers;

use App\Exceptions\StateMachineException;
use App\Models\JobPoster;
use App\Models\Lookup\JobPosterStatus;
use App\Models\User;
use Illuminate\Http\Request;

class JobStatusController extends Controller
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

    protected function stateMetadata(string $state)
    {
        $graph = $this->transition_graph;
        $stateObj = collect($graph['states'])->firstWhere('name', $state);
        return $stateObj !== null
            ? $stateObj['metadata']
            : [];
    }

    protected function legalTransition(string $from, string $to): bool
    {
        $graph = $this->transition_graph;
        $transitions = collect($graph['transitions']);
        return $transitions->some(function ($transition) use ($from, $to) {
            return $transition['to'] === $to && collect($transition['from'])->contains($from);
        });
    }

    protected function userOwnsState(User $user, string $state): bool
    {
        $owner = $this->stateMetadata($state)['owner'];
        return $user->isAdmin()
            || $owner === 'manager' && $user->isManager()
            || $owner === 'hr' && $user->isHrAdvisor()
            || $owner === 'admin' && $user->isAdmin();
    }

    protected function canTransition(User $user, string $from, string $to): bool
    {
        return $this->userOwnsState($user, $from) && $this->legalTransition($from, $to);
    }

    protected function transitionJobStatus(Request $request, JobPoster $job, string $to)
    {
        $user = $request->user();
        $from = $job->job_poster_status->name;
        if (!$this->canTransition($user, $from, $to)) {
            throw new StateMachineException('Illegal state transition');
        }
        $job->job_poster_status_id = JobPosterStatus::where('name', $to)->first()->id;
        $job->save();
        return $request->ajax()
            ? response()->json(['status' => 'ok'])
            : back();
    }

    public function setJobStatus(Request $request, JobPoster $jobPoster)
    {
        $status = $request->input('status');
        return $this->transitionJobStatus($request, $jobPoster, $status);
    }
}
