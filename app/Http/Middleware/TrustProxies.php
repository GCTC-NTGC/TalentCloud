<?php

namespace App\Http\Middleware;

use Fideloper\Proxy\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array
     */

    // For the AppSvc in the Azure environment.
    protected $proxies = [
        '13.71.170.130',
        '205.193.174.5',
        '13.88.230.232',
        '13.88.229.172',
        '52.228.39.78',
        '13.71.191.27',
        '40.85.254.37',
        '40.85.219.45',
        '40.85.223.56',
        '52.228.42.60',
        '52.228.42.28'
    ];

    /**
     * The headers that should be used to detect proxies.
     *
     * @var string
     */
    protected $headers = Request::HEADER_FORWARDED; // Request::HEADER_X_FORWARDED_ALL
}
