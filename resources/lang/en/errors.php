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
    'title' => 'Error',
    'refresh_page' => 'Please refresh the page.',
    'two_factor_required' => 'You must activate Two-factor Authentication to access this resource.',
    'user_must_own_status' => 'You do not have permission to trigger this transition.',
    'illegal_status_transition' => 'Changing status from :from to :to is not allowed.',
    'bad_url' => 'The url is malformed or used an unsupported query parameter.',
    'email_missing_delivery_address' => 'Unable to send an email with no delivery address.',
    '404' => [
        'title' => 'Page not found',
        'header' => 'Sorry, we can\'t find the page you were looking for.',
        'paragraph1' => 'Oops, it looks like you\'ve landed on a page that either doesn\'t exist or has moved. That\'s okay, here are a few options for other pages that may help you get rolling.',
        'links' => [
            '1' => [
                'title' => 'Home',
                'url' => '/',
            ],
            '2' => [
                'title' => 'Browse Jobs',
                'url' => '/jobs',
            ],
            '3' => [
                'title' => 'FAQ',
                'url' => '/faq',
            ],
            '4' => [
                'title' => 'Indigenous Talent Portal',
                'url' => '/indigenous',
            ],
        ],
        'paragraph2' => 'If you still haven\'t found what you\'re looking for please get in touch with us directly.',
    ],
];
