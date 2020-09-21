<?php

namespace App\Http\Middleware;

use Fideloper\Proxy\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var string|array
     */

    // For the AppSvc in the Azure environment.
    protected $proxies = [
        '13.71.170.130',
        '40.85.243.129',
        '40.85.228.104',
        '13.88.225.103'
    ];

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    protected $headers = Request::HEADER_FORWARDED; // Request::HEADER_X_FORWARDED_ALL
}
