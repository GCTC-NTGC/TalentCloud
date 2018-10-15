<?php
return [
    /*
    |--------------------------------------------------------------------------
    | French Password Reset Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are the default lines which match reasons
    | that are given by the password broker for a password update attempt
    | has failed, such as for an invalid token or invalid new password.
    |
    */
    'password' => "Les mots de passe doivent comporter au moins huit caractères et correspondre à la confirmation.",
    'reset' => "Votre mot de passe a été réinitialisé.",
    'sent' => "Nous avons envoyé par courriel votre lien de réinitialisation de mot de passe.",
    'token' => "Ce jeton de réinitialisation de mot de passe n'est pas valide.",
    'user' => "Nous ne pouvons pas trouver un utilisateur avec cette address courriel.",
  'password_validation' => [
        'regex' => 'Le mot de passe doit contenir au moins un caractère appartenant à trois des catégories suivantes: minuscules (az), majuscules (AZ), chiffres (0-9) et symboles non alphanumériques (%, $,!, etc.). ',
    ]
];
