<?php

namespace App\Services;

use App\Models\Lookup\JobPosterStatusTransition;
use App\Models\User;

class JobStatusTransitionManager
{
    /**
     * The list of all status transitions.
     *
     * @var \Illuminate\Support\Collection
     */
    private $status_transitions = null;

    /**
     * Return the collection of all transitions.
     * This method is meant to cache the results from the database.
     *
     * @return \Illuminate\Support\Collection
     */
    protected function transitions()
    {
        if ($this->status_transitions == null) {
            $this->status_transitions = JobPosterStatusTransition::all();
        }
        return $this->status_transitions;
    }

    /**
     * Returns true if a JobStatusTransition exists with these $from and $to keys.
     *
     * @param string $from
     * @param string $to
     * @return boolean
     */
    public function isLegalTransition(string $from, string $to): bool
    {
        return $this->transitions()->some(function ($transition) use ($from, $to) {
            return $transition->from->key === $from
                && $transition->to->key === $to;
        });
    }

    /**
     * Return an array of the keys of all the possible legal destination states.
     *
     * @param string $from
     * @return string[]
     */
    public function legalDestinations(string $from)
    {
        return $this->legalTransitions($from)
            ->pluck('to.key')
            ->unique()
            ->all();
    }

    /**
     * Return collection of all transitions models with same from key.
     *
     * @param string $from
     * @return \Illuminate\Support\Collection
     */
    public function legalTransitions(string $from)
    {
        return $this->transitions()->where('from.key', $from);
    }

    /**
     * Does the user have the correct role to claim ownership of this transition.
     *
     * @param User $user
     * @param JobPosterStatusTransition $transition
     * @return boolean
     */
    protected function userOwnsTransition(User $user, JobPosterStatusTransition $transition): bool
    {
        return $user->isAdmin()
            || $user->user_role_id === $transition->owner_user_role_id;
    }

    /**
     * Returns true if there is a legal transition exists with these from and to keys,
     *  which this user has permissions for.
     *
     * @param User $user
     * @param string $from
     * @param string $to
     * @return boolean
     */
    public function userCanTransition(User $user, string $from, string $to): bool
    {
        return $this->transitions()->some(function ($transition) use ($user, $from, $to) {
            return $transition->from->key === $from
                && $transition->to->key === $to
                && $this->userOwnsTransition($user, $transition);
        });
    }
}
