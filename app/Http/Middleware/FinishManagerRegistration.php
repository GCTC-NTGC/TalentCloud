<?php
namespace App\Http\Middleware;

use Closure;

class FinishManagerRegistration
{
    /**
     * If logged in, but manager registration is incomplete, redirect to finish it.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $request->user();
        /**
         * Manager registration is complete either if:
         *  - they have confirmed to NOT be in government,
         *  - OR they've added a gov email.
         *
         * @param [type] $user
         * @return boolean
         */
        function isManagerRegistrationFinished($user)
        {
            return $user->not_in_gov || !empty($user->gov_email);
        }

        if ($user !== null && $user->isManager() && !isManagerRegistrationFinished($user)) {
            return redirect(route('manager.first_visit'));
        }

        return $next($request);
    }
}
