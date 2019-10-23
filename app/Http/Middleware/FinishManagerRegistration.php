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

        if ($user !== null && $user->isManager() && !$user->isGovIdentityConfirmed()) {
            return redirect(route('manager.first_visit'));
        }

        return $next($request);
    }
}
