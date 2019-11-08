<?php
namespace App\Http\Middleware;

use Closure;

class FinishHrRegistration
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

        if ($user !== null && $user->isHrAdvisor() && !$user->isGovIdentityConfirmed()) {
            return redirect(route('hr_advisor.first_visit'));
        }

        return $next($request);
    }
}
