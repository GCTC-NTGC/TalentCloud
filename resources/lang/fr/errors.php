<?php
/*
|--------------------------------------------------------------------------
| Error Language Lines
|--------------------------------------------------------------------------
|
| The following language lines are used by exception messages.
|
*/
return [
    'title' => 'Erreur',
    'refresh_page' => 'Veuillez actualiser la page.',
    'two_factor_required' => 'Vous devez activer l\'authentification à deux facteurs pour accéder à cette ressource.',
    'user_must_own_status' => 'Vous n\'avez pas l\'autorisation de déclencher cette transition.',
    'illegal_status_transition' => 'Le changement de statut de :from à :to n\'est pas autorisé.',
    'bad_url' => 'Le url est malformée ou utilise un paramètre d\'interrogation non pris en charge.',
    'email_missing_delivery_address' => 'Impossible d\'envoyer un courriel sans adresse de livraison.',
    '404' => [
        'title' => 'Page non trouvée',
        'header' => '',
        'paragraph1' => '',
        'links' => [
            '1' => [
                'title' => 'Accueil',
                'url' => '/',
            ],
            '2' => [
                'title' => 'Parcourir les emplois',
                'url' => '/jobs',
            ],
            '3' => [
                'title' => 'FAQ',
                'url' => '/faq',
            ],
            '4' => [
                'title' => 'Portail des talents autochtones',
                'url' => '/indigenous',
            ],
        ],
        'paragraph2' => '',
    ],
];
