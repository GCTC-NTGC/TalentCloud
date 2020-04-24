@component('mail::message')

*(Version française suit)*

Dear {{ $reference_name }}:

[GC Talent Reserve]({{ $homepage_url }}) is a tool designed for temporary digital and technology talent mobilization within the Government of Canada in a crisis situation.

This exercise will only take 3-5 minutes of your time and will be a help to the Government of Canada in its efforts to respond to these exceptional circumstances. Please help others by reading this through and completing the questions.

{{ $applicant_name }} has put their name forward to participate in the Government of Canada’s response to COVID-19. As part of the process to help determine how their skills may be best repurposed,
@if ($is_director)
they have identified you as a reference and the delegated authority who can approve their participation.
@else
they have identified you as a reference.
@endif

@if ($is_director)
**Do you approve {{ $applicant_name }} for putting their name forward to the GC Talent Reserve?**
- Yes, I approve.
- No, I don't approve.

**Please confirm if {{ $applicant_name }} is a current indeterminate employee or a term employee.**
- Indeterminate
- Term
- Neither
@endif

**Please take 3-5 minutes to confirm if {{ $applicant_name }} has the following skills by putting an “x” beside the appropriate level.**
@foreach ($criteria as $criterion)
- {{ $criterion->skill->getTranslation('name', 'en') }}
    - Strongly in evidence
    - Moderately in evidence
    - Weakly in evidence
    - No evidence
@endforeach

**Overall, how would you feel about recommending this person for this type of work in Government? Please put an “x” beside the appropriate level.**
- Top recommendation
- Strongly recommend
- Recommend
- Recommend with reservations
- Do not recommend

**Does the employee have any particular strengths you would like to highlight that might be relevant for assisting another department in critical need of talent for this type or work?** (This question is optional)

**Does the employee have any weaknesses you feel should be mentioned that might be relevant to the employee’s ability to be an asset to a department in critical need of talent for this type or work?** (This question is optional)

Thank you for helping the Government of Canada to navigate this exceptional circumstance.

If you have any questions, do not hesitate to email us (<talent.cloud-nuage.de.talents@tbs-sct.gc.ca>) at any time.

Best regards,  
The GC Talent Reserve team
