@component('mail::message')

The job poster **{{ $jobPoster->title }}** (id={{ $jobPoster->id }}) has changed status from *{{ $from }}* to *{{ $to }}*.

@if ($user === null)
Instead of being triggered by a specific user, this transition had an automated trigger such as an Open or Close date.
@else
This was triggered by {{ $user->user_role->name }} user {{ $user->email }} (id={{ $user->id }}).
@endif

@component('mail::button', ['url' => $url, 'color' => 'success'])
View Jobs
@endcomponent

@endcomponent
