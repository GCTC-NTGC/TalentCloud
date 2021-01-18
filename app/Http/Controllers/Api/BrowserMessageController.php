<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Request;

class BrowserMessageController extends Controller
{
    /**
     * Create cookie.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $cookie = Cookie::get('browser_message');
        $cookie ? Cookie::queue( Cookie::forget('browser_message')) : ''; // Destroy cookie if already exists.
        Cookie::queue( Cookie::make('browser_message', true, 43800)); // Create new cookie.
        return response()->json(['status' => 'ok']);
    }
}
