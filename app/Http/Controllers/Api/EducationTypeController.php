<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lookup\EducationType;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationTypeController extends Controller
{
    /**
     * Return all departments as an array
     *
     * @return mixed
     */
    public function index()
    {
        return JsonResource::collection(EducationType::all());
    }
}
