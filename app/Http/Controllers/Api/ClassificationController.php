<?php

namespace App\Http\Controllers\Api;

use App\Models\Classification;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClassificationController extends Controller
{
    /**
     * Return all classifications as an array
     *
     * @return mixed
     */
    public function index()
    {
        return JsonResource::collection(Classification::all());
    }
}
