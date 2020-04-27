@component('mail::message')

*(Version française suit)*

Dear {{ $reference_name }}:

[GC Talent Reserve]({{ $homepage_url }}) is a tool designed for temporary digital and technology talent mobilization within the Government of Canada in a crisis situation.

This exercise will only take 3-5 minutes of your time and will be a help to the Government of Canada in its efforts to respond to these exceptional circumstances. Please help others by reading this through and completing the questions.

{{ $applicant_name }} has put their name forward to participate in the Government of Canada's response to COVID-19. As part of the process to help determine how their skills may be best repurposed,
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

**Does the employee have any weaknesses you feel should be mentioned that might be relevant to the employee's ability to be an asset to a department in critical need of talent for this type or work?** (This question is optional)

Thank you for helping the Government of Canada to navigate this exceptional circumstance.

If you have any questions, do not hesitate to email us (<talent.cloud-nuage.de.talents@tbs-sct.gc.ca>) at any time.

Best regards,  
The GC Talent Reserve team



---



Bonjour {{ $reference_name }},

[La Réserve de talents du GC]({{ $homepage_url_fr }}) est un outil de mobilisation temporaire des talents dans les domaines du numérique et de la technologique au sein du gouvernement du Canada en situation de crise.

Cet exercice ne vous prendra que de trois à cinq minutes, et permettra au gouvernement du Canada de faire face à ces circonstances exceptionnelles. Aidez-en d'autres en poursuivant votre lecture et en répondant aux questions.

{{ $applicant_name }} a proposé sa candidature pour aider le gouvernement du Canada dans sa lutte contre la COVID-19. Dans le cadre du processus visant à déterminer la meilleure façon de mettre différemment à profit ses compétences,
@if ($is_director)
il/elle vous a désigné(e) comme référence.
@else
il/elle vous a désigné(e) comme référence ainsi qu'à titre de délégataire pouvant approuver sa participation.
@endif

@if ($is_director)
**Dans le contexte de la Réserve de talents du GC, approuvez-vous la candidature de {{ $applicant_name }}?**
- Oui.
- Non.

**{{ $applicant_name }} est-il/elle actuellement un(e) employé(e) nommé(e) pour une période indéterminée ou pour une période déterminée?**
- Indéterminé(e)
- Déterminé(e)
- Non plus
@endif

**Veuillez prendre trois à cinq minutes pour confirmer si {{ $applicant_name }} possède les compétences suivantes en inscrivant un « x » à côté du niveau approprié.**
@foreach ($criteria as $criterion)
- {{ $criterion->skill->getTranslation('name', 'fr') }}
    - Fortement démontrée
    - Modérément démontrée
    - Peu démontrée
    - Non démontrée
@endforeach

**De manière générale, recommanderiez-vous cette personne pour ce type de travail au gouvernement? Veuillez inscrire un « x » à côté de la réponse appropriée.**
- Il/Elle serait ma première recommandation
- Je le/la recommanderais fortement
- Je le/la recommanderais
- Je le/la recommanderais avec certaines réserves
- Je ne le/la recommanderais pas

**L'employé(e) possède-t-il/elle des points forts que vous aimeriez particulièrement souligner et qui pourraient être pertinents pour un autre ministère ou organisme qui cherche des talents afin de répondre à un besoin pressant pour ce type de travail?** (Cette question est facultative.)

**L'employé(e) a-t-il/elle des points faibles qui, selon vous, devraient être mentionnés en ce qui a trait à sa capacité d'être un atout pour un ministère ou organisme qui cherche des talents afin de répondre à un besoin pressant pour ce type de travail?** (Cette question est facultative.)

Nous vous remercions d'aider le gouvernement du Canada à traverser cette situation exceptionnelle.

Si vous avez des questions, veuillez communiquer avec nous en tout temps à l'adresse <talent.cloud-nuage.de.talents@tbs-sct.gc.ca>.

Nous vous prions d'agréer l'expression de nos sentiments les meilleurs.  
Équipe responsable de la Réserve de talents du GC

