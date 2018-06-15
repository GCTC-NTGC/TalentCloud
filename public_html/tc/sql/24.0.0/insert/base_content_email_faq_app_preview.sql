INSERT into base_content 
(base_content_type_id, base_content_key, base_content_value, base_content_locale_id) 
VALUES 

/*Email Feedback*/
(1,'emailFeedback','mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca?subject=Submit%20Feedback%20to%20Talent%20Cloud&body=Thanks%20for%20your%20interest%20in%20Talent%20Cloud!%20Your%20willingness%20to%20submit%20feedback%20is%20incredibly%0Aimportant%20to%20us.%20Please%20supply%20as%20much%20information%20as%20possible%3A%0A%0AType%20of%20Feedback%3A%20%5Be.g.%20Suggestion%2C%20Bug%2C%20etc.%5D%0A%0AYour%20Message%3A%20%5BType%20here.%5D%0A%0ACurrent%20Page%3A%20%5BPage%20Link%20Here%5D%0A%0AThanks%20again!',1),
(1,'emailFeedback','mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca?subject=Soumettez%20des%20Commentaires%20au%20Nuage%20de%20Talents&body=Nous%20vous%20remercions%20de%20votre%20int%C3%A9r%C3%AAt%20au%20nuage%20de%20talents!%20Votre%20disposition%20%C3%A0%20fournir%20des%0Acommentaires%20est%20tr%C3%A8s%20importante%20pour%20nous.%20Veuillez%20fournir%20le%20plus%20de%20renseignements%0Apossible%20%3A%0A%0AType%20de%20commentaires%20%3A%20%5Bp.%20ex.%2C%20suggestion%20ou%20bogue%5D%0A%0AVotre%20message%20%3A%20%5BTapez%20ici.%5D%0A%0APage%20actuelle%20%3A%20%5BHyperlien%20de%20la%20page%20ici%5D%0A%0AEncore%20une%20fois%2C%20merci!',2),

(1,'submitFeedbackText','Submit Feedback',1), /*Needs Review*/
(1,'submitFeedbackText','Soumettre des commentaires',2), /*Needs Translations*/


/*FAQ and Information*/
(1,'faqHeroTitle','FAQs & Information',1),
(1,'faqHeroTitle','Foire aux questions et renseignements',2),
(1,'faqSubNavLabelCredentialing','Credentialing',1),
(1,'faqSubNavLabelCredentialing','Délivrance de titres et certificats',2),
(1,'faqSubnavWhatLevelIsMySkill','What level is my skill?',1),
(1,'faqSubnavWhatLevelIsMySkill','Quel est le niveau de ma compétence?',2),
(1,'faqSubnavWhyProvideAReference','Why provide a reference?',1),
(1,'faqSubnavWhyProvideAReference','Pourquoi dois-je fournir une référence?',2),
(1,'faqSubnavWhyShareMyWork','Why share my work?',1),
(1,'faqSubnavWhyShareMyWork','Pourquoi dois-je présenter mon travail?',2),

(1,'faqSectionTitleWhatLevelIsMySkill','What level is my skill?',1),
(1,'faqSectionTitleWhatLevelIsMySkill','Quel est le niveau de ma compétence?',2),
(1,'faqTextTitleBasic','Basic',1),
(1,'faqTextTitleBasic','Débutant',2),
(1,'faqTextCopyBasic','You demonstrate basic familiarity of the subject matter area.  Supervision and assistance is needed.',1),
(1,'faqTextCopyBasic','Tu as une connaissance de base du domaine spécialisé. Tu as besoin de supervision et d’aide.',2),
(1,'faqTextTitleIntermediate','Intermediate',1),
(1,'faqTextTitleIntermediate','Intermédiaire',2),
(1,'faqTextCopyIntermediate','You demonstrate working proficiency in the subject matter area. Minimal assistance and/or supervision is needed. ',1),
(1,'faqTextCopyIntermediate','Tu démontres une certaine maîtrise du domaine spécialisé. Tu as besoin d’une aide ou d’une supervision minimes.',2),
(1,'faqTextTitleAdvanced','Advanced',1),
(1,'faqTextTitleAdvanced','Avancé',2),
(1,'faqTextCopyAdvanced','You demonstrate in-depth proficiency sufficient to assist, consult or lead others in the subject matter area. ',1),
(1,'faqTextCopyAdvanced','Tu démontres une maîtrise approfondie du domaine spécialisé suffisante pour te permettre d’aider, de consulter ou de diriger d’autres personnes.',2),
(1,'faqTextTitleExpert','Expert',1),
(1,'faqTextTitleExpert','Expert',2),
(1,'faqTextCopyExpert','You demonstrate broad, in-depth proficiency sufficient to be broadly recognized as an authority in the subject matter area.',1),
(1,'faqTextCopyExpert','Tu démontres une maîtrise étendue et approfondie qui te vaut le titre de sommité dans le domaine spécialisé.',2),
(1,'faqSectionTitleWhyProvideAReference','Why provide a reference?',1),
(1,'faqSectionTitleWhyProvideAReference','Pourquoi dois-je fournir une référence?',2),
(1,'faqTextCopyCredentialingReferenceParagraph1','With a micro-reference, someone with first-hand knowledge of your skill vouches for your experience using the skill and the level to which you can apply it.',1),
(1,'faqTextCopyCredentialingReferenceParagraph1','Une micro-référence est une personne ayant une connaissance directe de votre compétence, qui atteste de votre expérience d’exécuter la compétence et du niveau auquel vous pouvez l’appliquer.',2),
(1,'faqTextCopyCredentialingReferenceParagraph2','The result? A credible trusted record of your skill that you can share with prospective employers time and time again.',1),
(1,'faqTextCopyCredentialingReferenceParagraph2','Le résultat? Un enregistrement crédible de votre compétence auquel les employeurs prospectifs peuvent toujours faire confiance.',2),
(1,'faqSectionTitleWhyShareMyWork','Why share my work?',1),
(1,'faqSectionTitleWhyShareMyWork','Pourquoi dois-je présenter mon travail.',2),
(1,'faqTextCopyCredentialingEvidenceParagraph1','By attaching a sample of your work that applies the skill, you are in control of what best demonstrates your expertise to prospective employers.',1),
(1,'faqTextCopyCredentialingEvidenceParagraph1','En fournissant un exemple du travail auquel s’applique votre compétence, vous pouvez faire une meilleure démonstration de votre expertise aux employeurs prospectifs.',2),
(1,'faqTextCopyCredentialingEvidenceParagraph2','The result? A personalized real-time record of your applied skills that showcases the breadth and depth of your abilities.',1),
(1,'faqTextCopyCredentialingEvidenceParagraph2','Le résultat? Un enregistrement personnel en temps réel de l’application de vos compétences, qui démontre la portée et le niveau de vos capacités.',2),

/*Application Preview*/
(1,'applicationHeroTitle','My Job Application',1),
(1,'applicationHeroTitle','Ma demande d’emploi',2),
(1,'jobApplicationPositionLabel','for the position of:',1),
(1,'jobApplicationPositionLabel','pour le poste de :',2),
(1,'applicationPreviewEssentialMenuTitle','Essential Criteria',1),
(1,'applicationPreviewEssentialMenuTitle','Qualifications essentielles',2),
(1,'applicationPreviewProfileAlert','Remember that hiring managers can view your full profile when you submit an application. By filling out your profile you increase your chances of getting hired.',1),
(1,'applicationPreviewProfileAlert','Sachez que lorsque vous soumettez une demande d’emploi, les gestionnaires d’embauche peuvent visualiser votre profil. En remplissant les champs dans votre profil, vous augmentez vos probabilités d’embauche.',2),
(1,'application-preview__alert-copy','This is my attestation that everything I say is true.',1),
(1,'application-preview__alert-copy','La présente est mon attestation que tout ce que je dis est vérité.',2),
(1,'applicationAttestationError','Please attest to the information you are providing.',1),
(1,'applicationAttestationError','Veuillez attester des renseignements que vous fournissez.',2),
(1,'application-preview__completion-warning','Please complete all steps in your application before submitting.',1),
(1,'application-preview__completion-warning','Veuillez achever toutes les étapes dans votre demande avant de la soumettre.',2),
(1,'createJobApplicationConfirmationTrackingReminder','Track the application from your Dashboard.',1),
(1,'createJobApplicationConfirmationTrackingReminder','Suivez le statut de votre demande à partir de votre Tableau de bord.',2),
(1,'createJobApplicationConfirmationContinueButton','Continue to Dashboard',1),
(1,'createJobApplicationConfirmationContinueButton','Continuez jusqu’au Tableau de bord',2),
(1,'createJobApplicationConfirmationPositionLabel','You have applied to the position of:',1),
(1,'createJobApplicationConfirmationPositionLabel','Vous avez posé votre candidature pour le poste de:',2)
;