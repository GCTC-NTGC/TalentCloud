<?php

namespace App\Http\Controllers\Api;

use App\Models\HrAdvisor;
use App\Http\Controllers\Controller;

class HrAdvisorController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HrAdvisor $hrAdvisor Incoming advisor.
     * @return \Illuminate\Http\Response
     */
    public function show(HrAdvisor $hrAdvisor)
    {
        return response()->json($hrAdvisor->toArray());
    }
}
