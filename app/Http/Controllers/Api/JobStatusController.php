<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lookup\JobPosterStatus;
use Illuminate\Http\Resources\Json\JsonResource;

class JobStatusController extends Controller
{
    /**
     * Return all skills as an array
     *
     * @return mixed
     */
    public function index()
    {
        $statuses = JobPosterStatus::all();
        return JsonResource::collection($statuses);
    }
}
