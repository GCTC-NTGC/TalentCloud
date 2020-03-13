@component('mail::message')

Your [{{ $position['en'] }}]({{ $position_link['en'] }}) posting closed today with **{{ $num_of_applicants }}** applicants (**{{ $num_of_veterans }}** veteran and **{{ $num_of_noncitizens }}** non-citizens).

# Want the best person for your job?

**2 WEEKS**: Top applicants will start dropping-off if they don’t hear from you in as little as 2 weeks. Make sure to respond to them before **{{ $drop_off_date['en'] }}** about the next step in the process.

Log-in to [{{ $manager_portal_link['en'] }}]({{ $manager_portal_link['en'] }}) now and start screening and **FIND YOUR TOP APPLICANTS**

When you log-in to the [Manager Portal]({{ $manager_portal_link['en'] }}), you’ll see that the applications have been pre-sorted by veteran status and citizenship. Those who are non-citizen or claimed a lower level for at least one of the essential criteria are grouped under “optional consideration”. If you’d like to start by screening applications from Canadian citizens first, we can help notify the non-citizens that they will only be considered if there are no qualified Canadian citizens.

If you have any questions or if you need any support, please email <{{ $talent_cloud_email }}>.

Best Regards,<br>
{{ config('app.name') }}

-------------------------------------------------

La période d’affichage de votre annonce [{{ $position['fr'] }}]({{ $position_link['fr'] }}) a pris fin aujourd’hui et **{{ $num_of_applicants }}**  candidats (**{{ $num_of_veterans }}**, anciens combattants et **{{ $num_of_noncitizens }}** non-citoyens canadiens) ont envoyé leur curriculum vitæ.

# Vous voulez la meilleure personne pour ce poste?

**2 SEMAINES** : Les meilleurs candidats commenceront à se désintéresser du poste s’ils n’ont pas de nouvelles de vous dans aussi peu que deux semaines. Assurez-vous de leur répondre avant le **{{ $drop_off_date['fr'] }}** pour leur faire part de la prochaine étape du processus.

Ouvrez une séance à partir du site [{{ $manager_portal_link['fr'] }}]({{ $manager_portal_link['fr'] }}) maintenant, commencez la sélection et **TROUVEZ VOS MEILLEURS CANDIDATS**.

Lorsque vous ouvrez une séance à partir du [Portail des gestionnaires]({{ $manager_portal_link['fr'] }}), vous verrez que les demandes ont été présélectionnées par statut d’ancien combattant et citoyenneté. Les non-citoyens ou ceux qui ont déclaré un niveau inférieur pour au moins un des critères essentiels sont regroupés dans une catégorie de candidatures facultatives. Si vous voulez commencer par examiner d’abord les candidatures des citoyens canadiens, nous pouvons vous aider à aviser les non-citoyens canadiens qu’ils ne seront pris en considération que s’il n’y a pas de citoyens canadiens qualifiés.

Si vous avez des questions ou si vous avez besoin de soutien, veuillez envoyer un courriel à <{{ $talent_cloud_email }}>.

Nous vous prions d’agréer l’expression de nos sentiments les meilleurs.<br><br>
{{ config('app.name') }}

@endcomponent




