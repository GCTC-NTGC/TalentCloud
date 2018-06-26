UPDATE base_content SET base_content_value='Create Job Poster' WHERE base_content_key='navigationPosterLink' AND base_content_locale_id=1;
UPDATE base_content SET base_content_value='Créer une affiche d\'emploi' WHERE base_content_key='navigationPosterLink' AND base_content_locale_id=2;

/* Rename 'required' in base_content */
UPDATE `talentcloud`.`base_content` SET `base_content_key`='requiredField' WHERE `base_content_key`='required';
