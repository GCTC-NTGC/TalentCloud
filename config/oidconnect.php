<?php

return [
    'guzzle' => [
        'timeout' => 5,
    ],
    'key_cache_hour_limit' => 6,
    'iss' => 'https://account.gccollab.ca/openid',
    'client_id' => '800830',
    'client_secret' => env('GCCOLLAB_CLIENT_SECRET'),
    'register_url' => 'https://account.gccollab.ca/register',
    'auth_url' => 'https://account.gccollab.ca/openid',
    'token_url' => 'https://account.gccollab.ca/openid/token',
    'keys_url' => 'https://account.gccollab.ca/openid/jwks',
];
