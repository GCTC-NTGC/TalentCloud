<?php
/*
| --------------------------------------------------------------------------
| Settings Language Lines
| --------------------------------------------------------------------------
|
| The following language lines are used in the Settings page
*/
return [
    'title' => 'Paramètres du compte',
    'home_text' => 'Accueil',
    'home_title' => 'Retour à la page d\'accueil.',
    'sidebar_title' => 'Paramètres',
    'heading' => [
        'personal' => 'Renseignements personnels',
        'government' => 'Information du gouvernement du Canada',
        'password' => 'Mot de passe',
        'two_factor' => 'Authentification à deux facteurs'
    ],
    'personal_copy' => 'Cette information sert à vous identifier sur la plateforme.',
    'required' => 'Champs obligatoires',
    'error' => 'Erreur',
    'first_name_label' => 'Prénom',
    'last_name_label' => 'Nom',
    'email_label' => 'Nom d\'utilisateur/courriel',
    'personal_save' => 'Enregistrer les renseignements personnels',
    'government_copy' => 'Ces renseignements servent à déterminer votre rôle au sein du gouvernement du Canada sur les portails des gestionnaires et des conseillers en RH.',
    'government_dept' => 'Ministère actuel :',
    'no_department' => 'S.O. (non-fonctionnaire)',
    'dept_change_copy' => [
        'one' => 'Pour changer votre ministère, vous devrez',
        'two' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
        'three' => 'communiquer directement avec le Nuage de talents.',
        'four' => 'communiquer directement avec le Nuage de talents.', // repeats in title attribute
        'five' => 'Nous vous demandons de communiquer avec nous parce que votre ministère détermine comment vous interagissez avec les offres d\'emploi, les candidats et les conseillers en RH. Pour faire modifier cette information, nous devons vérifier si votre ministère est indépendant de la plateforme.',
    ],
    'gov_email_label' => 'Courriel gouvernemental',
    'government_save' => 'Sauvegarder l\'information du gouvernement',
    'password_copy' => [
        'one' => 'Vous pouvez utiliser cette section pour modifier votre mot de passe. Les mots de passe doivent contenir un caractère tiré de chacun des critères suivants :',
        'two' => 'Lettres minuscules (a-z)',
        'three' => 'Lettres majuscules (A-Z)',
        'four' => 'Chiffres (0-9)',
        'five' => 'Symboles non alphanumériques (%, $, !, etc.)',
    ],
    'password_label' => 'Mot de passe actuel',
    'new_password_label' => 'Nouveau mot de passe',
    'confirm_password_label' => 'Confirmer le nouveau mot de passe',
    'password_save' => 'Soumettre le nouveau mot de passe',
    'two_factor_legend' => 'Authentification à deux facteurs',
    'two_factor_button_text' => 'Configuration de l\'authentification à deux facteurs',
    'two_factor_recovery_legend' => 'Codes de récupération',
    'two_factor_recovery_text' => 'Codes de récupération d\'urgence vous permettent d\'accéder à votre compte si vous n\'avez plus accès à votre téléphone. Pour des raisons de sécurité, nous vous les montrons une seule fois, mais vous pouvez générer de nouveaux codes.',
    'view_recovery_codes' => 'Découvrez vos codes de récupération',
    'two_factor_inactive' => [
        'one' => 'Même un mot de passe fort ne suffit pas pour protéger votre compte. Si vous utilisez le même mot de passe pour différents sites Web, si vous cliquez sur des hyperliens dans des messages électroniques ou faites des téléchargements sur Internet, vous risquez de vous faire voler votre mot de passe. Et si quelqu\'un d\'autre accède à votre compte, il peut s\'en servir pour faire toutes sortes de mauvaises choses.',
        'two' => 'L\'utilisation de l\'authentification à deux facteurs (A2F) ajoute une couche de sécurité supplémentaire lorsque vous ouvrez une session dans le Nuage de talents. Pour utiliser l\'A2F, vous devrez installer une application d\'authentification qui utilise l\'algorithme de mot de passe à usage unique fondé sur le temps sur un appareil distinct, comme votre téléphone cellulaire. Voici quelques applications compatibles :',
        'three' => '1Password pour iOS, Android, OS X, Windows',
        'four' => 'Authy pour iOS, Android, Chrome, OS X',
        'five' => 'FreeOTP pour iOS, Android et Pebble',
        'six' => 'Google Authenticator pour iOS',
        'seven' => 'Google Authenticator pour Android',
        'eight' => 'Google Authenticator (port) sur Windows Store',
        'nine' => 'LastPass Authenticator pour iOS, Android, OS X',
        'ten' => 'Microsoft Authenticator de Windows pour Windows Phone',
        'eleven' => 'Pour activer l\'A2F, vous devez lier votre téléphone (ou un autre appareil) à votre compte de Nuage de talents en balayant un code QR. Ainsi, vous serez en mesure de générer un mot de passe à usage unique sur demande lorsque vous ouvrez une session. Une fois que vous utilisez l\'A2F, vous n\'aurez plus à l\'utiliser pendant 30 jours sur cet appareil. (Vous devrez quand même entrer votre nom d\'utilisateur et votre mot de passe.)'
     ],
    'two_factor_active' => 'Vous recevez actuellement des codes de vérification au moyen d\'une application d\'authentification sur votre téléphone intelligent.',
    'two_factor_deactivate' => 'Désactivez l\'authentification à deux facteurs',
    'two_factor_status' => 'Statut :',
    'two_factor_on' => 'Activée',
    'two_factor_off' => 'Désactivées',
    'success_title' => 'Tout va bien.'
];
