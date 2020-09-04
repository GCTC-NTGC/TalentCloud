<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lookup\EducationStatus;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationStatusController extends Controller
{
    /**
     * Return all departments as an array
     *
     * @return mixed
     */
    public function index()
    {
        return JsonResource::collection(EducationStatus::all());
    }
}
