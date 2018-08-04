<?php

return [
    'client_id' => '800830',
    'client_secret' => env('GCCOLLAB_CLIENT_SECRET'),
    'redirect' => env('APP_URL') . '/login',
    'register_url' => 'https://account.gccollab.ca/register',
    'auth_url' => 'https://account.gccollab.ca/openid',
    'token_url' => 'https://account.gccollab.ca/openid/token',
    'keys_url' => 'https://account.gccollab.ca/openid/jwks',
];